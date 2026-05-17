import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDemoStore } from '../context/DemoStore'
import '../styles/Checkout.css'

const WARRANTY_LABEL = { none: 'Không BH', basic: 'Cơ bản', standard: 'Tiêu chuẩn', premium: 'Cao cấp' }

const FLOW_STEPS = [
  { label: 'Đặt hàng',     key: 'placed' },
  { label: 'Seller duyệt', key: 'confirmed' },
  { label: 'Nhận đồ',      key: 'received' },
  { label: 'Đang thuê',    key: 'renting' },
  { label: 'Trả đồ',       key: 'returned' },
]

function OrderSuccess({ orderId, items, total }) {
  return (
    <div className="checkout-success">
      <div className="success-icon-wrap">
        <div className="success-icon">✓</div>
      </div>
      <h1 className="success-title">Đặt hàng thành công!</h1>
      <p className="success-order-id">Mã đơn: <strong>{orderId}</strong></p>

      <div className="success-timeline">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.key} className="timeline-step">
            <div className={`timeline-dot ${i === 0 ? 'dot-done' : i === 1 ? 'dot-pending' : 'dot-waiting'}`}>
              {i === 0 ? '✓' : i + 1}
            </div>
            <span className={`timeline-label ${i === 0 ? 'label-done' : i === 1 ? 'label-pending' : ''}`}>
              {step.label}
            </span>
            {i < FLOW_STEPS.length - 1 && <div className={`timeline-line ${i === 0 ? 'line-done' : ''}`} />}
          </div>
        ))}
      </div>

      <p className="success-note">
        Seller đang xem xét đơn hàng. Bạn sẽ nhận thông báo khi đơn được xác nhận.
      </p>

      <div className="success-order-summary">
        <h3 className="success-summary-title">Chi tiết đơn hàng</h3>
        {items.map(item => (
          <div key={item.cartKey} className="success-item-row">
            <div className="success-item-main">
              <span className="success-item-name">{item.name}</span>
              <div className="success-item-meta">
                <span>Size: {item.size}</span>
                <span>·</span>
                <span>{item.days} ngày</span>
                <span>·</span>
                <span>BH: {WARRANTY_LABEL[item.warranty]}</span>
              </div>
              {item.accessories?.length > 0 && (
                <div className="success-accessories">
                  Phụ kiện: {item.accessories.join(', ')}
                </div>
              )}
            </div>
            <span className="success-item-price">
              {((item.rentalPrice ?? 0) + (item.warrantyFee ?? 0)).toLocaleString('vi-VN')}đ
            </span>
          </div>
        ))}
        <div className="success-total-row">
          <span>Tổng thanh toán</span>
          <strong>{total.toLocaleString('vi-VN')}đ</strong>
        </div>
      </div>

      <div className="success-actions">
        <Link to="/orders" className="btn-view-orders">Xem đơn của tôi</Link>
        <Link to="/products" className="btn-continue-shopping">Tiếp tục mua sắm</Link>
      </div>
    </div>
  )
}

