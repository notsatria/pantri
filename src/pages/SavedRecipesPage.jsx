import { Link } from "react-router-dom";
import { useState } from "react";
import { RecipeDetailModal } from "../components/RecipeDetailModal";
import { useSavedRecipes } from "../hooks/useSavedRecipes";

export function SavedRecipesPage() {
  const {
    savedRecipes,
    statusMessage,
    removeRecipe,
    clearSavedRecipes,
  } = useSavedRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="border-2 border-ink bg-butter p-6 shadow-brutal sm:p-8">
          <p className="m-0 mb-3 inline-block border-2 border-ink bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
            Koleksi pantri
          </p>
          <h1 className="m-0 font-display text-4xl uppercase leading-none sm:text-5xl">
            Resep tersimpan
          </h1>
          <p className="mb-0 mt-4 max-w-2xl text-base font-bold sm:text-lg">
            Simpan resep favoritmu dari hasil pencarian, lalu buka lagi saat sudah
            siap masak.
          </p>
        </section>

        {statusMessage ? (
          <p
            aria-live="polite"
            className="border-2 border-ink bg-mint p-4 font-black shadow-brutal"
          >
            {statusMessage}
          </p>
        ) : null}

        {!savedRecipes.length ? (
          <section className="border-2 border-ink bg-white p-6 shadow-brutal">
            <p className="m-0 mb-4 font-bold">
              Belum ada resep tersimpan. Cari resep dulu, lalu simpan yang paling
              cocok buat dapurmu.
            </p>
            <Link
              className="inline-flex border-2 border-ink bg-ink px-4 py-3 font-black uppercase tracking-[0.1em] text-butter no-underline shadow-brutal-sm"
              to="/"
            >
              Cari Resep
            </Link>
          </section>
        ) : (
          <>
            <div className="flex flex-col gap-3 border-2 border-ink bg-white p-4 shadow-brutal sm:flex-row sm:items-center sm:justify-between">
              <p className="m-0 font-black uppercase tracking-[0.1em]">
                {savedRecipes.length} resep tersimpan
              </p>
              <button
                className="border-2 border-ink bg-danger px-4 py-3 font-black uppercase tracking-[0.1em] text-white shadow-brutal-sm"
                onClick={clearSavedRecipes}
                type="button"
              >
                Hapus Semua
              </button>
            </div>

            <section
              aria-label="Daftar resep tersimpan"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {savedRecipes.map((recipe) => (
                <article
                  className="flex min-h-[280px] flex-col border-2 border-ink bg-white p-5 shadow-brutal"
                  key={recipe.id}
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="border-2 border-ink bg-butter px-2 py-1 text-xs font-black uppercase">
                      {recipe.cuisine}
                    </span>
                    <span className="border-2 border-ink bg-paper px-2 py-1 text-xs font-black uppercase">
                      {recipe.duration}
                    </span>
                  </div>
                  <h2 className="m-0 font-display text-2xl uppercase leading-tight">
                    {recipe.name}
                  </h2>
                  <p className="mb-5 mt-3 text-sm font-bold text-ink/75">
                    {recipe.summary}
                  </p>

                  <div className="mt-auto grid gap-2">
                    <button
                      className="border-2 border-ink bg-ink px-4 py-3 font-black uppercase tracking-[0.1em] text-butter shadow-brutal-sm"
                      onClick={() => setSelectedRecipe(recipe)}
                      type="button"
                    >
                      Lihat Detail
                    </button>
                    <button
                      className="border-2 border-ink bg-danger px-4 py-3 font-black uppercase tracking-[0.1em] text-white shadow-brutal-sm"
                      onClick={() => removeRecipe(recipe.id)}
                      type="button"
                    >
                      Hapus Resep
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>

      <RecipeDetailModal
        onClose={() => setSelectedRecipe(null)}
        open={Boolean(selectedRecipe)}
        recipe={selectedRecipe}
      />
    </main>
  );
}
