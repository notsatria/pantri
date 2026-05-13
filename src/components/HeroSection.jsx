export function HeroSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="border-2 border-ink bg-butter p-6 shadow-brutal sm:p-8">
        <p className="m-0 mb-4 inline-block border-2 border-ink bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">pantri</p>
        <h1 className="m-0 max-w-4xl font-display text-4xl uppercase leading-none sm:text-5xl lg:text-6xl">Masak enak dari bahan yang sudah ada.</h1>
        <p className="mb-0 mt-5 max-w-2xl text-base font-bold sm:text-lg">Masukkan isi dapurmu, lalu biarkan pantri kasih inspirasi menu yang cepat dipahami, terasa dekat, dan bikin kamu langsung pengen mulai masak.</p>
      </div>

      <div className="grid gap-4">
        <div className="border-2 border-ink bg-white p-5 shadow-brutal">
          <p className="m-0 text-sm font-black uppercase tracking-[0.14em]">Zero overthinking</p>
          <p className="mb-0 mt-2 text-sm font-bold sm:text-base">Tidak perlu bingung mau masak apa. Cukup sebutkan bahanmu, lalu pilih ide yang paling cocok buat hari ini.</p>
        </div>
      </div>
    </section>
  );
}
