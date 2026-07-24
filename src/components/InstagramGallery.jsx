import Reveal from './Reveal'
import { Camera } from 'lucide-react'

const shots = ['ig-1', 'ig-2', 'ig-3', 'ig-4', 'ig-5', 'ig-6']

export default function InstagramGallery() {
  return (
    <section className="container-page py-16 md:py-24">
      <Reveal className="mb-10 flex items-center justify-between">
        <div>
          <span className="eyebrow mb-3 block">Komunitas</span>
          <h2 className="font-display text-2xl md:text-3xl">@alara.official</h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 text-sm hover:text-mauve-600 transition-colors duration-250"
        >
          <Camera size={16} /> Ikuti Kami
        </a>
      </Reveal>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {shots.map((s) => (
          <a
            key={s}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="block aspect-square overflow-hidden bg-mist group"
          >
            <img
              src={`https://picsum.photos/seed/${s}/400/400`}
              alt="Foto komunitas Alara di Instagram"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  )
}
