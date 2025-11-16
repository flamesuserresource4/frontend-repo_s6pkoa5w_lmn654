import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/CartContext'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import CartPage from './components/CartPage'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <main className="py-8">{children}</main>
      <footer className="mt-12 py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} ShopEase</footer>
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App
