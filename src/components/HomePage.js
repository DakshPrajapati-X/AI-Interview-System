import React from "react";
import { Award, CalendarDays, Flame, Mic, Shield, Sparkles, Target, Upload } from "lucide-react";
import { average, BRAND_NAME, BrandMark, FeatureCard, RankBadge, StatCard, formatDateTime, subtleSurfaceClass, surfaceClass } from "./SharedUI";
import { getBadgeMeta, getDailyChallengeStatus, getRankProgress } from "../utils/gamification";

const ChallengeStatePill = ({ status }) => {
  const meta = {
    available: {
      label: "Available Today",
      className: "soft-status-success text-emerald-100 dark:text-emerald-200",
    },
    completed_today: {
      label: "Completed Today",
      className: "soft-status-info text-[var(--app-text)]",
    },
    missed: {
      label: "Streak At Risk",
      className: "soft-status-warning text-[var(--app-accent)]",
    },
  };

  const item = meta[status] || meta.available;
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.className}`}>{item.label}</span>;
};

const RankProgressCard = ({ gamification, nextRank }) => {
  const badge = getBadgeMeta(gamification.currentRank);
  const progress = getRankProgress(gamification.totalXp);

  return (
    <div className={`${surfaceClass} p-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <RankBadge badge={badge} size="md" />
          <div>
            <p className="text-sm muted-copy">Current rank</p>
            <p className="mt-2 text-2xl font-black text-[var(--app-text)]">{gamification.currentRank}</p>
          </div>
        </div>
        <div className={`${subtleSurfaceClass} px-4 py-3 text-right`}>
          <p className="text-xs uppercase tracking-[0.2em] faint-copy">XP</p>
          <p className="mt-1 text-2xl font-black text-[var(--app-text)]">{gamification.totalXp}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm muted-copy">
          <span>{nextRank ? `${nextRank.name} unlock` : "Top rank reached"}</span>
          <span>{nextRank ? `${Math.max(0, nextRank.minXp - gamification.totalXp)} XP left` : "Complete"}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500" style={{ width: `${progress.progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
};

const StoryMetric = ({ label, value, detail }) => (
  <div className="metric-tile rounded-[1.7rem]">
    <div className="text-xs uppercase tracking-[0.24em] faint-copy">{label}</div>
    <div className="mt-4 text-4xl font-black text-[var(--app-text)]">{value}</div>
    <div className="mt-2 text-sm muted-copy">{detail}</div>
  </div>
);

