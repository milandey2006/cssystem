// sanity/schemaTypes/certificate.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Certificate Name',
      type: 'string',
      description: 'e.g. "STQC Certification" or "BIS Certificate — Hanwha Vision"',
      validation: Rule => Rule.required().error('Certificate name is required')
    }),
    defineField({
      name: 'image',
      title: 'Certificate Image',
      type: 'image',
      description:
        'Upload a photo or scan of the certificate. Landscape or portrait both work — it is shown full size when someone clicks it.',
      options: { hotspot: true },
      validation: Rule => Rule.required().error('Certificate image is required')
    }),
    defineField({
      name: 'description',
      title: 'About This Certificate',
      type: 'text',
      rows: 5,
      description: 'What the certificate is for and why it matters. Shown under the certificate.',
      validation: Rule => Rule.required().max(600).error('Please add a description under 600 characters')
    }),
    defineField({
      name: 'issuer',
      title: 'Issued By',
      type: 'string',
      description: 'Optional — the authority or brand that issued it, e.g. "STQC Directorate" or "Bosch".'
    }),
    defineField({
      name: 'issuedDate',
      title: 'Issue Date',
      type: 'date',
      description: 'Optional — used to sort newest first.'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Optional — lower numbers appear first. Leave blank to fall back to issue date. Use this to pin your most important certificates to the top.'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Newest First',
      name: 'issuedDateDesc',
      by: [{ field: 'issuedDate', direction: 'desc' }]
    },
    {
      title: 'Name A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
})
