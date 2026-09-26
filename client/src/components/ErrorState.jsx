export default function ErrorState({ message, onRetry, onUploadAnother }) {
  return (
    <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M12 9V13M12 17.5h.01M10.3 3.9 2.7 16.8A2.1 2.1 0 0 0 4.4 20h15.2a2.1 2.1 0 0 0 1.7-3.2L13.7 3.9a2.1 2.1 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
            Issue detected
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            We couldn’t read this bill clearly
          </h3>
          <p className="mt-2 text-sm text-slate-600">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={onUploadAnother}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Upload Another
        </button>
      </div>
    </div>
  );
}
