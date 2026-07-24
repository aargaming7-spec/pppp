import { Link } from 'react-router-dom'
import products from '../data/products'
import { useWishlist } from '../context/WishlistContext'
import ProductGrid from '../components/ProductGrid'

export default function Wishlist() {
  const { ids } = useWishlist()
  const wishlisted = products.filter((p) => ids.includes(p.id))

  return (
    <div className="container-page py-10 md:py-14">
      <span className="eyebrow mb-2 block">Wishlist</span>
      <h1 className="font-display text-2xl md:text-3xl mb-10">Produk Favorit Kamu</h1>

      {wishlisted.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-ink/55 mb-8">Belum ada produk di wishlist kamu.</p>
          <Link to="/shop" className="btn-primary">Jelajahi Produk</Link>
        </div>
      ) : (
        <ProductGrid products={wishlisted} />
      )}
    </div>
  )
}
