import { Link, NavLink } from 'react-router-dom'
import { useCart } from './CartContext'

export default function Navbar() {
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-gray-900">
          ShopEase
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}`
            }
          >
            Cart
            <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold rounded-full bg-blue-600 text-white w-5 h-5">
              {totalItems}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
