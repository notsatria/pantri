export function RecipeCard({ recipe, onOpenDetail }) {
  return (
    <article className="flex min-h-[280px] flex-col border-2 border-ink bg-white p-5 shadow-brutal">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="border-2 border-ink bg-butter px-2 py-1 text-xs font-black uppercase">
          {recipe.cuisine}
        </span>
        <span className="border-2 border-ink bg-paper px-2 py-1 text-xs font-black uppercase">
          {recipe.duration}
        </span>
        <span className="border-2 border-ink bg-mint px-2 py-1 text-xs font-black uppercase">
          {recipe.difficulty}
        </span>
      </div>

      <h3 className="m-0 font-display text-2xl uppercase leading-tight">
        {recipe.name}
      </h3>
      <p className="mb-4 mt-3 text-sm font-bold text-ink/75">{recipe.summary}</p>

      <div className="mt-auto">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em]">
          Bahan utama
        </p>
        <p className="mb-5 mt-0 text-sm font-bold">
          {recipe.ingredients.slice(0, 4).join(", ")}
        </p>
        <button
          className="w-full border-2 border-ink bg-ink px-4 py-3 font-black uppercase tracking-[0.1em] text-butter shadow-brutal-sm transition hover:-translate-y-0.5"
          onClick={() => onOpenDetail(recipe)}
          type="button"
        >
          Lihat Detail
        </button>
      </div>
    </article>
  );
}
