'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CartSidebar from './CartSidebar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isCartOpen) setIsCartOpen(false)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar container">
          <Link href="/" className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" fill="currentColor"/>
              <path d="M10 12H30V14H10V12ZM10 19H25V21H10V19ZM10 26H30V28H10V26Z" fill="white"/>
            </svg>
            <span>FANGAN TECH</span>
          </Link>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link href="/#nosotros" className="nav-link">Nosotros</Link></li>
            <li><Link href="/#portafolio" className="nav-link">Portafolio</Link></li>
            <li><Link href="/#servicios" className="nav-link">Servicios</Link></li>
            <li><Link href="/#contacto" className="nav-link">Contáctenos</Link></li>
          </ul>

          <div className="nav-actions">
            <button className="cart-toggle" onClick={toggleCart} aria-label="Ver carrito">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">0</span>
            </button>
            <Link href="/tienda" className="btn btn-primary nav-cta">Ir a la Tienda</Link>
            
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
              aria-label="Abrir menú" 
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="hamburger"></span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li><Link href="/#nosotros" onClick={toggleMenu}>Nosotros</Link></li>
            <li><Link href="/#portafolio" onClick={toggleMenu}>Portafolio</Link></li>
            <li><Link href="/tienda" onClick={toggleMenu}>Tienda</Link></li>
            <li><Link href="/#servicios" onClick={toggleMenu}>Servicios</Link></li>
            <li><Link href="/#contacto" onClick={toggleMenu}>Contáctenos</Link></li>
          </ul>
          <Link href="/tienda" className="btn btn-primary mobile-cta" onClick={toggleMenu}>Ir a la Tienda</Link>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}


