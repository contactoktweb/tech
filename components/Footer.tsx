'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useSettings } from '@/hooks/useSettings'

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const { settings, getLogoLargoUrl } = useSettings()

  const formatDisplayNum = (num: string | undefined | null) => {
    if (!num) return '314 4874534'
    const clean = num.replace(/^\+57/, '').replace(/^57/, '')
    if (clean.length === 10 && !clean.includes(' ')) {
      return `${clean.slice(0, 3)} ${clean.slice(3)}`
    }
    return clean
  }

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer id="contacto" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h2 className="footer-col-title">Enlace Rápidos</h2>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/#nosotros">Nosotros</Link></li>
              <li><Link href="/#portafolio">Portafolio</Link></li>
              <li><Link href="/#servicios">Servicios</Link></li>
              <li><Link href="/tienda">Tienda</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-col-title">Servicios</h2>
            <ul>
              <li><Link href="/tienda">Computadores</Link></li>
              <li><Link href="/#servicios">Licencias Microsoft</Link></li>
              <li><Link href="/tienda">Componentes</Link></li>
              <li><Link href="/#servicios">Soporte Técnico</Link></li>
            </ul>
          </div>
          <div className="footer-col" id="soporte">
            <h2 className="footer-col-title">Soporte y Contacto</h2>
            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href={`tel:${settings?.contacto?.telefono || '+573144874534'}`}>{formatDisplayNum(settings?.contacto?.telefono)}</a>
              </li>
              <li>
                <svg viewBox="0 0 32 32" width="18" height="18" fill="#25D366">
                  <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.822.736 5.578 2.137 8.012L.072 32l8.17-2.14A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16.001 32 7.163 24.837 0 16.004 0zm0 29.39a13.36 13.36 0 01-6.81-1.864l-.488-.29-5.065 1.328 1.35-4.937-.318-.504A13.32 13.32 0 012.61 16.001c0-7.39 6.006-13.397 13.394-13.397 7.39 0 13.396 6.007 13.396 13.397 0 7.392-6.006 13.389-13.396 13.389zm7.346-10.03c-.403-.201-2.383-1.175-2.752-1.31-.37-.133-.639-.2-.908.202-.269.4-1.042 1.31-1.278 1.578-.235.27-.47.303-.873.101-.403-.2-1.702-.627-3.242-2-.198-.178-1.72-1.538-2.058-2.443-.235-.49.013-.643.177-.849.17-.184.38-.48.57-.72.19-.24.253-.41.38-.683.126-.27.063-.506-.033-.708-.095-.2-.907-2.189-1.243-2.995-.327-.787-.66-.68-.907-.692-.235-.012-.504-.014-.773-.014s-.707.1-1.078.5c-.37.4-1.413 1.38-1.413 3.368s1.447 3.905 1.649 4.175c.2.27 2.847 4.344 6.898 6.09.964.416 1.716.664 2.302.85.967.307 1.848.264 2.544.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.235-1.914-.1-.168-.37-.268-.773-.47z"/>
                </svg>
                <a href={`https://wa.me/${settings?.whatsapp?.numero || '573144874534'}${settings?.whatsapp?.mensaje ? `?text=${encodeURIComponent(settings.whatsapp.mensaje)}` : ''}`} target="_blank" rel="noopener noreferrer">WhatsApp: {formatDisplayNum(settings?.whatsapp?.numero)}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href={`mailto:${settings?.contacto?.email || 'ventas@fangantech.com.co'}`}>{settings?.contacto?.email || 'ventas@fangantech.com.co'}</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{settings?.contacto?.direccion || 'Cl. 37 Sur #78b 35, Oficina 401'}</span>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h2 className="footer-col-title">Síguenos</h2>
            <div className="social-links">
              {settings?.redesSociales?.instagram && (
                <a href={settings.redesSociales.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              )}
              {settings?.redesSociales?.facebook && (
                <a href={settings.redesSociales.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
              {settings?.redesSociales?.tiktok && (
                <a href={settings.redesSociales.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              )}
            </div>
            <div className="footer-map" style={{ position: 'relative' }}>
              {settings?.googleMapsUrl && (
                <a 
                  href={settings.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                  aria-label="Abrir en Google Maps"
                />
              )}
              {settings?.googleMaps ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: settings.googleMaps.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="120"') }}
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)', pointerEvents: settings?.googleMapsUrl ? 'none' : 'auto' }}
                />
              ) : (
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-75.6!3d6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJOIDc1wrAzNicwMC4wIlc!5e0!3m2!1ses!2sco!4v1234567890"
                  width="100%" 
                  height="120" 
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)', pointerEvents: settings?.googleMapsUrl ? 'none' : 'auto' }} 
                  allowFullScreen={false}
                  loading="lazy" 
                  title="Ubicación de FANGAN TECH en Google Maps">
                </iframe>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo">
            <Image
              src={getLogoLargoUrl()}
              alt={"FANGAN TECH - Tecnología que Transforma"}
              width={220}
              height={55}
              style={{ height: 'auto', maxHeight: '55px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
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
                fontSize: '0.85rem',
                opacity: '0.8',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              Desarrollado por K&T 
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff" style={{ marginLeft: '6px' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
