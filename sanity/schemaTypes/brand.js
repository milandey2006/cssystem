// sanity/schemaTypes/brand.js
// A brand shown on the /brands landing page. Upload a logo (or leave it
// blank to show the name as text), pick which category it sits under, and
// set the "Product Brand Value" so clicking it opens the matching products.
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      description: 'Display name, e.g. "Hanwha Vision".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: { hotspot: true },
      description:
        'Upload the brand logo (PNG/SVG with transparent background works best). If left empty, the brand name is shown as text instead.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'brandCategory' }],
      description: 'Which section on the Brands page this appears under.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filterValue',
      title: 'Product Brand Value',
      type: 'string',
      description:
        'The brand key used to match products. For a NEW brand, just type its name (e.g. "Mivanta") — then tag its products using the "Brand" picker on each product. For a brand already used on your products, type it EXACTLY as it appears on the products (e.g. "Hanwha Vision", "Matrix Comsec", "DLink").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number shows first within its category.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category.title', media: 'logo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Brand · ${subtitle}` : 'Brand', media }
    },
  },
})
