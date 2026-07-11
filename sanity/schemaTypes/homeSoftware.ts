import { defineField, defineType } from 'sanity'

export const homeSoftwareType = defineType({
  name: 'homeSoftware',
  title: 'Inicio - Banner de Software',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Etiqueta / Badge',
      type: 'string',
    }),
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
      name: 'logos',
      title: 'Logos / Marcas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logoItem',
          title: 'Logo',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre',
              type: 'string',
            }),
            defineField({
              name: 'logoSvg',
              title: 'Código SVG del Logo',
              description: 'Pega el código SVG completo aquí. (Ej: <svg>...</svg>)',
              type: 'text',
            }),
          ],
        },
      ],
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
  ],
})
