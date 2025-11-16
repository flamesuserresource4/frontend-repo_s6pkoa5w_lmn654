import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: {}, // { [productId]: { product, qty } }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || initialState
    case 'ADD': {
      const { product, qty = 1 } = action
      const existing = state.items[product.id]
      const newQty = (existing?.qty || 0) + qty
      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: { product, qty: newQty },
        },
      }
    }
    case 'REMOVE': {
      const newItems = { ...state.items }
      delete newItems[action.id]
      return { ...state, items: newItems }
    }
    case 'SET_QTY': {
      const { id, qty } = action
      if (qty <= 0) {
        const newItems = { ...state.items }
        delete newItems[id]
        return { ...state, items: newItems }
      }
      if (!state.items[id]) return state
      return {
        ...state,
        items: { ...state.items, [id]: { ...state.items[id], qty } },
      }
    }
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart-state')
      if (raw) {
        const parsed = JSON.parse(raw)
        dispatch({ type: 'INIT', payload: parsed })
      }
    } catch {}
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem('cart-state', JSON.stringify(state))
    } catch {}
  }, [state])

  const value = useMemo(() => {
    const itemsArr = Object.values(state.items)
    const totalItems = itemsArr.reduce((sum, it) => sum + it.qty, 0)
    const totalPrice = itemsArr.reduce((sum, it) => sum + it.qty * (it.product.price || 0), 0)

    return {
      items: state.items,
      itemsArr,
      totalItems,
      totalPrice,
      addToCart: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
