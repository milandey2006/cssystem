import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01', // or your apiVersion
  useCdn: false, // <--- IMPORTANT: disables caching for fresh data
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)