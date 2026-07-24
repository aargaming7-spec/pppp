import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatIDR } from '../utils/format'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="eyebrow mb-3">Keranjang</p>
        <h1 className="font-display text-2xl mb-4">Keranjang kamu masih kosong</h1>
        <p className="text-ink/55 mb-8">Yuk mulai jelajahi koleksi hijab dan aksesoris kami.</p>
        <Link to="/shop" className="btn-primary">
          Mulai Belanja
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-10 md:py-14">
      <span className="eyebrow mb-2 block">Keranjang</span>
      <h1 className="font-display text-2xl md:text-3xl mb-10">Keranjang Belanja</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        <ul className="divide-y divide-line">
          {items.map((it) => (
            <li key={it.key} className="flex gap-5 py-6">
              <img src={it.image} alt={it.name} className="h-28 w-24 object-cover bg-mist" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">{it.name}</p>
                    <p className="text-xs text-ink/50">{[it.color, it.size].filter(Boolean).join(' · ')}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(it.key)}
                    aria-label="Hapus dari keranjang"
                    className="text-ink/40 hover:text-mauve-600 transition-colors duration-250"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-line">
                    <button
                      className="grid h-8 w-8 place-items-center hover:bg-mist"
                      onClick={() => updateQuantity(it.key, it.quantity - 1)}
                      aria-label="Kurangi jumlah"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-9 text-center text-sm">{it.quantity}</span>
                    <button
                      className="grid h-8 w-8 place-items-center hover:bg-mist"
                      onClick={() => updateQuantity(it.key, it.quantity + 1)}
                      aria-label="Tambah jumlah"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="text-sm text-mauve-600">{formatIDR(it.price * it.quantity)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-line p-6">
          <p className="text-sm tracking-wide uppercase mb-5">Ringkasan Pesanan</p>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-ink/60">Subtotal</span>
            <span>{formatIDR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-5 pb-5 border-b border-line">
            <span className="text-ink/60">Pengiriman</span>
            <span className="text-ink/60">Dihitung saat checkout</span>
          </div>
          <div className="flex justify-between text-base mb-6">
            <span>Total</span>
            <span>{formatIDR(subtotal)}</span>
          </div>
          <button className="btn-primary w-full">Checkout</button>
          <Link to="/shop" className="mt-3 block text-center text-sm underline underline-offset-4 hover:text-mauve-600 transition-colors duration-250">
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </div>
  )
}
