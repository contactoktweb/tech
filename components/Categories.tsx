export default function Categories() {
  return (
    <section id="portafolio" className="categories-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Nuestro Portafolio</h2>
        <p className="section-subtitle animate-on-scroll">Descubre nuestra amplia gama de productos tecnológicos</p>
        <div className="categories-grid">
          <article className="category-card animate-on-scroll reveal-left">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="80" height="50" stroke="currentColor" strokeWidth="2"/>
                <rect x="35" y="80" width="50" height="5" fill="currentColor"/>
                <rect x="25" y="85" width="70" height="3" fill="currentColor"/>
                <circle cx="60" cy="55" r="15" stroke="currentColor" strokeWidth="2"/>
                <path d="M55 55L58 58L65 51" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Computadores y Portátiles</h3>
            <p>Equipos de alto rendimiento para trabajo y productividad</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
          <article className="category-card animate-on-scroll reveal-right">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="25" width="70" height="70" stroke="currentColor" strokeWidth="2"/>
                <rect x="35" y="35" width="20" height="20" fill="currentColor"/>
                <rect x="65" y="35" width="20" height="20" fill="currentColor"/>
                <rect x="35" y="65" width="20" height="20" fill="currentColor"/>
                <rect x="65" y="65" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Componentes y Accesorios</h3>
            <p>Memorias, discos, periféricos y más para tu equipo</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
          <article className="category-card animate-on-scroll reveal-left">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="20" width="60" height="80" stroke="currentColor" strokeWidth="2"/>
                <rect x="38" y="28" width="44" height="55" fill="currentColor" opacity="0.3"/>
                <path d="M45 45L55 55L75 35" stroke="currentColor" strokeWidth="3"/>
                <rect x="50" y="88" width="20" height="4" fill="currentColor"/>
              </svg>
            </div>
            <h3>Licencias de Software</h3>
            <p>Microsoft CSP y ESD para empresas y usuarios</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
          <article className="category-card animate-on-scroll reveal-right">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="35" y="15" width="50" height="90" stroke="currentColor" strokeWidth="2"/>
                <rect x="42" y="25" width="36" height="60" fill="currentColor" opacity="0.3"/>
                <rect x="55" y="90" width="10" height="4" fill="currentColor"/>
              </svg>
            </div>
            <h3>Dispositivos Móviles e iPads</h3>
            <p>Smartphones y tablets de última generación</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
          <article className="category-card animate-on-scroll reveal-left">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="25" width="90" height="55" stroke="currentColor" strokeWidth="2"/>
                <rect x="22" y="32" width="76" height="41" fill="currentColor" opacity="0.3"/>
                <rect x="45" y="80" width="30" height="5" fill="currentColor"/>
                <rect x="35" y="85" width="50" height="3" fill="currentColor"/>
              </svg>
            </div>
            <h3>Televisores y Consolas</h3>
            <p>Entretenimiento y gaming para el hogar</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
          <article className="category-card animate-on-scroll reveal-right">
            <div className="category-image">
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="25" width="70" height="70" stroke="currentColor" strokeWidth="2"/>
                <rect x="50" y="50" width="20" height="20" fill="currentColor"/>
                <path d="M60 25V50M60 70V95M25 60H50M70 60H95" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Redes y Conectividad</h3>
            <p>Routers, switches y soluciones de red</p>
            <div className="category-actions">
              <a href="#" className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
              <a href="#" className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
