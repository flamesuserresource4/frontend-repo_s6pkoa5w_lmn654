import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from './CartContext'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE}/api/products/${id}`)
        if (!res.ok) throw new Error('Failed to load product')
        const data = await res.json()
        setProduct(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-10">Loading...</div>
  if (error) return <div className="max-w-6xl mx-auto px-4 py-10 text-red-600">{error}</div>
  if (!product) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image_url || 'https://via.placeholder.com/600x450?text=Product'}
            alt={product.title}
            className="w-full h-auto rounded-xl border border-gray-200"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-2xl font-extrabold text-blue-600">${product.price?.toFixed(2)}</p>
          {product.brand && (
            <p className="mt-1 text-sm text-gray-500">Brand: {product.brand}</p>
          )}
          {product.category && (
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addToCart(product, 1)}
              className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to cart
            </button>
            <Link
              to="/cart"
              className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Go to cart
            </Link>
          </div>

          <div className="mt-8">
            <Link to="/" className="text-blue-600 hover:underline">← Back to products</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
