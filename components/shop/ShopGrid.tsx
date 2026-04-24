'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function ShopGrid() {
  const router = useRouter()
  
  const handleProductClick = () => {
    router.push('/producto') // Updated path to Next.js route
  }

  return (
    <div className="shop-content">
      <div className="shop-toolbar">
        <div className="results-count">
          <span>Mostrando <strong>8</strong> productos</span>
        </div>
        <div className="sort-options">
          <label htmlFor="sortBy" className="sr-only">Ordenar por</label>
          <select id="sortBy" className="sort-select" defaultValue="featured">
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {/* Product 1 */}
        <article className="product-card animate-on-scroll" data-category="laptops" style={{ cursor: 'pointer' }} onClick={handleProductClick}>
          <div className="product-badge">Destacado</div>
          <div className="product-image">
            <img src="/images/product-laptop-hp.jpg" alt="HP EliteBook 840 G9" loading="lazy" />
          </div>
          <div className="product-info">
            <span className="product-brand">HP</span>
            <h3 className="product-name">EliteBook 840 G9</h3>
            <p className="product-specs">Intel Core i7, 16GB RAM, 512GB SSD</p>
            <div className="product-pricing">
              <span className="product-price">$4.890.000</span>
            </div>
            <button className="btn btn-primary btn-block btn-add-cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </article>

        {/* Product 2 */}
        <article className="product-card animate-on-scroll" data-category="laptops" style={{ cursor: 'pointer' }} onClick={handleProductClick}>
          <div className="product-badge sale">-15%</div>
          <div className="product-image">
            <img src="/images/product-laptop-dell.jpg" alt="Dell XPS 15" loading="lazy" />
          </div>
          <div className="product-info">
            <span className="product-brand">Dell</span>
            <h3 className="product-name">XPS 15 9530</h3>
            <p className="product-specs">Intel Core i9, 32GB RAM, 1TB SSD</p>
            <div className="product-pricing">
              <span className="product-price-old">$8.500.000</span>
              <span className="product-price">$7.225.000</span>
            </div>
            <button className="btn btn-primary btn-block btn-add-cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </article>

        {/* Product 3 */}
        <article className="product-card animate-on-scroll" data-category="laptops" style={{ cursor: 'pointer' }} onClick={handleProductClick}>
          <div className="product-image">
            <img src="/images/product-laptop-lenovo.jpg" alt="Lenovo ThinkPad X1 Carbon" loading="lazy" />
          </div>
          <div className="product-info">
            <span className="product-brand">Lenovo</span>
            <h3 className="product-name">ThinkPad X1 Carbon Gen 11</h3>
            <p className="product-specs">Intel Core i7, 16GB RAM, 512GB SSD</p>
            <div className="product-pricing">
              <span className="product-price">$6.290.000</span>
            </div>
            <button className="btn btn-primary btn-block btn-add-cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </article>
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-btn" disabled aria-label="Página anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn" aria-label="Página siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
