# Megaland Artha Sentosa – Website Company Profile

## Struktur File

```
megaland/
├── index.html        ← Halaman utama (semua section)
├── style.css         ← Semua styling (CSS Variables, Responsive)
├── script.js         ← Semua interaksi (Navbar, Animasi, Form, dll)
└── images/           ← Folder untuk gambar & video
    ├── hero-poster.jpg          (poster video hero – opsional)
    ├── hero.mp4                 (video background – opsional)
    ├── about-placeholder.jpg    (foto operasional)
    ├── project1.jpg             (foto proyek 1)
    ├── project2.jpg             (foto proyek 2)
    ├── project3.jpg             (foto proyek 3)
    ├── project4.jpg             (foto proyek 4)
    ├── project5.jpg             (foto proyek 5)
    └── project6.jpg             (foto proyek 6)
```

## Cara Menjalankan di VS Code

### Metode 1 – Live Server (Direkomendasikan)
1. Buka VS Code
2. Install ekstensi **"Live Server"** oleh Ritwick Dey
   (Cari di tab Extensions: Ctrl+Shift+X)
3. Klik kanan pada `index.html` → pilih **"Open with Live Server"**
4. Browser otomatis terbuka di `http://127.0.0.1:5500`

### Metode 2 – Buka Langsung
1. Klik dua kali file `index.html`
2. Browser akan membukanya langsung

---

## Cara Menambahkan Gambar

1. Siapkan foto/gambar proyek Anda
2. Rename sesuai nama file di atas (misal: `project1.jpg`)
3. Taruh di folder `/images/`
4. Website akan otomatis menampilkan gambar (menggantikan placeholder emoji)

## Cara Menambahkan Video Hero

1. Siapkan file video format `.mp4`
2. Rename menjadi `hero.mp4`, taruh di `/images/`
3. Buka `index.html`, cari komentar `<!-- Ganti src dengan file video asli Anda -->`
4. Uncomment baris `<source src="images/hero.mp4" type="video/mp4">`

## Kustomisasi

### Ganti Warna Utama
Buka `style.css`, cari `:root { ... }` di baris paling atas.
Ubah nilai variabel `--blue-500` untuk warna utama.

### Ganti Konten
Buka `index.html` dan cari section yang ingin diubah.
Setiap section diberi komentar yang jelas (NAVBAR, HERO, ABOUT, dst).

### Ganti Informasi Kontak
Cari section `<!-- CONTACT -->` di `index.html`.
