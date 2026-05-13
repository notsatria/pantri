export function RecipeSkeletonList({ count = 3 }) {
  return (
    <section
      aria-label="Memuat resep"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="min-h-[220px] animate-pulse border-2 border-ink bg-white p-5 shadow-brutal"
          key={index}
        >
          <div className="mb-5 h-4 w-1/2 border-2 border-ink bg-butter" />
          <div className="mb-4 h-8 w-4/5 border-2 border-ink bg-paper" />
          <div className="mb-2 h-4 w-full border-2 border-ink bg-paper" />
          <div className="mb-6 h-4 w-3/4 border-2 border-ink bg-paper" />
          <div className="h-11 w-36 border-2 border-ink bg-ink" />
        </div>
      ))}
    </section>
  );
}
