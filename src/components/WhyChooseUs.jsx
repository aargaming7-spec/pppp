import { ShieldCheck, Truck, Gem, Headphones } from 'lucide-react'
import Reveal from './Reveal'

const points = [
  { icon: Gem, title: 'Premium Quality', desc: 'Bahan dipilih dan diuji langsung sebelum masuk koleksi.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Dikirim dari Bandung, sampai ke seluruh Indonesia.' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: 'Transaksi aman dengan berbagai metode pembayaran.' },
  { icon: Headphones, title: 'Customer Support', desc: 'Tim kami siap membantu lewat WhatsApp dan email.' },
]

export default function WhyChooseUs() {
  return (
    <section className="border-y border-line bg-mist/60">
      <div className="container-page py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 60} className="flex flex-col items-start gap-3">
            <p.icon size={22} strokeWidth={1.4} className="text-mauve-500" />
            <p className="text-sm">{p.title}</p>
            <p className="text-xs text-ink/55 leading-relaxed">{p.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
