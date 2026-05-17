import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface CardItem {
  title: string
  description: string
  iconType: 'layers' | 'shield' | 'users' | 'clock' | string
}

interface AboutProps {
  data?: {
    title?: string
    subtitle?: string
    centerImage?: any
    cards?: CardItem[]
  } | null
}

const iconMap: Record<string, React.ReactNode> = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

export default function AboutSection({ data }: AboutProps) {
  const title = data?.title || 'Conócenos'
  const subtitle = data?.subtitle || 'Tecnología que Transforma: Nuestra Misión y Visión'
  
  const defaultCards: CardItem[] = [
    {
      title: 'Infraestructura TI',
      description: 'Optimizamos la base tecnológica de su organización con soluciones escalables.',
      iconType: 'layers',
    },
    {
      title: 'Seguridad Digital',
      description: 'Protección integral para sus activos de información más críticos.',
      iconType: 'shield',
    },
    {
      title: 'Soporte Experto',
      description: 'Acompañamiento técnico continuo por profesionales certificados.',
      iconType: 'users',
    },
    {
      title: 'Eficiencia Operativa',
      description: 'Reducimos tiempos de inactividad mediante mantenimiento proactivo.',
      iconType: 'clock',
    },
  ]

  const cards = data?.cards && data.cards.length > 0 ? data.cards : defaultCards
  const leftCards = cards.slice(0, 2)
  const rightCards = cards.slice(2, 4)

  const centerImageUrl = data?.centerImage 
    ? urlFor(data.centerImage).url() 
    : '/nosotros-center.png'

  return (
    <section id="nosotros" className="about-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">{title}</h2>
        <p className="section-subtitle animate-on-scroll">{subtitle}</p>
        
        <div className="about-grid">
          {/* Left Cards */}
          <div className="about-side-cards animate-on-scroll reveal-left">
            {leftCards.map((card, idx) => (
              <article key={idx} className="about-card">
                <div className="about-card-icon animate-float">
                  {iconMap[card.iconType] || iconMap.layers}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          {/* Central Image */}
          <div className="about-center-visual animate-on-scroll reveal-blur">
            <div className="about-image-wrapper animate-on-scroll reveal-geometric" data-parallax data-speed="0.05">
              <Image 
                src={centerImageUrl} 
                alt="Fangan Tech Team" 
                width={600} 
                height={600}
                className="about-image"
                priority
              />
            </div>
          </div>

          {/* Right Cards */}
          <div className="about-side-cards animate-on-scroll reveal-right">
            {rightCards.map((card, idx) => (
              <article key={idx} className="about-card">
                <div className="about-card-icon animate-float">
                  {iconMap[card.iconType] || iconMap.users}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
