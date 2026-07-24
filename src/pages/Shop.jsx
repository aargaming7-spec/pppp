import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import products, { categories, collections } from '../data/products'
import ProductGrid from '../components/ProductGrid'
import FilterSidebar from '../components/FilterSidebar'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'best', label: 'Best Seller' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: [],
    collection: [],
    color: [],
    priceRange: null,
    inStockOnly: false,
  })
  const [sort, setSort] = useState('newest')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Sync with query params coming from navbar / category links
  useEffect(() => {
    const collectionParam = searchParams.get('collection')
    const filterParam = searchParams.get('filter')

    if (collectionParam) {
      setFilters((prev) => ({ ...prev, collection: [collectionParam] }))
    }
    if (filterParam === 'best') setSort('best')
    if (filterParam === 'new') setSort('newest')
  }, [searchParams])

  const filterParam = searchParams.get('filter')

  const filtered = useMemo(() => {
    let list = [...products]

    if (filterParam === 'sale') list = list.filter((p) => p.discountPrice)
    if (filterParam === 'new') list = list.filter((p) => p.isNewArrival)
    if (filterParam === 'best') list = list.filter((p) => p.isBestSeller)

    if (filters.category.length) list = list.filter((p) => filters.category.includes(p.category))
    if (filters.collection.length) list = list.filter((p) => filters.collection.includes(p.collection))
    if (filters.color.length) list = list.filter((p) => p.colors?.some((c) => filters.color.includes(c)))
    if (filters.priceRange) {
      list = list.filter((p) => {
        const price = p.discountPrice || p.price
        return price >= filters.priceRange.min && price < filters.priceRange.max
      })
    }
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0)

    switch (sort) {
      case 'best':
        list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller))
        break
      case 'price-asc':
        list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-desc':
        list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      default:
        list.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival))
    }

    return list
  }, [filters, sort, filterParam])

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8">
        <span className="eyebrow mb-2 block">Shop</span>
        <h1 className="font-display text-2xl md:text-3xl">Semua Produk</h1>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        <aside className="hidden md:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            collections={collections}
          />
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-ink/55">{filtered.length} produk</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 border border-line px-3 py-2 text-xs md:hidden"
              >
                <SlidersHorizontal size={14} /> Filter
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-line bg-paper px-3 py-2 text-xs outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={filtered} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-250 ${
          mobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFilterOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto bg-paper p-6 transition-transform duration-350 ease-out ${
            mobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm tracking-wide uppercase">Filter</p>
            <button onClick={() => setMobileFilterOpen(false)} aria-label="Tutup filter">
              <X size={20} />
            </button>
          </div>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            collections={collections}
          />
          <button onClick={() => setMobileFilterOpen(false)} className="btn-primary mt-8 w-full">
            Tampilkan {filtered.length} Produk
          </button>
        </div>
      </div>
    </div>
  )
}
