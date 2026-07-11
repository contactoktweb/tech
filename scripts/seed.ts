// @ts-nocheck
import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Error: Faltan variables de entorno en .env.local')
  process.exit(1)
}

// Create a write-enabled Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-17',
  token,
  useCdn: false,
})

async function uploadImage(filePath: string): Promise<any> {
  const absolutePath = path.resolve(process.cwd(), filePath)
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Advertencia: No se encontró la imagen en ${filePath}`)
    return null
  }
  
  try {
    const fileStream = fs.createReadStream(absolutePath)
    console.log(`Subiendo imagen: ${filePath}...`)
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(filePath),
    })
    console.log(`Imagen subida con éxito: ${asset._id}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Error subiendo imagen ${filePath}:`, error)
    return null
  }
}

async function run() {
  console.log('--- Iniciando Sembrado de Datos en Sanity ---')
  
  // 1. Upload Images
  const aboutImage = await uploadImage('public/nosotros-center.png')
  const hpImage = await uploadImage('public/images/product-laptop-hp.jpg')
  const dellImage = await uploadImage('public/images/product-laptop-dell.jpg')
  const lenovoImage = await uploadImage('public/images/product-laptop-lenovo.jpg')

  // 2. Seed Hero Section
  console.log('Sembrando Hero...')
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

  // 3. Seed About Section
  console.log('Sembrando Conócenos (About)...')
  await client.createOrReplace({
    _id: 'homeAbout',
    _type: 'homeAbout',
    title: 'Conócenos',
    subtitle: 'Tecnología que Transforma: Nuestra Misión y Visión',
    centerImage: aboutImage || undefined,
    cards: [
      {
        _key: 'card1',
        title: 'Infraestructura TI',
        description: 'Optimizamos la base tecnológica de su organización con soluciones escalables.',
        iconType: 'layers',
      },
      {
        _key: 'card2',
        title: 'Seguridad Digital',
        description: 'Protección integral para sus activos de información más críticos.',
        iconType: 'shield',
      },
      {
        _key: 'card3',
        title: 'Soporte Experto',
        description: 'Acompañamiento técnico continuo por profesionales certificados.',
        iconType: 'users',
      },
      {
        _key: 'card4',
        title: 'Eficiencia Operativa',
        description: 'Reducimos tiempos de inactividad mediante mantenimiento proactivo.',
        iconType: 'clock',
      },
    ],
  })

  // 4. Seed Categories
  console.log('Sembrando Nuestro Portafolio (Categorías)...')
  await client.createOrReplace({
    _id: 'homeCategories',
    _type: 'homeCategories',
    title: 'Nuestro Portafolio',
    subtitle: 'Descubre nuestra amplia gama de productos tecnológicos',
    categories: [
      {
        _key: 'cat1',
        title: 'Computadores y Portátiles',
        description: 'Equipos de alto rendimiento para trabajo y productividad',
        iconType: 'laptop',
        detailsLink: '#',
        buyLink: '#',
      },
      {
        _key: 'cat2',
        title: 'Componentes y Accesorios',
        description: 'Memorias, discos, periféricos y más para tu equipo',
        iconType: 'grid',
        detailsLink: '#',
        buyLink: '#',
      },
      {
        _key: 'cat3',
        title: 'Licencias de Software',
        description: 'Microsoft CSP y ESD para empresas y usuarios',
        iconType: 'software',
        detailsLink: '#',
        buyLink: '#',
      },
      {
        _key: 'cat4',
        title: 'Dispositivos Móviles e iPads',
        description: 'Smartphones y tablets de última generación',
        iconType: 'ipad',
        detailsLink: '#',
        buyLink: '#',
      },
      {
        _key: 'cat5',
        title: 'Televisores y Consolas',
        description: 'Entretenimiento y gaming para el hogar',
        iconType: 'tv',
        detailsLink: '#',
        buyLink: '#',
      },
      {
        _key: 'cat6',
        title: 'Redes y Conectividad',
        description: 'Routers, switches y soluciones de red',
        iconType: 'network',
        detailsLink: '#',
        buyLink: '#',
      },
    ],
  })

  // 5. Seed Guarantees
  console.log('Sembrando Garantía y Respaldo...')
  await client.createOrReplace({
    _id: 'homeGuarantees',
    _type: 'homeGuarantees',
    title: 'Garantía y Respaldo Oficial Fangan Tech',
    description: 'Aseguramos la integridad y autenticidad de cada equipo. Nuestra garantía cubre respaldo oficial directo de fábrica, soporte técnico especializado (in situ o remoto), políticas de devolución transparentes sin condiciones ocultas, y tiempos de respuesta garantizados para proteger la continuidad de sus operaciones corporativas.',
    ctaText: 'Conocer más',
    ctaLink: '#',
  })

  // 6. Seed Services
  console.log('Sembrando Nuestros Servicios...')
  await client.createOrReplace({
    _id: 'homeServices',
    _type: 'homeServices',
    title: 'Nuestros Servicios',
    subtitle: 'Soluciones tecnológicas integrales para impulsar tu empresa',
    categories: [
      {
        _key: 'sc1',
        categoryName: 'Soluciones de Hardware',
        services: [
          {
            _key: 's1-1',
            title: 'Venta de Computadores y Portátiles',
            description: 'Ofrecemos equipos de escritorio y portátiles de las marcas líderes como HP, Dell, Lenovo y Apple. Configuraciones personalizadas para uso empresarial, gaming o productividad, con garantía oficial y soporte postventa.',
          },
          {
            _key: 's1-2',
            title: 'Componentes y Accesorios',
            description: 'Memorias RAM, discos SSD/HDD, tarjetas gráficas, fuentes de poder, teclados, ratones, monitores y todo lo necesario para mejorar o mantener tus equipos. Productos originales con garantía de fábrica.',
          },
          {
            _key: 's1-3',
            title: 'Dispositivos Móviles e iPads',
            description: 'Smartphones y tablets de última generación, incluyendo iPads de Apple. Ideales para profesionales en movimiento que necesitan productividad en cualquier lugar.',
          },
          {
            _key: 's1-4',
            title: 'Redes y Conectividad',
            description: 'Routers, switches, access points, cableado estructurado y soluciones de red empresarial. Diseñamos e implementamos infraestructuras de red confiables y de alto rendimiento.',
          },
        ],
      },
      {
        _key: 'sc2',
        categoryName: 'Licencias y Software',
        services: [
          {
            _key: 's2-1',
            title: 'Licencias Microsoft CSP',
            description: 'Programa de proveedor de soluciones en la nube (CSP). Acceso a licencias Microsoft 365, Azure, Windows Server y más con facturación mensual flexible. Ideal para empresas que buscan escalabilidad.',
          },
          {
            _key: 's2-2',
            title: 'Licencias Microsoft ESD',
            description: 'Licencias digitales de descarga electrónica para Windows, Office y otros productos Microsoft. Activación inmediata, sin necesidad de medios físicos, con licencia perpetua.',
          },
          {
            _key: 's2-3',
            title: 'Software Empresarial',
            description: 'Antivirus corporativos, herramientas de productividad, sistemas de gestión y software especializado para optimizar los procesos de tu organización.',
          },
        ],
      },
      {
        _key: 'sc3',
        categoryName: 'Servicios Técnicos',
        services: [
          {
            _key: 's3-1',
            title: 'Soporte Técnico en sitio',
            description: 'Nuestros técnicos certificados se desplazan directamente a tu empresa para resolver incidencias, realizar mantenimientos preventivos y correctivos en tus equipos de cómputo, redes y periféricos.',
          },
          {
            _key: 's3-2',
            title: 'Soporte Técnico Remoto',
            description: 'Asistencia técnica en tiempo real a través de conexión remota. Resolución rápida de problemas de software, configuraciones y diagnóstico sin necesidad de esperar una visita presencial.',
          },
          {
            _key: 's3-3',
            title: 'Mantenimiento Preventivo Corporativo',
            description: 'Planes de mantenimiento programados para toda tu infraestructura tecnológica. Incluye limpieza física, actualización de software, diagnóstico de rendimiento y recomendaciones de mejora.',
          },
        ],
      },
      {
        _key: 'sc4',
        categoryName: 'Consultoría Especializada',
        services: [
          {
            _key: 's4-1',
            title: 'Consultoría en Infraestructura TI',
            description: 'Evaluamos tu infraestructura tecnológica actual y diseñamos soluciones a medida para optimizar costos, mejorar la seguridad y aumentar el rendimiento. Incluye planificación de migración a la nube y modernización de equipos.',
          },
          {
            _key: 's4-2',
            title: 'Asesoría en Seguridad Informática',
            description: 'Auditorías de seguridad, implementación de políticas de protección de datos, configuración de firewalls y sistemas antimalware. Protege la información crítica de tu empresa contra amenazas cibernéticas.',
          },
          {
            _key: 's4-3',
            title: 'Consultoría en Transformación Digital',
            description: 'Acompañamiento integral en el proceso de transformación digital de tu organización. Desde la evaluación de procesos actuales hasta la implementación de herramientas tecnológicas que impulsen la eficiencia y competitividad.',
          },
          {
            _key: 's4-4',
            title: 'Gestión de Proyectos Tecnológicos',
            description: 'Planificación, ejecución y supervisión de proyectos de implementación tecnológica. Desde la renovación del parque tecnológico hasta la puesta en marcha de soluciones integrales con plazos y presupuestos definidos.',
          },
        ],
      },
    ],
  })

  // 7. Seed Software Banner
  console.log('Sembrando Banner de Software...')
  await client.createOrReplace({
    _id: 'homeSoftware',
    _type: 'homeSoftware',
    badge: 'Microsoft Partner',
    title: 'Soluciones Corporativas de Software',
    description: 'Licencias Microsoft CSP y ESD con activación inmediata, soporte técnico y precios competitivos para empresas de todos los tamaños.',
    logos: [
      { _key: 'logo1', name: 'Microsoft CSP' },
      { _key: 'logo2', name: 'Microsoft ESD' },
    ],
    ctaText: 'Ver licencias disponibles',
    ctaLink: '/tienda',
  })

  // 8. Seed B2B Banner
  console.log('Sembrando Banner B2B...')
  await client.createOrReplace({
    _id: 'homeB2B',
    _type: 'homeB2B',
    title: 'Tecnología confiable para tu empresa',
    description: 'Soluciones integrales de hardware, software y servicios para impulsar la productividad y competitividad de tu negocio.',
    ctaText: 'Solicitar Propuesta Corporativa',
    ctaLink: '#contacto',
  })

  // 9. Seed Payments Banner
  console.log('Sembrando Banner de Pagos...')
  await client.createOrReplace({
    _id: 'homePayments',
    _type: 'homePayments',
    badge: 'Checkout Seguro',
    title: 'Pasarela de Pagos Integrada',
    description: 'Procesamos tus pagos de forma segura y eficiente. Aceptamos múltiples métodos para tu comodidad, garantizando la protección de tus datos en cada transacción.',
    paymentMethods: [
      { _key: 'pay1', name: 'Crédito / Débito', iconType: 'card' },
      { _key: 'pay2', name: 'PSE Bancario', iconType: 'pse' },
      { _key: 'pay3', name: 'Nequi / Daviplata', iconType: 'phone' },
      { _key: 'pay4', name: 'Efectivo', iconType: 'cash' },
    ],
  })

  // 10. Seed Trust Badges
  console.log('Sembrando Distintivos de Confianza...')
  await client.createOrReplace({
    _id: 'homeTrustBadges',
    _type: 'homeTrustBadges',
    badges: [
      {
        _key: 'badge1',
        title: 'Autenticidad Garantizada',
        description: 'Productos 100% originales',
        iconType: 'shield-check',
      },
      {
        _key: 'badge2',
        title: 'Calidad Oficial',
        description: 'Garantía de fábrica',
        iconType: 'clock-check',
      },
      {
        _key: 'badge3',
        title: 'Soporte Especializado',
        description: 'Expertos a tu servicio',
        iconType: 'support',
      },
      {
        _key: 'badge4',
        title: 'Tiempos Claros de Respuesta',
        description: 'Entregas puntuales',
        iconType: 'delivery',
      },
    ],
  })

  // 11. Seed Products
  console.log('Sembrando Productos...')
  const products = [
    {
      _id: 'product-hp-elitebook-840-g9',
      _type: 'product',
      name: 'HP EliteBook 840 G9',
      slug: { _type: 'slug', current: 'hp-elitebook-840-g9' },
      brand: 'hp',
      category: 'laptops',
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'Portátil corporativo de alta calidad. Equipado con procesador Intel Core i7, 16GB de memoria RAM y almacenamiento rápido SSD de 512GB. Ideal para maximizar el rendimiento laboral.',
      price: 4890000,
      badge: 'Destacado',
      image: hpImage || undefined,
      stock: 15,
      featured: true,
      variations: [
        { _key: 'v1-1', name: 'Procesador', value: 'Intel Core i7' },
        { _key: 'v1-2', name: 'RAM', value: '16GB' },
        { _key: 'v1-3', name: 'Almacenamiento', value: '512GB SSD' },
      ],
    },
    {
      _id: 'product-dell-xps-15-9530',
      _type: 'product',
      name: 'Dell XPS 15 9530',
      slug: { _type: 'slug', current: 'dell-xps-15-9530' },
      brand: 'dell',
      category: 'laptops',
      specs: 'Intel Core i9, 32GB RAM, 1TB SSD',
      description: 'Portátil premium para creadores y profesionales. Potencia incomparable con Intel Core i9, 32GB de memoria RAM de alto rendimiento y SSD masivo de 1TB. Diseño ultra delgado con materiales duraderos.',
      price: 7225000,
      oldPrice: 8500000,
      badge: '-15%',
      image: dellImage || undefined,
      stock: 8,
      featured: true,
      variations: [
        { _key: 'v2-1', name: 'Procesador', value: 'Intel Core i9' },
        { _key: 'v2-2', name: 'RAM', value: '32GB' },
        { _key: 'v2-3', name: 'Almacenamiento', value: '1TB SSD' },
      ],
    },
    {
      _id: 'product-thinkpad-x1-carbon-gen-11',
      _type: 'product',
      name: 'ThinkPad X1 Carbon Gen 11',
      slug: { _type: 'slug', current: 'thinkpad-x1-carbon-gen-11' },
      brand: 'lenovo',
      category: 'laptops',
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'El portátil corporativo por excelencia. Lenovo ThinkPad X1 Carbon Gen 11 combina ligereza extrema, durabilidad de nivel militar y un teclado insuperable. Rendimiento óptimo con i7 de última generación.',
      price: 6290000,
      image: lenovoImage || undefined,
      stock: 12,
      featured: true,
      variations: [
        { _key: 'v3-1', name: 'Procesador', value: 'Intel Core i7' },
        { _key: 'v3-2', name: 'RAM', value: '16GB' },
        { _key: 'v3-3', name: 'Almacenamiento', value: '512GB SSD' },
      ],
    },
  ]

  for (const product of products) {
    console.log(`Guardando producto: ${product.name}...`)
    await client.createOrReplace(product)
  }

  console.log('--- Sembrado de Datos Finalizado Con Éxito ---')
}

run().catch((err) => {
  console.error('Error durante el sembrado de datos:', err)
  process.exit(1)
})
