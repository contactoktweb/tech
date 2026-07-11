import { defineField, defineType } from 'sanity'

export const homeHeroType = defineType({
  name: 'homeHero',
  title: 'Inicio - Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge / Etiqueta',
      type: 'string',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Título Línea 1',
      type: 'string',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Título Línea 2',
      type: 'string',
    }),
    defineField({
      name: 'titleLine3',
      title: 'Título Línea 3 (Destacado)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto Botón Principal',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Enlace Botón Principal',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'Texto Botón Secundario',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'Enlace Botón Secundario',
      type: 'string',
    }),
  ],
})
