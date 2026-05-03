'use client'

import React, { useState, useEffect } from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

export default function ProductoPage() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedCPU, setSelectedCPU] = useState('i7')
  const [selectedRAM, setSelectedRAM] = useState('16GB')
  const [basePrice] = useState(4890000)
  const [currentPrice, setCurrentPrice] = useState(basePrice)

  useEffect(() => {
    let price = basePrice
    if (selectedCPU === 'i5') price -= 400000
    if (selectedRAM === '32GB') price += 650000
    setCurrentPrice(price)
  }, [selectedCPU, selectedRAM, basePrice])

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

  const handleAddToCart = () => {
    const specs = `${selectedCPU === 'i7' ? 'Intel Core i7-1255U' : 'Intel Core i5-1235U'}, ${selectedRAM} DDR5`
    
    addToCart({
      id: `hp-elitebook-840-${selectedCPU}-${selectedRAM}`,
      name: 'EliteBook 840 G9 Business Laptop',
      price: currentPrice,
      image: '/images/product-laptop-hp.jpg',
      specs: specs,
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
                <img src="/images/product-laptop-hp.jpg" alt="HP Laptop" className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <p className="font-bold text-black text-xs leading-tight">{quantity}x EliteBook 840 G9</p>
                <p className="text-[10px] text-black/60 uppercase font-bold tracking-wider mt-1">{selectedCPU} | {selectedRAM}</p>
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

  return (
    <>
      <TopBar />
      <Header />
      <main className="product-detail-page">
        <section className="product-essential container">
          <div className="product-gallery">
            <div className="main-image-container">
              <img src="/images/product-laptop-hp.jpg" alt="HP EliteBook 840 G9" className="main-product-image" />
              <div className="product-badge">Top Seller</div>
            </div>
            <div className="image-thumbnails">
               <div className="thumb active"><img src="/images/product-laptop-hp.jpg" alt="Vista 1" /></div>
               <div className="thumb"><img src="/images/product-laptop-hp.jpg" alt="Vista 2" /></div>
               <div className="thumb"><img src="/images/product-laptop-hp.jpg" alt="Vista 3" /></div>
            </div>
          </div>

          <div className="product-info-panel">
            <nav className="breadcrumb">
              <a href="/">Inicio</a> / <a href="/tienda">Tienda</a> / <span>Portátiles</span>
            </nav>
            
            <span className="brand-label">HP Business Premium</span>
            <h1 className="product-title">EliteBook 840 G9 Business Laptop</h1>
            
            <div className="product-rating">
              <div className="stars">★★★★★</div>
              <span className="review-count">(12 reseñas verificadas)</span>
            </div>

            <div className="product-price-block">
              <span className="price-current">{formatPrice(currentPrice)}</span>
              <span className="stock-status">Disponible para envío hoy</span>
            </div>

            <p className="product-short-desc">
              Rendimiento corporativo sin concesiones. La EliteBook 840 G9 está diseñada para la movilidad híbrida, 
              con una pantalla 16:10 y seguridad avanzada HP Wolf Security. Cuerpo de aluminio forjado y 
              conectividad ultrarrápida.
            </p>

            <div className="product-configuration">
                <div className="config-item">
                  <label>Procesador Intel® Core™</label>
                  <div className="option-pills">
                    <button 
                      className={`pill ${selectedCPU === 'i7' ? 'active' : ''}`}
                      onClick={() => setSelectedCPU('i7')}
                    >
                      Core i7-1255U
                    </button>
                    <button 
                      className={`pill ${selectedCPU === 'i5' ? 'active' : ''}`}
                      onClick={() => setSelectedCPU('i5')}
                    >
                      Core i5-1235U
                    </button>
                  </div>
                </div>
                <div className="config-item">
                  <label>Memoria RAM DDR5</label>
                  <div className="option-pills">
                    <button 
                      className={`pill ${selectedRAM === '16GB' ? 'active' : ''}`}
                      onClick={() => setSelectedRAM('16GB')}
                    >
                      16GB (Standard)
                    </button>
                    <button 
                      className={`pill ${selectedRAM === '32GB' ? 'active' : ''}`}
                      onClick={() => setSelectedRAM('32GB')}
                    >
                      32GB (+ $650k)
                    </button>
                  </div>
                </div>
            </div>

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
              >
                AÑADIR AL CARRITO
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
              <span><strong>SKU:</strong> HP-EB840-G9-{selectedCPU.toUpperCase()}</span>
              <span><strong>Categoría:</strong> Portátiles Corporativos</span>
              <span><strong>Etiquetas:</strong> HP, EliteBook, Enterprise, Business</span>
            </div>
          </div>
        </section>

        <section className="product-detailed-info container">
          <div className="info-tabs">
            <button className="tab-btn active">Especificaciones</button>
            <button className="tab-btn">Descripción</button>
            <button className="tab-btn">Reviews</button>
          </div>
          <div className="tab-content">
            <table className="specs-table">
              <tbody>
                <tr>
                  <td>Procesador</td>
                  <td>{selectedCPU === 'i7' ? 'Intel® Core™ i7-1255U (10 núcleos, 12MB Caché)' : 'Intel® Core™ i5-1235U (10 núcleos, 12MB Caché)'}</td>
                </tr>
                <tr>
                  <td>Memoria</td>
                  <td>{selectedRAM} RAM DDR5-4800 MHz</td>
                </tr>
                <tr>
                  <td>Almacenamiento</td>
                  <td>SSD PCIe® NVMe™ de 512 GB M.2 Gen4</td>
                </tr>
                <tr>
                  <td>Pantalla</td>
                  <td>14" WUXGA (1920 x 1200), IPS, 400 nits, Low Blue Light</td>
                </tr>
                <tr>
                  <td>Seguridad</td>
                  <td>HP Wolf Pro Security Edition (1 año incluido)</td>
                </tr>
                <tr>
                  <td>Puertos</td>
                  <td>2 Thunderbolt™ 4, 2 USB Type-A, 1 HDMI 2.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="related-products container">
           <h2 className="section-title">Te puede interesar</h2>
           <div className="products-grid">
              <article className="product-card">
                <div className="product-image"><img src="/images/product-laptop-dell.jpg" alt="Dell XPS" /></div>
                <div className="product-info">
                  <span className="product-brand">DELL</span>
                  <h3 className="product-name">XPS 15 9530 Premium</h3>
                  <div className="product-pricing"><span className="product-price">$7.225.000</span></div>
                </div>
              </article>
              <article className="product-card">
                <div className="product-image"><img src="/images/product-laptop-lenovo.jpg" alt="Lenovo X1" /></div>
                <div className="product-info">
                  <span className="product-brand">LENOVO</span>
                  <h3 className="product-name">ThinkPad X1 Carbon Gen 10</h3>
                  <div className="product-pricing"><span className="product-price">$6.290.000</span></div>
                </div>
              </article>
           </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
