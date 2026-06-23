# AI Interview System

AI Interview System is a full-stack interview preparation platform built with React and Express. It helps candidates upload resumes, generate personalized HR and technical interview questions, practice answers, review feedback, check ATS readiness, and track progress with ranks and XP.

## Live Demo

https://ai-interview-system-0win.onrender.com/

## Features

- Resume upload and parsing for `.pdf`, `.docx`, and `.txt` files.
- Candidate profile extraction from resume content.
- Personalized HR, technical, and combined interview question generation.
- Answer evaluation with question-by-question feedback, strengths, weaknesses, and improvement suggestions.
- ATS resume scoring with keyword analysis, section checks, formatting checks, and prioritized fixes.
- Progress dashboard with session history, daily challenges, ranks, badges, and XP.
- User authentication and profile management stored locally in the browser.
- Light and dark theme support.
- Interview course and preparation sections.

## Tech Stack

- Frontend: React 18, Create React App, Tailwind CSS, Lucide React
- Backend: Node.js, Express, Multer
- Resume parsing: Mammoth, pdf-parse
- Data sources: CSV and Parquet interview question datasets
- AI provider: OpenRouter API
- Local state: Browser storage wrapper in `src/utils/storage.js`

## Project Structure

```text
ai-interview-system/
  public/                 Static assets
  server/
    data/                 Interview datasets
    services/             Resume, question, evaluation, and ATS logic
    index.js              Express API server
  src/
    components/           React UI components
    utils/                API, storage, and gamification helpers
    App.js                Main application shell and routing state
    App.css               Main application styling
  package.json            Scripts and dependencies
```

## Prerequisites

- Node.js 18 or newer
- npm
- OpenRouter API key

## Environment Variables

Create a `.env` file in the project root. The file is intentionally ignored by Git.

```env
OPENROUTER_API_KEY=your_openrouter_api_key
REACT_APP_OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
REACT_APP_MODEL_NAME=openai/gpt-4o-mini
APP_ORIGIN=http://localhost:3000
PORT=5000
```

Notes:

- `OPENROUTER_API_KEY` is used by the backend API.
- `REACT_APP_OPENROUTER_API_KEY` is used by frontend helper code if called directly.
- `OPENROUTER_MODEL` and `REACT_APP_MODEL_NAME` are optional; defaults are provided in the code.

## Installation

```bash
npm install
```

## Running Locally

Start the frontend and backend together:

```bash
npm run dev
```

The app runs at:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

You can also run them separately:

```bash
npm run server
npm start
```

## Available Scripts

```bash
npm start
```

Runs the React frontend.

```bash
npm run server
```

Runs the Express backend on port `5000` by default.

```bash
npm run dev
```

Runs frontend and backend together with `concurrently`.

```bash
npm test
```

Runs the React test runner.

```bash
npm run build
```

Creates a production frontend build in the `build/` folder.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Checks backend health. |
| `POST` | `/api/interview/resume` | Uploads and parses a resume file. |
| `POST` | `/api/interview/questions` | Generates interview questions from resume data. |
| `POST` | `/api/interview/evaluate` | Evaluates submitted interview answers. |
| `POST` | `/api/interview/ats-score` | Scores resume ATS readiness. |

## Resume and Dataset Support

The backend reads local datasets from `server/data/`, including CSV and Parquet files. These datasets are used to improve question selection and provide fallback behavior when AI generation is unavailable.

Supported resume formats:

- PDF
- DOCX
- TXT

Maximum upload size is `10 MB`.

## GitHub Notes

- `.env` is ignored and should not be committed.
- `node_modules/` and production `build/` output are ignored.
- Commit source files, dataset files, public assets, and documentation needed to run the project.

## License

This project is currently private and does not define a public license.
