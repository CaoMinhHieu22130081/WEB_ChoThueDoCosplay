import { useState } from 'react'
import { useDemoStore } from '../context/DemoStore'
import '../styles/Schedule.css'

const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

const calendarDays = [
  { day: 31, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3, status: 'pickup' },
  { day: 4 },
  { day: 5, status: 'due' },
  { day: 6 },
  { day: 7 },
  { day: 8, status: 'booked' },
  { day: 9 },
  { day: 10, status: 'booked' },
  { day: 11 },
  { day: 12, status: 'return' },
  { day: 13 },
  { day: 14 },
  { day: 15, status: 'pickup' },
  { day: 16 },
  { day: 17 },
  { day: 18, status: 'due' },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22, status: 'booked' },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26, status: 'return' },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
  { day: 1, muted: true },
  { day: 2, muted: true },
]

const CONDITION_CHECKS = [
  'Không có vết bẩn cứng đầu',
  'Không bị rách hoặc sờn vải',
  'Đầy đủ phụ kiện đi kèm',
  'Không bị phai màu hoặc ố vàng',
  'Khóa / nút / dây đai còn nguyên',
]

/* Gói bảo hành — đồng bộ với ProductDetail */
const WARRANTY_META = {
  none:     { label: 'Không bảo hành', color: 'wbadge-none' },
  basic:    { label: 'Cơ bản',         color: 'wbadge-basic' },
  standard: { label: 'Tiêu chuẩn',    color: 'wbadge-standard' },
  premium:  { label: 'Cao cấp',        color: 'wbadge-premium' },
}

/*
  Bảng tính % hoàn cọc đề xuất dựa trên:
    - warranty: none / basic / standard / premium
    - uncheckedCount: số hạng mục CHƯA tick (0 = hoàn hảo, 5 = toàn bộ hỏng)
*/
function calcSuggestedRefund(warranty, uncheckedCount) {
  if (uncheckedCount === 0) return 100
  const table = {
    none:     [100, 40, 20,  5,  0,  0],
    basic:    [100, 80, 60, 40, 20,  5],
    standard: [100, 90, 75, 60, 40, 20],
    premium:  [100, 100, 90, 80, 70, 50],
  }
  const row = table[warranty] ?? table.none
  return row[Math.min(uncheckedCount, 5)]
}

const INITIAL_BOOKINGS = [
  {
    id: 'BK-2405-01',
    costume: 'Nezuko Kamado',
    customer: 'Lê Thảo Vy',
    phone: '0912 345 678',
    time: '09:00 - 11:00',
    date: '05/04/2026',
    deposit: 250000,
    warranty: 'standard',
    status: 'Đang chờ trả đồ',
    statusKey: 'waiting_return',
  },
  {
    id: 'BK-2405-02',
    costume: 'Spider-Man',
    customer: 'Trần Minh Khang',
    phone: '0987 654 321',
    time: '13:30 - 15:00',
    date: '05/04/2026',
    deposit: 300000,
    warranty: 'none',
    status: 'Đã xác nhận',
    statusKey: 'confirmed',
  },
  {
    id: 'BK-2405-03',
    costume: 'Sailor Moon',
    customer: 'Nguyễn Hà My',
    phone: '0909 112 233',
    time: '16:00 - 18:30',
    date: '06/04/2026',
    deposit: 200000,
    warranty: 'premium',
    status: 'Sắp nhận đồ',
    statusKey: 'pickup_soon',
  },
  {
    id: 'BK-2405-04',
    costume: 'Genshin Raiden',
    customer: 'Phạm Hoàng Long',
    phone: '0933 445 566',
    time: '19:00 - 21:00',
    date: '06/04/2026',
    deposit: 350000,
    warranty: 'basic',
    status: 'Chờ duyệt',
    statusKey: 'pending',
  },
]

