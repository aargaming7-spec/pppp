import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import ProductGrid from './ProductGrid'

export default function ProductSection({ eyebrow, title, products, viewAllHref }) {
  return (
    <section className="container-page py-16 md:py-24">
      <Reveal className="mb-10 flex items-end justify-between">
        <div>
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
        </div>
        {viewAllHref && (
          <Link to={viewAllHref} className="hidden sm:block text-sm underline underline-offset-4 hover:text-mauve-600 transition-colors duration-250">
            Lihat Semua
          </Link>
        )}
      </Reveal>
      <ProductGrid products={products} />
    </section>
  )
}
