import { defineField, defineType } from 'sanity'

export const casoDeExitoType = defineType({
  name: 'casoDeExito',
  title: 'Casos de Éxito',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Caso',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente Asociado',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Selecciona el cliente al que pertenece este caso de éxito.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reto',
      title: 'El Reto',
      type: 'text',
      description: 'Descripción del reto o problema que enfrentaba el cliente.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solucion',
      title: 'La Solución',
      type: 'text',
      description: 'Describe cómo Fangan Tech resolvió el problema.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resultado',
      title: 'El Resultado',
      type: 'text',
      description: 'Resultados cuantificables o cualitativos obtenidos.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de visualización',
      type: 'number',
      description: 'Número para controlar el orden en que se muestra este caso.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client.name',
      media: 'image',
    },
  },
})
