import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Página Nosotros (Fangan Tech)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la página',
      type: 'string',
      initialValue: 'Nosotros',
    }),
    defineField({
      name: 'introText',
      title: 'Texto Introductorio',
      type: 'text',
      description: 'La historia y visión que inspiró Fangan Tech.',
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
    }),
    defineField({
      name: 'purpose',
      title: 'Nuestro Propósito',
      type: 'string',
    }),
    defineField({
      name: 'slogans',
      title: 'Eslogan(es)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'signaturePhrase',
      title: 'Frase que identifica a Fangan Tech',
      type: 'string',
    }),
    defineField({
      name: 'team',
      title: 'Equipo (Personas)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'person',
          title: 'Persona',
          fields: [
            {
              name: 'name',
              title: 'Nombre',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Rol o Cargo',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Página Nosotros',
      }
    },
  },
})
