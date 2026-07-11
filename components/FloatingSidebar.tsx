'use client'

import React, { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'

export default function FloatingSidebar() {
  const { settings } = useSettings()
  const [isPqrOpen, setIsPqrOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: 'peticion',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/pqr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setIsPqrOpen(false)
          setFormData({ nombre: '', email: '', telefono: '', tipo: 'peticion', mensaje: '' })
        }, 3000)
      } else {
        const data = await res.json()
        alert(data.error || 'Hubo un error al enviar la solicitud.')
      }
    } catch (error) {
      console.error(error)
      alert('Error de conexión al enviar la solicitud.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* Floating Right Sidebar */}
      <aside className="floating-sidebar animate-on-scroll reveal-right" aria-label="Acciones rápidas">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${settings?.whatsapp?.numero || '573144874534'}${settings?.whatsapp?.mensaje ? `?text=${encodeURIComponent(settings.whatsapp.mensaje)}` : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-sidebar-btn floating-sidebar-whatsapp"
          aria-label="Contactar por WhatsApp"
        >
          <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
            <path d="M16.004 0C7.165 0 0 7.163 0 16.001c0 2.822.736 5.578 2.137 8.012L.072 32l8.17-2.14A15.94 15.94 0 0016.004 32C24.837 32 32 24.837 32 16.001 32 7.163 24.837 0 16.004 0zm0 29.39a13.36 13.36 0 01-6.81-1.864l-.488-.29-5.065 1.328 1.35-4.937-.318-.504A13.32 13.32 0 012.61 16.001c0-7.39 6.006-13.397 13.394-13.397 7.39 0 13.396 6.007 13.396 13.397 0 7.392-6.006 13.389-13.396 13.389zm7.346-10.03c-.403-.201-2.383-1.175-2.752-1.31-.37-.133-.639-.2-.908.202-.269.4-1.042 1.31-1.278 1.578-.235.27-.47.303-.873.101-.403-.2-1.702-.627-3.242-2-.198-.178-1.72-1.538-2.058-2.443-.235-.49.013-.643.177-.849.17-.184.38-.48.57-.72.19-.24.253-.41.38-.683.126-.27.063-.506-.033-.708-.095-.2-.907-2.189-1.243-2.995-.327-.787-.66-.68-.907-.692-.235-.012-.504-.014-.773-.014s-.707.1-1.078.5c-.37.4-1.413 1.38-1.413 3.368s1.447 3.905 1.649 4.175c.2.27 2.847 4.344 6.898 6.09.964.416 1.716.664 2.302.85.967.307 1.848.264 2.544.16.776-.116 2.383-.974 2.719-1.914.336-.94.336-1.746.235-1.914-.1-.168-.37-.268-.773-.47z"/>
          </svg>
          <span className="floating-sidebar-label">WhatsApp</span>
        </a>

        {/* Pagos */}
        <a
          href="/pagos"
          className="floating-sidebar-btn floating-sidebar-payments"
          aria-label="Realizar pago"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="floating-sidebar-label">Pagos</span>
        </a>

        {/* Correo / PQR */}
        <button
          onClick={() => setIsPqrOpen(true)}
          className="floating-sidebar-btn floating-sidebar-email"
          aria-label="Enviar PQR por correo"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="floating-sidebar-label">PQR</span>
        </button>
      </aside>

      {/* PQR Modal */}
      {isPqrOpen && (
        <div className="pqr-overlay" onClick={() => setIsPqrOpen(false)}>
          <div className="pqr-modal" onClick={e => e.stopPropagation()}>
            <div className="pqr-modal-header">
              <h2>Gestión de PQR</h2>
              <p>Peticiones, Quejas, Reclamos y Sugerencias</p>
              <button className="pqr-close" onClick={() => setIsPqrOpen(false)} aria-label="Cerrar formulario PQR">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {isSubmitted ? (
              <div className="pqr-success">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>¡Solicitud Enviada!</h3>
                <p>Hemos recibido tu PQR. Nuestro equipo se pondrá en contacto contigo dentro de las próximas 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pqr-form">
                <div className="pqr-form-group">
                  <label htmlFor="pqr-nombre">Nombre completo</label>
                  <input
                    id="pqr-nombre"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="pqr-form-row">
                  <div className="pqr-form-group">
                    <label htmlFor="pqr-email">Correo electrónico</label>
                    <input
                      id="pqr-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="pqr-form-group">
                    <label htmlFor="pqr-telefono">Teléfono</label>
                    <input
                      id="pqr-telefono"
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="300 1234567"
                    />
                  </div>
                </div>
                <div className="pqr-form-group">
                  <label htmlFor="pqr-tipo">Tipo de solicitud</label>
                  <select
                    id="pqr-tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="peticion">Petición</option>
                    <option value="queja">Queja</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>
                <div className="pqr-form-group">
                  <label htmlFor="pqr-mensaje">Descripción detallada</label>
                  <textarea
                    id="pqr-mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe tu solicitud con el mayor detalle posible..."
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg pqr-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
