import { groq } from 'next-sanity'

// Configuración Global
export const settingsQuery = groq`*[_type == "settings"][0]{
  favicon,
  logo,
  logoLargo,
  contacto,
  whatsapp,
  redesSociales,
  googleMaps,
  googleMapsUrl
}`

// Secciones de la Página de Inicio
export const homeHeroQuery = groq`*[_type == "homeHero"][0]{
  badge,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitle,
  ctaText,
  ctaLink,
  ctaSecondaryText,
  ctaSecondaryLink
}`

export const homeAboutQuery = groq`*[_type == "homeAbout"][0]{
  title,
  subtitle,
  centerImage,
  cards
}`

export const homeCategoriesQuery = groq`*[_type == "homeCategories"][0]{
  title,
  subtitle,
  categories
}`

export const homeGuaranteesQuery = groq`*[_type == "homeGuarantees"][0]{
  title,
  description,
  ctaText,
  ctaLink
}`

export const homeServicesQuery = groq`*[_type == "homeServices"][0]{
  title,
  subtitle,
  categories
}`

export const homeSoftwareQuery = groq`*[_type == "homeSoftware"][0]{
  badge,
  title,
  description,
  logos,
  ctaText,
  ctaLink
}`

export const homeB2BQuery = groq`*[_type == "homeB2B"][0]{
  title,
  description,
  ctaText,
  ctaLink
}`

export const homePaymentsQuery = groq`*[_type == "homePayments"][0]{
  badge,
  title,
  description,
  paymentMethods
}`

export const homeTrustBadgesQuery = groq`*[_type == "homeTrustBadges"][0]{
  badges
}`

// Productos para la tienda y filtros
export const productsQuery = groq`*[_type == "product"] | order(featured desc, name asc){
  _id,
  name,
  "slug": slug.current,
  "brand": brand->slug.current,
  "category": category->slug.current,
  specs,
  description,
  price,
  oldPrice,
  badge,
  image,
  gallery,
  stock,
  featured,
  variations
}`

// Obtener un solo producto por slug
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  "brand": brand->slug.current,
  "category": category->slug.current,
  specs,
  description,
  price,
  oldPrice,
  badge,
  image,
  gallery,
  stock,
  featured,
  variations
}`
