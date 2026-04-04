import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Cho Thuê Đồ Cosplay</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Trang Chủ</Link>
          <Link to="/products" className="nav-link">Sản Phẩm</Link>
          <Link to="/contact" className="nav-link">Liên Hệ</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
