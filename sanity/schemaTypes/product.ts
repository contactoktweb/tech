import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Productos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'reference',
      to: [{ type: 'brand' }],
      description: 'Selecciona la marca del producto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Selecciona la categoría del producto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specs',
      title: 'Especificaciones Rápidas',
      type: 'string',
      description: 'Ej: Intel Core i7, 16GB RAM, 512GB SSD',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Precio Anterior (Oferta)',
      type: 'number',
      description: 'Dejar vacío si no está en descuento',
    }),
    defineField({
      name: 'badge',
      title: 'Etiqueta (Badge)',
      type: 'string',
      description: 'Ej: Destacado, Sale, -15%',
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'featured',
      title: 'Producto Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'variations',
      title: 'Variaciones del Producto',
      type: 'array',
      description: 'Atributos con múltiples opciones configurables y modificadores de precio (ej. RAM, Almacenamiento, Color).',
      of: [
        {
          type: 'object',
          name: 'variation',
          title: 'Atributo con Variaciones',
          fields: [
            defineField({
              name: 'name',
              title: 'Nombre del Atributo',
              type: 'string',
              description: 'Ej: Memoria RAM, Almacenamiento, Color, Procesador',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Opciones de Valor',
              type: 'array',
              description: 'Diferentes valores u opciones disponibles para este atributo.',
              of: [
                {
                  type: 'object',
                  name: 'option',
                  title: 'Opción de Valor',
                  fields: [
                    defineField({
                      name: 'value',
                      title: 'Valor de la Opción',
                      type: 'string',
                      description: 'Ej: 16GB, 1TB SSD, Gris Espacial',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'priceModifier',
                      title: 'Modificador de Precio',
                      type: 'number',
                      description: 'Valor a sumar o restar del precio base (ej: 650000 o -400000). Usa 0 si no modifica el precio.',
                      initialValue: 0,
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
