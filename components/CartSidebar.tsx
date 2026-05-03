'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      ></div>

      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <div className="header-top">
            <h3>Carrito de Compras</h3>
            <button className="close-cart" onClick={onClose} aria-label="Cerrar carrito">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="cart-progress-indicator">
            <span className="count-label">{cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}</span>
            <div className="free-shipping-bar">
              <div className="progress" style={{ width: '100%' }}></div>
            </div>
            <p className="shipping-note">¡Tienes envío GRATIS en toda tu compra!</p>
          </div>
        </div>

        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-main">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Eliminar"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                  {item.specs && <p className="cart-item-specs-tag">{item.specs}</p>}
                  <div className="cart-item-footer">
                    <div className="qty-selector-mini">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-item-pricing">
                      <span className="total-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart-view">
              <div className="empty-icon-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h4>Tu carrito está vacío</h4>
              <p>Parece que aún no has añadido nada. ¡Explora nuestras ofertas tecnológicas!</p>
              <button className="btn btn-primary" onClick={onClose}>Explorar Tienda</button>
            </div>
          )}
        </div>

        <div className="cart-footer-new">
          <div className="cart-totals-grid">
            <div className="total-row">
              <span className="label">Subtotal</span>
              <span className="val">{formatPrice(cartTotal)}</span>
            </div>
            <div className="total-row main">
              <span className="label">Total Estimado</span>
              <span className="val">{formatPrice(cartTotal)}</span>
            </div>
          </div>
          <div className="cart-actions-box">
            <Link 
              href="/pagos" 
              className={`btn btn-primary btn-checkout ${cart.length === 0 ? 'disabled' : ''}`}
              onClick={onClose}
            >
              <span>Proceder al Pago</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
          <div className="secure-checkout-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path>
            </svg>
            Pago 100% Seguro & Encriptado
          </div>
        </div>
      </div>
    </>
  )
}
