import { useState } from 'react'
import '../styles/Profile.css'

const initialUser = {
  name: 'Nguyễn Minh Tuấn',
  email: 'minhtuancos@gmail.com',
  phone: '0912 345 678',
  dob: '1999-08-15',
  avatar: 'https://i.pravatar.cc/150?img=11',
  addresses: [
    { id: 1, label: 'Nhà riêng', full: '123 Nguyễn Huệ, Quận 1, TP.HCM', isDefault: true },
    { id: 2, label: 'Công ty', full: '88 Lê Lợi, Quận 3, TP.HCM', isDefault: false },
  ],
}

function AvatarUpload({ src, name }) {
  const initials = name?.split(' ').map(w => w[0]).slice(-2).join('') || 'U'
  return (
    <div className="avatar-upload-wrap">
      <div className="avatar-ring">
        {src
          ? <img src={src} alt={name} className="avatar-img" />
          : <span className="avatar-initials">{initials}</span>
        }
        <div className="avatar-edit-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
      </div>
      <div className="avatar-meta">
        <span className="avatar-name">{name}</span>
        <span className="avatar-badge">Thành viên</span>
      </div>
    </div>
  )
}

function AddressCard({ address, onSetDefault, onDelete }) {
  return (
    <div className={`address-card ${address.isDefault ? 'default' : ''}`}>
      <div className="address-card-left">
        <div className="address-label-row">
          <span className="address-icon">📍</span>
          <span className="address-label">{address.label}</span>
          {address.isDefault && <span className="default-badge">Mặc định</span>}
        </div>
        <p className="address-full">{address.full}</p>
      </div>
      <div className="address-card-actions">
        {!address.isDefault && (
          <button className="addr-btn addr-btn-default" onClick={() => onSetDefault(address.id)}>
            Đặt mặc định
          </button>
        )}
        <button className="addr-btn addr-btn-delete" onClick={() => onDelete(address.id)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>
  )
}

function Profile() {
  const [user, setUser] = useState(initialUser)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone, dob: user.dob })
  const [showAddAddr, setShowAddAddr] = useState(false)
  const [newAddr, setNewAddr] = useState({ label: '', full: '' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setUser(prev => ({ ...prev, ...form }))
    setEditMode(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleSetDefault = (id) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.map(a => ({ ...a, isDefault: a.id === id }))
    }))
  }

  const handleDeleteAddr = (id) => {
    setUser(prev => ({ ...prev, addresses: prev.addresses.filter(a => a.id !== id) }))
  }

  const handleAddAddr = () => {
    if (!newAddr.label || !newAddr.full) return
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, { id: Date.now(), ...newAddr, isDefault: false }]
    }))
    setNewAddr({ label: '', full: '' })
    setShowAddAddr(false)
  }

  return (
    <div className="profile-page">
      {/* Page Title */}
      <div className="profile-header-section">
        <div className="profile-title-row">
          <div className="profile-title-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <h1 className="profile-title">Tài Khoản Của Tôi</h1>
            <p className="profile-subtitle">Quản lý thông tin cá nhân và địa chỉ giao nhận</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Left: Avatar + Stats */}
        <aside className="profile-sidebar">
          <div className="sidebar-card">
            <AvatarUpload src={user.avatar} name={user.name} />
            <div className="sidebar-divider" />
            <div className="sidebar-stats">
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Lần thuê</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label">Đang thuê</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.9★</span>
                <span className="stat-label">Đánh giá</span>
              </div>
            </div>
            <div className="sidebar-divider" />
            <div className="sidebar-menu">
              <a href="/profile" className="sidebar-menu-item active">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Thông tin cá nhân
              </a>
              <a href="/orders" className="sidebar-menu-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                Đơn thuê của tôi
              </a>
              <a href="/favorites" className="sidebar-menu-item">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
  Yêu thích
</a>
            </div>
          </div>
        </aside>

        {/* Right: Form */}
        <div className="profile-main">
          {/* Personal Info Card */}
          <div className="profile-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2 className="card-title">Thông Tin Cá Nhân</h2>
                <p className="card-desc">Cập nhật họ tên, email và số điện thoại của bạn</p>
              </div>
              <button
                className={`btn-edit ${editMode ? 'active' : ''}`}
                onClick={() => { editMode ? handleSave() : setEditMode(true) }}
              >
                {editMode
                  ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg> Lưu</>
                  : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Chỉnh sửa</>
                }
              </button>
            </div>

            {saved && (
              <div className="save-toast">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                Thông tin đã được cập nhật!
              </div>
            )}

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Họ và tên</label>
                {editMode
                  ? <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nhập họ và tên..." />
                  : <div className="form-value">{user.name}</div>
                }
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                {editMode
                  ? <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  : <div className="form-value">{user.email}</div>
                }
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                {editMode
                  ? <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                  : <div className="form-value">{user.phone}</div>
                }
              </div>
              <div className="form-group">
                <label className="form-label">Ngày sinh</label>
                {editMode
                  ? <input className="form-input" type="date" value={form.dob} onChange={e => setForm(p => ({ ...p, dob: e.target.value }))} />
                  : <div className="form-value">{new Date(user.dob).toLocaleDateString('vi-VN')}</div>
                }
              </div>
            </div>

            {editMode && (
              <div className="form-actions">
                <button className="btn-cancel" onClick={() => { setEditMode(false); setForm({ name: user.name, email: user.email, phone: user.phone, dob: user.dob }) }}>
                  Hủy
                </button>
                <button className="btn-save-primary" onClick={handleSave}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Lưu thay đổi
                </button>
              </div>
            )}
          </div>

          {/* Address Card */}
          <div className="profile-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2 className="card-title">Địa Chỉ Nhận Đồ</h2>
                <p className="card-desc">Quản lý địa chỉ giao/nhận trang phục của bạn</p>
              </div>
              <button className="btn-add-addr" onClick={() => setShowAddAddr(v => !v)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Thêm địa chỉ
              </button>
            </div>

            <div className="address-list">
              {user.addresses.map(addr => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  onSetDefault={handleSetDefault}
                  onDelete={handleDeleteAddr}
                />
              ))}
            </div>

            {showAddAddr && (
              <div className="add-addr-form">
                <div className="add-addr-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tên địa chỉ (vd: Nhà riêng)</label>
                    <input className="form-input" value={newAddr.label} onChange={e => setNewAddr(p => ({ ...p, label: e.target.value }))} placeholder="Nhà riêng / Công ty..." />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Địa chỉ đầy đủ</label>
                    <input className="form-input" value={newAddr.full} onChange={e => setNewAddr(p => ({ ...p, full: e.target.value }))} placeholder="Số nhà, đường, quận, thành phố..." />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setShowAddAddr(false)}>Hủy</button>
                  <button className="btn-save-primary" onClick={handleAddAddr}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    Thêm địa chỉ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Card */}
          <div className="profile-card">
            <div className="card-header">
              <div className="card-header-left">
                <h2 className="card-title">Bảo Mật Tài Khoản</h2>
                <p className="card-desc">Thay đổi mật khẩu để bảo vệ tài khoản</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Mật khẩu hiện tại</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label">Mật khẩu mới</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label">Xác nhận mật khẩu mới</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save-primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
