import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display text-2xl mb-4">Halaman tidak ditemukan</h1>
      <p className="text-ink/55 mb-8">Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>
      <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
    </div>
  )
}
