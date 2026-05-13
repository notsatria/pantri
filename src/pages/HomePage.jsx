import { useState } from "react";
import { cuisines } from "../constants/cuisines";
import { CuisineSelect } from "../components/CuisineSelect";
import { ErrorBanner } from "../components/ErrorBanner";
import { HeroSection } from "../components/HeroSection";
import { IngredientComposer } from "../components/IngredientComposer";
import { RecipeDetailModal } from "../components/RecipeDetailModal";
import { RecipeGrid } from "../components/RecipeGrid";
import { RecipeSkeletonList } from "../components/RecipeSkeletonList";
import { SearchButton } from "../components/SearchButton";
import { useRecipeSearch } from "../hooks/useRecipeSearch";
import { useSavedRecipes } from "../hooks/useSavedRecipes";
import { getRecipeProviderMode } from "../services/recipeSearch";
import { canAddIngredient, normalizeIngredientName } from "../utils/ingredients";

export function HomePage() {
  const [selectedCuisine, setSelectedCuisine] = useState("Indonesia");
  const [draftIngredient, setDraftIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { status, recipes, errorMessage, search } = useRecipeSearch();
  const { saveRecipe, isRecipeSaved, statusMessage } = useSavedRecipes();
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  const isSearching = status === "loading";
  const providerMode = getRecipeProviderMode();

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
    setIngredients((currentIngredients) => currentIngredients.filter((ingredient) => ingredient.id !== id));
  }

  async function handleSearch() {
    setSelectedRecipe(null);
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
                <h2 className="m-0 font-display text-2xl uppercase sm:text-3xl">Cari ide masak dari bahanmu</h2>
              </div>
            </div>

            <div className="space-y-5">
              <CuisineSelect label="Pilih gaya masakan" options={cuisines} value={selectedCuisine} onChange={(event) => setSelectedCuisine(event.target.value)} />

              <IngredientComposer draftValue={draftIngredient} ingredients={ingredients} onAddIngredient={handleAddIngredient} onDraftChange={(event) => setDraftIngredient(event.target.value)} onRemoveIngredient={handleRemoveIngredient} />

              <SearchButton disabled={!ingredients.length || isSearching} loading={isSearching} onClick={handleSearch} />
            </div>
          </div>

          <aside className="border-2 border-ink bg-[#ffddd2] p-6 shadow-brutal">
            <p className="m-0 mb-3 inline-block border-2 border-ink bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">Cara kerja</p>
            <ol className="m-0 space-y-3 pl-5 text-sm font-bold sm:text-base">
              <li>Masukkan bahan yang sudah ada di dapur atau kulkas.</li>
              <li>Pilih jenis masakan yang lagi kamu pengen.</li>
              <li>Biarkan pantri menyiapkan inspirasi menu yang terasa masuk akal.</li>
            </ol>
          </aside>
        </section>

        {status === "loading" ? <RecipeSkeletonList count={3} /> : null}

        {status === "error" ? <ErrorBanner message={errorMessage} onRetry={handleSearch} /> : null}

        {status === "success" ? <RecipeGrid isRecipeSaved={isRecipeSaved} onOpenDetail={setSelectedRecipe} onSaveRecipe={saveRecipe} recipes={recipes} /> : null}

        {statusMessage ? (
          <p aria-live="polite" className="border-2 border-ink bg-mint p-4 font-black shadow-brutal">
            {statusMessage}
          </p>
        ) : null}
      </div>

      <RecipeDetailModal isSaved={selectedRecipe ? isRecipeSaved(selectedRecipe.id) : false} onClose={() => setSelectedRecipe(null)} onSaveRecipe={saveRecipe} open={Boolean(selectedRecipe)} recipe={selectedRecipe} />
    </main>
  );
}
