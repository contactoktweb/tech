'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

interface ProductOption {
  value: string
  priceModifier?: number
}

interface ProductVariation {
  name: string
  options: ProductOption[]
}

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
  variations?: ProductVariation[]
}

function ProductoPageContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  
  const { addToCart } = useCart()
  const { toast } = useToast()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  // Dynamic configurations
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [currentPrice, setCurrentPrice] = useState(0)

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) {
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        const data = await client.fetch(productBySlugQuery, { slug })
        if (data) {
          setProduct(data)
          setCurrentPrice(data.price)
        }
      } catch (err) {
        console.error('Error fetching product from Sanity:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleQuantityChange = (val: number) => {
    if (val < 1) return
    setQuantity(val)
  }

  // Define default/fallback product details in case Sanity has no data or is loading
  const defaultProduct: Product = {
    _id: 'hp-elitebook-840',
    name: 'EliteBook 840 G9 Business Laptop',
    slug: 'hp-elitebook-840-g9',
    brand: 'hp',
    category: 'laptops',
    specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
    description: 'Rendimiento corporativo sin concesiones. La EliteBook 840 G9 está diseñada para la movilidad híbrida, con una pantalla 16:10 y seguridad avanzada HP Wolf Security. Cuerpo de aluminio forjado y conectividad ultrarrápida.',
    price: 4890000,
    stock: 15,
    variations: [
      {
        name: 'Procesador',
        options: [
          { value: 'Intel Core i7-1255U', priceModifier: 0 },
          { value: 'Intel Core i5-1235U', priceModifier: -400000 }
        ]
      },
      {
        name: 'Memoria RAM',
        options: [
          { value: '16GB', priceModifier: 0 },
          { value: '32GB', priceModifier: 650000 }
        ]
      },
      {
        name: 'Almacenamiento',
        options: [
          { value: '512GB SSD', priceModifier: 0 }
        ]
      }
    ]
  }

  const activeProduct = product || defaultProduct
  const imageUrl = activeProduct.image ? urlFor(activeProduct.image).url() : '/images/product-laptop-hp.jpg'

  // Initialize dynamic variations selection state
  useEffect(() => {
    if (activeProduct && activeProduct.variations) {
      const initialSelected: Record<string, string> = {}
      activeProduct.variations.forEach((v) => {
        if (v.options && v.options.length > 0) {
          initialSelected[v.name] = v.options[0].value
        }
      })
      setSelectedOptions(initialSelected)
    }
  }, [activeProduct._id])

  // Calculate price and updates currentPrice dynamically based on option price modifiers
  useEffect(() => {
    if (activeProduct) {
      let price = activeProduct.price
      if (activeProduct.variations && activeProduct.variations.length > 0) {
        activeProduct.variations.forEach((v) => {
          const selectedVal = selectedOptions[v.name]
          if (selectedVal && v.options) {
            const opt = v.options.find((o) => o.value === selectedVal)
            if (opt && opt.priceModifier) {
              price += opt.priceModifier
            }
          }
        })
      }
      setCurrentPrice(price)
    }
  }, [selectedOptions, activeProduct])

  const handleAddToCart = () => {
    // Generate a unique specs string based on selected configuration choices
    const selectedValsList = Object.entries(selectedOptions).map(([name, value]) => `${name}: ${value}`)
    const specsString = selectedValsList.length > 0 
      ? selectedValsList.join(', ') 
      : activeProduct.specs

    // Generate a variation-specific unique cart item ID
    const variationSuffix = Object.entries(selectedOptions)
      .map(([name, value]) => `${name.toLowerCase()}-${value.toLowerCase()}`)
      .join('-')
    const cartItemId = variationSuffix 
      ? `${activeProduct._id}-${variationSuffix}` 
      : activeProduct._id

    addToCart({
      id: cartItemId,
      name: activeProduct.name,
      price: currentPrice,
      image: imageUrl,
      specs: specsString,
      quantity: quantity
    })

    toast({
      variant: 'success',
      description: (
        <div className="flex w-full">
          <div className="w-16 bg-[#10b981] flex items-center justify-center shrink-0 border-r-2 border-black">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="flex flex-col justify-center flex-1 !p-5" style={{ padding: '20px !important' }}>
            <h4 className="font-black text-black text-base uppercase tracking-tight mb-2">¡Añadido con éxito!</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-black bg-gray-50 flex items-center justify-center shrink-0 p-1">
                <img src={imageUrl} alt={activeProduct.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <p className="font-bold text-black text-xs leading-tight">{quantity}x {activeProduct.name}</p>
                {isHP && (
                  <p className="text-[10px] text-black/60 uppercase font-bold tracking-wider mt-1">{selectedCPU} | {selectedRAM}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      action: (
        <ToastAction altText="Ver Carrito" className="h-auto bg-[#000] text-white hover:bg-[#ff5500] hover:text-white border-none rounded-none border-l-2 border-black font-black uppercase text-xs tracking-widest px-6 transition-colors">
          Carrito
        </ToastAction>
      ),
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#ff5500] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black uppercase tracking-wider text-xs">Cargando Producto...</p>
        </div>
      </div>
    )
  }

  // Thumbnails gallery
  const thumbnails = activeProduct.gallery && activeProduct.gallery.length > 0
    ? activeProduct.gallery.map(img => urlFor(img).url())
    : [imageUrl, imageUrl, imageUrl]

  return (
    <main className="product-detail-page">
      <section className="product-essential container">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={imageUrl} alt={activeProduct.name} className="main-product-image" />
            {activeProduct.badge && (
              <div className="product-badge">{activeProduct.badge}</div>
            )}
          </div>
          <div className="image-thumbnails">
            {thumbnails.slice(0, 3).map((thumb, idx) => (
              <div key={idx} className={`thumb ${idx === 0 ? 'active' : ''}`}>
                <img src={thumb} alt={`Vista ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-panel">
          <nav className="breadcrumb">
            <a href="/">Inicio</a> / <a href="/tienda">Tienda</a> / <span>{activeProduct.category === 'laptops' ? 'Portátiles' : 'Accesorios'}</span>
          </nav>
          
          <span className="brand-label">{(activeProduct.brand || 'Tecnología').toUpperCase()} PREMIUM</span>
          <h1 className="product-title">{activeProduct.name}</h1>
          
          <div className="product-rating">
            <div className="stars">★★★★★</div>
            <span className="review-count">(12 reseñas verificadas)</span>
          </div>

          <div className="product-price-block">
            {activeProduct.oldPrice && (
              <span className="price-old" style={{ textDecoration: 'line-through', marginRight: '15px', color: '#888', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {formatPrice(activeProduct.oldPrice)}
              </span>
            )}
            <span className="price-current">{formatPrice(currentPrice)}</span>
            <span className="stock-status">
              {activeProduct.stock > 0 ? `Disponible (${activeProduct.stock} unidades)` : 'Agotado'}
            </span>
          </div>

          <p className="product-short-desc">
            {activeProduct.description}
          </p>

          {/* Configuration options - fully dynamic based on Sanity variations */}
          {activeProduct.variations && activeProduct.variations.length > 0 && (
            <div className="product-configuration">
              {activeProduct.variations.map((v) => {
                if (!v.options || v.options.length === 0) return null
                return (
                  <div className="config-item" key={v.name}>
                    <label>{v.name}</label>
                    <div className="option-pills">
                      {v.options.map((opt) => {
                        const isSelected = selectedOptions[v.name] === opt.value
                        return (
                          <button
                            key={opt.value}
                            className={`pill ${isSelected ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedOptions(prev => ({
                                ...prev,
                                [v.name]: opt.value
                              }))
                            }}
                          >
                            {opt.value}
                            {opt.priceModifier !== undefined && opt.priceModifier !== 0 && (
                              <span className="pill-price-mod" style={{ fontSize: '0.8rem', opacity: 0.8, marginLeft: '5px' }}>
                                {opt.priceModifier > 0 ? ` (+ ${formatPrice(opt.priceModifier)})` : ` (- ${formatPrice(Math.abs(opt.priceModifier))})`}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="product-purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(quantity - 1)}>−</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} 
                
              />
              <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>
            <button 
              className="btn btn-primary btn-lg btn-animated flex-1"
              onClick={handleAddToCart}
              disabled={activeProduct.stock <= 0}
            >
              {activeProduct.stock > 0 ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
            </button>
          </div>

          <div className="product-secondary-actions">
             <button className="btn-link">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
               Guardar
             </button>
             <button className="btn-link">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20v-6M9 17l3-3 3 3M12 4v6M9 7l3 3 3-3"/></svg>
               Comparar
             </button>
          </div>

          <div className="product-meta-info">
            <span><strong>SKU:</strong> {(activeProduct.brand || 'Generic').toUpperCase()}-{(activeProduct.slug || '').toUpperCase().slice(0, 10)}</span>
            <span><strong>Categoría:</strong> {activeProduct.category === 'laptops' ? 'Portátiles Corporativos' : 'Componentes y Accesorios'}</span>
            <span><strong>Etiquetas:</strong> {(activeProduct.brand || 'Novedad').toUpperCase()}, {(activeProduct.category || 'General').toUpperCase()}, Enterprise, Business</span>
          </div>
        </div>
      </section>

      <section className="product-detailed-info container">
        <div className="info-tabs">
          <button className="tab-btn active">Especificaciones</button>
        </div>
        <div className="tab-content">
          <table className="specs-table">
            <tbody>
              {activeProduct.variations && activeProduct.variations.length > 0 ? (
                activeProduct.variations.map((v, i) => (
                  <tr key={i}>
                    <td>{v.name}</td>
                    <td>{v.value}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td>Procesador</td>
                    <td>Intel® Core™ i7 (10 núcleos, 12MB Caché)</td>
                  </tr>
                  <tr>
                    <td>Memoria</td>
                    <td>16GB RAM DDR5-4800 MHz</td>
                  </tr>
                  <tr>
                    <td>Almacenamiento</td>
                    <td>SSD PCIe® NVMe™ de 512 GB M.2 Gen4</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default function ProductoPage() {
  return (
    <>
      <TopBar />
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh] bg-black text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#ff5500] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-black uppercase tracking-wider text-xs">Cargando...</p>
          </div>
        </div>
      }>
        <ProductoPageContent />
      </Suspense>
      <Footer />
    </>
  )
}
