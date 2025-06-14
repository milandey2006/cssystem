'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import { deskTool } from 'sanity/desk'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {structure} from './sanity/structure'

// THIS IS THE IMPORTANT CHANGE:
// We import the array named 'schemaTypes' from your schema file.
import {schemaTypes} from './sanity/schemaTypes'


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  
  // THIS IS THE OTHER IMPORTANT CHANGE:
  // The schema configuration is an object that has a 'types' property.
  // We pass our imported schemaTypes array to it.
  schema: {
    types: schemaTypes,
  },

  plugins: [
    deskTool({ structure }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})