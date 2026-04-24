'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer id="contacto" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h5>Enlaces Rápidos</h5>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/#nosotros">Nosotros</Link></li>
              <li><Link href="/#portafolio">Portafolio</Link></li>
              <li><Link href="/#servicios">Servicios</Link></li>
              <li><Link href="/tienda">Tienda</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Servicios</h5>
            <ul>
              <li><Link href="/tienda">Computadores</Link></li>
              <li><Link href="/#servicios">Licencias Microsoft</Link></li>
              <li><Link href="/tienda">Componentes</Link></li>
              <li><Link href="/#servicios">Soporte Técnico</Link></li>
            </ul>
          </div>
          <div className="footer-col" id="soporte">
            <h5>Soporte y Contacto</h5>
            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+573144874534">314 4874534</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:ventas@fangantech.com.co">ventas@fangantech.com.co</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Cl. 37 Sur #78b 35, Oficina 401</span>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Síguenos</h5>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
            </div>
            <div className="footer-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-75.6!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJOIDc1wrAzNicwMC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%" 
                height="120" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={false}
                loading="lazy" 
                title="Google Maps">
              </iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" fill="white"/>
              <path d="M10 12H30V14H10V12ZM10 19H25V21H10V19ZM10 26H30V28H10V26Z" fill="black"/>
            </svg>
            <span>FANGAN TECH</span>
          </div>
          
          <div className="footer-legal-block">
            <p>© {year} FANGAN TECH S.A.S. Todos los derechos reservados.</p>
            <a 
              href="https://www.kytcode.lat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="kyt-attribution"
              style={{ 
                color: '#ffffff', 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                marginTop: '10px',
                fontWeight: '600',
                fontSize: '0.8rem'
              }}
            >
              Desarrollado por K&T 
              <span style={{ color: '#ffffff', marginLeft: '5px' }}>❤️</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
