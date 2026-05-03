export default function PaymentsBanner() {
  const paymentMethods = [
    { name: 'Tarjetas', icon: 'M1 4h22v16H1z M1 10h22' },
    { name: 'PSE', icon: 'M3 3h18v18H3z M9 9h6 M9 13h4' },
    { name: 'Nequi', icon: 'M5 2h14v20H5z M12 18r1' },
    { name: 'Efectivo', icon: 'M2 6h20v12H2z M12 12r3' }
  ]

  return (
    <section className="payments-banner">
      <div className="container">
        <div className="payments-content animate-on-scroll">
          <div className="payments-text">
            <span className="badge">Checkout Seguro</span>
            <h2>Pasarela de Pagos Integrada</h2>
            <p>Procesamos tus pagos de forma segura y eficiente. Aceptamos múltiples métodos para tu comodidad, garantizando la protección de tus datos en cada transacción.</p>
          </div>
          <div className="payments-grid">
            <div className="payment-method-item">
              <div className="payment-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
              <span>Crédito / Débito</span>
            </div>
            <div className="payment-method-item">
              <div className="payment-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6M9 13h4"/>
                </svg>
              </div>
              <span>PSE Bancario</span>
            </div>
            <div className="payment-method-item">
              <div className="payment-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="3"/>
                  <circle cx="12" cy="18" r="1"/>
                </svg>
              </div>
              <span>Nequi / Daviplata</span>
            </div>
            <div className="payment-method-item">
              <div className="payment-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <span>Efectivo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
