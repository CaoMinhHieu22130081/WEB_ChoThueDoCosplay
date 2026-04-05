import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import './ProductDetail.css'

function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = products.find((p) => String(p.id) === id)

    const [activeImg, setActiveImg] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [errors, setErrors] = useState({})
    const [added, setAdded] = useState(false)

    /* ── helpers ── */
    const today = new Date().toISOString().split('T')[0]

    const calcDays = () => {
        if (!startDate || !endDate) return 0
        const diff = (new Date(endDate) - new Date(startDate)) / 86400000
        return diff > 0 ? Math.round(diff) : 0
    }

    const days = calcDays()
    const totalPrice = days * (product?.pricePerDay ?? 0)

    const validate = () => {
        const e = {}
        if (!selectedSize && product?.sizes?.length) e.size = 'Vui lòng chọn kích thước.'
        if (!startDate) e.startDate = 'Vui lòng chọn ngày nhận.'
        if (!endDate) e.endDate = 'Vui lòng chọn ngày trả.'
        if (startDate && endDate && days <= 0) e.endDate = 'Ngày trả phải sau ngày nhận.'
        return e
    }

    const handleAddToCart = () => {
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        setErrors({})
        setAdded(true)
        setTimeout(() => setAdded(false), 2500)
    }

    /* ── not found ── */
    if (!product) {
        return (
            <div className="pd-notfound">
                <div className="pd-notfound-icon">🔍</div>
                <h2>Không tìm thấy trang phục</h2>
                <p>Trang phục bạn đang tìm không tồn tại hoặc đã bị gỡ.</p>
                <Link to="/products" className="btn-pd-primary">← Quay lại danh sách</Link>
            </div>
        )
    }

    const images = product.images?.length ? product.images : [product.image]

    return (
        <div className="pd-page">
            {/* ── BREADCRUMB ── */}
            <div className="pd-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="pd-bc-sep">›</span>
                <Link to="/products">Sản phẩm</Link>
                <span className="pd-bc-sep">›</span>
                <span>{product.name}</span>
            </div>

            <div className="pd-container">
                {/* ══════════════ LEFT – GALLERY ══════════════ */}
                <div className="pd-gallery">
                    {/* Main image */}
                    <div className="pd-main-img-wrap">
                        {product.isNew && <span className="pd-badge pd-badge-new">Mới</span>}
                        {product.isHot && <span className="pd-badge pd-badge-hot">Hot</span>}
                        <img
                            src={images[activeImg]}
                            alt={product.name}
                            className="pd-main-img"
                        />
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="pd-thumbs">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <img src={img} alt={`${product.name} ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Tags */}
                    <div className="pd-tags">
                        {product.tags?.map((tag) => (
                            <span key={tag} className="pd-tag">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* ══════════════ RIGHT – INFO ══════════════ */}
                <div className="pd-info">
                    {/* Category */}
                    <p className="pd-category">{product.category}</p>

                    {/* Name */}
                    <h1 className="pd-name">{product.name}</h1>

                    {/* Rating */}
                    <div className="pd-rating-row">
                        <div className="pd-stars">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className={s <= Math.round(product.rating ?? 0) ? 'star filled' : 'star'}>★</span>
                            ))}
                        </div>
                        <span className="pd-rating-num">{product.rating?.toFixed(1)}</span>
                        <span className="pd-reviews">({product.reviewCount ?? 0} đánh giá)</span>
                    </div>

                    {/* Price */}
                    <div className="pd-price-box">
                        <div className="pd-price-main">
                            {(product.pricePerDay ?? 0).toLocaleString('vi-VN')}
                            <span className="pd-price-unit">đ / ngày</span>
                        </div>
                        {product.pricePerWeek && (
                            <div className="pd-price-alt">
                                Thuê 7 ngày: <strong>{product.pricePerWeek.toLocaleString('vi-VN')}đ</strong>
                            </div>
                        )}
                        <div className="pd-deposit">
                            Đặt cọc: <strong>{(product.deposit ?? 0).toLocaleString('vi-VN')}đ</strong>
                            <span className="pd-deposit-note"> (hoàn lại khi trả đồ nguyên vẹn)</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="pd-desc">{product.description}</p>

                    <div className="pd-divider" />

                    {/* Size picker */}
                    {product.sizes?.length > 0 && (
                        <div className="pd-field-group">
                            <label className="pd-field-label">Kích thước</label>
                            <div className="pd-size-row">
                                {product.sizes.map((sz) => (
                                    <button
                                        key={sz}
                                        className={`pd-size-btn ${selectedSize === sz ? 'active' : ''}`}
                                        onClick={() => { setSelectedSize(sz); setErrors((e) => ({ ...e, size: '' })) }}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                            {errors.size && <p className="pd-error">{errors.size}</p>}
                        </div>
                    )}

                    {/* Date picker */}
                    <div className="pd-date-grid">
                        <div className="pd-field-group">
                            <label className="pd-field-label" htmlFor="startDate">📅 Ngày nhận</label>
                            <input
                                id="startDate"
                                className={`pd-date-input ${errors.startDate ? 'input-error' : ''}`}
                                type="date"
                                min={today}
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value)
                                    setErrors((prev) => ({ ...prev, startDate: '' }))
                                }}
                            />
                            {errors.startDate && <p className="pd-error">{errors.startDate}</p>}
                        </div>

                        <div className="pd-field-group">
                            <label className="pd-field-label" htmlFor="endDate">📅 Ngày trả</label>
                            <input
                                id="endDate"
                                className={`pd-date-input ${errors.endDate ? 'input-error' : ''}`}
                                type="date"
                                min={startDate || today}
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value)
                                    setErrors((prev) => ({ ...prev, endDate: '' }))
                                }}
                            />
                            {errors.endDate && <p className="pd-error">{errors.endDate}</p>}
                        </div>
                    </div>

                    {/* Summary */}
                    {days > 0 && (
                        <div className="pd-summary">
                            <span>🗓 {days} ngày thuê</span>
                            <span className="pd-summary-price">{totalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="pd-actions">
                        <button
                            className={`btn-pd-primary ${added ? 'btn-success' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {added ? '✓ Đã thêm vào giỏ!' : '🛒 Thêm vào giỏ hàng'}
                        </button>
                        <button
                            className="btn-pd-secondary"
                            onClick={() => { handleAddToCart(); if (!Object.keys(validate()).length) navigate('/cart') }}
                        >
                            Đặt thuê ngay →
                        </button>
                    </div>

                    {/* Policy pills */}
                    <div className="pd-policy-row">
                        <div className="pd-policy-item">🚚 Ship toàn quốc</div>
                        <div className="pd-policy-item">🔄 Hủy miễn phí 48h</div>
                        <div className="pd-policy-item">🛡️ Bảo hành chất lượng</div>
                    </div>
                </div>
            </div>

            {/* ══════════════ DETAIL TABS ══════════════ */}
            <DetailTabs product={product} />
        </div>
    )
}

/* ── DETAIL TABS sub-component ── */
function DetailTabs({ product }) {
    const [tab, setTab] = useState('desc')
    const tabs = [
        { key: 'desc', label: 'Mô tả' },
        { key: 'specs', label: 'Thông số' },
        { key: 'reviews', label: `Đánh giá (${product.reviewCount ?? 0})` },
        { key: 'policy', label: 'Chính sách thuê' },
    ]

    return (
        <div className="pd-tabs-section">
            <div className="pd-tabs-nav">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        className={`pd-tab-btn ${tab === t.key ? 'active' : ''}`}
                        onClick={() => setTab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="pd-tab-content">
                {tab === 'desc' && (
                    <div className="pd-tab-body">
                        <p>{product.description}</p>
                        {product.includes?.length > 0 && (
                            <>
                                <h4>Bộ trang phục bao gồm:</h4>
                                <ul>
                                    {product.includes.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </>
                        )}
                    </div>
                )}

                {tab === 'specs' && (
                    <div className="pd-tab-body">
                        <table className="pd-specs-table">
                            <tbody>
                            {product.specs && Object.entries(product.specs).map(([k, v]) => (
                                <tr key={k}>
                                    <td className="spec-key">{k}</td>
                                    <td className="spec-val">{v}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {tab === 'reviews' && (
                    <div className="pd-tab-body">
                        {product.reviews?.length ? product.reviews.map((rv, i) => (
                            <div key={i} className="pd-review-card">
                                <div className="pd-reviewer">
                                    <div className="pd-avatar">{rv.name.charAt(0)}</div>
                                    <div>
                                        <p className="pd-reviewer-name">{rv.name}</p>
                                        <p className="pd-reviewer-date">{rv.date}</p>
                                    </div>
                                    <div className="pd-review-stars">
                                        {'★'.repeat(rv.rating)}{'☆'.repeat(5 - rv.rating)}
                                    </div>
                                </div>
                                <p className="pd-review-text">{rv.comment}</p>
                            </div>
                        )) : <p className="pd-tab-empty">Chưa có đánh giá nào.</p>}
                    </div>
                )}

                {tab === 'policy' && (
                    <div className="pd-tab-body">
                        <ul>
                            <li>Đặt cọc khi nhận đồ, hoàn cọc đầy đủ khi trả nguyên vẹn.</li>
                            <li>Trả muộn tính thêm <strong>50.000đ / ngày</strong>.</li>
                            <li>Hư hỏng hoặc mất mát bồi thường theo giá trị thực tế.</li>
                            <li>Hủy đặt thuê trước <strong>48 giờ</strong> không mất phí.</li>
                            <li>Hỗ trợ ship tận nơi khu vực TP.HCM (phí ship 30.000đ).</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetail