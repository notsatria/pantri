export function CuisineSelect({ label, options, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black uppercase tracking-[0.14em]">
        {label}
      </span>
      <select
        aria-label={label}
        className="w-full border-2 border-ink bg-white px-4 py-3 text-base font-bold shadow-brutal-sm outline-none transition hover:-translate-y-0.5 focus:-translate-y-0.5"
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
