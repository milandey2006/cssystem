// Rental Product schema for the Champion Walkie Talkie Rental Website

export default {
  name: 'rentalProduct',
  title: 'Rental Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'e.g. CS-Omega Tactical'
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
      description: 'Auto-generated from name. Click "Generate".'
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'Shown on the product card in the catalog.'
    },
    {
      name: 'pricePerDay',
      title: 'Price Per Day (₹)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
      description: 'Daily rental rate in Indian Rupees'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Handheld', value: 'Handheld' },
          { title: 'Base Station', value: 'Base Station' },
          { title: 'Accessories', value: 'Accessories' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'range',
      title: 'Effective Range',
      type: 'string',
      options: {
        list: [
          { title: '10-30 Miles', value: '10-30 Miles' },
          { title: '50+ Miles', value: '50+ Miles' },
          { title: 'N/A (Accessory)', value: 'N/A' },
        ],
        layout: 'dropdown'
      },
    },
    {
      name: 'durability',
      title: 'Durability Rating',
      type: 'string',
      description: 'e.g. IP68 Mil-Spec, IP67, IP65, Indoor/Vehicle, IP54',
    },
    {
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'Optional label shown on the product card. e.g. "Most Popular", "New", "Add-on". Leave empty for none.'
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      description: 'Main product image shown in the catalog.'
    },
    {
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide this product from the catalog.'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first. Use 1, 2, 3... to control the order.'
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
        subtitle: `${subtitle || 'No category'} · Rental Product`,
        media
      }
    }
  }
}
