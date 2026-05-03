'use client'

import React from 'react'

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-content">
        <p className="top-bar-promo">Envío gratis a partir de compras superiores a $500.000 COP.</p>
        <div className="top-bar-contact">
          <a href="https://wa.me/573144874534" target="_blank" rel="noopener noreferrer" className="top-bar-whatsapp">
            <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
              <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.822.736 5.578 2.137 8.012L.072 32l8.17-2.14A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16.001 32 7.163 24.837 0 16.004 0zm0 29.39a13.36 13.36 0 01-6.81-1.864l-.488-.29-5.065 1.328 1.35-4.937-.318-.504A13.32 13.32 0 012.61 16.001c0-7.39 6.006-13.397 13.394-13.397 7.39 0 13.396 6.007 13.396 13.397 0 7.392-6.006 13.389-13.396 13.389zm7.346-10.03c-.403-.201-2.383-1.175-2.752-1.31-.37-.133-.639-.2-.908.202-.269.4-1.042 1.31-1.278 1.578-.235.27-.47.303-.873.101-.403-.2-1.702-.627-3.242-2-.198-.178-1.72-1.538-2.058-2.443-.235-.49.013-.643.177-.849.17-.184.38-.48.57-.72.19-.24.253-.41.38-.683.126-.27.063-.506-.033-.708-.095-.2-.907-2.189-1.243-2.995-.327-.787-.66-.68-.907-.692-.235-.012-.504-.014-.773-.014s-.707.1-1.078.5c-.37.4-1.413 1.38-1.413 3.368s1.447 3.905 1.649 4.175c.2.27 2.847 4.344 6.898 6.09.964.416 1.716.664 2.302.85.967.307 1.848.264 2.544.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.235-1.914-.1-.168-.37-.268-.773-.47z"/>
            </svg>
            <span>Servicio al Cliente: 314 4874534</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .top-bar {
          background: #000;
          color: #fff;
          padding: 8px 0;
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-bar-whatsapp {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #25D366;
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .top-bar-whatsapp:hover {
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .top-bar-content {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
