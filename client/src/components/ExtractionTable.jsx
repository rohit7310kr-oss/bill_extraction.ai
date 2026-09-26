import ExtractionRow from "./ExtractionRow";

export default function ExtractionTable({
  items,
  onChange,
  onDelete,
  onAddItem,
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Extracted items
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Invoice review
          </h3>
        </div>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center justify-center rounded-full bg-sky-100 px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-200"
        >
          + Add item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] sm:px-4">
                Description
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] sm:px-4">
                Qty
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] sm:px-4">
                Unit price
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] sm:px-4">
                Total
              </th>
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] sm:px-4">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <ExtractionRow
                key={`${item.description}-${index}`}
                item={item}
                index={index}
                onChange={onChange}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
