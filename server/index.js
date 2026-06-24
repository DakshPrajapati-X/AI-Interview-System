const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  buildATSResponse,
  buildResumeResponse,
  buildQuestionResponse,
  buildEvaluationResponse,
  profileSnapshot,
} = require("./services/interviewService");

const app = express();
const port = Number(process.env.PORT || 5000);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const origin = process.env.APP_ORIGIN || ["http://localhost:3000", "https://ai-interview-system-sandy.vercel.app"];
app.use(cors({
  origin: origin,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// In-memory IP rate limiter to protect public endpoints
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 100;
const ipRequestCounts = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();

  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + rateLimitWindowMs });
    return next();
  }

  const record = ipRequestCounts.get(ip);
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + rateLimitWindowMs;
    return next();
  }

  record.count += 1;
  if (record.count > rateLimitMax) {
    return res.status(429).json({ error: "Too many requests from this IP. Please try again after 15 minutes." });
  }

  next();
};

app.use("/api/", rateLimiter);
app.use(express.json({ limit: "5mb" }));

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "build");
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "ai-interview-system-api" });
});

app.get("/", (_req, res) => {
  res.send("AI Interview System API is running successfully on Render.");
});

app.post("/api/interview/resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required." });
    }

    // Server-side mimetype verification for upload security
    const allowedMimeTypes = [
      "text/plain",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Unsupported file format. Please upload PDF, DOCX, or TXT." });
    }

    const payload = await buildResumeResponse(req.file);
    return res.json(payload);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Failed to process resume." });
  }
});

app.post("/api/interview/questions", async (req, res) => {
  try {
    const { candidateProfile, rawText, interviewType } = req.body || {};

    if (!rawText || !interviewType) {
      return res.status(400).json({ error: "rawText and interviewType are required." });
    }

    if (!["HR", "Technical", "Combined"].includes(interviewType)) {
      return res.status(400).json({ error: "Invalid interview type." });
    }

    const payload = await buildQuestionResponse(profileSnapshot(candidateProfile || {}), rawText, interviewType);
    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to generate questions." });
  }
});

app.post("/api/interview/evaluate", async (req, res) => {
  try {
    const { candidateProfile, interviewType, questions, answers } = req.body || {};

    if (!Array.isArray(questions) || !Array.isArray(answers) || !interviewType) {
      return res.status(400).json({ error: "candidateProfile, interviewType, questions, and answers are required." });
    }

    const payload = await buildEvaluationResponse(
      profileSnapshot(candidateProfile || {}),
      interviewType,
      questions,
      answers
    );

    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to evaluate interview." });
  }
});

app.post("/api/interview/ats-score", async (req, res) => {
  try {
    const { candidateProfile, rawText, jobDescription, fileName } = req.body || {};

    if (!rawText) {
      return res.status(400).json({ error: "rawText is required." });
    }

    const payload = await buildATSResponse(
      profileSnapshot(candidateProfile || {}),
      rawText,
      jobDescription || "",
      fileName || candidateProfile?.fileName || ""
    );

    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to analyze resume for ATS." });
  }
});

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "build");
  if (fs.existsSync(path.join(buildPath, "index.html"))) {
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(buildPath, "index.html"));
    });
  }
}

app.listen(port, () => {
  console.log(`AI Interview System API running on http://localhost:${port}`);
});
