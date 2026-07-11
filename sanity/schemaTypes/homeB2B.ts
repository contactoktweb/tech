import { defineField, defineType } from 'sanity'

export const homeB2BType = defineType({
  name: 'homeB2B',
  title: 'Inicio - Banner B2B',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto Botón',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace Botón',
      type: 'string',
    }),
    defineField({
      name: 'graphics',
      title: 'Gráficos SVG',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'graphicItem',
          title: 'Gráfico',
          fields: [
            defineField({
              name: 'svgCode',
              title: 'Código SVG',
              type: 'text',
              description: 'Pega el código SVG completo aquí.',
            }),
          ],
        },
      ],
    }),
  ],
})