const upcomingReturns = [
  { costume: 'Demon Slayer Tanjiro', returnTime: 'Hôm nay - 17:00', branch: 'Chi nhánh Q.1', priority: 'Cao' },
  { costume: 'Elsa Deluxe', returnTime: 'Hôm nay - 18:30', branch: 'Chi nhánh Q.3', priority: 'Cao' },
  { costume: 'Sasuke Uchiha', returnTime: 'Mai - 10:00', branch: 'Chi nhánh Q.1', priority: 'Trung bình' },
]

function CalendarDay({ item }) {
  const className = [
    'calendar-day',
    item.muted ? 'muted' : '',
    item.status ? item.status : '',
  ].join(' ').trim()

  const label =
    item.status === 'pickup' ? 'Nhận'
    : item.status === 'return' ? 'Trả'
    : item.status === 'due' ? 'Gấp'
    : ''

  return (
    <div className={className}>
      <span className="calendar-date">{item.day}</span>
      {label && <span className="calendar-pill">{label}</span>}
    </div>
  )
}

/* ─── Modal kiểm tra tình trạng + xác nhận trả đồ ─── */
function ReturnModal({ booking, onClose, onConfirm }) {
  const [checks, setChecks] = useState(
    Object.fromEntries(CONDITION_CHECKS.map(c => [c, false]))
  )
  const [damage, setDamage] = useState('')

  const toggleCheck = (label) => {
    setChecks(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const uncheckedCount = Object.values(checks).filter(v => !v).length
  const suggestedPct   = calcSuggestedRefund(booking.warranty, uncheckedCount)
  const refundAmount   = Math.round(booking.deposit * suggestedPct / 100)
  const keepAmount     = booking.deposit - refundAmount
  const warrantyInfo   = WARRANTY_META[booking.warranty] ?? WARRANTY_META.none

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Kiểm tra tình trạng trả đồ</h2>
            <p className="modal-sub">{booking.costume} · {booking.customer} · {booking.id}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Gói bảo hành của khách */}
        <div className="modal-warranty-row">
          <span className="modal-warranty-label">Gói bảo hành khách đã mua:</span>
          <span className={`warranty-badge ${warrantyInfo.color}`}>{warrantyInfo.label}</span>
        </div>

        {/* Checklist tình trạng */}
        <div className="modal-section">
          <h3 className="modal-section-title">Checklist tình trạng trang phục</h3>
          <div className="condition-list">
            {CONDITION_CHECKS.map(label => (
              <label key={label} className="condition-item">
                <input
                  type="checkbox"
                  checked={checks[label]}
                  onChange={() => toggleCheck(label)}
                />
                <span className={checks[label] ? 'cond-ok' : ''}>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ghi nhận hư hỏng */}
        <div className="modal-section">
          <h3 className="modal-section-title">Ghi nhận hư hỏng (nếu có)</h3>
          <textarea
            className="damage-note"
            rows="3"
            placeholder="Mô tả tình trạng hư hỏng, mất phụ kiện... Để trống nếu không có vấn đề."
            value={damage}
            onChange={e => setDamage(e.target.value)}
          />
        </div>

        {/* Đề xuất hoàn cọc — tự tính theo gói + mức hư hỏng */}
        <div className="modal-section">
          <h3 className="modal-section-title">
            Đề xuất xử lý tiền cọc
            <span className="deposit-badge">{booking.deposit.toLocaleString('vi-VN')}đ</span>
          </h3>

          <div className="refund-result">
            <div className="refund-result-pct">
              <span className="refund-pct-value">{suggestedPct}%</span>
              <span className="refund-pct-label">tỉ lệ hoàn cọc đề xuất</span>
            </div>
            <div className="refund-result-amounts">
              <div className="refund-amount-row refund-green">
                <span>Hoàn lại khách</span>
                <strong>{refundAmount.toLocaleString('vi-VN')}đ</strong>
              </div>
              <div className="refund-amount-row refund-red">
                <span>Khấu trừ</span>
                <strong>{keepAmount.toLocaleString('vi-VN')}đ</strong>
              </div>
            </div>
          </div>

          {uncheckedCount === 0 && (
            <p className="modal-hint-ok">✅ Trang phục nguyên vẹn — hoàn 100% cọc theo tiêu chuẩn.</p>
          )}
          {uncheckedCount > 0 && booking.warranty === 'none' && (
            <p className="modal-warning">⚠️ Khách không mua bảo hành — mức khấu trừ theo thiệt hại thực tế.</p>
          )}
          {uncheckedCount > 0 && booking.warranty !== 'none' && (
            <p className="modal-hint-warranty">
              🛡️ Gói <strong>{warrantyInfo.label}</strong> đã được áp dụng — mức hoàn cọc cao hơn so với không bảo hành.
            </p>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onClose}>Hủy</button>
          <button
            className="btn-modal-confirm"
            onClick={() => onConfirm({ checks, damage, suggestedPct, refundAmount })}
          >
            Xác nhận trả đồ · Hoàn {refundAmount.toLocaleString('vi-VN')}đ
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Toast thông báo ─── */
function Toast({ message, onDone }) {
  return (
    <div className="schedule-toast" onAnimationEnd={onDone}>
      ✅ {message}
    </div>
  )
}

function BookingRow({ booking, onOpenModal, onApprove }) {
  return (
    <article className="booking-row">
      <div className="booking-row-main">
        <div>
          <h3 className="booking-title">{booking.costume}</h3>
          <p className="booking-sub">{booking.customer} · {booking.id}</p>
        </div>
        <span className={`booking-status status-${booking.statusKey}`}>{booking.status}</span>
      </div>
      <div className="booking-meta">
        <span>🕒 {booking.time}</span>
        <span>📅 {booking.date}</span>
        <span>📞 {booking.phone}</span>
      </div>
      <div className="booking-actions">
        {booking.statusKey === 'pending' && (
          <button className="btn-approve" onClick={() => onApprove(booking.id)}>
            Duyệt đơn
          </button>
        )}
        {booking.statusKey === 'waiting_return' && (
          <button className="btn-return-check" onClick={() => onOpenModal(booking)}>
            Kiểm tra & Xác nhận trả đồ
          </button>
        )}
        {booking.statusKey === 'returned' && (
          <span className="returned-label">✓ Đã trả đồ</span>
        )}
      </div>
    </article>
  )
}

function Schedule() {
  const { orders: contextOrders, approveOrder, rejectOrder } = useDemoStore()
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)
  const [activeModal, setActiveModal] = useState(null)
  const [toast, setToast] = useState(null)

  /* Đơn chờ duyệt từ context (customer vừa đặt) */
  const pendingOrders = contextOrders.filter(o => o.statusKey === 'pending_confirm')

  const openModal = (booking) => setActiveModal(booking)
  const closeModal = () => setActiveModal(null)

  const handleApprove = (id) => {
    /* Duyệt đơn trong INITIAL_BOOKINGS */
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Đã xác nhận', statusKey: 'confirmed' } : b)
    )
    showToast('Đã duyệt đơn thành công!')
  }

  const handleApproveContext = (orderId, costumeName) => {
    approveOrder(orderId)
    showToast(`Đã duyệt đơn ${orderId} · ${costumeName}`)
  }

  const handleRejectContext = (orderId) => {
    rejectOrder(orderId)
    showToast(`Đã từ chối đơn ${orderId}`)
  }

  const handleConfirmReturn = ({ refundAmount }) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === activeModal.id
          ? { ...b, status: 'Đã trả đồ', statusKey: 'returned' }
          : b
      )
    )
    closeModal()
    showToast(`Xác nhận trả đồ · Hoàn ${refundAmount.toLocaleString('vi-VN')}đ cho khách`)
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const stats = {
    today: bookings.length + pendingOrders.length,
    waitingReturn: bookings.filter(b => b.statusKey === 'waiting_return').length,
    pending: bookings.filter(b => b.statusKey === 'pending').length + pendingOrders.length,
  }

  return (
    <div className="schedule-page">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <section className="schedule-hero">
        <div>
          <span className="page-kicker">Quản lý lịch thuê</span>
          <h1 className="page-title">Booking / Schedule</h1>
          <p className="page-subtitle">Theo dõi lịch nhận đồ, ngày trả đồ và các đơn cần xử lý trong tuần.</p>
        </div>

        <div className="schedule-hero-stats">
          <div className="hero-stat-card">
            <span className="hero-stat-value">{stats.today}</span>
            <span className="hero-stat-label">Lịch hôm nay</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">{stats.waitingReturn}</span>
            <span className="hero-stat-label">Chờ trả đồ</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">{stats.pending}</span>
            <span className="hero-stat-label">Chờ duyệt</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">92%</span>
            <span className="hero-stat-label">Tỷ lệ đúng hẹn</span>
          </div>
        </div>
      </section>

      <section className="schedule-grid">
        {/* Calendar */}
        <div className="schedule-card calendar-card">
          <div className="card-head">
            <div>
              <h2 className="card-title">Calendar View</h2>
              <p className="card-desc">Tháng 4/2026 · Các điểm vàng là ngày cần xử lý</p>
            </div>
            <div className="calendar-legend">
              <span><i className="legend-dot pickup" />Nhận đồ</span>
              <span><i className="legend-dot return" />Trả đồ</span>
              <span><i className="legend-dot due" />Gấp</span>
            </div>
          </div>

          <div className="calendar-weekdays">
            {WEEK_DAYS.map(day => <span key={day}>{day}</span>)}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((item, index) => (
              <CalendarDay key={`${item.day}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="schedule-sidebar">

          {/* ── Đơn mới từ customer (context) ── */}
          {pendingOrders.length > 0 && (
            <div className="schedule-card compact-card new-orders-card">
              <div className="card-head compact-head">
                <div>
                  <h2 className="card-title">
                    Đơn mới cần duyệt
                    <span className="new-order-badge">{pendingOrders.length}</span>
                  </h2>
                  <p className="card-desc">Khách vừa đặt — duyệt hoặc từ chối</p>
                </div>
              </div>
              <div className="booking-list">
                {pendingOrders.map(order => (
                  <div key={order.id} className="booking-row new-order-row">
                    <div className="booking-row-main">
                      <div>
                        <h3 className="booking-title">{order.costume}</h3>
                        <p className="booking-sub">{order.customer} · {order.id}</p>
                      </div>
                      <span className="booking-status status-pending">Chờ duyệt</span>
                    </div>
                    <div className="booking-meta">
                      <span>📞 {order.phone}</span>
                      <span>📦 {order.days} ngày</span>
                      <span>💰 {((order.price ?? 0) * (order.days ?? 1)).toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="booking-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApproveContext(order.id, order.costume)}
                      >
                        Duyệt đơn
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectContext(order.id)}
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lịch sắp tới + actions */}
          <div className="schedule-card compact-card">
            <div className="card-head compact-head">
              <div>
                <h2 className="card-title">Lịch sắp tới</h2>
                <p className="card-desc">Đơn cần xử lý · click để kiểm tra và xác nhận</p>
              </div>
            </div>
            <div className="booking-list">
              {bookings.map(booking => (
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  onOpenModal={openModal}
                  onApprove={handleApprove}
                />
              ))}
            </div>
          </div>

          {/* Nhắc trả đồ */}
          <div className="schedule-card compact-card highlight-card">
            <div className="card-head compact-head">
              <div>
                <h2 className="card-title">Nhắc trả đồ</h2>
                <p className="card-desc">Các đơn ưu tiên cần liên hệ khách</p>
              </div>
            </div>
            <div className="return-list">
              {upcomingReturns.map(item => (
                <div className="return-item" key={`${item.costume}-${item.returnTime}`}>
                  <div>
                    <h3>{item.costume}</h3>
                    <p>{item.branch}</p>
                  </div>
                  <div className="return-meta">
                    <span>{item.returnTime}</span>
                    <strong>{item.priority}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Modal kiểm tra trả đồ */}
      {activeModal && (
        <ReturnModal
          booking={activeModal}
          onClose={closeModal}
          onConfirm={handleConfirmReturn}
        />
      )}
    </div>
  )
}

export default Schedule
