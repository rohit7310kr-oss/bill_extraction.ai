export default function ConfidenceBadge({ value }) {
  const numericValue = Number(value) || 0;
  const percentage = Math.min(100, Math.max(0, Math.round(numericValue * 100)));

  const tone =
    numericValue >= 0.9
      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
      : numericValue >= 0.75
        ? "bg-amber-100 text-amber-700 ring-amber-200"
        : "bg-rose-100 text-rose-700 ring-rose-200";

  return (
    <div className="min-w-[82px]">
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}
      >
        {percentage}%
      </span>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${
            numericValue >= 0.9
              ? "bg-emerald-500"
              : numericValue >= 0.75
                ? "bg-amber-500"
                : "bg-rose-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
