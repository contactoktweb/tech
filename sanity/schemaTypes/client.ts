import { defineField, defineType } from 'sanity'

export const clientType = defineType({
  name: 'client',
  title: 'Clientes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Cliente',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Opcional)',
      type: 'text',
      description: 'Breve reseña o información sobre el cliente.',
    }),
    defineField({
      name: 'website',
      title: 'Sitio Web (Opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
