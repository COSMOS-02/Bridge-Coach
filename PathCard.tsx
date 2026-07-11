import type { CareerPath } from "@/lib/types";

type FitScoreBadgeProps = {
  score: number;
};

export function FitScoreBadge({ score }: FitScoreBadgeProps) {
  const tone =
    score >= 80
      ? "bg-emerald-100 text-emerald-800 ring-emerald-200"
      : score >= 65
        ? "bg-teal-100 text-teal-800 ring-teal-200"
        : "bg-amber-100 text-amber-800 ring-amber-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ${tone}`}
    >
      {score}/100 fit
    </span>
  );
}

type PathCardProps = {
  path: CareerPath;
  rank: number;
};

export function PathCard({ path, rank }: PathCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Path #{rank}
          </p>
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{path.name}</h3>
          <p className="text-sm text-slate-600">
            <span className="font-medium text-slate-800">Recommended stream:</span>{" "}
            {path.stream}
          </p>
        </div>
        <FitScoreBadge score={path.fitScore} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Effort" value={path.effortLevel} />
        <Metric label="Demand" value={path.marketDemand} />
        <Metric label="Timeline" value={path.timeline} />
      </div>

      <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
        <span className="font-semibold text-slate-900">Earning range (India):</span>{" "}
        {path.earningRange}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ListBlock title="Pros" items={path.pros} tone="pro" />
        <ListBlock title="Cons" items={path.cons} tone="con" />
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-900">Your next 4 steps</h4>
        <ol className="mt-2 space-y-2">
          {path.nextSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function ListBlock({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "pro" | "con";
}) {
  const bullet = tone === "pro" ? "✓" : "•";
  const titleColor = tone === "pro" ? "text-emerald-700" : "text-rose-700";

  return (
    <div>
      <h4 className={`text-sm font-semibold ${titleColor}`}>{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-slate-700">
            <span className="mt-0.5 shrink-0 text-slate-400">{bullet}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
