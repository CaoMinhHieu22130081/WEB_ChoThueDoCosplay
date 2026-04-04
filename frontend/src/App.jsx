import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoPage from './pages/DoPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-header">
            <h1 className="navbar-title">🎭 Cho Thuê Đồ Cosplay</h1>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Trang Chủ</Link></li>
            <li><Link to="/do">Tất Cả Đồ</Link></li>
            <li><Link to="/giohang">Giỏ Hàng</Link></li>
            <li><Link to="/profile">Tài Khoản</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/do" element={<DoPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Cho Thuê Đồ Cosplay. Tất cả quyền được bảo lưu.</p>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h2>Chào mừng đến với Cho Thuê Đồ Cosplay</h2>
        <p>Tìm kiếm và thuê những bộ đồ Cosplay chất lượng cao từ bộ sưu tập của chúng tôi</p>
        <Link to="/do" className="btn btn-primary">Khám Phá Đồ</Link>
      </section>
    </div>
  );
}

export default App;
