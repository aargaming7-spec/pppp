import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchModal from './SearchModal'

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
