import React, { useState } from 'react';
import '../styles/pages/DoPage.css';

function DoPage() {
  const [filterCategory, setFilterCategory] = useState('all');

  // Dữ liệu mẫu - đều từ backend sau
  const mockProducts = [
    {
      id: 1,
      name: 'Naruto Uzumaki Classic',
      category: 'anime',
      price: 150000,
      deposit: 50000,
      image: '🧡',
      description: 'Bộ đồ Naruto cổ điển với áo hoodie cam và quần đen',
      rating: 4.5,
      reviews: 12
    },
    {
      id: 2,
      name: 'Elsa Frozen Dress',
      category: 'disney',
      price: 200000,
      deposit: 70000,
      image: '❄️',
      description: 'Váy Elsa từ Frozen với trang phục lấp lánh',
      rating: 4.8,
      reviews: 25
    },
    {
      id: 3,
      name: 'Mori Girl Japanese School',
      category: 'japanese',
      price: 120000,
      deposit: 40000,
      image: '👘',
      description: 'Đồng phục học sinh Nhật Bản cổ điển',
      rating: 4.3,
      reviews: 8
    },
    {
      id: 4,
      name: 'Wonder Woman Superheroine',
      category: 'superhero',
      price: 180000,
      deposit: 60000,
      image: '⭐',
      description: 'Trang phục Wonder Woman hoàn chỉnh',
      rating: 4.7,
      reviews: 18
    },
    {
      id: 5,
      name: 'Maid Cafe Outfit',
      category: 'japanese',
      price: 100000,
      deposit: 35000,
      image: '👗',
      description: 'Trang phục phục vụ quán cà phê Nhật Bản',
      rating: 4.2,
      reviews: 14
    },
    {
      id: 6,
      name: 'Steampunk Victorian',
      category: 'western',
      price: 220000,
      deposit: 80000,
      image: '🎩',
      description: 'Trang phục Steampunk phong cách Victorian',
      rating: 4.6,
      reviews: 9
    }
  ];

  const categories = [
    { value: 'all', label: 'Tất Cả' },
    { value: 'anime', label: 'Anime' },
    { value: 'disney', label: 'Disney' },
    { value: 'japanese', label: 'Nhật Bản' },
    { value: 'superhero', label: 'Siêu Anh Hùng' },
    { value: 'western', label: 'Phương Tây' }
  ];

  const filteredProducts = filterCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === filterCategory);

  return (
    <div className="do-page">
      <h1>Tất Cả Đồ</h1>
      
      <div className="filter-section">
        <h3>Lọc theo danh mục:</h3>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`filter-btn ${filterCategory === cat.value ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="rating">
                {'⭐'.repeat(Math.floor(product.rating))} ({product.reviews} đánh giá)
              </div>
              <div className="price-section">
                <p><strong>Giá thuê:</strong> <span className="price">{product.price.toLocaleString()}₫</span>/ngày</p>
                <p><strong>Tiền cọc:</strong> <span className="deposit">{product.deposit.toLocaleString()}₫</span></p>
              </div>
              <button className="btn btn-rent">Thuê Ngay</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>Không tìm thấy sản phẩm nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
}

export default DoPage;
