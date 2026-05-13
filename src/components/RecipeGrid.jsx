import { RecipeCard } from "./RecipeCard";

export function RecipeGrid({ recipes, onOpenDetail }) {
  if (!recipes.length) {
    return (
      <section className="border-2 border-ink bg-white p-6 shadow-brutal">
        <p className="m-0 font-bold">
          Belum ada resep yang cocok. Coba tambah bahan lain atau pilih semua jenis
          masakan.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Rekomendasi resep"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          onOpenDetail={onOpenDetail}
          recipe={recipe}
        />
      ))}
    </section>
  );
}
