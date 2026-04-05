import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import BookingSchedule from './pages/BookingSchedule'
import FinanceRevenue from './pages/FinanceRevenue'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/booking-schedule" element={<BookingSchedule />} />
            <Route path="/finance-revenue" element={<FinanceRevenue />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<MyOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
