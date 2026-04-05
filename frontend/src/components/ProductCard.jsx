import { useState } from 'react'
import './css/ProductCard.css'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const [isHovering, setIsHovering] = useState(false)

  const formatPrice = (price) => price.toLocaleString('vi-VN')

  const getCategoryColor = (category) => {
    const colors = {
      'Anime': '#c084fc',
      'Game': '#a855f7',
      'Fantasy': '#ec4899',
      'Siêu Anh Hùng': '#f0abfc',
      'Nhật Bản': '#a78bfa'
    }
    return colors[category] || '#c084fc'
  }

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${product.id}/600/750`
          }}
        />
        
        {/* Overlay */}
        <div className="product-image-overlay" />
        
        {/* Category Badge */}
        <span 
          className="product-category-tag"
          style={{ backgroundColor: getCategoryColor(product.category) }}
        >
          {product.category}
        </span>

        {/* Quick Actions */}
        <div className={`product-quick-actions ${isHovering ? 'active' : ''}`}>
          <button className="action-btn action-heart" title="Yêu thích">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="action-btn action-share" title="Chia sẻ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        {/* Rating & Reviews */}
        <div className="product-rating">
          <div className="stars">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className="star">{star}</span>
            ))}
          </div>
          <span className="review-count">(128)</span>
        </div>

          <Link to={`/products/${product.id}`} className="card-link">
              Xem chi tiết →
          </Link>

        {/* Footer */}
        <div className="product-footer">
          <div className="product-price-block">
            <span className="product-price-label">Giá thuê/ngày</span>
            <span className="product-price">
              {formatPrice(product.price)}
              <span className="product-price-unit">đ</span>
            </span>
          </div>
          <button className="btn-rent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4"/>
            </svg>
            <span>Thuê Ngay</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard