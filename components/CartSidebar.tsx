'use client'

import React from 'react'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Tu Carrito</h3>
          <button className="close-cart" onClick={onClose} aria-label="Cerrar carrito">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {/* Example Item (Empty state for now) */}
          <div className="empty-cart">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Tu carrito está vacío</p>
            <button className="btn btn-primary btn-sm" onClick={onClose}>Continuar comprando</button>
          </div>
        </div>

        <div className="cart-footer">
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>$0.00</span>
            </div>
          </div>
          <button className="btn btn-primary btn-full" disabled>Finalizar Compra</button>
        </div>
      </div>
    </>
  )
}
