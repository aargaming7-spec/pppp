import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function PromoBanner() {
  return (
    <section className="container-page py-4 md:py-6">
      <Reveal className="relative overflow-hidden bg-mist">
        <div className="grid md:grid-cols-2 items-center">
          <div className="aspect-[16/9] md:aspect-[4/3]">
            <img
              src="https://picsum.photos/seed/promo-campaign/900/700"
              alt="Kampanye koleksi pashmina Alara"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-8 py-10 md:px-14">
            <span className="eyebrow mb-4 block">Terbatas</span>
            <h3 className="font-display text-2xl md:text-3xl max-w-xs mb-4">
              Pashmina pilihan, harga lebih baik minggu ini.
            </h3>
            <Link to="/shop?filter=sale" className="btn-outline">
              Lihat Koleksi
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
