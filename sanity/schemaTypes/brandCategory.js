// sanity/schemaTypes/brandCategory.js
// A section on the /brands page (e.g. "Surveillance / CCTV", "Networking").
// Add, rename or reorder these freely from the Studio.
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brandCategory',
  title: 'Brand Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      description: 'e.g. "Surveillance / CCTV", "Access Control & Biometric", "Networking", "IPBX"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      description: 'Optional one-line shown under the category heading.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number shows first. e.g. 1, 2, 3…',
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
    select: { title: 'title', subtitle: 'description' },
  },
})
