import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './css/Header.css'

function Header({ onLoginClick, onRegisterClick }) {
  const location = useLocation()
  const [expandedMenu, setExpandedMenu] = useState(null)
  const isActive = (path) => location.pathname === path

  const menuItems = [
    { label: 'Lịch Thuê', path: '/schedule' },
    { label: 'Doanh Thu', path: '/revenue' },
    { label: 'Đánh Giá', path: '/reviews' },
    { label: 'Khuyến Mãi', path: '/promotions' }
  ]

  return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header-logo">
            <span className="header-logo-icon">⛩</span>
            <span className="header-logo-name">COSPLAY</span>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Trang Chủ
            </Link>
            <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
              Sản Phẩm
            </Link>
            <Link to="/add-product" className={`nav-link ${isActive('/add-product') ? 'active' : ''}`}>
              Đăng Trang Phục
            </Link>
            <Link to="/manage-inventory" className={`nav-link ${isActive('/manage-inventory') ? 'active' : ''}`}>
              Quản Lý Kho
            </Link>
            <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
              Giỏ Hàng
            </Link>

            {/* Collapsible Menu */}
            <div className="menu-group"
              onMouseEnter={() => setExpandedMenu('special')}
              onMouseLeave={() => setExpandedMenu(null)}>
              <button className="menu-toggle">
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
              </button>
              
              {expandedMenu === 'special' && (
                <div className="dropdown-menu">
                  {menuItems.map(item => (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={`dropdown-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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

          <Link to="/contact" className="nav-link nav-cta">
            Liên Hệ
          </Link>
        </div>
      </header>
  )
}

export default Header