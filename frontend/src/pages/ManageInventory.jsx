import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../data/products'
import '../styles/ManageInventory.css'

const STATUS_OPTIONS = [
  { value: 'available', label: 'Có sẵn' },
  { value: 'rented', label: 'Đã thuê' },
  { value: 'maintenance', label: 'Bảo trì' },
  { value: 'sold', label: 'Đã bán' }
]

function ManageInventory() {
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ quantity: '', status: '' })

  // Load products
  useEffect(() => {
    const data = getProducts()
    // Add quantity and status for demo (normally from backend)
    const productsWithInventory = data.map(p => ({
      ...p,
      quantity: Math.floor(Math.random() * 10) + 1,
      status: 'available'
    }))
    setProducts(productsWithInventory)
  }, [])

  const handleEdit = (product) => {
    setEditingId(product.id)
    setEditData({
      quantity: product.quantity,
      status: product.status
    })
  }

  const handleSave = (id) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, ...editData } : p
    ))
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({ quantity: '', status: '' })
  }

  const handleSell = (id) => {
    // TODO: Mark as sold
    alert('Sản phẩm đã được đăng bán!')
  }

  return (
    <div className="manage-inventory-page">
      {/* ═════ HEADER ═════ */}
      <header className="manage-inventory-header">
        <span className="manage-inventory-label">✦ Quản Lý Kho</span>
        <h1 className="manage-inventory-title">Kho Trang Phục Cosplay</h1>
        <p className="manage-inventory-subtitle">
          Quản lý số lượng, tình trạng và đăng bán các trang phục của bạn.
        </p>
        <Link to="/add-product" className="btn-add-product">
          + Thêm Sản Phẩm Mới
        </Link>
      </header>

      {/* ═════ INVENTORY LIST ═════ */}
      <div className="inventory-list">
        {products.length > 0 ? (
          <div className="inventory-grid">
            {products.map(product => (
              <div key={product.id} className="inventory-item">
                <div className="product-preview">
                  <ProductCard product={product} />
                </div>

                <div className="inventory-details">
                  <div className="detail-row">
                    <span className="label">Số lượng:</span>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editData.quantity}
                        onChange={(e) => setEditData(prev => ({ ...prev, quantity: e.target.value }))}
                        min="0"
                        className="edit-input"
                      />
                    ) : (
                      <span className="value">{product.quantity}</span>
                    )}
                  </div>

                  <div className="detail-row">
                    <span className="label">Tình trạng:</span>
                    {editingId === product.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
                        className="edit-select"
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`status ${product.status}`}>
                        {STATUS_OPTIONS.find(s => s.value === product.status)?.label}
                      </span>
                    )}
                  </div>

                  <div className="actions">
                    {editingId === product.id ? (
                      <>
                        <button onClick={() => handleSave(product.id)} className="btn-save">
                          Lưu
                        </button>
                        <button onClick={handleCancel} className="btn-cancel">
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(product)} className="btn-edit">
                          Chỉnh sửa
                        </button>
                        <button onClick={() => handleSell(product.id)} className="btn-sell">
                          Đăng bán
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="inventory-empty">
            <div className="empty-icon">📦</div>
            <h3>Kho trống</h3>
            <p>Bạn chưa có sản phẩm nào trong kho.</p>
            <Link to="/add-product" className="btn-add-first">
              Thêm Sản Phẩm Đầu Tiên
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageInventory
