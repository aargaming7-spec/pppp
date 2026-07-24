import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'
import ProductSection from '../components/ProductSection'
import PromoBanner from '../components/PromoBanner'
import WhyChooseUs from '../components/WhyChooseUs'
import InstagramGallery from '../components/InstagramGallery'
import Newsletter from '../components/Newsletter'
import products from '../data/products'

export default function Home() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8)
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8)

  return (
    <div>
      <Hero />
      <CategorySection />
      <ProductSection
        eyebrow="Paling Diminati"
        title="Best Seller"
        products={bestSellers}
        viewAllHref="/shop?filter=best"
      />
      <PromoBanner />
      <ProductSection
        eyebrow="Baru Datang"
        title="New Arrival"
        products={newArrivals}
        viewAllHref="/shop?filter=new"
      />
      <WhyChooseUs />
      <InstagramGallery />
      <Newsletter />
    </div>
  )
}
