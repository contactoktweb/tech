// @ts-nocheck
import { createClient } from '@sanity/client'
import crypto from 'crypto'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables for Sanity client.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token,
})

const seedData = async () => {
  try {
    console.log('Seeding homeHero...')
    await client.createOrReplace({
      _id: 'homeHero',
      _type: 'homeHero',
      badge: 'Soluciones Especializadas',
      titleLine1: 'EL FUTURO',
      titleLine2: 'DE TU EMPRESA',
      titleLine3: 'ES AHORA',
      subtitle: 'Hardware de vanguardia y software corporativo para maximizar la productividad de tu organización.',
      ctaText: 'Explorar Catálogo',
      ctaLink: '/tienda',
      ctaSecondaryText: 'Contactar Ventas',
      ctaSecondaryLink: '#contacto',
    })

    console.log('Seeding homeAbout...')
    await client.createOrReplace({
      _id: 'homeAbout',
      _type: 'homeAbout',
      title: 'Conócenos',
      subtitle: 'Tecnología que Transforma: Nuestra Misión y Visión',
      cards: [
        { _key: crypto.randomUUID(), title: 'Infraestructura TI', description: 'Optimizamos la base tecnológica de su organización con soluciones escalables.', iconType: 'layers' },
        { _key: crypto.randomUUID(), title: 'Seguridad Digital', description: 'Protección integral para sus activos de información más críticos.', iconType: 'shield' },
        { _key: crypto.randomUUID(), title: 'Soporte Experto', description: 'Acompañamiento técnico continuo por profesionales certificados.', iconType: 'users' },
        { _key: crypto.randomUUID(), title: 'Eficiencia Operativa', description: 'Reducimos tiempos de inactividad mediante mantenimiento proactivo.', iconType: 'clock' },
      ]
    })

    console.log('Seeding homeCategories...')
    await client.createOrReplace({
      _id: 'homeCategories',
      _type: 'homeCategories',
      title: 'Nuestro Portafolio',
      subtitle: 'Descubre nuestra amplia gama de productos tecnológicos',
      categories: [
        { _key: crypto.randomUUID(), title: 'Computadores y Portátiles', description: 'Equipos de alto rendimiento para trabajo y productividad', iconType: 'laptop', detailsLink: '#', buyLink: '#' },
        { _key: crypto.randomUUID(), title: 'Componentes y Accesorios', description: 'Memorias, discos, periféricos y más para tu equipo', iconType: 'grid', detailsLink: '#', buyLink: '#' },
        { _key: crypto.randomUUID(), title: 'Licencias de Software', description: 'Microsoft CSP y ESD para empresas y usuarios', iconType: 'software', detailsLink: '#', buyLink: '#' },
        { _key: crypto.randomUUID(), title: 'Dispositivos Móviles e iPads', description: 'Smartphones y tablets de última generación', iconType: 'ipad', detailsLink: '#', buyLink: '#' },
        { _key: crypto.randomUUID(), title: 'Televisores y Consolas', description: 'Entretenimiento y gaming para el hogar', iconType: 'tv', detailsLink: '#', buyLink: '#' },
        { _key: crypto.randomUUID(), title: 'Redes y Conectividad', description: 'Routers, switches y soluciones de red', iconType: 'network', detailsLink: '#', buyLink: '#' },
      ]
    })

    console.log('Seeding homeGuarantees...')
    await client.createOrReplace({
      _id: 'homeGuarantees',
      _type: 'homeGuarantees',
      title: 'Garantía y Respaldo Oficial Fangan Tech',
      description: 'Aseguramos la integridad y autenticidad de cada equipo. Nuestra garantía cubre respaldo oficial directo de fábrica, soporte técnico especializado (in situ o remoto), políticas de devolución transparentes sin condiciones ocultas, y tiempos de respuesta garantizados para proteger la continuidad de sus operaciones corporativas.',
      ctaText: 'Conocer más',
      ctaLink: '#',
      graphicSvg: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 20L270 80V140C270 180 220 200 150 200C80 200 30 180 30 140V80L150 20Z" stroke="currentColor" strokeWidth="3" fill="none"/>
            <path d="M150 50L230 95V135C230 160 195 175 150 175C105 175 70 160 70 135V95L150 50Z" fill="currentColor" opacity="0.1"/>
            <path d="M110 110L140 140L190 90" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>`
    })

    console.log('Seeding homeServices...')
    await client.createOrReplace({
      _id: 'homeServices',
      _type: 'homeServices',
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones tecnológicas integrales para impulsar tu empresa',
      categories: [
        {
          _key: crypto.randomUUID(),
          categoryName: 'Soluciones de Hardware',
          services: [
            { _key: crypto.randomUUID(), title: 'Venta de Computadores y Portátiles', description: 'Ofrecemos equipos de escritorio y portátiles de las marcas líderes como HP, Dell, Lenovo y Apple. Configuraciones personalizadas para uso empresarial, gaming o productividad, con garantía oficial y soporte postventa.' },
            { _key: crypto.randomUUID(), title: 'Componentes y Accesorios', description: 'Memorias RAM, discos SSD/HDD, tarjetas gráficas, fuentes de poder, teclados, ratones, monitores y todo lo necesario para mejorar o mantener tus equipos. Productos originales con garantía de fábrica.' },
            { _key: crypto.randomUUID(), title: 'Dispositivos Móviles e iPads', description: 'Smartphones y tablets de última generación, incluyendo iPads de Apple. Ideales para profesionales en movimiento que necesitan productividad en cualquier lugar.' },
            { _key: crypto.randomUUID(), title: 'Redes y Conectividad', description: 'Routers, switches, access points, cableado estructurado y soluciones de red empresarial. Diseñamos e implementamos infraestructuras de red confiables y de alto rendimiento.' }
          ]
        },
        {
          _key: crypto.randomUUID(),
          categoryName: 'Licencias y Software',
          services: [
            { _key: crypto.randomUUID(), title: 'Licencias Microsoft CSP', description: 'Programa de proveedor de soluciones en la nube (CSP). Acceso a licencias Microsoft 365, Azure, Windows Server y más con facturación mensual flexible. Ideal para empresas que buscan escalabilidad.' },
            { _key: crypto.randomUUID(), title: 'Licencias Microsoft ESD', description: 'Licencias digitales de descarga electrónica para Windows, Office y otros productos Microsoft. Activación inmediata, sin necesidad de medios físicos, con licencia perpetua.' },
            { _key: crypto.randomUUID(), title: 'Software Empresarial', description: 'Antivirus corporativos, herramientas de productividad, sistemas de gestión y software especializado para optimizar los procesos de tu organización.' }
          ]
        },
        {
          _key: crypto.randomUUID(),
          categoryName: 'Servicios Técnicos',
          services: [
            { _key: crypto.randomUUID(), title: 'Soporte Técnico en sitio', description: 'Nuestros técnicos certificados se desplazan directamente a tu empresa para resolver incidencias, realizar mantenimientos preventivos y correctivos en tus equipos de cómputo, redes y periféricos.' },
            { _key: crypto.randomUUID(), title: 'Soporte Técnico Remoto', description: 'Asistencia técnica en tiempo real a través de conexión remota. Resolución rápida de problemas de software, configuraciones y diagnóstico sin necesidad de esperar una visita presencial.' },
            { _key: crypto.randomUUID(), title: 'Mantenimiento Preventivo Corporativo', description: 'Planes de mantenimiento programados para toda tu infraestructura tecnológica. Incluye limpieza física, actualización de software, diagnóstico de rendimiento y recomendaciones de mejora.' }
          ]
        },
        {
          _key: crypto.randomUUID(),
          categoryName: 'Consultoría Especializada',
          services: [
            { _key: crypto.randomUUID(), title: 'Consultoría en Infraestructura TI', description: 'Evaluamos tu infraestructura tecnológica actual y diseñamos soluciones a medida para optimizar costos, mejorar la seguridad y aumentar el rendimiento. Incluye planificación de migración a la nube y modernización de equipos.' },
            { _key: crypto.randomUUID(), title: 'Asesoría en Seguridad Informática', description: 'Auditorías de seguridad, implementación de políticas de protección de datos, configuración de firewalls y sistemas antimalware. Protege la información crítica de tu empresa contra amenazas cibernéticas.' },
            { _key: crypto.randomUUID(), title: 'Consultoría en Transformación Digital', description: 'Acompañamiento integral en el proceso de transformación digital de tu organización. Desde la evaluación de procesos actuales hasta la implementación de herramientas tecnológicas que impulsen la eficiencia y competitividad.' },
            { _key: crypto.randomUUID(), title: 'Gestión de Proyectos Tecnológicos', description: 'Planificación, ejecución y supervisión de proyectos de implementación tecnológica. Desde la renovación del parque tecnológico hasta la puesta en marcha de soluciones integrales con plazos y presupuestos definidos.' }
          ]
        }
      ]
    })

    console.log('Seeding homeSoftware...')
    await client.createOrReplace({
      _id: 'homeSoftware',
      _type: 'homeSoftware',
      badge: 'Microsoft Partner',
      title: 'Soluciones Corporativas de Software',
      description: 'Licencias Microsoft CSP y ESD con activación inmediata, soporte técnico y precios competitivos para empresas de todos los tamaños.',
      ctaText: 'Ver licencias disponibles',
      ctaLink: '/tienda',
      logos: [
        { _key: crypto.randomUUID(), name: 'Microsoft CSP', logoSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="17" height="17" fill="#F25022"/><rect x="21" y="2" width="17" height="17" fill="#7FBA00"/><rect x="2" y="21" width="17" height="17" fill="#00A4EF"/><rect x="21" y="21" width="17" height="17" fill="#FFB900"/></svg>` },
        { _key: crypto.randomUUID(), name: 'Microsoft ESD', logoSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="17" height="17" fill="#F25022"/><rect x="21" y="2" width="17" height="17" fill="#7FBA00"/><rect x="2" y="21" width="17" height="17" fill="#00A4EF"/><rect x="21" y="21" width="17" height="17" fill="#FFB900"/></svg>` }
      ]
    })

    console.log('Seeding homeB2B...')
    await client.createOrReplace({
      _id: 'homeB2B',
      _type: 'homeB2B',
      title: 'Tecnología confiable para tu empresa',
      description: 'Soluciones integrales de hardware, software y servicios para impulsar la productividad y competitividad de tu negocio.',
      ctaText: 'Solicitar Propuesta Corporativa',
      ctaLink: '#contacto',
      graphics: [
        { _key: crypto.randomUUID(), svgCode: `<svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="100" fill="currentColor" opacity="0.1"/><rect x="20" y="20" width="40" height="30" stroke="currentColor" strokeWidth="2"/><rect x="70" y="25" width="60" height="8" fill="currentColor" opacity="0.3"/><rect x="70" y="40" width="40" height="6" fill="currentColor" opacity="0.2"/><rect x="25" y="60" width="30" height="30" stroke="currentColor" strokeWidth="2"/><path d="M35 75L40 80L50 70" stroke="currentColor" strokeWidth="2"/></svg>` },
        { _key: crypto.randomUUID(), svgCode: `<svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="100" fill="currentColor" opacity="0.1"/><rect x="30" y="20" width="40" height="40" stroke="currentColor" strokeWidth="2"/><path d="M42 40L48 46L58 36" stroke="currentColor" strokeWidth="2"/><rect x="80" y="30" width="50" height="8" fill="currentColor" opacity="0.3"/><rect x="80" y="45" width="35" height="6" fill="currentColor" opacity="0.2"/><rect x="20" y="70" width="110" height="15" fill="currentColor" opacity="0.15"/></svg>` },
        { _key: crypto.randomUUID(), svgCode: `<svg viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="100" fill="currentColor" opacity="0.1"/><path d="M30 70L50 50L70 60L100 30L120 40" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="47" y="47" width="6" height="6" fill="currentColor"/><rect x="67" y="57" width="6" height="6" fill="currentColor"/><rect x="97" y="27" width="6" height="6" fill="currentColor"/><rect x="117" y="37" width="6" height="6" fill="currentColor"/></svg>` },
      ]
    })

    console.log('Seeding homePayments...')
    await client.createOrReplace({
      _id: 'homePayments',
      _type: 'homePayments',
      badge: 'Checkout Seguro',
      title: 'Pasarela de Pagos Integrada',
      description: 'Procesamos tus pagos de forma segura y eficiente. Aceptamos múltiples métodos para tu comodidad, garantizando la protección de tus datos en cada transacción.',
      paymentMethods: [
        { _key: crypto.randomUUID(), name: 'Crédito / Débito', iconType: 'card' },
        { _key: crypto.randomUUID(), name: 'PSE Bancario', iconType: 'pse' },
        { _key: crypto.randomUUID(), name: 'Nequi / Daviplata', iconType: 'phone' },
        { _key: crypto.randomUUID(), name: 'Efectivo', iconType: 'cash' },
      ]
    })

    console.log('Seeding homeTrustBadges...')
    await client.createOrReplace({
      _id: 'homeTrustBadges',
      _type: 'homeTrustBadges',
      badges: [
        { _key: crypto.randomUUID(), title: 'Autenticidad Garantizada', description: 'Productos 100% originales', iconType: 'shield-check' },
        { _key: crypto.randomUUID(), title: 'Calidad Oficial', description: 'Garantía de fábrica', iconType: 'clock-check' },
        { _key: crypto.randomUUID(), title: 'Soporte Especializado', description: 'Expertos a tu servicio', iconType: 'support' },
        { _key: crypto.randomUUID(), title: 'Tiempos Claros de Respuesta', description: 'Entregas puntuales', iconType: 'delivery' },
      ]
    })

    console.log('✅ Base de datos poblada exitosamente con todos los schemas estáticos.')
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error)
  }
}

seedData()
