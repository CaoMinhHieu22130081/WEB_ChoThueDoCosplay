import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../data/products'
import '../styles/Products.css'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const productData = getProducts()
    setProducts(productData)
  }, [])

  return (
    <div className="products-page">
      <h1>Danh Sách Sản Phẩm</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products