export const HomePage = ({ currentUser, setCurrentPage, sessionHistory, gamification, dailyChallenge, onStartDailyChallenge, nextRank }) => {
  const latestSession = sessionHistory[sessionHistory.length - 1];
  const avgScore = Math.round(average(sessionHistory.map((item) => item.score || 0)));
  const dailyChallengeStatus = getDailyChallengeStatus(gamification, dailyChallenge);
  const currentBadge = getBadgeMeta(gamification.currentRank);

  return (
    <div className="space-y-8">
      <section className="editorial-hero spot-grid rounded-[2.25rem] p-8 lg:p-10">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,210,74,0.22)] bg-[rgba(255,210,74,0.1)] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--app-accent)]">
              <Sparkles className="h-4 w-4" />
              AI interview prep with visible momentum
            </div>
            <BrandMark />
            <div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.02] text-[var(--app-text)] sm:text-5xl lg:text-6xl">
                Build interview confidence with a resume-aware prep workspace that feels like progress every day.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 muted-copy">
                {BRAND_NAME} combines resume upload, AI interview practice, ATS analysis, daily streaks, and rank progression into one focused black-and-gold experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onStartDailyChallenge} className="primary-button">
                Start Daily Challenge
              </button>
              <button onClick={() => setCurrentPage("interview")} className="secondary-button">
                Start Regular Interview
              </button>
              <button onClick={() => setCurrentPage("ats")} className="secondary-button">
                Check ATS Fit
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <StoryMetric label="Current streak" value={gamification.currentStreak} detail="Keep the chain alive with daily practice." />
              <StoryMetric label="Sessions" value={sessionHistory.length} detail="Every mock session becomes a visible checkpoint." />
              <StoryMetric label="Average score" value={avgScore || 0} detail="A quick signal for how your answers are trending." />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-card-highlight rounded-[2rem] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow-label">Today's Challenge</p>
                  <h2 className="mt-3 text-2xl font-black text-[var(--app-text)]">{dailyChallenge.title}</h2>
                  <p className="mt-3 text-sm leading-6 muted-copy">{dailyChallenge.description}</p>
                </div>
                <ChallengeStatePill status={dailyChallengeStatus} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                <span className="accent-pill">{dailyChallenge.interviewType}</span>
                <span className="accent-pill">{dailyChallenge.sessionMode === "camera" ? "Camera" : "Voice Only"}</span>
                <span className="accent-pill">{dailyChallenge.dateKey}</span>
              </div>
            </div>

            <RankProgressCard gamification={gamification} nextRank={nextRank} />

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <StatCard value={gamification.currentStreak} label="Streak alive" accent="from-yellow-400 via-amber-500 to-orange-500" />
              <StatCard value={gamification.totalXp} label="Total XP" accent="from-neutral-800 via-neutral-700 to-neutral-900" />
              <StatCard value={gamification.earnedBadges.length} label="Badges earned" accent="from-zinc-100 via-yellow-200 to-amber-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className={`${surfaceClass} p-6`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow-label">Profile Progress</p>
              <h2 className="mt-3 text-3xl font-black text-[var(--app-text)]">
                {currentUser?.firstName}, you&apos;re currently in {gamification.currentRank}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 muted-copy">
                Your practice history, scoring trend, and badge unlocks are all tied together so improvement feels tangible instead of abstract.
              </p>
            </div>
            <div className={`${subtleSurfaceClass} rounded-[1.7rem] px-5 py-4`}>
              <p className="text-xs uppercase tracking-[0.18em] faint-copy">Current badge</p>
              <div className="mt-3 flex items-center gap-3">
                <RankBadge badge={currentBadge} size="sm" />
                <p className="text-xl font-black text-[var(--app-text)]">{currentBadge.badgeLabel}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="metric-tile rounded-[1.6rem]">
              <div className="flex items-center gap-2 text-sm font-semibold muted-copy">
                <Sparkles className="h-4 w-4 theme-accent-text" />
                Total XP
              </div>
              <div className="mt-3 text-3xl font-black text-[var(--app-text)]">{gamification.totalXp}</div>
            </div>
            <div className="metric-tile rounded-[1.6rem]">
              <div className="flex items-center gap-2 text-sm font-semibold muted-copy">
                <Flame className="h-4 w-4 theme-accent-text" />
                Current streak
              </div>
              <div className="mt-3 text-3xl font-black text-[var(--app-text)]">{gamification.currentStreak}</div>
            </div>
            <div className="metric-tile rounded-[1.6rem]">
              <div className="flex items-center gap-2 text-sm font-semibold muted-copy">
                <Award className="h-4 w-4 theme-accent-text" />
                Longest streak
              </div>
              <div className="mt-3 text-3xl font-black text-[var(--app-text)]">{gamification.longestStreak}</div>
            </div>
            <div className="metric-tile rounded-[1.6rem]">
              <div className="flex items-center gap-2 text-sm font-semibold muted-copy">
                <Shield className="h-4 w-4 theme-accent-text" />
                Badge vault
              </div>
              <div className="mt-3 text-3xl font-black text-[var(--app-text)]">{gamification.earnedBadges.length}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className={`${subtleSurfaceClass} p-5`}>
              <h3 className="text-lg font-bold text-[var(--app-text)]">Earned Badges</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {gamification.earnedBadges.map((badgeName) => {
                  const badgeMeta = getBadgeMeta(badgeName);
                  const active = badgeName === gamification.currentRank;
                  return (
                    <div
                      key={badgeName}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                        active
                          ? "bg-[rgba(255,210,74,0.14)] text-[var(--app-accent)]"
                          : "surface-card-subtle text-[var(--app-text)]"
                      }`}
                    >
                      <RankBadge badge={badgeMeta} size="sm" />
                      <span>{badgeMeta.badgeLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`${subtleSurfaceClass} p-5`}>
              <h3 className="text-lg font-bold text-[var(--app-text)]">Recent Progress</h3>
              {gamification.xpHistory.length ? (
                <div className="mt-4 space-y-3">
                  {[...gamification.xpHistory].slice(-3).reverse().map((item, index) => (
                    <div key={`${item.awardedAt}-${index}`} className={`${subtleSurfaceClass} px-4 py-3`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-[var(--app-text)]">+{item.xpAwarded} XP</span>
                        <span className="text-xs uppercase tracking-[0.18em] faint-copy">
                          {item.rewardType === "first_session" ? "First Session" : item.dailyChallengeId ? "Daily Challenge" : "Session"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm muted-copy">
                        Score {item.sessionScore}/100 • Rank after session: {item.rankAfter}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm muted-copy">Complete your first interview to start building XP history.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${surfaceClass} p-6`}>
            <p className="eyebrow-label">Latest Activity</p>
            <p className="mt-4 text-lg font-semibold text-[var(--app-text)]">
              {latestSession ? `${latestSession.type} interview scored ${latestSession.score}/100` : "No interview yet"}
            </p>
            <p className="mt-2 text-sm muted-copy">
              {latestSession ? formatDateTime(latestSession.date) : `Welcome, ${currentUser?.firstName || "User"}`}
            </p>
            {latestSession?.xpAwarded ? (
              <p className="mt-3 text-sm font-medium theme-accent-text">Latest reward: +{latestSession.xpAwarded} XP</p>
            ) : null}
          </div>

          <FeatureCard
            icon={<CalendarDays className="h-6 w-6" />}
            title="Deterministic daily challenges"
            description="A new challenge is generated every day. Complete it once to keep your streak alive."
          />
          <FeatureCard
            icon={<Upload className="h-6 w-6" />}
            title="Real resume parsing"
            description="Supports PDF, DOCX, and TXT files and extracts structured profile details automatically."
          />
          <FeatureCard
            icon={<Mic className="h-6 w-6" />}
            title="Voice-first interview flow"
            description="Questions are spoken aloud and answers can be captured directly from microphone input."
          />
          <FeatureCard
            icon={<Target className="h-6 w-6" />}
            title={`${BRAND_NAME} coaching`}
            description="Each question gets a score, speaking-quality feedback, and a concrete improvement suggestion."
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${surfaceClass} p-6`}>
          <p className="eyebrow-label">Upload Once</p>
          <h3 className="mt-3 text-2xl font-black text-[var(--app-text)]">Your resume becomes the source of truth for every prep flow.</h3>
          <p className="mt-3 text-sm leading-7 muted-copy">
            Use the same extracted candidate profile across ATS checks, interview prompts, and progress tracking without jumping between disconnected tools.
          </p>
        </div>
        <div className={`${surfaceClass} p-6`}>
          <p className="eyebrow-label">Practice Smarter</p>
          <h3 className="mt-3 text-2xl font-black text-[var(--app-text)]">Turn each mock interview into sharper next-step coaching.</h3>
          <p className="mt-3 text-sm leading-7 muted-copy">
            Every session stores strengths, weak spots, speaking quality, and question-level analysis so you know exactly what to fix.
          </p>
        </div>
        <div className={`${surfaceClass} p-6`}>
          <p className="eyebrow-label">Stay Motivated</p>
          <h3 className="mt-3 text-2xl font-black text-[var(--app-text)]">Progress is visible through XP, ranks, streaks, and badge unlocks.</h3>
          <p className="mt-3 text-sm leading-7 muted-copy">
            The system gives your preparation a game loop without changing the seriousness of the interview outcomes.
          </p>
        </div>
      </section>
    </div>
  );
};
