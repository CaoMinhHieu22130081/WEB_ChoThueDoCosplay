import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    note: '',
    paymentMethod: 'cod'
  })

  // Giả lập dữ liệu từ giỏ hàng
  const cartItems = [
    { id: 1, name: 'Naruto Uzumaki', price: 150000, quantity: 1 },
    { id: 5, name: 'Elden Ring Knight', price: 200000, quantity: 1 }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deposit = subtotal * 0.5
  const total = subtotal + deposit

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Giả lập xử lý thanh toán
    console.log('Order submitted:', { formData, cartItems, total })
    alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
    navigate('/')
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <span className="checkout-label">✦ Thanh Toán</span>
        <h1 className="checkout-title">Hoàn Tất Đơn Hàng</h1>
      </header>

      <form onSubmit={handleSubmit} className="checkout-container">
        {/* Thông tin giao hàng */}
        <div className="checkout-form-section">
          <div className="section-card">
            <h3 className="section-title">
              <span className="step-num">1</span>
              Thông Tin Liên Hệ
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Họ và Tên</label>
                <input 
                  type="text" 
                  name="fullName"
                  required 
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Số Điện Thoại</label>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  placeholder="0901234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full">
                <label>Địa Chỉ Nhận Đồ</label>
                <input 
                  type="text" 
                  name="address"
                  required 
                  placeholder="Số nhà, tên đường, phường/xã..."
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Tỉnh / Thành Phố</label>
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn tỉnh thành</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Ghi Chú Đơn Hàng (Tùy chọn)</label>
                <textarea 
                  name="note" 
                  rows="3" 
                  placeholder="Yêu cầu đặc biệt về thời gian, phụ kiện kèm theo..."
                  value={formData.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="section-card mt-2">
            <h3 className="section-title">
              <span className="step-num">2</span>
              Phương Thức Thanh Toán
            </h3>
            <div className="payment-options">
              <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <div className="payment-info">
                  <span className="payment-name">Thanh toán khi nhận đồ (COD)</span>
                  <span className="payment-desc">Bạn sẽ thanh toán tiền thuê và tiền cọc khi nhận trang phục.</span>
                </div>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'bank' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={handleInputChange}
                />
                <div className="payment-info">
                  <span className="payment-name">Chuyển khoản ngân hàng</span>
                  <span className="payment-desc">Nhận thông tin tài khoản để chuyển khoản sau khi đặt hàng.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <aside className="checkout-summary">
          <div className="summary-card">
            <h3 className="summary-title">Đơn Hàng Của Bạn</h3>
            <div className="order-items-mini">
              {cartItems.map(item => (
                <div key={item.id} className="mini-item">
                  <span className="mini-item-name">{item.name} x {item.quantity}</span>
                  <span className="mini-item-price">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                </div>
              ))}
            </div>
            
            <div className="summary-divider" />
            
            <div className="summary-rows">
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="summary-row">
                <span>Tiền cọc (Hoàn lại khi trả đồ)</span>
                <span>{deposit.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Tổng Thanh Toán</span>
                <span>{total.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <button type="submit" className="btn-place-order">
              Xác Nhận Đặt Hàng
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <p className="security-note">
              🔒 Thông tin thanh toán của bạn được bảo mật tuyệt đối.
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}

export default Checkout
