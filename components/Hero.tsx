import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero elegant-hero">
      <div className="hero-bg"></div>
      <div className="hero-grid container">
        <div className="hero-content">
          <div className="hero-text-wrapper">
            <div className="elegant-badge"><span>Soluciones Especializadas</span></div>
            <h1 className="hero-title">
              <span className="title-line" data-reveal>EL FUTURO</span>
              <span className="title-line" data-reveal>DE TU EMPRESA</span>
              <span className="title-line title-accent" data-reveal>ES AHORA</span>
            </h1>
            <p className="hero-subtitle" data-reveal>
              Hardware de vanguardia y software corporativo para maximizar la productividad de tu organización.
            </p>
            <div className="hero-cta" data-reveal>
              <Link href="/tienda" className="btn btn-primary btn-lg btn-animated">Explorar Catálogo</Link>
              <a href="#contacto" className="btn btn-outline btn-lg btn-animated">Contactar Ventas</a>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="elegant-tech-graphic">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="fine-circuit">
              <path d="M50 200 L150 100 L250 100 L350 200" stroke="currentColor" strokeWidth="1" className="circuit-path-1" />
              <path d="M100 50 L100 150 L300 150 L300 250" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="circuit-path-2" />
              <path d="M50 300 L150 200 L250 300 L350 300" stroke="currentColor" strokeWidth="1" className="circuit-path-3" />
              
              <circle cx="150" cy="100" r="3" fill="currentColor" className="circuit-node" />
              <circle cx="250" cy="100" r="3" fill="currentColor" className="circuit-node" />
              <circle cx="100" cy="150" r="3" fill="currentColor" className="circuit-node" />
              <circle cx="300" cy="150" r="3" fill="currentColor" className="circuit-node" />
              <circle cx="150" cy="200" r="3" fill="currentColor" className="circuit-node" />
              
              <rect x="175" y="125" width="50" height="50" stroke="currentColor" strokeWidth="1" fill="none" className="circuit-chip" />
              <rect x="180" y="130" width="40" height="40" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.05" className="circuit-chip" />
              
              <line x1="200" y1="125" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
              <line x1="225" y1="150" x2="250" y2="150" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
