interface PortfolioCategory {
  title: string
  description: string
  iconType: 'laptop' | 'grid' | 'software' | 'ipad' | 'tv' | 'network' | string
  detailsLink?: string
  buyLink?: string
}

interface CategoriesProps {
  data?: {
    title?: string
    subtitle?: string
    categories?: PortfolioCategory[]
  } | null
}

const iconMap: Record<string, React.ReactNode> = {
  laptop: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="80" height="50" stroke="currentColor" strokeWidth="2"/>
      <rect x="35" y="80" width="50" height="5" fill="currentColor"/>
      <rect x="25" y="85" width="70" height="3" fill="currentColor"/>
      <circle cx="60" cy="55" r="15" stroke="currentColor" strokeWidth="2"/>
      <path d="M55 55L58 58L65 51" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" stroke="currentColor" strokeWidth="2"/>
      <rect x="35" y="35" width="20" height="20" fill="currentColor"/>
      <rect x="65" y="35" width="20" height="20" fill="currentColor"/>
      <rect x="35" y="65" width="20" height="20" fill="currentColor"/>
      <rect x="65" y="65" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  software: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="20" width="60" height="80" stroke="currentColor" strokeWidth="2"/>
      <rect x="38" y="28" width="44" height="55" fill="currentColor" opacity="0.3"/>
      <path d="M45 45L55 55L75 35" stroke="currentColor" strokeWidth="3"/>
      <rect x="50" y="88" width="20" height="4" fill="currentColor"/>
    </svg>
  ),
  ipad: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="15" width="50" height="90" stroke="currentColor" strokeWidth="2"/>
      <rect x="42" y="25" width="36" height="60" fill="currentColor" opacity="0.3"/>
      <rect x="55" y="90" width="10" height="4" fill="currentColor"/>
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="25" width="90" height="55" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="32" width="76" height="41" fill="currentColor" opacity="0.3"/>
      <rect x="45" y="80" width="30" height="5" fill="currentColor"/>
      <rect x="35" y="85" width="50" height="3" fill="currentColor"/>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="70" height="70" stroke="currentColor" strokeWidth="2"/>
      <rect x="50" y="50" width="20" height="20" fill="currentColor"/>
      <path d="M60 25V50M60 70V95M25 60H50M70 60H95" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export default function Categories({ data }: CategoriesProps) {
  const title = data?.title || 'Nuestro Portafolio'
  const subtitle = data?.subtitle || 'Descubre nuestra amplia gama de productos tecnológicos'

  const defaultCategories: PortfolioCategory[] = [
    {
      title: 'Computadores y Portátiles',
      description: 'Equipos de alto rendimiento para trabajo y productividad',
      iconType: 'laptop',
      detailsLink: '#',
      buyLink: '#',
    },
    {
      title: 'Componentes y Accesorios',
      description: 'Memorias, discos, periféricos y más para tu equipo',
      iconType: 'grid',
      detailsLink: '#',
      buyLink: '#',
    },
    {
      title: 'Licencias de Software',
      description: 'Microsoft CSP y ESD para empresas y usuarios',
      iconType: 'software',
      detailsLink: '#',
      buyLink: '#',
    },
    {
      title: 'Dispositivos Móviles e iPads',
      description: 'Smartphones y tablets de última generación',
      iconType: 'ipad',
      detailsLink: '#',
      buyLink: '#',
    },
    {
      title: 'Televisores y Consolas',
      description: 'Entretenimiento y gaming para el hogar',
      iconType: 'tv',
      detailsLink: '#',
      buyLink: '#',
    },
    {
      title: 'Redes y Conectividad',
      description: 'Routers, switches y soluciones de red',
      iconType: 'network',
      detailsLink: '#',
      buyLink: '#',
    },
  ]

  const categories = data?.categories && data.categories.length > 0 ? data.categories : defaultCategories

  return (
    <section id="portafolio" className="categories-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">{title}</h2>
        <p className="section-subtitle animate-on-scroll">{subtitle}</p>
        <div className="categories-grid">
          {categories.map((category, idx) => {
            const isLeft = idx % 2 === 0
            const revealClass = isLeft ? 'reveal-left' : 'reveal-right'
            return (
              <article key={idx} className={`category-card animate-on-scroll ${revealClass}`}>
                <div className="category-image">
                  {iconMap[category.iconType] || iconMap.laptop}
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-actions">
                  <a href={category.detailsLink || '#'} className="btn btn-outline btn-sm btn-animated btn-magnetic">Ver detalles</a>
                  <a href={category.buyLink || '#'} className="btn btn-primary btn-sm btn-animated btn-magnetic">Comprar</a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
