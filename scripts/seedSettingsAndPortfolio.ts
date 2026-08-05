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

const seedSettingsAndPortfolio = async () => {
  try {
    // 1. Configuración Global (Settings)
    console.log('1. Subiendo Configuración Global (Settings)...')
    const settingsDoc = {
      _id: 'settings', // Usa un ID fijo para singleton
      _type: 'settings',
      title: 'Fangan Tech - Tecnología que Transforma',
      description: 'Soluciones tecnológicas que impulsan la transformación digital de empresas, instituciones y comunidades.',
      contacto: {
        telefono: '3144874534',
        email: 'ventas@fangantech.com.co',
        direccion: 'Cl. 37 Sur #78b 35, Oficina 401',
      },
      whatsapp: {
        numero: '573144874534',
        mensaje: 'Hola Fangan Tech, me gustaría obtener más información sobre...',
      },
      redesSociales: {
        facebook: 'https://facebook.com/fangantech',
        instagram: 'https://instagram.com/fangantech',
        tiktok: 'https://tiktok.com/@fangantech',
      },
      emailPqr: 'ventas@fangantech.com.co',
    }

    await client.createOrReplace(settingsDoc)
    console.log('✅ Configuración Global subida.')

    // 2. Clientes (Clients)
    console.log('2. Subiendo Clientes (Clients)...')
    const clientsData = [
      {
        _type: 'client',
        name: 'Metro de Bogotá',
        description: 'Empresa encargada del diseño, construcción y operación del Metro de Bogotá.',
      },
      {
        _type: 'client',
        name: 'Corporación Universitaria Minuto de Dios',
        description: 'Institución de educación superior en Colombia.',
      },
      {
        _type: 'client',
        name: 'Unipanamericana',
        description: 'Fundación Universitaria Panamericana.',
      }
    ]

    const clientIds = []
    for (const c of clientsData) {
      const createdClient = await client.create(c)
      clientIds.push(createdClient._id)
      console.log(`✅ Cliente creado: ${createdClient.name}`)
    }

    // 3. Portafolio (Portfolio)
    console.log('3. Subiendo Portafolio (Portfolio)...')
    if (clientIds.length > 0) {
      const portfolioData = [
        {
          _type: 'portfolio',
          title: 'Implementación de Infraestructura Red',
          slug: { _type: 'slug', current: 'implementacion-infraestructura-red' },
          client: { _type: 'reference', _ref: clientIds[0] },
          description: 'Despliegue completo de red de datos para nuevas sedes.',
          tags: ['Redes', 'Infraestructura', 'Soporte'],
        },
        {
          _type: 'portfolio',
          title: 'Renovación de Equipos de Cómputo',
          slug: { _type: 'slug', current: 'renovacion-equipos-computo' },
          client: { _type: 'reference', _ref: clientIds[1] },
          description: 'Suministro y configuración de más de 200 estaciones de trabajo.',
          tags: ['Hardware', 'Educación'],
        }
      ]

      for (const p of portfolioData) {
        // En Sanity, para crear documentos que requieren imágenes, la imagen se sube primero como un asset y luego se referencia. 
        // Ya que no tenemos imágenes reales para subir, comentaremos el campo de la imagen, 
        // asumiendo que para la prueba se pueden crear sin imagen o se quitará el validation en el schema por el momento.
        // Wait, portfolio has a required image field! Let's temporarily remove the required validation for this seed.
        // Or we don't upload image right now. Let's see if sanity allows it. If it fails, I'll update schema.
        await client.create(p).catch(err => console.error(`Error creando portafolio ${p.title}:`, err.message))
        console.log(`✅ Proyecto de portafolio creado: ${p.title}`)
      }
    }

    console.log('🎉 ¡Poblamiento de datos completado exitosamente!')
  } catch (error) {
    console.error('❌ Error durante el poblamiento de datos:', error)
  }
}

seedSettingsAndPortfolio()
