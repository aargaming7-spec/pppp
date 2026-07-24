import { Link } from 'react-router-dom'
import { Camera, MessageCircle, Music2 } from 'lucide-react'

const columns = [
  {
    title: 'Tentang',
    links: [
      { label: 'Tentang Kami', to: '/about' },
      { label: 'Shop', to: '/shop' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Pengiriman', to: '/shipping' },
      { label: 'Return & Tukar Barang', to: '/returns' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-mist/50">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-lg tracking-widest2 uppercase mb-3">Alara</p>
          <p className="text-sm text-ink/55 max-w-[220px]">
            Hijab dan modest wear untuk perempuan yang menghargai detail dan kesederhanaan.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-ink/70 hover:text-mauve-600 transition-colors duration-250">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow mb-4">Ikuti Kami</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-mauve-600 transition-colors duration-250">
              <Camera size={18} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-mauve-600 transition-colors duration-250">
              <Music2 size={18} />
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-mauve-600 transition-colors duration-250">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-5 text-xs text-ink/45">
          © {new Date().getFullYear()} Alara. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
