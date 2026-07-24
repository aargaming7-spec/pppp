# Alara — Hijab & Modest Fashion Store

Website e-commerce fashion (hijab & aksesoris) yang modern, minimalis, dan premium.
Dibangun sebagai static site dengan React + Vite + Tailwind CSS, siap di-hosting gratis
di GitHub Pages.

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- React Router (HashRouter — aman untuk GitHub Pages, tidak akan 404 saat refresh)
- Lucide React (icon)
- Cart & Wishlist tersimpan di `localStorage`, data produk statis di `src/data/products.js`

## Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build Production

```bash
npm run build
```

Hasil build ada di folder `dist/`. Cek dulu secara lokal dengan:

```bash
npm run preview
```

## Deploy ke GitHub Pages

### 1. Otomatis lewat GitHub Actions (direkomendasikan)

Workflow sudah disiapkan di `.github/workflows/deploy.yml`. Setiap push ke branch `main`
akan otomatis build dan deploy ke GitHub Pages.

1. Push project ini ke repository GitHub kamu.
2. Buka **Settings → Pages**.
3. Di **Build and deployment → Source**, pilih **GitHub Actions**.
4. Push ke `main` — cek progres di tab **Actions**.

### 2. Manual lewat `gh-pages`

```bash
npm run build
npm run deploy
```

Push folder `dist/` ke branch `gh-pages`. Di **Settings → Pages**, pilih source branch `gh-pages`.

## Catatan Penting

- **Base path**: `vite.config.js` pakai `base: './'` (relative) agar build tetap jalan baik
  di root domain maupun subpath repo (`https://username.github.io/nama-repo/`).
- **Routing**: Pakai `HashRouter` (URL `/#/shop`) supaya refresh di halaman mana pun tidak 404 —
  GitHub Pages tidak bisa melakukan server-side rewrite.
- **Gambar produk**: Masih placeholder dari `picsum.photos`. Ganti `src/data/products.js` dengan
  foto asli sebelum go-live.
- **Cart & Wishlist**: Berfungsi penuh dengan React state + `localStorage`, tanpa backend.

## Struktur Folder

```
src/
  assets/        # gambar statis
  components/    # Navbar, Footer, ProductCard, ProductGrid, Hero, CartDrawer, dst.
  pages/         # Home, Shop, ProductDetail, Cart, Wishlist, About, Contact, dst.
  data/          # products.js — 16 dummy produk
  context/       # CartContext, WishlistContext
  hooks/         # useLocalStorage
  utils/         # format.js (format Rupiah)
```

## Yang Perlu Dilengkapi Selanjutnya

- Foto produk & lifestyle asli (saat ini placeholder).
- Integrasi payment gateway / checkout sungguhan (tombol Checkout saat ini UI-only).
- Backend untuk akun pengguna sungguhan (halaman Account saat ini UI-only).
