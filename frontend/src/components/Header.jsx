import { Link, useLocation } from 'react-router-dom'
import './css/Header.css'

function Header({ onLoginClick, onRegisterClick }) {
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
          <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
            Lịch Thuê
          </Link>
          <Link to="/revenue" className={`nav-link ${isActive('/revenue') ? 'active' : ''}`}>
            Doanh Thu
          </Link>
          <Link to="/contact" className="nav-link nav-cta">
            Liên Hệ
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

        {/* Account Icon */}
        <Link to="/profile" className={`account-icon ${isActive('/profile') ? 'active' : ''}`} title="Tài khoản">
          👤
        </Link>
      </div>
    </header>
  )
}

export default Header