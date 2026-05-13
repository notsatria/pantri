import { cuisines } from "../constants/cuisines";
import { CuisineSelect } from "../components/CuisineSelect";
import { HeroSection } from "../components/HeroSection";
import { IngredientComposer } from "../components/IngredientComposer";
import { SearchButton } from "../components/SearchButton";

export function HomePage() {
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
                value="Indonesia"
                onChange={() => {}}
              />

              <IngredientComposer
                draftValue=""
                ingredients={[]}
                onAddIngredient={() => {}}
                onDraftChange={() => {}}
                onRemoveIngredient={() => {}}
              />

              <SearchButton
                disabled
                loading={false}
                onClick={() => {}}
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
      </div>
    </main>
  );
}
