import { useState } from 'react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="bg-ink text-paper">
      <Reveal className="container-page py-16 md:py-20 text-center">
        <h2 className="font-display text-2xl md:text-3xl mb-3">Dapatkan kabar koleksi terbaru</h2>
        <p className="text-paper/60 text-sm mb-8">Info rilis, restock, dan penawaran terbatas — tanpa spam.</p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md items-stretch">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Alamat email kamu"
            className="flex-1 border border-paper/25 bg-transparent px-4 py-3 text-sm placeholder:text-paper/40 outline-none focus-visible:outline-paper"
          />
          <button type="submit" className="bg-paper text-ink px-6 text-sm tracking-wide hover:bg-mauve-200 transition-colors duration-250">
            Subscribe
          </button>
        </form>
        {submitted && <p className="mt-3 text-xs text-paper/60">Terima kasih! Kamu akan menerima kabar terbaru dari kami.</p>}
      </Reveal>
    </section>
  )
}
