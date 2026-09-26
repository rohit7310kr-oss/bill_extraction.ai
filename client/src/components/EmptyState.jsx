export default function EmptyState({ onUpload }) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 shadow-inner shadow-sky-200">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path
              d="M7 18.5h10a2.5 2.5 0 0 0 2.5-2.5V9.9c0-.7-.3-1.3-.8-1.7L13.7 4.3A2.6 2.6 0 0 0 12.2 3.8H7A2.5 2.5 0 0 0 4.5 6.3v9.7A2.5 2.5 0 0 0 7 18.5Zm2.5-8h5.2M9.5 12.5h5.2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
          Upload a bill
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Start with a clean document snapshot
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Extract invoice items, quantities, unit prices, and totals from a bill
          image in just a few steps.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onUpload}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Upload Bill
          </button>
        </div>
      </div>
    </div>
  );
}
