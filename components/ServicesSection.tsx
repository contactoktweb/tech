'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Users } from 'lucide-react'

interface ServiceItem {
  title: string
  description: string
}

interface ServiceCategory {
  categoryName?: string
  category?: string // fallback
  services: ServiceItem[]
}

interface ServicesSectionProps {
  data?: {
    title?: string
    subtitle?: string
    categories?: ServiceCategory[]
    hrConsultingTitle?: string
    hrConsultingDescription?: string
    hrConsultingFeatures?: string[]
  } | null
}

const defaultServicesData: ServiceCategory[] = [
  {
    categoryName: 'Soluciones de Hardware',
    services: [
      {
        title: 'Venta de Computadores y Portátiles',
        description: 'Ofrecemos equipos de escritorio y portátiles de las marcas líderes como HP, Dell, Lenovo y Apple. Configuraciones personalizadas para uso empresarial, gaming o productividad, con garantía oficial y soporte postventa.'
      },
      {
        title: 'Componentes y Accesorios',
        description: 'Memorias RAM, discos SSD/HDD, tarjetas gráficas, fuentes de poder, teclados, ratones, monitores y todo lo necesario para mejorar o mantener tus equipos. Productos originales con garantía de fábrica.'
      },
      {
        title: 'Dispositivos Móviles e iPads',
        description: 'Smartphones y tablets de última generación, incluyendo iPads de Apple. Ideales para profesionales en movimiento que necesitan productividad en cualquier lugar.'
      },
      {
        title: 'Redes y Conectividad',
        description: 'Routers, switches, access points, cableado estructurado y soluciones de red empresarial. Diseñamos e implementamos infraestructuras de red confiables y de alto rendimiento.'
      }
    ]
  },
  {
    categoryName: 'Licencias y Software',
    services: [
      {
        title: 'Licencias Microsoft CSP',
        description: 'Programa de proveedor de soluciones en la nube (CSP). Acceso a licencias Microsoft 365, Azure, Windows Server y más con facturación mensual flexible. Ideal para empresas que buscan escalabilidad.'
      },
      {
        title: 'Licencias Microsoft ESD',
        description: 'Licencias digitales de descarga electrónica para Windows, Office y otros productos Microsoft. Activación inmediata, sin necesidad de medios físicos, con licencia perpetua.'
      },
      {
        title: 'Software Empresarial',
        description: 'Antivirus corporativos, herramientas de productividad, sistemas de gestión y software especializado para optimizar los procesos de tu organización.'
      }
    ]
  },
  {
    categoryName: 'Servicios Técnicos',
    services: [
      {
        title: 'Soporte Técnico en sitio',
        description: 'Nuestros técnicos certificados se desplazan directamente a tu empresa para resolver incidencias, realizar mantenimientos preventivos y correctivos en tus equipos de cómputo, redes y periféricos.'
      },
      {
        title: 'Soporte Técnico Remoto',
        description: 'Asistencia técnica en tiempo real a través de conexión remota. Resolución rápida de problemas de software, configuraciones y diagnóstico sin necesidad de esperar una visita presencial.'
      },
      {
        title: 'Mantenimiento Preventivo Corporativo',
        description: 'Planes de mantenimiento programados para toda tu infraestructura tecnológica. Incluye limpieza física, actualización de software, diagnóstico de rendimiento y recomendaciones de mejora.'
      }
    ]
  },
  {
    categoryName: 'Consultoría Especializada',
    services: [
      {
        title: 'Consultoría en Infraestructura TI',
        description: 'Evaluamos tu infraestructura tecnológica actual y diseñamos soluciones a medida para optimizar costos, mejorar la seguridad y aumentar el rendimiento. Incluye planificación de migración a la nube y modernización de equipos.'
      },
      {
        title: 'Asesoría en Seguridad Informática',
        description: 'Auditorías de seguridad, implementación de políticas de protección de datos, configuración de firewalls y sistemas antimalware. Protege la información crítica de tu empresa contra amenazas cibernéticas.'
      },
      {
        title: 'Consultoría en Transformación Digital',
        description: 'Acompañamiento integral en el proceso de transformación digital de tu organización. Desde la evaluación de procesos actuales hasta la implementación de herramientas tecnológicas que impulsen la eficiencia y competitividad.'
      },
      {
        title: 'Gestión de Proyectos Tecnológicos',
        description: 'Planificación, ejecución y supervisión de proyectos de implementación tecnológica. Desde la renovación del parque tecnológico hasta la puesta en marcha de soluciones integrales con plazos y presupuestos definidos.'
      }
    ]
  }
]

export default function ServicesSection({ data }: ServicesSectionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const title = data?.title || 'Nuestros Servicios'
  const subtitle = data?.subtitle || 'Soluciones tecnológicas integrales para impulsar tu empresa'
  const categories = data?.categories && data.categories.length > 0 ? data.categories : defaultServicesData

  const hrConsultingTitle = data?.hrConsultingTitle || 'Consultoría en RRHH'
  const hrConsultingDescription = data?.hrConsultingDescription || 'Nuestra línea de consultoría en Recursos Humanos está diseñada para potenciar el talento de tu organización, abarcando desde la atracción de los mejores perfiles hasta su desarrollo y bienestar integral.'
  const hrConsultingFeatures = data?.hrConsultingFeatures || [
    'Selección y Reclutamiento',
    'Bienestar Organizacional',
    'Capacitación y Formación',
    'Desarrollo de Talento'
  ]

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">{title}</h2>
        <p className="section-subtitle animate-on-scroll">{subtitle}</p>

        <div className="services-categories">
          {categories.map((category, catIdx) => {
            const catName = category.categoryName || category.category || ''
            return (
              <div key={catIdx} className="service-category animate-on-scroll reveal-zoom">
                <h3 className="service-category-title">{catName}</h3>
                <div className="service-accordion">
                  {category.services.map((service, svcIdx) => {
                    const key = `${catIdx}-${svcIdx}`
                    const isOpen = openItems[key] || false
                    return (
                      <div key={svcIdx} className={`service-accordion-item ${isOpen ? 'open' : ''}`}>
                        <button
                          className="service-accordion-trigger"
                          onClick={() => toggleItem(key)}
                          aria-expanded={isOpen}
                          aria-controls={`service-content-${key}`}
                        >
                          <span className="service-accordion-title">{service.title}</span>
                          <span className="service-accordion-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              {isOpen ? (
                                <polyline points="18 15 12 9 6 15"/>
                              ) : (
                                <polyline points="6 9 12 15 18 9"/>
                              )}
                            </svg>
                          </span>
                        </button>
                        <div
                          id={`service-content-${key}`}
                          className="service-accordion-content"
                          style={{
                            maxHeight: isOpen ? '300px' : '0',
                            opacity: isOpen ? 1 : 0,
                            paddingTop: isOpen ? '16px' : '0',
                            paddingBottom: isOpen ? '24px' : '0',
                          }}
                        >
                          <p>{service.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Consultoría en RRHH Section */}
        <div className="mt-20 border-t border-gray-200 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{hrConsultingTitle}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {hrConsultingDescription}
              </p>
              
              <div className="space-y-4">
                {hrConsultingFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Consultoría en RRHH"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
