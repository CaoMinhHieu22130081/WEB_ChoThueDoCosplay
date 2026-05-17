import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getProducts } from '../data/products'
import '../styles/AdminDashboard.css'

const mockUsers = [
    {
        id: 1,
        name: 'Nguyễn Minh Tuấn',
        email: 'minhtuan@gmail.com',
        phone: '0912 345 678',
        role: 'Customer',
        status: 'Hoạt động',
        createdAt: '15/03/2025'
    },
    {
        id: 2,
        name: 'Shop Sakura Cosplay',
        email: 'sakura.shop@gmail.com',
        phone: '0988 777 666',
        role: 'Người bán',
        status: 'Hoạt động',
        createdAt: '22/03/2025'
    },
    {
        id: 3,
        name: 'Lê Hoàng Nam',
        email: 'namle@gmail.com',
        phone: '0901 222 333',
        role: 'Customer',
        status: 'Bị khóa',
        createdAt: '01/04/2025'
    },
    {
        id: 4,
        name: 'Akiba Costume Store',
        email: 'akibastore@gmail.com',
        phone: '0933 456 789',
        role: 'Người bán',
        status: 'Hoạt động',
        createdAt: '08/04/2025'
    }
]

const mockReviews = [
    {
        id: 1,
        productName: 'Trang phục Zenitsu Agatsuma',
        user: 'Hà Linh',
        rating: 5,
        content: 'Bộ đồ rất đẹp, chất vải tốt.',
        status: 'Hiển thị'
    },
    {
        id: 2,
        productName: 'Naruto Uzumaki',
        user: 'Trần Minh',
        rating: 2,
        content: 'Nội dung đánh giá chưa phù hợp, cần kiểm duyệt.',
        status: 'Chờ duyệt'
    },
    {
        id: 3,
        productName: 'Batman',
        user: 'Khánh Vy',
        rating: 4,
        content: 'Trang phục đẹp, giao hàng nhanh.',
        status: 'Hiển thị'
    }
]

const mockComplaints = [
    {
        id: 1,
        customer: 'Nguyễn Minh Tuấn',
        title: 'Sản phẩm giao trễ',
        content: 'Khách phản ánh đơn thuê giao trễ hơn thời gian đã hẹn.',
        status: 'Chờ xử lý',
        date: '18/05/2026'
    },
    {
        id: 2,
        customer: 'Lê Hoàng Nam',
        title: 'Trang phục không đúng size',
        content: 'Khách nhận trang phục size M nhưng đã đặt size L.',
        status: 'Đang xử lý',
        date: '19/05/2026'
    },
    {
        id: 3,
        customer: 'Phạm Gia Hân',
        title: 'Hoàn tiền cọc',
        content: 'Khách yêu cầu kiểm tra lại trạng thái hoàn tiền cọc.',
        status: 'Đã giải quyết',
        date: '20/05/2026'
    }
]

const initialCategories = [
    { id: 1, name: 'Anime', status: 'Hoạt động' },
    { id: 2, name: 'Game', status: 'Hoạt động' },
    { id: 3, name: 'Siêu Anh Hùng', status: 'Hoạt động' },
    { id: 4, name: 'Fantasy', status: 'Hoạt động' },
    { id: 5, name: 'Nhật Bản', status: 'Hoạt động' }
]

