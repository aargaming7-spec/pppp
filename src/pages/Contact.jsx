import { useState } from 'react'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container-page py-14 md:py-20">
      <span className="eyebrow mb-3 block">Contact</span>
      <h1 className="font-display text-2xl md:text-3xl mb-10">Hubungi Kami</h1>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin size={18} className="mt-0.5 text-mauve-500" />
            <p className="text-sm text-ink/70">Jl. Ciumbuleuit No. 12, Bandung, Jawa Barat</p>
          </div>
          <div className="flex items-start gap-4">
            <Mail size={18} className="mt-0.5 text-mauve-500" />
            <a href="mailto:hello@alara.co.id" className="text-sm text-ink/70 hover:text-mauve-600 transition-colors duration-250">
              hello@alara.co.id
            </a>
          </div>
          <div className="flex items-start gap-4">
            <MessageCircle size={18} className="mt-0.5 text-mauve-500" />
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-sm text-ink/70 hover:text-mauve-600 transition-colors duration-250">
              +62 812-3456-7890
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Nama" className="w-full border border-line px-4 py-3 text-sm outline-none focus-visible:border-ink" />
          <input required type="email" placeholder="Email" className="w-full border border-line px-4 py-3 text-sm outline-none focus-visible:border-ink" />
          <textarea required rows={5} placeholder="Pesan" className="w-full border border-line px-4 py-3 text-sm outline-none focus-visible:border-ink" />
          <button type="submit" className="btn-primary w-full">Kirim Pesan</button>
          {sent && <p className="text-xs text-ink/55">Terima kasih, pesan kamu sudah kami terima.</p>}
        </form>
      </div>
    </div>
  )
}
