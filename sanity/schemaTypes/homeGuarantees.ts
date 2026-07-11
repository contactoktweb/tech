import { defineField, defineType } from 'sanity'

export const homeGuaranteesType = defineType({
  name: 'homeGuarantees',
  title: 'Inicio - Garantía y Respaldo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción de la Garantía',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto de Acción',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace de Acción',
      type: 'string',
    }),
    defineField({
      name: 'graphicSvg',
      title: 'Gráfico SVG',
      description: 'Pega el código SVG completo aquí para sobrescribir el gráfico animado de garantía por defecto. (Ej: <svg>...</svg>)',
      type: 'text',
    }),
  ],
})
