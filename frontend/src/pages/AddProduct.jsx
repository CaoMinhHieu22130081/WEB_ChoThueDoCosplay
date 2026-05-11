import { useState } from 'react'
import '../styles/AddProduct.css'

const CATEGORIES = [
  { key: 'anime', label: 'Anime' },
  { key: 'game', label: 'Game' },
  { key: 'superhero', label: 'Siêu Anh Hùng' },
  { key: 'fantasy', label: 'Fantasy' },
  { key: 'japan', label: 'Nhật Bản' },
]

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    rentalPrice: '',
    deposit: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Submit to backend
    console.log('Submitting product:', formData)
    alert('Sản phẩm đã được đăng thành công!')
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      image: '',
      rentalPrice: '',
      deposit: ''
    })
  }

  return (
    <div className="add-product-page">
      {/* ═════ HEADER ═════ */}
      <header className="add-product-header">
        <span className="add-product-label">✦ Đăng Sản Phẩm</span>
        <h1 className="add-product-title">Đăng Trang Phục Cho Thuê</h1>
        <p className="add-product-subtitle">
          Thêm trang phục cosplay mới vào kho của bạn. Điền đầy đủ thông tin để khách hàng dễ dàng tìm thấy.
        </p>
      </header>

      {/* ═════ FORM ═════ */}
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Tên Sản Phẩm *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ví dụ: Naruto - Uzumaki Naruto"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả chi tiết về trang phục, kích cỡ, chất liệu..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh Mục *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {CATEGORIES.map(cat => (
              <option key={cat.key} value={cat.key}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Hình Ảnh (URL)</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rentalPrice">Giá Thuê (VNĐ/ngày) *</label>
            <input
              type="number"
              id="rentalPrice"
              name="rentalPrice"
              value={formData.rentalPrice}
              onChange={handleChange}
              placeholder="50000"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deposit">Tiền Cọc (VNĐ) *</label>
            <input
              type="number"
              id="deposit"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="200000"
              min="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Đăng Trang Phục Cho Thuê
        </button>
      </form>
    </div>
  )
}

export default AddProduct
