export default {
  name: 'brandFaq',
  title: 'Brand FAQs',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'FAQ Question',
      type: 'string',
      description: 'The question shown in the FAQ page.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'FAQ Answer',
      type: 'text',
      description: 'The detailed answer shown in the FAQ page.',
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
