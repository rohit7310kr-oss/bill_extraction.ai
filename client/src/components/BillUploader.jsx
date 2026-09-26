export default function BillUploader({ onFileSelect, isProcessing }) {
  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    event.target.value = "";
  };

  return (
    <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:p-10">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 shadow-inner shadow-sky-200">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <path
              d="M12 16V5m0 0 3.5 3.5M12 5 8.5 8.5M4 15.5v1.2A2.3 2.3 0 0 0 6.3 19h11.4A2.3 2.3 0 0 0 20 16.7v-1.2"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Upload a bill and extract its items
        </h3>
        <p className="mt-3 max-w-md text-sm text-slate-600 sm:text-base">
          Drag and drop a JPG, JPEG, PNG, or WEBP invoice image, or choose one
          from your device.
        </p>

        <label
          className={`mt-8 inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
            isProcessing
              ? "pointer-events-none bg-slate-300 text-slate-500"
              : "bg-slate-900 text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800"
          }`}
        >
          Upload Bill
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="sr-only"
            onChange={handleChange}
          />
        </label>

        <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
            <span
              className="h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            JPG / JPEG
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
            PNG / WEBP
          </span>
        </div>
      </div>
    </div>
  );
}
