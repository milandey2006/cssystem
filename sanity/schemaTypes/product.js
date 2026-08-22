// schema/product.js (or similar)

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'WIFI Camera', value: 'Wifi Camera' },
          { title: 'Network Video Recorder', value: 'Network Video Recorder' },
          { title: 'Network Camera', value: 'Network Camera' },
          { title: 'Biometrics', value: 'Biometrics' },
          { title: 'Access Control', value: 'Access Control' },
          { title: 'Digital Door Lock', value: 'Digital Door Lock' },
          { title: 'SIP Phone', value: 'SIP Phone' },
          { title: 'Video Door Phone', value: 'Video Door Phone' },
          { title: 'Network Switch', value: 'Network Switch' },
          { title: 'CCTV Package', value: 'CCTV Package' },
          { title: 'Walkie Talkie', value: 'Walkie Talkie' },
          { title: 'Accessories', value: 'Accessories' },
          { title: 'Intruder Alarm', value: 'Intruder Alarm' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string'
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
    },
    // Keep this field for the Features filter
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    // NEW — pick the brand from your Studio "Brands" list. This is the
    // preferred way to tag a product's brand: any brand you create appears
    // here automatically, and the product shows under that brand on the
    // /brands page and in the brand filter. Takes priority over the old
    // "Brand Name (text)" field below.
    {
      name: 'brandRef',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      description:
        'Pick the brand from your Brands list. Create new brands under 🔰 Brands (logos). This drives the Brands page and the product filter.',
    },
    // OLD text field — kept so existing products keep working. New products
    // should use the "Brand" picker above instead of this.
    {
      name: 'brand',
      title: 'Brand Name (text — legacy)',
      type: 'string',
      description:
        'Legacy free-text brand. Prefer the "Brand" picker above. Only used if the picker is empty.',
      options: {
        list: [
          'Hanwha Vision',
          'Honeywell',
          'Matrix Comsec',
          'eSSL',
          'Axis Communications',
          'TP Link',
          'OneTouch',
          'BioMax',
          'Panasonic i-Pro',
          'Prama',
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'whatsInTheBox',
      title: 'What\'s in the Box',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {
          name: 'specs',  
          title: 'Specs',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'key', type: 'string', title: 'Key' },
                { name: 'value', type: 'string', title: 'Value' }
              ]
            }
          ]
        }
      ]
    },
    // Assuming 'image' here is the fallback/main image field, 
    // though the image array is typically used for the main listing.
    { name: 'image', title: 'Image', type: 'image' }
  ]
}
