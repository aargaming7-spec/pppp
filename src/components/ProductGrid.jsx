import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 4 }) {
  const colClass = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-ink/60">Tidak ada produk yang cocok dengan filter ini.</p>
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 ${colClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
