import { Link, useLocation } from 'react-router-dom'
import './css/Header.css'

function Header() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-wrap">
          <div className="logo-emblem">⛩</div>
          <div className="logo-text-block">
            <span className="logo-main">COSPLAY</span>
            <span className="logo-sub">CHO THUÊ TRANG PHỤC</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Trang Chủ
          </Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
            Sản Phẩm
          </Link>
          <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
            Giỏ Hàng
          </Link>
          <Link to="/contact" className="nav-link nav-cta">
            Liên Hệ
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header