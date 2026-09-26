export default function ProcessingState({ stages, currentStage }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            Processing
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Analyzing your bill
          </h3>
        </div>
        <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-linear-to-r from-sky-500 via-cyan-500 to-violet-500 transition-all duration-500"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 space-y-4" aria-live="polite">
        {stages.map((stage, index) => {
          const isActive = index === currentStage;
          const isComplete = index < currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                isActive
                  ? "border-sky-200 bg-sky-50"
                  : isComplete
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-sky-600 text-white"
                    : isComplete
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                }`}
              >
                {isComplete ? "✓" : index + 1}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-sky-700"
                      : isComplete
                        ? "text-emerald-700"
                        : "text-slate-500"
                  }`}
                >
                  {stage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
