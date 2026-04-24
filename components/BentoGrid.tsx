import Link from 'next/link'

export default function BentoGrid() {
  return (
    <section id="servicios" className="dual-cards">
      <div className="container">
        <div className="bento-grid">
          <article className="bento-card bento-card-main animate-on-scroll">
            <div className="bento-icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="40" height="40" stroke="currentColor" strokeWidth="2"/>
                <circle cx="30" cy="25" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 45C18 38.37 23.37 33 30 33C36.63 33 42 38.37 42 45" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Catálogo Tecnológico</h3>
            <p>Descubre nuestra amplia gama de equipos de última generación. Desde portátiles corporativos hasta infraestructura de alto rendimiento.</p>
            <Link href="/tienda" className="btn btn-primary btn-animated">Ver productos</Link>
          </article>
          <article className="bento-card bento-card-secondary animate-on-scroll">
            <div className="bento-icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10L50 20V35C50 45 42 52 30 55C18 52 10 45 10 35V20L30 10Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M22 30L28 36L38 26" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
              </svg>
            </div>
            <h3>Propuesta de Valor Única</h3>
            <p>Equipos, licencias y servicios integrados con soporte continuo.</p>
            <a href="#" className="btn btn-outline btn-animated">Ver detalles</a>
          </article>
          <article className="bento-card bento-card-accent animate-on-scroll">
            <span className="bento-stat">+500</span>
            <span className="bento-label">Clientes satisfechos</span>
          </article>
          <article className="bento-card bento-card-dark animate-on-scroll">
            <span className="bento-stat">24/7</span>
            <span className="bento-label">Soporte técnico</span>
          </article>
        </div>
      </div>
    </section>
  )
}
