'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, MessageCircle } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-bottom-nav">
      <Link href="/" className={`bottom-nav-item ${pathname === '/' ? 'active' : ''}`}>
        <Home className="nav-icon" />
        <span>Inicio</span>
      </Link>
      
      <Link href="/tienda" className={`bottom-nav-item ${pathname === '/tienda' || pathname.startsWith('/producto') ? 'active' : ''}`}>
        <ShoppingBag className="nav-icon" />
        <span>Tienda</span>
      </Link>

      <a href="https://wa.me/573144874534" target="_blank" rel="noopener noreferrer" className="bottom-nav-item">
        <MessageCircle className="nav-icon" />
        <span>Contacto</span>
      </a>
    </nav>
  )
}
