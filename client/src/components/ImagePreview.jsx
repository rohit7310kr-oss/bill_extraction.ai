export default function ImagePreview({
  imageSrc,
  fileName,
  onRemove,
  onChange,
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Uploaded file
          </p>
          <p className="mt-1 truncate text-sm font-medium text-slate-700">
            {fileName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onChange}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Change
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex min-h-[20rem] items-center justify-center bg-slate-100 p-3 sm:p-5">
        <img
          src={imageSrc}
          alt={fileName || "Uploaded bill"}
          className="max-h-[32rem] w-full rounded-2xl object-contain shadow-sm"
        />
      </div>
    </div>
  );
}
