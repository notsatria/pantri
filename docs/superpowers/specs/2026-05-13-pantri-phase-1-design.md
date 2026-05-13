# Pantri Phase 1 Design

Tanggal: 2026-05-13
Status: Draft for review
Project: pantri

## 1. Summary

`pantri` adalah aplikasi web frontend-first yang membantu pengguna menemukan ide masakan dari bahan yang tersedia. Phase 1 berfokus pada flow utama end-to-end dengan data mock, tanpa integrasi API nyata dan tanpa persistence, agar produk bisa cepat divisualisasikan, diuji, dan direview.

Phase 1 mengganti branding `DapurKita` menjadi `pantri` dan me-refresh microcopy agar terasa lebih modern, sambil mempertahankan inti produk dari PRD: ingredient-driven recipe discovery, gaya visual neobrutalism, dan pengalaman yang ringan tanpa login.

## 2. Goals

Phase 1 harus:

- menghadirkan halaman utama yang terasa seperti produk nyata, bukan prototype setengah jadi
- memungkinkan pengguna memilih jenis masakan, menambah bahan, dan memicu pencarian resep
- menampilkan loading, hasil resep mock, detail resep, dan error state
- membangun fondasi struktur kode yang siap disambungkan ke localStorage dan Groq pada phase berikutnya

Phase 1 belum mencakup:

- integrasi Groq API nyata
- penyimpanan resep
- routing ke halaman resep tersimpan
- autentikasi atau backend

## 3. Product Scope

Flow utama phase 1:

1. Pengguna membuka halaman `pantri`
2. Pengguna melihat hero section dengan headline dan supporting copy baru
3. Pengguna memilih cuisine, default `Indonesia`
4. Pengguna menambah satu atau lebih bahan
5. Pengguna menekan CTA pencarian
6. UI menampilkan loading skeleton
7. UI menampilkan 3 sampai 5 resep mock
8. Pengguna membuka detail salah satu resep
9. Pengguna menutup detail dan bisa mengulang pencarian

Edge cases yang harus ditangani:

- CTA tidak aktif bila belum ada bahan
- bahan duplikat diabaikan
- jumlah bahan dibatasi 20 item
- request mock dapat gagal untuk menampilkan error banner
- modal detail dapat ditutup dengan tombol, backdrop, atau `Escape`

## 4. UX Direction

Bahasa visual mengikuti PRD: neobrutalism dengan border hitam tebal, shadow offset, warna kontras, dan tipografi tegas. UI harus mobile-first dan tetap nyaman pada desktop.

Karakter UX utama:

- cepat dipahami sejak pertama masuk
- terasa playful tapi tetap rapi
- fokus pada satu pekerjaan utama: ubah bahan menjadi inspirasi resep

Arahan copy phase 1:

- gunakan nama `pantri` secara konsisten
- refresh headline dan supporting copy agar lebih modern dan ringan
- pertahankan konteks lokal Indonesia tanpa terdengar terlalu formal
- gunakan label aksi yang jelas dan langsung

## 5. Technical Approach

Phase 1 memakai pendekatan `feature-ready frontend`.

Prinsipnya:

- UI dibangun seolah sudah siap untuk data nyata
- data recipe sementara datang dari mock async service
- kontrak data dibuat mirip dengan bentuk response yang nantinya akan dipakai saat integrasi AI
- perpindahan ke phase berikutnya seharusnya cukup mengganti adapter/service, bukan membongkar UI

Stack:

- React + Vite
- Tailwind CSS
- React Router sudah boleh dipasang dari awal hanya jika dibutuhkan untuk kesiapan phase berikutnya, tetapi phase 1 cukup memiliki satu route utama
- state lokal React tanpa library state tambahan

## 6. App Structure

Struktur direktori target:

```text
src/
  components/
  constants/
  hooks/
  mocks/
  pages/
  utils/
  App.jsx
  main.jsx
```

Pembagian tanggung jawab:

- `pages` menyusun layout halaman
- `components` berisi building blocks UI
- `hooks` memegang stateful flow seperti pencarian resep mock
- `mocks` menyimpan dataset dan async simulator
- `constants` menyimpan cuisine options dan UI constants
- `utils` menyimpan helper validasi dan normalisasi input

## 7. Components

Komponen utama:

- `HomePage`
- `HeroSection`
- `CuisineSelect`
- `IngredientComposer`
- `IngredientChipList`
- `SearchButton`
- `RecipeSkeletonList`
- `RecipeGrid`
- `RecipeCard`
- `RecipeDetailModal`
- `ErrorBanner`

Kontrak ringkas:

- `HomePage` mengorkestrasi state dan layout keseluruhan
- `IngredientComposer` menerima daftar bahan saat ini dan callback add/remove
- `SearchButton` hanya menerima state `disabled` dan `loading`
- `RecipeGrid` menerima daftar resep dan callback untuk membuka detail
- `RecipeDetailModal` menerima recipe aktif dan state open/close

