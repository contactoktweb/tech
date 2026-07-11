import { defineField, defineType } from 'sanity'

export const homeCategoriesType = defineType({
  name: 'homeCategories',
  title: 'Inicio - Nuestro Portafolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categorías en Portafolio',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'portfolioCategory',
          title: 'Categoría',
          fields: [
            defineField({
              name: 'title',
              title: 'Título de la Categoría',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción Corta',
              type: 'text',
            }),
            defineField({
              name: 'iconType',
              title: 'Tipo de Icono / Categoría (Legacy)',
              type: 'string',
              options: {
                list: [
                  { title: 'Computadores (Laptop)', value: 'laptop' },
                  { title: 'Componentes (Grid)', value: 'grid' },
                  { title: 'Licencias (Software)', value: 'software' },
                  { title: 'Móviles (iPad)', value: 'ipad' },
                  { title: 'Televisores (Televisor)', value: 'tv' },
                  { title: 'Redes (Conectividad)', value: 'network' },
                ],
              },
            }),
            defineField({
              name: 'iconSvg',
              title: 'Código SVG Personalizado (Opcional)',
              description: 'Pega el código SVG completo aquí para sobrescribir el icono por defecto. (Ej: <svg>...</svg>)',
              type: 'text',
            }),
            defineField({
              name: 'detailsLink',
              title: 'Enlace Ver Detalles',
              type: 'string',
            }),
            defineField({
              name: 'buyLink',
              title: 'Enlace Comprar',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})
