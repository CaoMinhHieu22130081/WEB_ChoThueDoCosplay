import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Chào mừng đến với Cho Thuê Đồ Cosplay</h1>
          <p>Tìm kiếm bộ cosplay hoàn hảo cho sự kiện của bạn</p>
          <Link to="/products" className="btn-primary">Xem Sản Phẩm</Link>
        </div>
      </section>

      <section className="features">
        <h2>Tại sao chọn chúng tôi?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>✓ Chất Lượng Cao</h3>
            <p>Tất cả đồ cosplay được chọn lọc kỹ càng và bảo quản tốt</p>
          </div>
          <div className="feature-item">
            <h3>✓ Giá Hợp Lý</h3>
            <p>Giá thuê rất cạnh tranh so với các nơi khác</p>
          </div>
          <div className="feature-item">
            <h3>✓ Giao Hàng Nhanh</h3>
            <p>Hỗ trợ giao hàng trong ngày hoặc theo yêu cầu</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
