// CCTV Product schema for the Champion CCTV Rental Website
export default {
  name: 'cctvProduct',
  title: 'CCTV Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. 4K Outdoor Bullet Camera'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'pricePerDay',
      title: 'Price Per Day (₹)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'CCTV Camera', value: 'CCTV Camera' },
          { title: 'NVR / Recording', value: 'NVR / Recording' },
          { title: 'POE Switch', value: 'POE Switch' },
          { title: 'Storage (HDD)', value: 'Storage (HDD)' },
          { title: 'Cables & Wiring', value: 'Cables & Wiring' },
          { title: 'Accessories', value: 'Accessories' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'resolution',
      title: 'Resolution',
      type: 'string',
      description: 'e.g. 4K Ultra HD, 5MP, 1080p (Only for Cameras)',
    },
    {
      name: 'channels',
      title: 'Channels / Ports',
      type: 'string',
      description: 'e.g. 4 Channel, 8 Port, 16 Channel (For NVR/POE)',
    },
    {
      name: 'storageCapacity',
      title: 'Storage Capacity',
      type: 'string',
      description: 'e.g. 1TB, 2TB, 4TB (For HDDs)',
    },
    {
      name: 'durability',
      title: 'Durability Rating',
      type: 'string',
      description: 'e.g. IP67 Weatherproof, Indoor Use',
    },
    {
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${subtitle || 'No category'} · CCTV Rental`,
        media
      }
    }
  }
}
