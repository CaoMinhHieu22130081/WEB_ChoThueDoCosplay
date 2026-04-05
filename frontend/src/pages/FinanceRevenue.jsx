import { useMemo } from 'react'
import '../styles/FinanceRevenue.css'

const MONTHLY_REVENUE = [
  { month: 'T1', value: 12600000 },
  { month: 'T2', value: 9800000 },
  { month: 'T3', value: 15100000 },
  { month: 'T4', value: 18400000 },
  { month: 'T5', value: 16700000 },
  { month: 'T6', value: 21200000 },
]

const PAYMENT_HISTORY = [
  {
    id: 'PMT-84011',
    customer: 'Vy Nguyễn',
    orderCode: 'BK-240601',
    method: 'Chuyển khoản',
    amount: 600000,
    deposit: 200000,
    status: 'Đã thanh toán',
    date: '2026-04-01T09:30:00',
  },
  {
    id: 'PMT-84012',
    customer: 'Long Trần',
    orderCode: 'BK-240602',
    method: 'Tiền mặt',
    amount: 1250000,
    deposit: 300000,
    status: 'Còn thiếu',
    date: '2026-04-02T14:20:00',
  },
  {
    id: 'PMT-84013',
    customer: 'Hương Lê',
    orderCode: 'BK-240603',
    method: 'Momo',
    amount: 780000,
    deposit: 250000,
    status: 'Đã thanh toán',
    date: '2026-04-03T16:10:00',
  },
  {
    id: 'PMT-84014',
    customer: 'Tuấn Phan',
    orderCode: 'BK-240604',
    method: 'Chuyển khoản',
    amount: 990000,
    deposit: 300000,
    status: 'Đã thanh toán',
    date: '2026-04-04T11:45:00',
  },
]

const STATUS_CLASS = {
  'Đã thanh toán': 'finance-status paid',
  'Còn thiếu': 'finance-status partial',
}

function FinanceRevenue() {
  const stats = useMemo(() => {
    const totalRevenue = PAYMENT_HISTORY.reduce((sum, row) => sum + row.amount, 0)
    const totalDeposit = PAYMENT_HISTORY.reduce((sum, row) => sum + row.deposit, 0)
    const unpaid = PAYMENT_HISTORY.filter((row) => row.status === 'Còn thiếu').length

    return {
      totalRevenue,
      totalDeposit,
      unpaid,
      transactions: PAYMENT_HISTORY.length,
    }
  }, [])

  const maxValue = Math.max(...MONTHLY_REVENUE.map((m) => m.value))

  return (
    <div className="finance-page">
      <header className="finance-header">
        <span className="finance-label">✦ Quản Trị Cửa Hàng</span>
        <h1 className="finance-title">Quản Lý Doanh Thu</h1>
        <p className="finance-subtitle">
          Theo dõi tiền cọc, dòng tiền và lịch sử giao dịch để kiểm soát tình trạng thanh toán toàn cửa hàng.
        </p>
      </header>

      <section className="finance-stats-grid">
        <article className="finance-stat-card">
          <p className="card-kicker">Doanh thu đã ghi nhận</p>
          <h2>{stats.totalRevenue.toLocaleString('vi-VN')}đ</h2>
          <span>4 giao dịch gần nhất</span>
        </article>
        <article className="finance-stat-card">
          <p className="card-kicker">Tiền cọc đã thu</p>
          <h2>{stats.totalDeposit.toLocaleString('vi-VN')}đ</h2>
          <span>Tổng cọc trong kỳ</span>
        </article>
        <article className="finance-stat-card warning">
          <p className="card-kicker">Đơn chưa đủ thanh toán</p>
          <h2>{stats.unpaid}</h2>
          <span>Đơn hàng cần theo dõi</span>
        </article>
      </section>

      <section className="finance-grid">
        <article className="finance-panel chart-panel">
          <div className="panel-head">
            <h3>Biểu đồ doanh thu 6 tháng</h3>
            <span>Đơn vị: VND</span>
          </div>

          <div className="chart-bars">
            {MONTHLY_REVENUE.map((item) => {
              const height = `${Math.max(14, (item.value / maxValue) * 100)}%`
              return (
                <div key={item.month} className="chart-col">
                  <div className="chart-tooltip">{item.value.toLocaleString('vi-VN')}đ</div>
                  <div className="chart-bar" style={{ height }} />
                  <span>{item.month}</span>
                </div>
              )
            })}
          </div>
        </article>

        <article className="finance-panel payment-panel">
          <div className="panel-head">
            <h3>Lịch sử giao dịch</h3>
            <span>{stats.transactions} dòng dữ liệu</span>
          </div>

          <div className="payment-table-wrap">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Mã GD</th>
                  <th>Khách hàng</th>
                  <th>Mã lịch</th>
                  <th>Phương thức</th>
                  <th>Tiền cọc</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_HISTORY.map((row) => (
                  <tr key={row.id}>
                    <td className="strong">{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.orderCode}</td>
                    <td>{row.method}</td>
                    <td>{row.deposit.toLocaleString('vi-VN')}đ</td>
                    <td>{row.amount.toLocaleString('vi-VN')}đ</td>
                    <td>
                      <span className={STATUS_CLASS[row.status] || 'finance-status'}>{row.status}</span>
                    </td>
                    <td>{new Date(row.date).toLocaleString('vi-VN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  )
}

export default FinanceRevenue
