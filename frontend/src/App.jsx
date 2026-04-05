import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import Schedule from './pages/Schedule'
import Revenue from './pages/Revenue'

function App() {
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' })

  const openLogin = () => setAuthModal({ open: true, tab: 'login' })
  const openRegister = () => setAuthModal({ open: true, tab: 'register' })
  const closeAuth = () => setAuthModal((prev) => ({ ...prev, open: false }))

  return (
    <Router>
      <div className="app">
        <Header onLoginClick={openLogin} onRegisterClick={openRegister} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/revenue" element={<Revenue />} />
          </Routes>
        </main>

        <Footer />
        <AuthModal
          isOpen={authModal.open}
          onClose={closeAuth}
          defaultTab={authModal.tab}
        />
      </div>
    </Router>
  )
}

export default App
