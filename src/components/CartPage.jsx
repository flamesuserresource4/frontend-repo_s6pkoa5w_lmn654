import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

export default function CartPage() {
  const { itemsArr, totalItems, totalPrice, setQty, removeFromCart, clear } = useCart()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

      {itemsArr.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Browse products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {itemsArr.map(({ product, qty }) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
                <img src={product.image_url} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-500">${product.price?.toFixed(2)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-1 border rounded">-</button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(product.id, parseInt(e.target.value || '1', 10))}
                      className="w-16 text-center border rounded py-1"
                    />
                    <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-1 border rounded">+</button>
                    <button onClick={() => removeFromCart(product.id)} className="ml-3 text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 h-max">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="flex justify-between text-gray-700">
              <span>Items</span>
              <span>{totalItems}</span>
            </p>
            <p className="flex justify-between text-gray-900 font-semibold mt-2">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
            <button disabled className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg opacity-70 cursor-not-allowed">
              Checkout (coming soon)
            </button>
            <button onClick={clear} className="mt-3 w-full px-4 py-2 border rounded-lg">
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
