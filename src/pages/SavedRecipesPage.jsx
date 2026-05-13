import { Link } from "react-router-dom";

export function SavedRecipesPage() {
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
      </div>
    </main>
  );
}
