import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Configuración Global',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Sitio',
      type: 'string',
      description: 'Título que aparece en la pestaña del navegador',
    }),
    defineField({
      name: 'description',
      title: 'Descripción del Sitio (SEO)',
      type: 'text',
      description: 'Descripción para motores de búsqueda',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icono de la pestaña del navegador (Sugerido 32x32px)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      type: 'image',
      description: 'Logo que aparecerá en el Header',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoLargo',
      title: 'Logo Largo (Footer)',
      type: 'image',
      description: 'Logo con texto que aparecerá en el Footer',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contacto',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        defineField({ name: 'telefono', title: 'Teléfono', type: 'string' }),
        defineField({ name: 'email', title: 'Correo Electrónico', type: 'string' }),
        defineField({ name: 'direccion', title: 'Dirección Física', type: 'string' }),
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'Botón de WhatsApp',
      type: 'object',
      fields: [
        defineField({ name: 'numero', title: 'Número (Sin espacios ni +)', type: 'string', description: 'Ej: 573144874534' }),
        defineField({ name: 'mensaje', title: 'Mensaje Predeterminado', type: 'string' }),
      ],
    }),
    defineField({
      name: 'redesSociales',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'googleMaps',
      title: 'Mapa (Google Maps Iframe)',
      type: 'text',
      description: 'Pega aquí el código <iframe> que te da Google Maps',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'URL de Redirección del Mapa',
      type: 'url',
      description: 'Enlace al que se redirigirá al hacer clic en el mapa (Ej: Enlace directo a Google Maps)',
    }),
    defineField({
      name: 'emailPqr',
      title: 'Correo para recibir PQR',
      type: 'string',
      description: 'El correo electrónico donde llegarán las notificaciones de nuevas PQR',
    }),
  ],
})
