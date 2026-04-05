import { useMemo, useState } from 'react'
import '../styles/BookingSchedule.css'

const BOOKINGS = [
  {
    id: 'BK-240601',
    customer: 'Linh Trần',
    costume: 'Nezuko Kamado',
    startDate: '2026-04-06',
    endDate: '2026-04-08',
    status: 'Đã cọc',
    returnStatus: 'Đúng hẹn',
  },
  {
    id: 'BK-240602',
    customer: 'Hải Phạm',
    costume: 'Iron Man Mark 50',
    startDate: '2026-04-06',
    endDate: '2026-04-10',
    status: 'Đang thuê',
    returnStatus: 'Chưa trả',
  },
  {
    id: 'BK-240603',
    customer: 'Ngọc Mai',
    costume: 'Mikasa Ackerman',
    startDate: '2026-04-07',
    endDate: '2026-04-09',
    status: 'Chờ nhận đồ',
    returnStatus: 'Chưa trả',
  },
  {
    id: 'BK-240604',
    customer: 'Kiên Võ',
    costume: 'Gojo Satoru',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    status: 'Đã cọc',
    returnStatus: 'Chưa trả',
  },
  {
    id: 'BK-240605',
    customer: 'Uyên Lê',
    costume: 'Elsa Premium',
    startDate: '2026-04-11',
    endDate: '2026-04-14',
    status: 'Đã hoàn thành',
    returnStatus: 'Trả sớm',
  },
]

const STATUS_CLASS = {
  'Đã cọc': 'booking-tag status-deposit',
  'Đang thuê': 'booking-tag status-renting',
  'Chờ nhận đồ': 'booking-tag status-pending',
  'Đã hoàn thành': 'booking-tag status-done',
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function BookingSchedule() {
  const [view, setView] = useState('calendar')
  const [statusFilter, setStatusFilter] = useState('all')

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = getDaysInMonth(year, month)

  const filteredBookings = useMemo(() => {
    if (statusFilter === 'all') return BOOKINGS
    return BOOKINGS.filter((item) => item.status === statusFilter)
  }, [statusFilter])

  const bookingMapByDate = useMemo(() => {
    const map = {}
    filteredBookings.forEach((booking) => {
      const start = new Date(booking.startDate)
      const end = new Date(booking.endDate)
      const cursor = new Date(start)

      while (cursor <= end) {
        if (cursor.getMonth() === month && cursor.getFullYear() === year) {
          const day = cursor.getDate()
          if (!map[day]) map[day] = []
          map[day].push(booking)
        }
        cursor.setDate(cursor.getDate() + 1)
      }
    })
    return map
  }, [filteredBookings, month, year])

  const totalActive = filteredBookings.filter((b) => b.status === 'Đang thuê').length
  const totalPending = filteredBookings.filter((b) => b.status === 'Chờ nhận đồ').length

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-title-wrap">
          <span className="booking-label">✦ Quản Trị Cửa Hàng</span>
          <h1 className="booking-title">Quản Lý Lịch Thuê</h1>
          <p className="booking-subtitle">
            Theo dõi lịch thuê theo ngày, kiểm tra ngày trống và cập nhật nhanh tình trạng trả đồ.
          </p>
        </div>

        <div className="booking-summary">
          <div className="booking-summary-item">
            <span className="sum-num">{filteredBookings.length}</span>
            <span className="sum-label">Lịch thuê tháng này</span>
          </div>
          <div className="booking-summary-item">
            <span className="sum-num">{totalActive}</span>
            <span className="sum-label">Đang thuê</span>
          </div>
          <div className="booking-summary-item">
            <span className="sum-num">{totalPending}</span>
            <span className="sum-label">Chờ nhận đồ</span>
          </div>
        </div>
      </div>

      <div className="booking-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar view
          </button>
          <button
            className={`toggle-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            Danh sách
          </button>
        </div>

        <div className="status-filter-wrap">
          <label htmlFor="booking-status">Trạng thái:</label>
          <select
            id="booking-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="booking-select"
          >
            <option value="all">Tất cả</option>
            <option value="Đã cọc">Đã cọc</option>
            <option value="Đang thuê">Đang thuê</option>
            <option value="Chờ nhận đồ">Chờ nhận đồ</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
          </select>
        </div>
      </div>

      {view === 'calendar' ? (
        <section className="calendar-wrap">
          <div className="calendar-head">
            <h2>
              Tháng {month + 1}/{year}
            </h2>
            <span className="calendar-note">Dấu chấm sáng thể hiện ngày có lịch thuê</span>
          </div>

          <div className="calendar-grid">
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1
              const dayBookings = bookingMapByDate[day] || []
              return (
                <article key={day} className="calendar-cell">
                  <div className="cell-top">
                    <span className="cell-day">{day}</span>
                    {dayBookings.length > 0 && <span className="cell-dot" />}
                  </div>
                  <div className="cell-events">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <p key={`${booking.id}-${day}`} className="cell-event-item">
                        {booking.customer} - {booking.costume}
                      </p>
                    ))}
                    {dayBookings.length > 2 && <p className="cell-more">+{dayBookings.length - 2} lịch khác</p>}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : (
        <section className="booking-list-wrap">
          <div className="booking-list-head">
            <span>Mã lịch</span>
            <span>Khách hàng</span>
            <span>Trang phục</span>
            <span>Thời gian thuê</span>
            <span>Trạng thái</span>
            <span>Tình trạng trả</span>
          </div>

          {filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-row">
              <span className="booking-code">{booking.id}</span>
              <span>{booking.customer}</span>
              <span>{booking.costume}</span>
              <span>
                {new Date(booking.startDate).toLocaleDateString('vi-VN')} -{' '}
                {new Date(booking.endDate).toLocaleDateString('vi-VN')}
              </span>
              <span className={STATUS_CLASS[booking.status] || 'booking-tag'}>{booking.status}</span>
              <span className="return-state">{booking.returnStatus}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default BookingSchedule
