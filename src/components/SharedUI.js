import React from "react";
import { ArrowUpRight } from "lucide-react";

export function average(numbers = []) {
  if (!numbers.length) return 0;
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function cleanSkills(skills = []) {
  return normalizeList(skills).slice(0, 8);
}

export function normalizeList(items = []) {
  if (Array.isArray(items)) {
    return items.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof items === "string") {
    return items
      .split(/[\n,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export const BRAND_NAME = "PERFEXA";
export const BRAND_TAGLINE = "Perfection and Excellence Defined";

export const surfaceClass = "surface-card section-card rounded-[2rem]";
export const subtleSurfaceClass = "surface-card-subtle rounded-[1.6rem]";
export const metricTileClass = "metric-tile";
export const pageIntroClass = `${surfaceClass} p-8`;

export const BrandMark = ({ compact = false, invert = false }) => (
  <div className={`brand-mark ${compact ? "brand-mark--compact" : ""} ${invert ? "brand-mark--invert" : ""}`}>
    <div className="brand-mark__crest" aria-hidden="true">
      <span className="brand-mark__crown" />
      <span className="brand-mark__arrow">
        <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
      </span>
    </div>
    <div>
      <div className="brand-mark__name">{BRAND_NAME}</div>
      {!compact ? <div className="brand-mark__tagline">{BRAND_TAGLINE}</div> : null}
    </div>
  </div>
);

export const RankBadge = ({ badge, size = "md", emphasize = false }) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28",
  };

  const toneClasses = {
    slate: "text-zinc-300",
    amber: "text-amber-300",
    zinc: "text-zinc-200",
    yellow: "text-yellow-300",
    cyan: "text-amber-200",
  };

  return (
    <div
      className={`${sizeClasses[size] || sizeClasses.md} rank-badge-swords ${
        toneClasses[badge?.accent] || toneClasses.slate
      } ${emphasize ? "rank-badge-swords--emphasize" : ""}`}
      aria-label={`${badge?.name || "Rank"} badge`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22 12L28 18L20 33L16 29L22 12Z" fill="currentColor" opacity="0.95" />
        <path d="M42 12L36 18L44 33L48 29L42 12Z" fill="currentColor" opacity="0.95" />
        <path d="M29 20L34 25L18 41L13 36L29 20Z" fill="currentColor" />
        <path d="M35 20L30 25L46 41L51 36L35 20Z" fill="currentColor" />
        <path d="M18 41L24 47L21 50L15 44L18 41Z" fill="currentColor" opacity="0.92" />
        <path d="M46 41L40 47L43 50L49 44L46 41Z" fill="currentColor" opacity="0.92" />
        <path d="M24 47L28 51L24 55L20 51L24 47Z" fill="currentColor" />
        <path d="M40 47L36 51L40 55L44 51L40 47Z" fill="currentColor" />
      </svg>
    </div>
  );
};

export const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium muted-copy">{label}</span>
    {children}
  </label>
);

export const ErrorBanner = ({ message }) => (
  <div className="soft-status-danger rounded-2xl px-4 py-3 text-sm font-medium text-red-100 dark:text-red-200">{message}</div>
);

export const LoadingPanel = ({ title }) => (
  <div className={`${surfaceClass} p-8 text-center`}>
    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-[var(--app-accent)]" />
    <p className="mt-4 text-lg font-semibold text-[var(--app-text)]">{title}</p>
    <p className="mt-2 text-sm muted-copy">Please wait while the system prepares your interview.</p>
  </div>
);

export const SummaryRow = ({ label, value }) => (
  <div className={`${subtleSurfaceClass} p-4`}>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] faint-copy">{label}</p>
    <p className="mt-2 text-sm leading-6 text-[var(--app-text)]">{value}</p>
  </div>
);

export const TagList = ({ title, items, emptyLabel }) => {
  const normalizedItems = normalizeList(items);

  return (
    <div>
      {title ? <h4 className="text-sm font-semibold text-[var(--app-text)]">{title}</h4> : null}
      {normalizedItems.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {normalizedItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(255,210,74,0.24)] bg-[rgba(255,210,74,0.12)] px-3 py-1 text-xs font-semibold text-[var(--app-accent)]"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm muted-copy">{emptyLabel}</p>
      )}
    </div>
  );
};

export const SimpleList = ({ title, items, emptyLabel }) => {
  const normalizedItems = normalizeList(items);

  return (
    <div>
      {title ? <h4 className="text-sm font-semibold text-[var(--app-text)]">{title}</h4> : null}
      {normalizedItems.length ? (
        <ul className="mt-3 space-y-2">
          {normalizedItems.map((item, index) => (
            <li key={`${item}-${index}`} className={`${subtleSurfaceClass} px-4 py-3 text-sm text-[var(--app-text)]`}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm muted-copy">{emptyLabel}</p>
      )}
    </div>
  );
};

export const InfoPanel = ({ title, items }) => (
  <div className={`${surfaceClass} p-6`}>
    <h3 className="text-lg font-bold text-[var(--app-text)]">{title}</h3>
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6 muted-copy">
          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--app-accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const StatCard = ({ value, label, accent }) => (
  <div className={`${metricTileClass} rounded-[1.8rem] bg-gradient-to-br ${accent} p-6 text-white shadow-xl`}>
    <div className="text-4xl font-black">{value}</div>
    <div className="mt-2 text-sm font-medium text-white/80">{label}</div>
  </div>
);

export const FeatureCard = ({ icon, title, description }) => (
  <div className={`${surfaceClass} p-6`}>
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,210,74,0.14)] text-[var(--app-accent)]">{icon}</div>
    <h3 className="mt-4 text-xl font-bold text-[var(--app-text)]">{title}</h3>
    <p className="mt-2 text-sm leading-6 muted-copy">{description}</p>
  </div>
);

export const FeedbackList = ({ title, icon, tone, items }) => {
  const normalizedItems = normalizeList(items);

  const toneClasses = {
    green: "soft-status-success text-emerald-100 dark:text-emerald-200",
    red: "soft-status-danger text-red-100 dark:text-red-200",
  };

  return (
    <div className={`rounded-[2rem] border p-6 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2 text-lg font-bold">
        {icon}
        {title}
      </div>
      <ul className="mt-4 space-y-3">
        {normalizedItems.length ? (
          normalizedItems.map((item, index) => (
            <li key={`${item}-${index}`} className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/90 dark:bg-black/20">
              {item}
            </li>
          ))
        ) : (
          <li className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/90 dark:bg-black/20">Nothing recorded yet.</li>
        )}
      </ul>
    </div>
  );
};

export const ScoreBadge = ({ label, value, tone }) => {
  const tones = {
    green: "soft-status-success text-emerald-100 dark:text-emerald-200",
    yellow: "soft-status-warning text-[var(--app-accent)]",
    red: "soft-status-danger text-red-100 dark:text-red-200",
    blue: "soft-status-info text-[var(--app-text)]",
  };

  return (
    <div className={`rounded-2xl px-4 py-3 text-center ${tones[tone] || tones.blue}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.15em]">{label}</div>
      <div className="mt-1 text-lg font-black">{value}</div>
    </div>
  );
};

export const MiniPanel = ({ title, items, fallback }) => {
  const normalizedItems = normalizeList(items);

  return (
    <div className={`${subtleSurfaceClass} p-4`}>
      <p className="text-sm font-semibold text-[var(--app-text)]">{title}</p>
      {normalizedItems.length ? (
        <ul className="mt-2 space-y-2 text-sm muted-copy">
          {normalizedItems.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--app-accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm muted-copy">{fallback}</p>
      )}
    </div>
  );
};

export const TypeCountCard = ({ title, count, icon }) => (
  <div className={`${surfaceClass} p-5`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] faint-copy">{title}</p>
        <div className="mt-3 text-4xl font-black text-[var(--app-text)]">{count}</div>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,210,74,0.14)] text-[var(--app-accent)]">{icon}</div>
    </div>
  </div>
);
