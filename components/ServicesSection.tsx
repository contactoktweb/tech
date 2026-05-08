'use client'

import React, { useState } from 'react'

interface ServiceItem {
  title: string
  description: string
}

interface ServiceCategory {
  category: string
  services: ServiceItem[]
}

const servicesData: ServiceCategory[] = [
  {
    category: 'Soluciones de Hardware',
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
    category: 'Licencias y Software',
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
    category: 'Servicios Técnicos',
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
    category: 'Consultoría Especializada',
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

export default function ServicesSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Nuestros Servicios</h2>
        <p className="section-subtitle animate-on-scroll">
          Soluciones tecnológicas integrales para impulsar tu empresa
        </p>

        <div className="services-categories">
          {servicesData.map((category, catIdx) => (
            <div key={catIdx} className="service-category animate-on-scroll reveal-zoom">
              <h3 className="service-category-title">{category.category}</h3>
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
          ))}
        </div>
      </div>
    </section>
  )
}
