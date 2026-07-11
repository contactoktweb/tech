interface PaymentMethod {
  name: string
  iconType: 'card' | 'pse' | 'phone' | 'cash' | string
  iconSvg?: string
}

interface PaymentsBannerProps {
  data?: {
    badge?: string
    title?: string
    description?: string
    paymentMethods?: PaymentMethod[]
  } | null
}

const iconMap: Record<string, React.ReactNode> = {
  card: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  pse: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 9h6M9 13h4"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="3"/>
      <circle cx="12" cy="18" r="1"/>
    </svg>
  ),
  cash: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

export default function PaymentsBanner({ data }: PaymentsBannerProps) {
  const badge = data?.badge || 'Checkout Seguro'
  const title = data?.title || 'Pasarela de Pagos Integrada'
  const description = data?.description || 'Procesamos tus pagos de forma segura y eficiente. Aceptamos múltiples métodos para tu comodidad, garantizando la protección de tus datos en cada transacción.'

  const defaultMethods: PaymentMethod[] = [
    { name: 'Crédito / Débito', iconType: 'card' },
    { name: 'PSE Bancario', iconType: 'pse' },
    { name: 'Nequi / Daviplata', iconType: 'phone' },
    { name: 'Efectivo', iconType: 'cash' },
  ]

  const paymentMethods = data?.paymentMethods && data.paymentMethods.length > 0 ? data.paymentMethods : defaultMethods

  return (
    <section className="payments-banner">
      <div className="container">
        <div className="payments-content animate-on-scroll reveal-blur">
          <div className="payments-text">
            <span className="badge">{badge}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="payments-grid stagger-children">
            {paymentMethods.map((method, idx) => (
              <div key={idx} className="payment-method-item">
                <div className="payment-icon">
                  {method.iconSvg ? (
                    <div dangerouslySetInnerHTML={{ __html: method.iconSvg }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                  ) : (
                    iconMap[method.iconType] || iconMap.card
                  )}
                </div>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
