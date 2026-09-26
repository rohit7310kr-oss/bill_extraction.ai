import ConfidenceBadge from "./ConfidenceBadge";

export default function ExtractionRow({ item, index, onChange, onDelete }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <tr className="align-top border-t border-slate-200 text-sm text-slate-700">
      <td className="px-3 py-3 sm:px-4">
        <input
          value={item.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          aria-label={`Description for item ${index + 1}`}
        />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <input
          value={item.quantity}
          onChange={(event) => updateField("quantity", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          aria-label={`Quantity for item ${index + 1}`}
        />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <input
          value={item.unit_price}
          onChange={(event) => updateField("unit_price", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          aria-label={`Unit price for item ${index + 1}`}
        />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <input
          value={item.total}
          onChange={(event) => updateField("total", event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          aria-label={`Total for item ${index + 1}`}
        />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          <ConfidenceBadge value={item.confidence} />
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            aria-label={`Delete item ${index + 1}`}
          >
            ×
          </button>
        </div>
      </td>
    </tr>
  );
}
