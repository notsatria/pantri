export function ErrorBanner({ message, onRetry }) {
  return (
    <section
      aria-live="polite"
      className="flex flex-col gap-4 border-2 border-ink bg-danger p-5 text-white shadow-brutal sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="m-0 text-sm font-black uppercase tracking-[0.14em]">
          Resep belum matang
        </p>
        <p className="mb-0 mt-1 font-bold">
          {message || "Pantri belum bisa memuat rekomendasi. Coba lagi sebentar."}
        </p>
      </div>
      <button
        className="border-2 border-ink bg-white px-4 py-3 font-black uppercase tracking-[0.1em] text-ink shadow-brutal-sm"
        onClick={onRetry}
        type="button"
      >
        Coba Lagi
      </button>
    </section>
  );
}
