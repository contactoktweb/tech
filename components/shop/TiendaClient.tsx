'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { urlFor } from '@/sanity/lib/image'
import ShopHero from './ShopHero'

interface Product {
  _id: string
  name: string
  slug: string
  brand: string
  category: string
  specs: string
  description: string
  price: number
  oldPrice?: number
  badge?: string
  image?: any
  gallery?: any[]
  stock: number
  featured?: boolean
  variations?: { name: string; value: string }[]
}

interface TiendaClientProps {
  initialProducts: Product[]
}

export default function TiendaClient({ initialProducts }: TiendaClientProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  // State Management for Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')

  // Available brands and categories dynamically collected from products
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(
      initialProducts
        .filter((p) => p.brand)
        .map((p) => p.brand.toLowerCase())
    )
    return Array.from(brandsSet).map((b) => ({
      value: b,
      label: b.toUpperCase(),
    }))
  }, [initialProducts])

  // Get dynamic counts for categories
  const categoryCounts = useMemo(() => {
    return {
      all: initialProducts.length,
      laptops: initialProducts.filter((p) => p.category === 'laptops').length,
      accesorios: initialProducts.filter((p) => p.category === 'accesorios').length,
    }
  }, [initialProducts])

  // Get dynamic counts for brands
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    initialProducts.forEach((p) => {
      if (p.brand) {
        const b = p.brand.toLowerCase()
        counts[b] = (counts[b] || 0) + 1
      }
    })
    return counts
  }, [initialProducts])

  // Compute Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // 2. Filter by Brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brand && selectedBrands.includes(p.brand.toLowerCase()))
    }

    // 3. Sort Results
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b._id.localeCompare(a._id)) // fallback date sort
    } else {
      // 'featured'
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.name.localeCompare(b.name)
      })
    }

    return result
  }, [initialProducts, selectedCategory, selectedBrands, sortBy])

  const handleProductClick = (slug: string) => {
    // If the detail page gets converted to dynamic slug later, it will load perfectly.
    // For now we navigate to the details page, passing the slug as a query param or fallback.
    router.push(`/producto?slug=${slug}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    const imageUrl = product.image ? urlFor(product.image).url() : '/images/product-laptop-hp.jpg'
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      specs: product.specs,
    })
  }

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <ShopHero />
      <section className="shop-main">
        <div className="container">
          <div className="shop-layout">
            
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
              <div className="filter-section">
                <h3 className="filter-title">Categorías</h3>
                <ul className="filter-list">
                  <li>
                    <button
                      className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedCategory('all')}
                    >
                      <span>Todos los productos</span>
                      <span className="filter-count">{categoryCounts.all}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`filter-btn ${selectedCategory === 'laptops' ? 'active' : ''}`}
                      onClick={() => setSelectedCategory('laptops')}
                    >
                      <span>Portátiles</span>
                      <span className="filter-count">{categoryCounts.laptops}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`filter-btn ${selectedCategory === 'accesorios' ? 'active' : ''}`}
                      onClick={() => setSelectedCategory('accesorios')}
                    >
                      <span>Accesorios</span>
                      <span className="filter-count">{categoryCounts.accesorios}</span>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Marcas</h3>
                <ul className="filter-list">
                  {availableBrands.map((brand) => (
                    <li key={brand.value}>
                      <label className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="brand"
                          value={brand.value}
                          checked={selectedBrands.includes(brand.value)}
                          onChange={() => handleBrandChange(brand.value)}
                        />
                        <span className="checkmark"></span>
                        <span>{brand.label}</span>
                        <span className="text-gray-400 text-xs ml-auto">
                          ({brandCounts[brand.value] || 0})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {(selectedCategory !== 'all' || selectedBrands.length > 0) && (
                <button
                  className="btn btn-outline btn-block mt-4"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedBrands([])
                  }}
                >
                  Limpiar Filtros
                </button>
              )}
            </aside>

            {/* Shop Content Grid */}
            <div className="shop-content">
              <div className="shop-toolbar">
                <div className="results-count">
                  <span>
                    Mostrando <strong>{filteredProducts.length}</strong> productos
                  </span>
                </div>
                <div className="sort-options">
                  <label htmlFor="sortBy" className="sr-only">
                    Ordenar por
                  </label>
                  <select
                    id="sortBy"
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-low">Precio: Menor a Mayor</option>
                    <option value="price-high">Precio: Mayor a Menor</option>
                    <option value="newest">Más recientes</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-gray-800">
                  <p className="text-gray-400 font-bold mb-4">No se encontraron productos con los filtros seleccionados.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedBrands([])
                    }}
                  >
                    Ver todos los productos
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => {
                    const imageUrl = product.image ? urlFor(product.image).url() : '/images/product-laptop-hp.jpg'
                    return (
                      <article
                        key={product._id}
                        className="product-card animate-on-scroll"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleProductClick(product.slug)}
                      >
                        {product.badge && (
                          <div className={`product-badge ${product.badge.includes('%') || product.badge.includes('-') ? 'sale' : ''}`}>
                            {product.badge}
                          </div>
                        )}
                        <div className="product-image">
                          <img src={imageUrl} alt={product.name} loading="lazy" />
                        </div>
                        <div className="product-info">
                          <span className="product-brand">{(product.brand || 'Tecnología').toUpperCase()}</span>
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-specs">{product.specs}</p>
                          <div className="product-pricing">
                            {product.oldPrice && (
                              <span className="product-price-old">{formatPrice(product.oldPrice)}</span>
                            )}
                            <span className="product-price">{formatPrice(product.price)}</span>
                          </div>
                          <button
                            className="btn btn-primary btn-block btn-add-cart"
                            onClick={(e) => handleAddToCart(e, product)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 6h15l-1.5 9h-12z" />
                              <circle cx="9" cy="20" r="1" />
                              <circle cx="18" cy="20" r="1" />
                            </svg>
                            Agregar al carrito
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
