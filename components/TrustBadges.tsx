interface TrustBadgeItem {
  title: string
  description: string
  iconType: 'shield-check' | 'clock-check' | 'support' | 'delivery' | string
  iconSvg?: string
}

interface TrustBadgesProps {
  data?: {
    badges?: TrustBadgeItem[]
  } | null
}

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L40 12V22C40 32 33 40 24 44C15 40 8 32 8 22V12L24 4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 24L22 30L32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  ),
  'clock-check': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14V24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="18" width="20" height="20" stroke="currentColor" strokeWidth="2"/>
      <path d="M26 26H40V40" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="32" height="24" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 20H40" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="26" width="12" height="4" fill="currentColor"/>
    </svg>
  )
}

export default function TrustBadges({ data }: TrustBadgesProps) {
  const defaultBadges: TrustBadgeItem[] = [
    {
      title: 'Autenticidad Garantizada',
      description: 'Productos 100% originales',
      iconType: 'shield-check',
    },
    {
      title: 'Calidad Oficial',
      description: 'Garantía de fábrica',
      iconType: 'clock-check',
    },
    {
      title: 'Soporte Especializado',
      description: 'Expertos a tu servicio',
      iconType: 'support',
    },
    {
      title: 'Tiempos Claros de Respuesta',
      description: 'Entregas puntuales',
      iconType: 'delivery',
    },
  ]

  const badges = data?.badges && data.badges.length > 0 ? data.badges : defaultBadges

  return (
    <section className="trust-badges">
      <div className="container">
        <div className="badges-grid animate-on-scroll stagger-children">
          {badges.map((badge, idx) => (
            <div key={idx} className="badge-item">
              <div className="badge-icon">
                {badge.iconSvg ? (
                  <div dangerouslySetInnerHTML={{ __html: badge.iconSvg }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                ) : (
                  iconMap[badge.iconType] || iconMap['shield-check']
                )}
              </div>
              <h4>{badge.title}</h4>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
