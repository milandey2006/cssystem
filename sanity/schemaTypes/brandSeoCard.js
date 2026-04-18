export default {
  name: 'brandSeoCard',
  title: 'SEO Cards (Homepage)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'The short SEO description shown on the homepage card.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort the items. Lower numbers appear first.',
    },
  ],
};
