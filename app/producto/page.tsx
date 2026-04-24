'use client'

import React from 'react'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProductoPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="product-detail-page">
        <section className="product-essential container">
          <div className="product-gallery animate-on-scroll">
            <div className="main-image-container">
              <img src="/images/product-laptop-hp.jpg" alt="HP EliteBook 840 G9" className="main-product-image" />
              <div className="product-badge">Destacado</div>
            </div>
            <div className="image-thumbnails">
               <div className="thumb active"><img src="/images/product-laptop-hp.jpg" alt="Vista 1" /></div>
               <div className="thumb"><img src="/images/product-laptop-hp.jpg" alt="Vista 2" /></div>
               <div className="thumb"><img src="/images/product-laptop-hp.jpg" alt="Vista 3" /></div>
            </div>
          </div>

          <div className="product-info-panel animate-on-scroll">
            <nav className="breadcrumb">
              <a href="/">Inicio</a> / <a href="/tienda">Tienda</a> / <span>Portátiles</span>
            </nav>
            
            <span className="brand-label">HP Business Class</span>
            <h1 className="product-title">EliteBook 840 G9 Business Laptop</h1>
            
            <div className="product-rating">
              <div className="stars">★★★★★</div>
              <span className="review-count">(12 reseñas de clientes)</span>
            </div>

            <div className="product-price-block">
              <span className="price-current">$4.890.000</span>
              <span className="stock-status">En Inventario - Entrega Inmediata</span>
            </div>

            <p className="product-short-desc">
              La HP EliteBook 840 G9 redefine la productividad móvil con su diseño ultraligero y procesadores Intel Core de 12.ª generación. 
              Ideal para profesionales que exigen rendimiento, seguridad y durabilidad en un cuerpo de aluminio premium.
            </p>

            <div className="product-configuration">
               <div className="config-item">
                 <label>Procesador</label>
                 <select>
                   <option>Intel Core i7-1255U</option>
                   <option>Intel Core i5-1235U (-$400.000)</option>
                 </select>
               </div>
               <div className="config-item">
                 <label>Memoria RAM</label>
                 <div className="option-pills">
                   <button className="pill active">16GB DDR5</button>
                   <button className="pill">32GB DDR5</button>
                 </div>
               </div>
            </div>

            <div className="product-purchase-actions">
              <div className="quantity-selector">
                <button>-</button>
                <input type="number" defaultValue="1" />
                <button>+</button>
              </div>
              <button className="btn btn-primary btn-lg btn-animated flex-1">AÑADIR AL CARRITO</button>
            </div>

            <div className="product-secondary-actions">
               <button className="btn-link">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                 Lista de deseos
               </button>
               <button className="btn-link">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M9 17l3-3 3 3M12 4v6M9 7l3 3 3-3"/></svg>
                 Comparar
               </button>
            </div>

            <div className="product-meta-info">
              <span><strong>SKU:</strong> HP-EB840-G9-01</span>
              <span><strong>Categoría:</strong> Portátiles Corporativos</span>
              <span><strong>Etiquetas:</strong> HP, EliteBook, Core i7, DDR5</span>
            </div>
          </div>
        </section>

        <section className="product-detailed-info container">
          <div className="info-tabs">
            <button className="tab-btn active">Especificaciones Técnicas</button>
            <button className="tab-btn">Descripción Detallada</button>
            <button className="tab-btn">Garantía y Soporte</button>
          </div>
          <div className="tab-content animate-on-scroll">
            <table className="specs-table">
              <tbody>
                <tr>
                  <td>Procesador</td>
                  <td>Intel® Core™ i7-1255U (hasta 4,7 GHz, 12 MB de caché L3, 10 núcleos)</td>
                </tr>
                <tr>
                  <td>Memoria</td>
                  <td>16 GB de RAM DDR5-4800 MHz (1 x 16 GB)</td>
                </tr>
                <tr>
                  <td>Almacenamiento</td>
                  <td>SSD PCIe® NVMe™ de 512 GB</td>
                </tr>
                <tr>
                  <td>Pantalla</td>
                  <td>14" diagonal, WUXGA (1920 x 1200), IPS, anti-glare, 400 nits</td>
                </tr>
                <tr>
                  <td>Gráficos</td>
                  <td>Intel® Iris® Xᵉ Graphics</td>
                </tr>
                <tr>
                  <td>Sistema Operativo</td>
                  <td>Windows 11 Pro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="related-products container">
           <h2 className="section-title">Productos Relacionados</h2>
           <div className="products-grid">
              {/* Product cards will reuse store styling */}
              <article className="product-card">
                <div className="product-image"><img src="/images/product-laptop-dell.jpg" alt="Dell XPS" /></div>
                <div className="product-info">
                  <span className="product-brand">DELL</span>
                  <h3 className="product-name">XPS 15 9530</h3>
                  <div className="product-pricing"><span className="product-price">$7.225.000</span></div>
                </div>
              </article>
              <article className="product-card">
                <div className="product-image"><img src="/images/product-laptop-lenovo.jpg" alt="Lenovo X1" /></div>
                <div className="product-info">
                  <span className="product-brand">LENOVO</span>
                  <h3 className="product-name">ThinkPad X1 Carbon</h3>
                  <div className="product-pricing"><span className="product-price">$6.290.000</span></div>
                </div>
              </article>
           </div>
        </section>
      </main>
      <Footer />
      
      <style jsx>{`
        .product-detail-page {
          padding-top: 120px;
          padding-bottom: 80px;
          background: #fdfdfd;
        }
        .product-essential {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }
        @media (min-width: 1024px) {
          .product-essential {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        .main-image-container {
          position: relative;
          aspect-ratio: 1;
          background: #f8f8f8;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .main-product-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
        .image-thumbnails {
          display: flex;
          gap: 15px;
        }
        .thumb {
          width: 80px;
          height: 80px;
          border: 1px solid #eee;
          cursor: pointer;
          padding: 10px;
          background: #f8f8f8;
        }
        .thumb.active { border-color: var(--color-primary); }
        .thumb img { width: 100%; height: 100%; object-fit: contain; mix-blend-mode: multiply; }
        
        .breadcrumb { font-size: 13px; color: #888; margin-bottom: 20px; }
        .breadcrumb a { color: #888; text-decoration: none; }
        .brand-label { font-size: 12px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 2px; }
        .product-title { font-size: 32px; font-weight: 900; margin: 10px 0; color: #0a0a0a; line-height: 1.1; }
        .product-price-block { margin: 25px 0; }
        .price-current { font-size: 36px; font-weight: 800; color: var(--color-primary); display: block; }
        .stock-status { font-size: 12px; color: #22c55e; font-weight: 600; }
        
        .product-short-desc { color: #555; line-height: 1.6; margin-bottom: 30px; }
        
        .config-item { margin-bottom: 20px; }
        .config-item label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; }
        .option-pills { display: flex; gap: 10px; }
        .pill { padding: 8px 15px; border: 1px solid #ddd; background: none; font-size: 13px; cursor: pointer; }
        .pill.active { background: #0a0a0a; color: #fff; border-color: #0a0a0a; }
        
        .product-purchase-actions { 
          display: flex; 
          gap: 15px; 
          margin-top: 35px;
          height: 56px;
        }
        .quantity-selector { 
          display: flex; 
          background: #f5f5f5;
          border-radius: 4px;
          overflow: hidden;
          padding: 4px;
          border: 1px solid #eee;
        }
        .quantity-selector button { 
          width: 48px; 
          height: 100%;
          border: none; 
          background: transparent; 
          font-size: 18px;
          cursor: pointer; 
          color: #0a0a0a;
          transition: background 0.2s;
        }
        .quantity-selector button:hover {
          background: #e5e5e5;
        }
        .quantity-selector input { 
          width: 44px; 
          border: none; 
          background: transparent;
          text-align: center; 
          font-weight: 800; 
          font-size: 16px;
          color: #0a0a0a;
          -moz-appearance: textfield;
        }
        .quantity-selector input::-webkit-outer-spin-button,
        .quantity-selector input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .flex-1 { flex: 1; }

        .product-secondary-actions {
          display: flex;
          gap: 24px;
          margin-top: 25px;
        }
        .btn-link {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #555;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .btn-link:hover {
          color: #0a0a0a;
        }
        .btn-link svg {
          stroke: currentColor;
          transition: transform 0.2s;
        }
        .btn-link:hover svg {
          transform: scale(1.1);
        }
        
        .product-meta-info { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #666; }
        
        .tab-btn { padding: 15px 30px; border: none; background: none; font-weight: 700; font-size: 14px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.3s; }
        .tab-btn.active { border-bottom-color: var(--color-primary); color: var(--color-primary); }
        .tab-btn:hover:not(.active) { color: #0a0a0a; border-bottom-color: #eee; }
        
        .specs-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .specs-table td { padding: 15px; border-bottom: 1px solid #eee; font-size: 14px; }
        .specs-table td:first-child { font-weight: 700; width: 30%; color: #888; }
        
        .related-products { padding-top: 100px; }
      `}</style>
    </>
  )
}
