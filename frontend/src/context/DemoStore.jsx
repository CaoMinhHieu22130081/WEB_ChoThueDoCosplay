import { createContext, useContext, useState } from 'react'

const DemoCtx = createContext(null)

/* ── Đơn hàng có sẵn (đã tồn tại trước demo) ── */
const SEED_ORDERS = [
  {
    id: 'ORD-2026-001',
    items: [{ name: 'Nezuko Kamado', price: 120000 }],
    costume: 'Nezuko Kamado',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=400&fit=crop',
    rentFrom: '2026-04-10', rentTo: '2026-04-14',
    price: 120000, days: 4, deposit: 200000,
    warranty: 'standard', size: 'M',
    customer: 'Trần Hà My', phone: '0912 345 678',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
    status: 'Đang thuê', statusKey: 'active',
  },
  {
    id: 'ORD-2026-002',
    items: [{ name: 'Sailor Moon', price: 150000 }],
    costume: 'Sailor Moon',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop',
    rentFrom: '2026-04-08', rentTo: '2026-04-13',
    price: 150000, days: 5, deposit: 250000,
    warranty: 'none', size: 'S',
    customer: 'Nguyễn Thảo Vy', phone: '0987 654 321',
    address: '88 Lê Lợi, Q.3, TP.HCM',
    status: 'Chờ trả đồ', statusKey: 'waiting_return',
  },
]

/* ── Sản phẩm seller đã đăng (có sẵn) ── */
const SEED_PRODUCTS = []

export function DemoProvider({ children }) {
  const [orders, setOrders] = useState(SEED_ORDERS)
  const [sellerProducts, setSellerProducts] = useState(SEED_PRODUCTS)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartKey: `${item.productId}-${Date.now()}`, quantity: 1 }])
  }
  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(i => i.cartKey !== cartKey))
  }
  const updateCartQty = (cartKey, qty) => {
    setCart(prev => prev.map(i => i.cartKey === cartKey ? { ...i, quantity: Math.max(1, qty) } : i))
  }
  const clearCart = () => setCart([])

  /* Customer đặt hàng */
  const placeOrder = (data) => {
    const idx = orders.length + 1
    const id = `ORD-2026-${String(idx + 2).padStart(3, '0')}`
    const today = new Date()
    const returnDate = new Date(today)
    returnDate.setDate(today.getDate() + (data.days ?? 3))

    const newOrder = {
      id,
      ...data,
      rentFrom: today.toISOString().split('T')[0],
      rentTo: returnDate.toISOString().split('T')[0],
      status: 'Chờ xác nhận',
      statusKey: 'pending_confirm',
      createdAt: new Date().toISOString(),
    }
    setOrders(prev => [newOrder, ...prev])
    return id
  }

  /* Seller duyệt đơn */
  const approveOrder = (orderId) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? { ...o, status: 'Đã xác nhận', statusKey: 'confirmed' }
        : o
    ))
  }

  /* Seller từ chối đơn */
  const rejectOrder = (orderId) => {
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? { ...o, status: 'Đã từ chối', statusKey: 'rejected' }
        : o
    ))
  }

  /* Seller đăng trang phục */
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `SP-${Date.now()}`,
      addedAt: new Date().toISOString(),
      quantity: 1,
      status: 'available',
    }
    setSellerProducts(prev => [newProduct, ...prev])
    return newProduct.id
  }

  return (
    <DemoCtx.Provider value={{ orders, placeOrder, approveOrder, rejectOrder, sellerProducts, addProduct, cart, addToCart, removeFromCart, updateCartQty, clearCart }}>
      {children}
    </DemoCtx.Provider>
  )
}

export const useDemoStore = () => useContext(DemoCtx)
