// @ts-nocheck
import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import crypto from 'crypto'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Error: Faltan variables de entorno en .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
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
  console.log('--- Iniciando Sembrado de Tienda en Sanity ---')
  
  // 1. Create Categories
  console.log('Creando Categorías...')
  const categories = [
    { _id: 'cat-laptops', _type: 'category', title: 'Portátiles', slug: { _type: 'slug', current: 'laptops' } },
    { _id: 'cat-accesorios', _type: 'category', title: 'Accesorios', slug: { _type: 'slug', current: 'accesorios' } },
  ]
  for (const cat of categories) {
    await client.createOrReplace(cat)
  }

  // 2. Create Brands
  console.log('Creando Marcas...')
  const brands = [
    { _id: 'brand-hp', _type: 'brand', name: 'HP', slug: { _type: 'slug', current: 'hp' } },
    { _id: 'brand-dell', _type: 'brand', name: 'Dell', slug: { _type: 'slug', current: 'dell' } },
    { _id: 'brand-lenovo', _type: 'brand', name: 'Lenovo', slug: { _type: 'slug', current: 'lenovo' } },
    { _id: 'brand-apple', _type: 'brand', name: 'Apple', slug: { _type: 'slug', current: 'apple' } },
  ]
  for (const brand of brands) {
    await client.createOrReplace(brand)
  }

  // 3. Upload Images
  const hpImage = await uploadImage('public/images/product-laptop-hp.jpg')
  const dellImage = await uploadImage('public/images/product-laptop-dell.jpg')
  const lenovoImage = await uploadImage('public/images/product-laptop-lenovo.jpg')

  // 4. Create Products
  console.log('Creando Productos...')
  const products = [
    {
      _id: 'product-hp-elitebook-840-g9',
      _type: 'product',
      name: 'HP EliteBook 840 G9',
      slug: { _type: 'slug', current: 'hp-elitebook-840-g9' },
      brand: { _type: 'reference', _ref: 'brand-hp' },
      category: { _type: 'reference', _ref: 'cat-laptops' },
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'Portátil corporativo de alta calidad. Equipado con procesador Intel Core i7, 16GB de memoria RAM y almacenamiento rápido SSD de 512GB. Ideal para maximizar el rendimiento laboral.',
      price: 4890000,
      badge: 'Destacado',
      image: hpImage || undefined,
      stock: 15,
      featured: true,
      variations: [
        { _key: crypto.randomUUID(), name: 'Procesador', options: [{ _key: crypto.randomUUID(), value: 'Intel Core i7', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'RAM', options: [{ _key: crypto.randomUUID(), value: '16GB', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'Almacenamiento', options: [{ _key: crypto.randomUUID(), value: '512GB SSD', priceModifier: 0 }] },
      ],
    },
    {
      _id: 'product-dell-xps-15-9530',
      _type: 'product',
      name: 'Dell XPS 15 9530',
      slug: { _type: 'slug', current: 'dell-xps-15-9530' },
      brand: { _type: 'reference', _ref: 'brand-dell' },
      category: { _type: 'reference', _ref: 'cat-laptops' },
      specs: 'Intel Core i9, 32GB RAM, 1TB SSD',
      description: 'Portátil premium para creadores y profesionales. Potencia incomparable con Intel Core i9, 32GB de memoria RAM de alto rendimiento y SSD masivo de 1TB. Diseño ultra delgado con materiales duraderos.',
      price: 7225000,
      oldPrice: 8500000,
      badge: '-15%',
      image: dellImage || undefined,
      stock: 8,
      featured: true,
      variations: [
        { _key: crypto.randomUUID(), name: 'Procesador', options: [{ _key: crypto.randomUUID(), value: 'Intel Core i9', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'RAM', options: [{ _key: crypto.randomUUID(), value: '32GB', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'Almacenamiento', options: [{ _key: crypto.randomUUID(), value: '1TB SSD', priceModifier: 0 }] },
      ],
    },
    {
      _id: 'product-thinkpad-x1-carbon-gen-11',
      _type: 'product',
      name: 'ThinkPad X1 Carbon Gen 11',
      slug: { _type: 'slug', current: 'thinkpad-x1-carbon-gen-11' },
      brand: { _type: 'reference', _ref: 'brand-lenovo' },
      category: { _type: 'reference', _ref: 'cat-laptops' },
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      description: 'El portátil corporativo por excelencia. Lenovo ThinkPad X1 Carbon Gen 11 combina ligereza extrema, durabilidad de nivel militar y un teclado insuperable. Rendimiento óptimo con i7 de última generación.',
      price: 6290000,
      image: lenovoImage || undefined,
      stock: 12,
      featured: true,
      variations: [
        { _key: crypto.randomUUID(), name: 'Procesador', options: [{ _key: crypto.randomUUID(), value: 'Intel Core i7', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'RAM', options: [{ _key: crypto.randomUUID(), value: '16GB', priceModifier: 0 }] },
        { _key: crypto.randomUUID(), name: 'Almacenamiento', options: [{ _key: crypto.randomUUID(), value: '512GB SSD', priceModifier: 0 }] },
      ],
    },
  ]

  for (const product of products) {
    console.log(`Guardando producto: ${product.name}...`)
    await client.createOrReplace(product)
  }

  console.log('--- Sembrado de Tienda Finalizado Con Éxito ---')
}

run().catch((err) => {
  console.error('Error durante el sembrado de tienda:', err)
  process.exit(1)
})
