export function IngredientChipList({ ingredients, onRemove }) {
  if (!ingredients.length) {
    return (
      <div className="border-2 border-dashed border-ink bg-paper p-4">
        <p className="m-0 text-sm font-bold text-ink/75">
          Belum ada bahan. Coba mulai dari protein, sayur, atau bumbu utama.
        </p>
      </div>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <button
            className="inline-flex items-center gap-2 border-2 border-ink bg-white px-3 py-2 text-sm font-black shadow-brutal-sm"
            onClick={() => onRemove(ingredient.id)}
            type="button"
          >
            <span>{ingredient.name}</span>
            <span aria-hidden="true">×</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