function Checkout() {
  const { cart, placeOrder, clearCart } = useDemoStore()
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', note: '',
    paymentMethod: 'cod',
  })
  const [placedOrderId, setPlacedOrderId] = useState(null)
  const [snapshotCart, setSnapshotCart] = useState([])
  const [snapshotTotal, setSnapshotTotal] = useState(0)

  const rentalTotal   = cart.reduce((s, i) => s + (i.rentalPrice  ?? 0), 0)
  const warrantyTotal = cart.reduce((s, i) => s + (i.warrantyFee  ?? 0), 0)
  const depositTotal  = cart.reduce((s, i) => s + (i.deposit      ?? 0), 0)
  const total = rentalTotal + warrantyTotal + depositTotal

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    const snapshot = [...cart]
    const currentTotal = snapshot.reduce((s, i) => s + ((i.rentalPrice ?? 0) + (i.warrantyFee ?? 0) + (i.deposit ?? 0)) * (i.quantity ?? 1), 0)
    const orderId = placeOrder({
      items: snapshot,
      costume: snapshot.map(i => i.name).join(' + '),
      price: snapshot[0]?.pricePerDay ?? 0,
      days: snapshot[0]?.days ?? 1,
      deposit: depositTotal,
      warranty: snapshot[0]?.warranty ?? 'none',
      size: snapshot[0]?.size ?? '',
      customer: formData.fullName || 'Khách hàng',
      phone: formData.phone || '---',
      address: formData.address || formData.city || '---',
      image: snapshot[0]?.image ?? 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=400&fit=crop',
    })
    setSnapshotCart(snapshot)
    setSnapshotTotal(currentTotal)
    clearCart()
    setPlacedOrderId(orderId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Giỏ trống, chưa order */
  if (!placedOrderId && cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng trống</h2>
          <p>Vui lòng thêm trang phục vào giỏ trước khi thanh toán.</p>
          <Link to="/products" className="btn-view-orders">← Xem sản phẩm</Link>
        </div>
      </div>
    )
  }

  if (placedOrderId) {
    return (
      <div className="checkout-page">
        <OrderSuccess orderId={placedOrderId} items={snapshotCart} total={snapshotTotal} />
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <span className="checkout-label">✦ Thanh Toán</span>
        <h1 className="checkout-title">Hoàn Tất Đơn Hàng</h1>
      </header>

      <form onSubmit={handleSubmit} className="checkout-container">
        {/* Thông tin liên hệ */}
        <div className="checkout-form-section">
          <div className="section-card">
            <h3 className="section-title">
              <span className="step-num">1</span>
              Thông Tin Liên Hệ
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Họ và Tên</label>
                <input type="text" name="fullName" required placeholder="Nguyễn Văn A"
                  value={formData.fullName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Số Điện Thoại</label>
                <input type="tel" name="phone" required placeholder="0901234567"
                  value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group full">
                <label>Email</label>
                <input type="email" name="email" required placeholder="example@gmail.com"
                  value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="form-group full">
                <label>Địa Chỉ Nhận Đồ</label>
                <input type="text" name="address" required placeholder="Số nhà, tên đường, phường/xã..."
                  value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Tỉnh / Thành Phố</label>
                <select name="city" value={formData.city} onChange={handleInputChange} required>
                  <option value="">Chọn tỉnh thành</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Ghi Chú (Tùy chọn)</label>
                <textarea name="note" rows="3" placeholder="Yêu cầu đặc biệt..."
                  value={formData.note} onChange={handleInputChange} />
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
                <input type="radio" name="paymentMethod" value="cod"
                  checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                <div className="payment-info">
                  <span className="payment-name">Thanh toán khi nhận đồ (COD)</span>
                  <span className="payment-desc">Bạn sẽ thanh toán tiền thuê và tiền cọc khi nhận trang phục.</span>
                </div>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'bank' ? 'active' : ''}`}>
                <input type="radio" name="paymentMethod" value="bank"
                  checked={formData.paymentMethod === 'bank'} onChange={handleInputChange} />
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
              {cart.map(item => (
                <div key={item.cartKey} className="mini-item">
                  <div>
                    <p className="mini-item-name">{item.name}</p>
                    <p className="mini-item-sub">
                      Size {item.size} · {item.days} ngày · BH {WARRANTY_LABEL[item.warranty]}
                    </p>
                    {item.accessories?.length > 0 && (
                      <p className="mini-item-acc">
                        Phụ kiện: {item.accessories.slice(0, 2).join(', ')}{item.accessories.length > 2 ? '...' : ''}
                      </p>
                    )}
                  </div>
                  <span className="mini-item-price">{(item.rentalPrice ?? 0).toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />
            <div className="summary-rows">
              <div className="summary-row">
                <span>Tiền thuê</span>
                <span>{rentalTotal.toLocaleString('vi-VN')}đ</span>
              </div>
              {warrantyTotal > 0 && (
                <div className="summary-row">
                  <span>Phí bảo hành</span>
                  <span>{warrantyTotal.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="summary-row">
                <span>Tiền cọc (hoàn khi trả)</span>
                <span>{depositTotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Tổng Thanh Toán</span>
                <span>{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <button type="submit" className="btn-place-order">
              Xác Nhận Đặt Hàng
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <p className="security-note">🔒 Thông tin thanh toán được bảo mật tuyệt đối.</p>
          </div>
        </aside>
      </form>
    </div>
  )
}

export default Checkout
