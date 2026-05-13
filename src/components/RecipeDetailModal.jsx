import { useEffect } from "react";

export function RecipeDetailModal({ recipe, open, onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open || !recipe) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-ink/40 p-4 sm:items-center sm:justify-center"
      onMouseDown={onClose}
    >
      <article
        aria-modal="true"
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto border-2 border-ink bg-white p-5 shadow-brutal sm:p-7"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="m-0 mb-2 inline-block border-2 border-ink bg-butter px-3 py-1 text-xs font-black uppercase tracking-[0.14em]">
              {recipe.cuisine} / {recipe.duration}
            </p>
            <h2 className="m-0 font-display text-3xl uppercase leading-tight">
              {recipe.name}
            </h2>
          </div>
          <button
            aria-label="Tutup detail resep"
            className="h-11 w-11 shrink-0 border-2 border-ink bg-danger text-xl font-black text-white shadow-brutal-sm"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <p className="border-2 border-ink bg-paper p-4 font-bold">
          {recipe.summary}
        </p>

        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <section>
            <h3 className="font-display text-lg uppercase">Bahan</h3>
            <ul className="space-y-2 pl-5 font-bold">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-display text-lg uppercase">Langkah</h3>
            <ol className="space-y-3 pl-5 font-bold">
              {recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        {recipe.tips ? (
          <section className="mt-5 border-2 border-ink bg-mint p-4 font-bold">
            <h3 className="m-0 mb-1 font-display text-lg uppercase">Tips</h3>
            <p className="m-0">{recipe.tips}</p>
          </section>
        ) : null}
      </article>
    </div>
  );
}
