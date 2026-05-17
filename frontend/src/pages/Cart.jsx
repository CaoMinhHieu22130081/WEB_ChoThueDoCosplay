import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Cart.css'

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Naruto Uzumaki',
      category: 'Anime',
      price: 150000,
      quantity: 1,
      image: 'https://myjapanclothes.com/cdn/shop/files/naruto-uzumaki-cosplay_1_grande.jpg?v=1700672027'
    },
    {
      id: 5,
      name: 'Elden Ring Knight',
      category: 'Game',
      price: 200000,
      quantity: 1,
      image: 'https://i.redd.it/my-carian-knights-cosplay-v0-r51emmgjx98e1.jpg?width=1152&format=pjpg&auto=webp&s=8c999b11e10a34df0bd31e9853df2377af964364'
    }
  ])

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deposit = subtotal * 0.5 // Giả sử tiền cọc là 50%
  const total = subtotal + deposit

  return (
    <div className="cart-page">
      <header className="cart-header">
        <span className="cart-label">✦ Giỏ Hàng Của Bạn</span>
        <h1 className="cart-title">Chi Tiết Đơn Hàng</h1>
      </header>

      <div className="cart-container">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <span className="item-category">{item.category}</span>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{item.price.toLocaleString('vi-VN')} đ / ngày</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-selector">
                      <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="btn-remove">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <div className="summary-card">
                <h3 className="summary-title">Tóm Tắt Thanh Toán</h3>
                <div className="summary-row">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="summary-row">
                  <span>Tiền cọc (50%)</span>
                  <span>{deposit.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <span>{total.toLocaleString('vi-VN')} đ</span>
                </div>
                <Link to="/checkout" className="btn-checkout">
                  Tiến Hành Thanh Toán
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/products" className="btn-continue">
                  ← Tiếp tục chọn đồ
                </Link>
              </div>
            </aside>
          </>
        ) : (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Giỏ hàng còn trống</h2>
            <p>Hãy chọn cho mình những bộ trang phục thật ấn tượng nhé!</p>
            <Link to="/products" className="btn-hero-primary">
              Khám Phá Sản Phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
