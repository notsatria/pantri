export function SearchButton({ disabled, loading, onClick }) {
  return (
    <button
      className="inline-flex min-h-14 w-full items-center justify-center border-2 border-ink bg-ink px-5 py-3 text-base font-black uppercase tracking-[0.12em] text-butter shadow-brutal transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/70 disabled:text-butter/70 disabled:shadow-none"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {loading ? "Sedang memasak..." : "Cari Resep"}
    </button>
  );
}
