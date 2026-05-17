'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CartSidebar from './CartSidebar'
import { useCart } from '@/context/CartContext'
import { useSettings } from '@/hooks/useSettings'

export default function Header() {
  const { cartCount } = useCart()
  const { settings, getLogoLargoUrl } = useSettings()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const formatDisplayNum = (num: string | undefined | null) => {
    if (!num) return '314 4874534'
    const clean = num.replace(/^57/, '')
    if (clean.length === 10 && !clean.includes(' ')) {
      return `${clean.slice(0, 3)} ${clean.slice(3)}`
    }
    return clean
  }
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
        <nav className="navbar container animate-on-scroll reveal-perspective">
          <Link href="/" className="logo">
            <Image
              src={getLogoLargoUrl()}
              alt={settings?.title || "FANGAN TECH - Tecnología que Transforma"}
              width={280}
              height={75}
              priority
              style={{ height: 'auto', maxHeight: '80px', width: 'auto' }}
            />
          </Link>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link href="/#nosotros" className="nav-link">Nosotros</Link></li>
            <li><Link href="/#portafolio" className="nav-link">Portafolio</Link></li>
            <li><Link href="/#servicios" className="nav-link">Servicios</Link></li>
            <li><Link href="/#contacto" className="nav-link">Contáctenos</Link></li>
          </ul>

          <div className="nav-actions">
            {/* WhatsApp quick contact */}
            <a
              href={`https://wa.me/${settings?.whatsapp?.numero || '573144874534'}${settings?.whatsapp?.mensaje ? `?text=${encodeURIComponent(settings.whatsapp.mensaje)}` : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp-link"
              aria-label="Contactar por WhatsApp"
            >
              <svg viewBox="0 0 32 32" width="22" height="22" fill="#25D366">
                <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.822.736 5.578 2.137 8.012L.072 32l8.17-2.14A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16.001 32 7.163 24.837 0 16.004 0zm0 29.39a13.36 13.36 0 01-6.81-1.864l-.488-.29-5.065 1.328 1.35-4.937-.318-.504A13.32 13.32 0 012.61 16.001c0-7.39 6.006-13.397 13.394-13.397 7.39 0 13.396 6.007 13.396 13.397 0 7.392-6.006 13.389-13.396 13.389zm7.346-10.03c-.403-.201-2.383-1.175-2.752-1.31-.37-.133-.639-.2-.908.202-.269.4-1.042 1.31-1.278 1.578-.235.27-.47.303-.873.101-.403-.2-1.702-.627-3.242-2-.198-.178-1.72-1.538-2.058-2.443-.235-.49.013-.643.177-.849.17-.184.38-.48.57-.72.19-.24.253-.41.38-.683.126-.27.063-.506-.033-.708-.095-.2-.907-2.189-1.243-2.995-.327-.787-.66-.68-.907-.692-.235-.012-.504-.014-.773-.014s-.707.1-1.078.5c-.37.4-1.413 1.38-1.413 3.368s1.447 3.905 1.649 4.175c.2.27 2.847 4.344 6.898 6.09.964.416 1.716.664 2.302.85.967.307 1.848.264 2.544.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.235-1.914-.1-.168-.37-.268-.773-.47z"/>
              </svg>
              <span className="header-whatsapp-number">{formatDisplayNum(settings?.whatsapp?.numero)}</span>
            </a>

            <button className="cart-toggle" onClick={toggleCart} aria-label="Ver carrito">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
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
          <a
            href={`https://wa.me/${settings?.whatsapp?.numero || '573144874534'}${settings?.whatsapp?.mensaje ? `?text=${encodeURIComponent(settings.whatsapp.mensaje)}` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-whatsapp-link"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" fill="#25D366">
              <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.822.736 5.578 2.137 8.012L.072 32l8.17-2.14A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16.001 32 7.163 24.837 0 16.004 0zm0 29.39a13.36 13.36 0 01-6.81-1.864l-.488-.29-5.065 1.328 1.35-4.937-.318-.504A13.32 13.32 0 012.61 16.001c0-7.39 6.006-13.397 13.394-13.397 7.39 0 13.396 6.007 13.396 13.397 0 7.392-6.006 13.389-13.396 13.389zm7.346-10.03c-.403-.201-2.383-1.175-2.752-1.31-.37-.133-.639-.2-.908.202-.269.4-1.042 1.31-1.278 1.578-.235.27-.47.303-.873.101-.403-.2-1.702-.627-3.242-2-.198-.178-1.72-1.538-2.058-2.443-.235-.49.013-.643.177-.849.17-.184.38-.48.57-.72.19-.24.253-.41.38-.683.126-.27.063-.506-.033-.708-.095-.2-.907-2.189-1.243-2.995-.327-.787-.66-.68-.907-.692-.235-.012-.504-.014-.773-.014s-.707.1-1.078.5c-.37.4-1.413 1.38-1.413 3.368s1.447 3.905 1.649 4.175c.2.27 2.847 4.344 6.898 6.09.964.416 1.716.664 2.302.85.967.307 1.848.264 2.544.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.235-1.914-.1-.168-.37-.268-.773-.47z"/>
            </svg>
            WhatsApp: {formatDisplayNum(settings?.whatsapp?.numero)}
          </a>
          <Link href="/tienda" className="btn btn-primary mobile-cta" onClick={toggleMenu}>Ir a la Tienda</Link>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
