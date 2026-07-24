import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Minus, Plus } from 'lucide-react'
import products from '../data/products'
import { formatIDR } from '../utils/format'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import StarRating from '../components/StarRating'
import ProductGrid from '../components/ProductGrid'

const tabs = ['Detail Produk', 'Cara Perawatan', 'Pengiriman', 'Review']

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState(product?.colors?.[0] ?? null)
  const [size, setSize] = useState(product?.sizes?.[0] ?? null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState(0)

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ink/60">Produk tidak ditemukan.</p>
        <Link to="/shop" className="btn-outline mt-6 inline-flex">
          Kembali ke Shop
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 4)

  const wishlisted = isWishlisted(product.id)

  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-mist mb-3">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-16 overflow-hidden bg-mist border transition-colors duration-250 ${
                    activeImage === i ? 'border-ink' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow mb-2">{product.collection}</p>
          <h1 className="font-display text-2xl md:text-3xl mb-3">{product.name}</h1>
          <StarRating value={product.rating} className="mb-4" />

          <div className="flex items-center gap-3 mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-xl text-mauve-600">{formatIDR(product.discountPrice)}</span>
                <span className="text-sm text-ink/40 line-through">{formatIDR(product.price)}</span>
              </>
            ) : (
              <span className="text-xl">{formatIDR(product.price)}</span>
            )}
          </div>

          <p className="text-sm text-ink/65 leading-relaxed mb-8">{product.description}</p>

          {product.colors && (
            <div className="mb-6">
              <p className="text-xs tracking-wide uppercase text-ink/50 mb-2">Warna: {color}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`border px-3 py-1.5 text-xs transition-colors duration-250 ${
                      color === c ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mb-6">
              <p className="text-xs tracking-wide uppercase text-ink/50 mb-2">Ukuran: {size}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-9 w-9 border text-xs transition-colors duration-250 ${
                      size === s ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center border border-line">
              <button
                className="grid h-10 w-10 place-items-center hover:bg-mist"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Kurangi jumlah"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                className="grid h-10 w-10 place-items-center hover:bg-mist"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Tambah jumlah"
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="text-xs text-ink/45">{product.stock} stok tersedia</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => addToCart(product, { color, size, quantity })}
              className="btn-primary flex-1"
            >
              Add to Cart
            </button>
            <button className="btn-outline flex-1">Buy Now</button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wishlisted}
              aria-label="Tambah ke wishlist"
              className="grid h-12 w-12 shrink-0 place-items-center border border-line hover:border-ink transition-colors duration-250"
            >
              <Heart size={18} className={wishlisted ? 'fill-mauve-500 text-mauve-500' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-t border-line pt-8">
        <div className="flex flex-wrap gap-6 mb-6 border-b border-line">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`pb-3 text-sm transition-colors duration-250 ${
                activeTab === i ? 'text-ink border-b-2 border-ink' : 'text-ink/45'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-2xl text-sm text-ink/65 leading-relaxed">
          {activeTab === 0 && (
            <div className="space-y-2">
              <p><span className="text-ink">Material:</span> {product.material}</p>
              <p><span className="text-ink">Kategori:</span> {product.category} · {product.collection}</p>
            </div>
          )}
          {activeTab === 1 && (
            <p>Cuci dengan tangan menggunakan air dingin, hindari pemutih, jemur di tempat teduh, dan setrika suhu rendah bila diperlukan.</p>
          )}
          {activeTab === 2 && (
            <p>Pesanan diproses 1–2 hari kerja dan dikirim menggunakan ekspedisi rekanan ke seluruh Indonesia. Estimasi tiba 2–5 hari kerja tergantung lokasi.</p>
          )}
          {activeTab === 3 && (
            <p>Belum ada review untuk produk ini. Jadilah yang pertama memberikan ulasan setelah pembelian.</p>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <p className="eyebrow mb-3">Serupa</p>
          <h2 className="font-display text-2xl mb-8">Related Products</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  )
}
