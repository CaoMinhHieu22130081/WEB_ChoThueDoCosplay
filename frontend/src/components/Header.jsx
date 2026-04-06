import { Link, useLocation } from 'react-router-dom'
import './css/Header.css'

function Header({ onLoginClick, onRegisterClick }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-wrap">
            <div className="logo-emblem">✩</div>
            <div className="logo-text-block">
              <span className="logo-main">COSPLAY</span>
              <span className="logo-sub">CHO THUÊ TRANG PHỤC</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Trang Chủ
            </Link>
            <Link to="/add-product" className={`nav-link ${isActive('/add-product') ? 'active' : ''}`}>
              Đăng Trang Phục
            </Link>
            <Link to="/manage-inventory" className={`nav-link ${isActive('/manage-inventory') ? 'active' : ''}`}>
              Quản Lý Kho
            </Link>
            <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
              Sản Phẩm
            </Link>
            <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
              Lịch Thuê
            </Link>
            <Link to="/revenue" className={`nav-link ${isActive('/revenue') ? 'active' : ''}`}>
              Doanh Thu
            </Link>
            <Link to="/reviews" className={`nav-link ${isActive('/reviews') ? 'active' : ''}`}>
              Đánh Giá
            </Link>
            <Link to="/promotions" className={`nav-link ${isActive('/promotions') ? 'active' : ''}`}>
              Khuyến Mãi
            </Link>
            <Link to="/contact" className="nav-link nav-cta">
              Liên Hệ
            </Link>
            <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
              Giỏ Hàng
            </Link>
          </nav>

          <div className="header-auth">
            <button className="auth-btn login-btn" onClick={onLoginClick}>
              Đăng nhập
            </button>
            <button className="auth-btn register-btn" onClick={onRegisterClick}>
              Đăng ký
            </button>
          </div>

          <Link to="/profile" className={`account-icon ${isActive('/profile') ? 'active' : ''}`} title="Tài khoản">
            👤
          </Link>
        </div>
      </header>
  )
}

export default Header