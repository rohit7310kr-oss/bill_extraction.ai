import ExtractionTable from "./ExtractionTable";

export default function ExtractionResults({
  items,
  onChange,
  onDelete,
  onAddItem,
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
            Results
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Bill extraction summary
          </h2>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
          {items.length} item{items.length > 1 ? "s" : ""}
        </div>
      </div>

      <ExtractionTable
        items={items}
        onChange={onChange}
        onDelete={onDelete}
        onAddItem={onAddItem}
      />
    </div>
  );
}
