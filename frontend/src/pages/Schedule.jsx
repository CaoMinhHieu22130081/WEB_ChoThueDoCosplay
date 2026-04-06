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

const bookings = [
  {
    id: 'BK-2405-01',
    costume: 'Nezuko Kamado',
    customer: 'Lê Thảo Vy',
    time: '09:00 - 11:00',
    date: '05/04/2026',
    status: 'Đang chờ trả đồ',
  },
  {
    id: 'BK-2405-02',
    costume: 'Spider-Man',
    customer: 'Trần Minh Khang',
    time: '13:30 - 15:00',
    date: '05/04/2026',
    status: 'Đã xác nhận',
  },
  {
    id: 'BK-2405-03',
    costume: 'Sailor Moon',
    customer: 'Nguyễn Hà My',
    time: '16:00 - 18:30',
    date: '06/04/2026',
    status: 'Sắp nhận đồ',
  },
  {
    id: 'BK-2405-04',
    costume: 'Genshin Raiden',
    customer: 'Phạm Hoàng Long',
    time: '19:00 - 21:00',
    date: '06/04/2026',
    status: 'Chờ duyệt',
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

  const label = item.status === 'pickup' ? 'Nhận' : item.status === 'return' ? 'Trả' : item.status === 'due' ? 'Gấp' : ''

  return (
    <div className={className}>
      <span className="calendar-date">{item.day}</span>
      {label && <span className="calendar-pill">{label}</span>}
    </div>
  )
}

function BookingRow({ booking }) {
  return (
    <article className="booking-row">
      <div className="booking-row-main">
        <div>
          <h3 className="booking-title">{booking.costume}</h3>
          <p className="booking-sub">{booking.customer} · {booking.id}</p>
        </div>
        <span className="booking-status">{booking.status}</span>
      </div>
      <div className="booking-meta">
        <span>🕒 {booking.time}</span>
        <span>📅 {booking.date}</span>
      </div>
    </article>
  )
}

function Schedule() {
  return (
    <div className="schedule-page">
      <section className="schedule-hero">
        <div>
          <span className="page-kicker">Quản lý lịch thuê</span>
          <h1 className="page-title">Booking / Schedule</h1>
          <p className="page-subtitle">Theo dõi lịch nhận đồ, ngày trả đồ và các đơn cần xử lý trong tuần.</p>
        </div>

        <div className="schedule-hero-stats">
          <div className="hero-stat-card">
            <span className="hero-stat-value">18</span>
            <span className="hero-stat-label">Lịch hôm nay</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">6</span>
            <span className="hero-stat-label">Sắp trả đồ</span>
          </div>
          <div className="hero-stat-card">
            <span className="hero-stat-value">92%</span>
            <span className="hero-stat-label">Tỷ lệ đúng hẹn</span>
          </div>
        </div>
      </section>

      <section className="schedule-grid">
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
            {calendarDays.map((item, index) => <CalendarDay key={`${item.day}-${index}`} item={item} />)}
          </div>
        </div>

        <aside className="schedule-sidebar">
          <div className="schedule-card compact-card">
            <div className="card-head compact-head">
              <div>
                <h2 className="card-title">Lịch sắp tới</h2>
                <p className="card-desc">Danh sách đơn cần xử lý trong 48 giờ tới</p>
              </div>
            </div>
            <div className="booking-list">
              {bookings.map(booking => <BookingRow key={booking.id} booking={booking} />)}
            </div>
          </div>

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
    </div>
  )
}

export default Schedule