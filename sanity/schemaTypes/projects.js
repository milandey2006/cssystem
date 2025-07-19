// schemas/project.js
export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(100)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Residential Security', value: 'residential' },
          { title: 'Commercial Security', value: 'commercial' },
          { title: 'Industrial Security', value: 'industrial' },
          { title: 'CCTV Installation', value: 'cctv' },
          { title: 'Access Control', value: 'access-control' },
          { title: 'Fire Safety', value: 'fire-safety' },
          { title: 'Smart Home', value: 'smart-home' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Project Location',
      type: 'string',
      placeholder: 'e.g., Mumbai, Maharashtra'
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date'
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'CCTV Cameras',
          'NVR Systems', 
          'Access Control',
          'Biometric Systems',
          'Fire Alarms',
          'Motion Sensors',
          'Smart Locks',
          'Network Infrastructure',
          'Mobile Apps',
          'Cloud Storage'
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'completionDate', direction: 'desc' }
      ]
    }
  ]
}