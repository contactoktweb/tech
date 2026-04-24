'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ShopInterest() {
  const router = useRouter()

  return (
    <section className="shop-interest">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Comprar por Interés</h2>
        <p className="section-subtitle animate-on-scroll">Encuentra lo que necesitas según tu perfil</p>
        <div className="interest-grid">
          <article className="interest-card animate-on-scroll" style={{"--delay": 0, cursor: "pointer"} as React.CSSProperties} onClick={() => router.push('/producto')}>
            <div className="interest-bg"></div>
            <div className="interest-overlay"></div>
            <div className="interest-content">
              <h3>Productividad de Oficina</h3>
              <p>Soluciones para el trabajo diario</p>
              <Link href="/producto" className="btn btn-outline btn-light btn-animated">Explorar</Link>
            </div>
          </article>
          <article className="interest-card animate-on-scroll" style={{"--delay": 1, cursor: "pointer"} as React.CSSProperties} onClick={() => router.push('/producto')}>
            <div className="interest-bg"></div>
            <div className="interest-overlay"></div>
            <div className="interest-content">
              <h3>Infraestructura Empresarial</h3>
              <p>Equipos para tu data center</p>
              <Link href="/producto" className="btn btn-outline btn-light btn-animated">Explorar</Link>
            </div>
          </article>
          <article className="interest-card animate-on-scroll" style={{"--delay": 2, cursor: "pointer"} as React.CSSProperties} onClick={() => router.push('/producto')}>
            <div className="interest-bg"></div>
            <div className="interest-overlay"></div>
            <div className="interest-content">
              <h3>Gaming</h3>
              <p>Alto rendimiento para gamers</p>
              <Link href="/producto" className="btn btn-outline btn-light btn-animated">Explorar</Link>
            </div>
          </article>
          <article className="interest-card animate-on-scroll" style={{"--delay": 3, cursor: "pointer"} as React.CSSProperties} onClick={() => router.push('/producto')}>
            <div className="interest-bg"></div>
            <div className="interest-overlay"></div>
            <div className="interest-content">
              <h3>Movilidad</h3>
              <p>Trabaja desde cualquier lugar</p>
              <Link href="/producto" className="btn btn-outline btn-light btn-animated">Explorar</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