function AdminDashboard() {
    const location = useLocation()

    const activeTab = (() => {
        if (location.pathname === '/admin') return 'overview'
        if (location.pathname === '/admin/users') return 'users'
        if (location.pathname === '/admin/categories') return 'categories'
        if (location.pathname === '/admin/content') return 'content'
        if (location.pathname === '/admin/complaints') return 'complaints'
        if (location.pathname === '/admin/revenue') return 'revenue'
        return 'overview'
    })()

    const [users, setUsers] = useState(mockUsers)
    const [categories, setCategories] = useState(initialCategories)
    const [products, setProducts] = useState(() =>
        getProducts().map(product => ({
            ...product,
            status: 'Hiển thị'
        }))
    )
    const [reviews, setReviews] = useState(mockReviews)
    const [complaints, setComplaints] = useState(mockComplaints)
    const [categoryName, setCategoryName] = useState('')
    const [editingCategoryId, setEditingCategoryId] = useState(null)

    const stats = useMemo(() => {
        const totalUsers = users.length
        const totalCustomers = users.filter(user => user.role === 'Customer').length
        const totalSellers = users.filter(user => user.role === 'Người bán').length
        const totalProducts = products.length
        const hiddenProducts = products.filter(product => product.status === 'Đã ẩn').length
        const pendingComplaints = complaints.filter(item => item.status !== 'Đã giải quyết').length

        return {
            totalUsers,
            totalCustomers,
            totalSellers,
            totalProducts,
            hiddenProducts,
            pendingComplaints,
            totalOrders: 128,
            totalRevenue: 45600000,
            monthlyRevenue: 12500000,
            successfulOrders: 96,
            cancelledOrders: 8
        }
    }, [users, products, complaints])

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ'
    }

    const handleToggleUserStatus = (id) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? {
                        ...user,
                        status: user.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động'
                    }
                    : user
            )
        )
    }

    const handleDeleteUser = (id) => {
        const confirmed = window.confirm('Bạn có chắc muốn xóa user này không?')
        if (!confirmed) return

        setUsers(prev => prev.filter(user => user.id !== id))
    }

    const handleSubmitCategory = (e) => {
        e.preventDefault()

        const name = categoryName.trim()
        if (!name) {
            alert('Vui lòng nhập tên danh mục')
            return
        }

        if (editingCategoryId) {
            setCategories(prev =>
                prev.map(category =>
                    category.id === editingCategoryId
                        ? { ...category, name }
                        : category
                )
            )
            setEditingCategoryId(null)
        } else {
            const newCategory = {
                id: Date.now(),
                name,
                status: 'Hoạt động'
            }

            setCategories(prev => [...prev, newCategory])
        }

        setCategoryName('')
    }

    const handleEditCategory = (category) => {
        setCategoryName(category.name)
        setEditingCategoryId(category.id)
    }

    const handleDeleteCategory = (id) => {
        const confirmed = window.confirm('Bạn có chắc muốn xóa danh mục này không?')
        if (!confirmed) return

        setCategories(prev => prev.filter(category => category.id !== id))
    }

    const handleToggleProductStatus = (id) => {
        setProducts(prev =>
            prev.map(product =>
                product.id === id
                    ? {
                        ...product,
                        status: product.status === 'Hiển thị' ? 'Đã ẩn' : 'Hiển thị'
                    }
                    : product
            )
        )
    }

    const handleDeleteProduct = (id) => {
        const confirmed = window.confirm('Bạn có chắc muốn xóa trang phục này không?')
        if (!confirmed) return

        setProducts(prev => prev.filter(product => product.id !== id))
    }

    const handleDeleteReview = (id) => {
        const confirmed = window.confirm('Bạn có chắc muốn xóa đánh giá này không?')
        if (!confirmed) return

        setReviews(prev => prev.filter(review => review.id !== id))
    }

    const handleApproveReview = (id) => {
        setReviews(prev =>
            prev.map(review =>
                review.id === id
                    ? { ...review, status: 'Hiển thị' }
                    : review
            )
        )
    }

    const handleResolveComplaint = (id) => {
        setComplaints(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, status: 'Đã giải quyết' }
                    : item
            )
        )
    }

    return (
        <div className="admin-dashboard-page">
            <div className="admin-hero">
                <div>
                    <span className="admin-label">ADMIN CONTROL PANEL</span>
                    <h1>Trang Quản Trị Hệ Thống</h1>
                    <p>
                        Quản lý người dùng, danh mục, sản phẩm, đánh giá, thống kê và khiếu nại trong hệ thống thuê đồ cosplay.
                    </p>
                </div>

                <div className="admin-badge">
                    <span>ADMIN</span>
                    <strong>Đang hoạt động</strong>
                </div>
            </div>

            {activeTab === 'overview' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Thống kê hệ thống</h2>
                            <p>Tổng quan hoạt động của website cho thuê đồ cosplay</p>
                        </div>
                    </div>

                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <span className="stat-icon">👥</span>
                            <p>Tổng user</p>
                            <h3>{stats.totalUsers}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">🛍️</span>
                            <p>Customer</p>
                            <h3>{stats.totalCustomers}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">🏪</span>
                            <p>Người bán</p>
                            <h3>{stats.totalSellers}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">👘</span>
                            <p>Trang phục</p>
                            <h3>{stats.totalProducts}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">📦</span>
                            <p>Số lượng đơn hàng</p>
                            <h3>{stats.totalOrders}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">💰</span>
                            <p>Doanh thu</p>
                            <h3>{formatPrice(stats.totalRevenue)}</h3>
                        </div>

                        <div className="admin-stat-card warning">
                            <span className="stat-icon">🙈</span>
                            <p>Trang phục đã ẩn</p>
                            <h3>{stats.hiddenProducts}</h3>
                        </div>

                        <div className="admin-stat-card danger">
                            <span className="stat-icon">⚠️</span>
                            <p>Khiếu nại chưa xong</p>
                            <h3>{stats.pendingComplaints}</h3>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === 'users' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Quản lý user</h2>
                            <p>Bao gồm quản lý người bán và quản lý customer</p>
                        </div>
                    </div>

                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Người dùng</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <strong>{user.name}</strong>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <span className={`role-pill ${user.role === 'Người bán' ? 'seller' : 'customer'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-pill ${user.status === 'Hoạt động' ? 'active' : 'locked'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>{user.createdAt}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-admin small"
                                                    onClick={() => handleToggleUserStatus(user.id)}
                                                >
                                                    {user.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}
                                                </button>

                                                <button
                                                    className="btn-admin small danger"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {activeTab === 'categories' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Quản lý danh mục</h2>
                            <p>Thêm, sửa và xóa danh mục trang phục</p>
                        </div>
                    </div>

                    <form className="category-form" onSubmit={handleSubmitCategory}>
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục..."
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />

                        <button className="btn-admin primary" type="submit">
                            {editingCategoryId ? 'Cập nhật danh mục' : '+ Thêm danh mục'}
                        </button>

                        {editingCategoryId && (
                            <button
                                type="button"
                                className="btn-admin"
                                onClick={() => {
                                    setEditingCategoryId(null)
                                    setCategoryName('')
                                }}
                            >
                                Hủy
                            </button>
                        )}
                    </form>

                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên danh mục</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map(category => (
                                    <tr key={category.id}>
                                        <td>#{category.id}</td>
                                        <td>
                                            <strong>{category.name}</strong>
                                        </td>
                                        <td>
                                            <span className="status-pill active">
                                                {category.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-admin small"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    Sửa
                                                </button>

                                                <button
                                                    className="btn-admin small danger"
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {activeTab === 'content' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Kiểm duyệt nội dung</h2>
                            <p>Ẩn/xóa trang phục và xóa đánh giá chứa từ ngữ phản cảm</p>
                        </div>
                    </div>

                    <h3 className="sub-title">Danh sách trang phục</h3>

                    <div className="admin-product-grid">
                        {products.map(product => (
                            <div className="admin-product-card" key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/seed/admin-${product.id}/500/650`
                                    }}
                                />

                                <div className="admin-product-body">
                                    <h4>{product.name}</h4>
                                    <p>{product.category}</p>

                                    <span className={`status-pill ${product.status === 'Hiển thị' ? 'active' : 'hidden'}`}>
                                        {product.status}
                                    </span>

                                    <div className="table-actions">
                                        <button
                                            className="btn-admin small"
                                            onClick={() => handleToggleProductStatus(product.id)}
                                        >
                                            {product.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}
                                        </button>

                                        <button
                                            className="btn-admin small danger"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="sub-title">Danh sách đánh giá</h3>

                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Người đánh giá</th>
                                    <th>Số sao</th>
                                    <th>Nội dung</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reviews.map(review => (
                                    <tr key={review.id}>
                                        <td>{review.productName}</td>
                                        <td>{review.user}</td>
                                        <td>⭐ {review.rating}</td>
                                        <td>{review.content}</td>
                                        <td>
                                            <span className={`status-pill ${review.status === 'Hiển thị' ? 'active' : 'pending'}`}>
                                                {review.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                {review.status !== 'Hiển thị' && (
                                                    <button
                                                        className="btn-admin small"
                                                        onClick={() => handleApproveReview(review.id)}
                                                    >
                                                        Duyệt
                                                    </button>
                                                )}

                                                <button
                                                    className="btn-admin small danger"
                                                    onClick={() => handleDeleteReview(review.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {activeTab === 'complaints' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Giải quyết khiếu nại</h2>
                            <p>Theo dõi và cập nhật trạng thái xử lý khiếu nại của khách hàng</p>
                        </div>
                    </div>

                    <div className="complaint-list">
                        {complaints.map(item => (
                            <div className="complaint-card" key={item.id}>
                                <div className="complaint-top">
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>Khách hàng: {item.customer}</p>
                                    </div>

                                    <span className={`status-pill ${
                                        item.status === 'Đã giải quyết'
                                            ? 'active'
                                            : item.status === 'Đang xử lý'
                                                ? 'pending'
                                                : 'locked'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>

                                <p className="complaint-content">{item.content}</p>

                                <div className="complaint-bottom">
                                    <span>Ngày gửi: {item.date}</span>

                                    {item.status !== 'Đã giải quyết' && (
                                        <button
                                            className="btn-admin primary"
                                            onClick={() => handleResolveComplaint(item.id)}
                                        >
                                            Đánh dấu đã giải quyết
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'revenue' && (
                <section className="admin-section">
                    <div className="section-heading">
                        <div>
                            <h2>Thống kê doanh thu</h2>
                            <p>Theo dõi doanh thu và tình trạng đơn hàng</p>
                        </div>
                    </div>

                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <span className="stat-icon">💰</span>
                            <p>Tổng doanh thu</p>
                            <h3>{formatPrice(stats.totalRevenue)}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">📈</span>
                            <p>Doanh thu tháng này</p>
                            <h3>{formatPrice(stats.monthlyRevenue)}</h3>
                        </div>

                        <div className="admin-stat-card">
                            <span className="stat-icon">✅</span>
                            <p>Đơn thành công</p>
                            <h3>{stats.successfulOrders}</h3>
                        </div>

                        <div className="admin-stat-card danger">
                            <span className="stat-icon">❌</span>
                            <p>Đơn đã hủy</p>
                            <h3>{stats.cancelledOrders}</h3>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default AdminDashboard