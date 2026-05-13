import { IngredientChipList } from "./IngredientChipList";

export function IngredientComposer({
  draftValue,
  ingredients,
  onAddIngredient,
  onDraftChange,
  onRemoveIngredient,
}) {
  return (
    <div className="space-y-3">
      <div>
        <label
          className="mb-2 block text-sm font-black uppercase tracking-[0.14em]"
          htmlFor="ingredient-input"
        >
          Tambah bahan
        </label>
        <div className="flex gap-3">
          <input
            id="ingredient-input"
            aria-label="Tambah bahan"
            className="min-w-0 flex-1 border-2 border-ink bg-white px-4 py-3 text-base font-bold shadow-brutal-sm outline-none placeholder:font-semibold placeholder:text-ink/60 focus:-translate-y-0.5"
            onChange={onDraftChange}
            placeholder="Contoh: ayam, tomat, bawang putih"
            value={draftValue}
          />
          <button
            className="inline-flex h-[54px] w-[54px] items-center justify-center border-2 border-ink bg-butter text-2xl font-black shadow-brutal-sm transition hover:-translate-y-0.5"
            onClick={onAddIngredient}
            type="button"
          >
            +
          </button>
        </div>
      </div>

      <p className="m-0 text-sm font-bold text-ink/75">
        Tambahkan sampai 20 bahan. Pantri akan bantu olah jadi ide resep yang relevan.
      </p>

      <IngredientChipList ingredients={ingredients} onRemove={onRemoveIngredient} />
    </div>
  );
}