## 8. Data Model

Model ingredient:

```js
{
  id: string,
  name: string
}
```

Model recipe phase 1:

```js
{
  id: string,
  name: string,
  cuisine: string,
  duration: string,
  difficulty: "Mudah" | "Sedang" | "Sulit",
  ingredients: string[],
  steps: string[],
  tips?: string,
  summary: string
}
```

Search state:

```js
{
  selectedCuisine: string,
  ingredients: Ingredient[],
  status: "idle" | "loading" | "success" | "error",
  recipes: Recipe[],
  errorMessage: string | null,
  selectedRecipe: Recipe | null
}
```

## 9. Data Flow

1. Pengguna memilih cuisine
2. Pengguna menambah bahan
3. Input dinormalisasi dan dicek duplikasinya
4. Saat CTA diklik, app memanggil async mock service
5. State berubah ke `loading`
6. Skeleton tampil selama request berjalan
7. Bila sukses, service mengembalikan daftar resep mock sesuai cuisine
8. State berubah ke `success` dan resep ditampilkan
9. Bila gagal, state berubah ke `error` dan banner tampil
10. Klik kartu atau tombol detail membuka modal resep

## 10. Error Handling

Validasi input:

- trim whitespace
- abaikan string kosong
- normalisasi perbandingan untuk mencegah duplikat sederhana
- batasi hingga 20 bahan

Error UI:

- empty input: tidak menambah item
- duplicate ingredient: diabaikan tanpa memecah flow
- mock timeout/failure: tampilkan banner dengan tombol retry
- modal tanpa recipe aktif: tidak dirender

Keputusan UX:

- untuk phase 1, duplicate ingredient tidak perlu memunculkan toast
- error pencarian perlu terlihat jelas dan tetap menjaga context bahan yang sudah dimasukkan

## 11. Accessibility

Baseline aksesibilitas phase 1:

- semua tombol memiliki label yang jelas
- input bisa dipakai dengan keyboard penuh
- tombol tambah mendukung `Enter`
- modal mendukung `Escape`
- focus management minimum: fokus berpindah ke modal saat dibuka dan kembali ke pemicu saat ditutup jika feasible dalam scope phase 1
- warna dan teks harus menjaga kontras tinggi sesuai arah PRD

## 12. Testing Strategy

Prioritas test:

- unit test helper ingredient normalization/validation
- unit test hook atau service mock untuk state `loading`, `success`, `error`
- component test untuk render empty, loading, success, dan error
- interaction smoke test untuk tambah bahan, cari resep, buka detail

Jika waktu implementation phase 1 terbatas, prioritas minimum adalah util validation dan satu interaction smoke test flow utama.

## 13. Delivery Phases

### Phase 1

Frontend flow utama dengan mock data:

- hero dan branding `pantri`
- cuisine select
- ingredient input dan chip management
- CTA search
- skeleton
- recipe cards
- recipe detail modal
- error state

### Phase 2

Persistence dan navigasi:

- localStorage saved recipes
- halaman `/saved`
- tindakan simpan, hapus satu, hapus semua

### Phase 3

AI integration:

- Groq API integration
- prompt builder
- response parsing dan guarding
- real retry/error messaging

### Phase 4

Production polish:

- responsive refinement
- accessibility hardening
- performance tuning
- deploy readiness

## 14. Implementation Notes

- nama produk harus `pantri`, bukan `DapurKita`
- copy boleh terinspirasi dari PRD tetapi harus ditulis ulang agar terasa sebagai brand baru
- struktur kode sebaiknya tidak menanam asumsi mock terlalu dalam pada komponen presentasional
- phase 1 harus cukup bersih sehingga phase 2 dan 3 tidak membutuhkan refactor besar

## 15. Risks And Mitigations

- Risiko: struktur terlalu sederhana sehingga phase 2 dan 3 butuh bongkar ulang
  Mitigasi: gunakan mock service dan state contract yang menyerupai data nyata

- Risiko: neobrutalism berlebihan mengganggu usability mobile
  Mitigasi: pertahankan visual kuat, tetapi spacing dan hierarchy tetap rapi

- Risiko: modal detail menjadi satu-satunya cara membaca langkah lengkap dan terasa berat di mobile
  Mitigasi: desain modal harus sederhana, scrollable, dan mudah ditutup

## 16. Open Decisions Locked For This Spec

Keputusan yang sudah disetujui:

- pendekatan `frontend dulu`
- pengerjaan dibagi per phase
- phase 1 fokus pada flow utama sampai hasil mock
- branding menggunakan `pantri` dengan refresh copy
- implementasi awal mengikuti pendekatan `feature-ready frontend`

## 17. Repo Notes

Workspace `pantri` saat ini belum berupa git repository. Karena itu, langkah commit yang biasanya menjadi bagian workflow spec belum bisa dijalankan dari workspace ini sampai repository diinisialisasi atau project dipindahkan ke repo yang aktif.
