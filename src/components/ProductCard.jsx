import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x300?text=Product'}
          alt={product.title}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product, 1)}
            className="px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
