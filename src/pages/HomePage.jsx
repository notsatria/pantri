import { useState } from "react";
import { cuisines } from "../constants/cuisines";
import { CuisineSelect } from "../components/CuisineSelect";
import { HeroSection } from "../components/HeroSection";
import { IngredientComposer } from "../components/IngredientComposer";
import { SearchButton } from "../components/SearchButton";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import { canAddIngredient, normalizeIngredientName } from "../utils/ingredients";

export function HomePage() {
  const [selectedCuisine, setSelectedCuisine] = useState("Indonesia");
  const [draftIngredient, setDraftIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const { status, recipes, errorMessage, search } = useRecipeSearch();
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  const isSearching = status === "loading";

  function handleAddIngredient() {
    if (!canAddIngredient(ingredientNames, draftIngredient)) {
      return;
    }

    const name = normalizeIngredientName(draftIngredient);
    setIngredients((currentIngredients) => [
      ...currentIngredients,
      {
        id: `${name}-${Date.now()}`,
        name,
      },
    ]);
    setDraftIngredient("");
  }

  function handleRemoveIngredient(id) {
    setIngredients((currentIngredients) =>
      currentIngredients.filter((ingredient) => ingredient.id !== id),
    );
  }

  async function handleSearch() {
    await search({
      cuisine: selectedCuisine,
      ingredients: ingredientNames,
    });
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <HeroSection />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border-2 border-ink bg-white p-6 shadow-brutal">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 inline-block border-2 border-ink bg-butter px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
                  Phase 1
                </p>
                <h2 className="m-0 font-display text-2xl uppercase sm:text-3xl">
                  Cari ide masak dari bahanmu
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              <CuisineSelect
                label="Pilih gaya masakan"
                options={cuisines}
                value={selectedCuisine}
                onChange={(event) => setSelectedCuisine(event.target.value)}
              />

              <IngredientComposer
                draftValue={draftIngredient}
                ingredients={ingredients}
                onAddIngredient={handleAddIngredient}
                onDraftChange={(event) => setDraftIngredient(event.target.value)}
                onRemoveIngredient={handleRemoveIngredient}
              />

              <SearchButton
                disabled={!ingredients.length || isSearching}
                loading={isSearching}
                onClick={handleSearch}
              />
            </div>
          </div>

          <aside className="border-2 border-ink bg-[#ffddd2] p-6 shadow-brutal">
            <p className="m-0 mb-3 inline-block border-2 border-ink bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
              Cara kerja
            </p>
            <ol className="m-0 space-y-3 pl-5 text-sm font-bold sm:text-base">
              <li>Masukkan bahan yang sudah ada di dapur atau kulkas.</li>
              <li>Pilih jenis masakan yang lagi kamu pengen.</li>
              <li>Biarkan pantri menyiapkan inspirasi menu yang terasa masuk akal.</li>
            </ol>
            <div className="mt-6 border-2 border-ink bg-white p-4">
              <p className="m-0 text-sm font-bold">
                Nanti di phase ini kamu akan dapat loading skeleton, hasil resep mock,
                dan detail resep yang bisa dibuka tanpa perlu backend dulu.
              </p>
            </div>
          </aside>
        </section>

        {errorMessage ? (
          <p className="border-2 border-ink bg-danger p-4 font-black text-white shadow-brutal">
            {errorMessage}
          </p>
        ) : null}

        {recipes.length ? (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                className="border-2 border-ink bg-white p-5 shadow-brutal"
                key={recipe.id}
              >
                <p className="m-0 text-sm font-black uppercase tracking-[0.14em]">
                  {recipe.cuisine} / {recipe.duration}
                </p>
                <h3 className="mb-2 mt-3 font-display text-xl uppercase">
                  {recipe.name}
                </h3>
                <p className="m-0 text-sm font-bold text-ink/75">
                  {recipe.summary}
                </p>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
