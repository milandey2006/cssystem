// sanity/schemaTypes/project.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required().error('Project name is required')
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200).error('Description is required and should be under 200 characters')
    }),
    // UPDATED: Changed from single image to multiple images
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [{ 
        type: 'image', 
        options: { hotspot: true } 
      }],
      validation: Rule => Rule.required().min(1).max(4).error('Add between 1 and 4 images')
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial Security', value: 'commercial' },
          { title: 'Residential Security', value: 'residential' },
          { title: 'Industrial Security', value: 'industrial' },
          { title: 'Institutional Security', value: 'institutional' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required().error('Project category is required')
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'CCTV Cameras', value: 'cctv' },
          { title: 'Digital Door Lock', value: 'digital-lock' },
          { title: 'Network Camera', value: 'network-camera' },
          { title: 'Network Video Recorder', value: 'nvr' },
          { title: 'Video Door Phone', value: 'video-door-phone' },
          { title: 'Wifi Camera', value: 'wifi-camera' },
          { title: 'Biometrics', value: 'biometrics' },
          { title: 'Night Vision', value: 'night-vision' },
          { title: 'Motion Detection', value: 'motion-detection' },
          { title: 'Weatherproof', value: 'weatherproof' },
          { title: 'Two-way Audio', value: 'two-way-audio' },
          { title: 'Remote Viewing', value: 'remote-viewing' },
          { title: 'WiFi Enabled', value: 'wifi-enabled' },
          { title: 'Cloud Storage', value: 'cloud-storage' },
          { title: 'Mobile App', value: 'mobile-app' }
        ]
      },
      validation: Rule => Rule.required().min(1).error('At least one technology must be selected')
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'string',
      options: {
        list: [
          { title: 'Aurangabad', value: 'aurangabad' },
          { title: 'Mumbai', value: 'mumbai' },
          { title: 'Nashik', value: 'nashik' },
          { title: 'Navi Mumbai', value: 'navi-mumbai' },
          { title: 'Pune', value: 'pune' },
          { title: 'Thane', value: 'thane' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('Project location is required')
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Mark as featured to show on homepage',
      initialValue: false
    }),
    defineField({
      name: 'completedDate',
      title: 'Project Completion Date',
      type: 'date'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'images.0' // Show first image in preview
    }
  },
  orderings: [
    {
      title: 'Project Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Project Name Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }]
    },
    {
      title: 'Newest First',
      name: 'completedDateDesc',
      by: [{ field: 'completedDate', direction: 'desc' }]
    }
  ]
})
