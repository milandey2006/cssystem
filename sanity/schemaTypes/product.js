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
    // Brand field with updated non-Chinese brand list
    { 
      name: 'brand', 
      title: 'Brand Name', 
      type: 'string',
      options: {
        list: [
          'Hanwha Vision',
          'Honeywell', 
          'Matrix Comsec',
          'eSSL',
          'Axis Communications',
          'TP Link',
          'OneTouch',
          'DLink',
          'NetGear',
          'BioMax',
          
          // You can add more brands here
        ],
        layout: 'dropdown'
      },
      // IMPORTANT: Validation ensures the field is always filled, preventing filter errors
      //validation: Rule => Rule.required().error('Brand is required for product filtering.')
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
