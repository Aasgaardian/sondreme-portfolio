import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { createClient } from 'next-sanity'

/**
 * Sanity Client Configuration
 *
 * Environment variables are loaded from .env.local
 * NEXT_PUBLIC_ prefix makes them available to the browser
 *
 * useCdn: false in development for immediate content updates
 * useCdn: true in production for better performance
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: 'http://localhost:3333',
  },
})

/**
 * Client for draft mode
 * Uses 'previewDrafts' perspective to see unpublished content
 */
export const draftClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false, // Don't use CDN for draft content
  perspective: 'previewDrafts',
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
})

/**
 * Get the appropriate client based on draft mode
 */
export function getClient(preview = false) {
  return preview ? draftClient : client
}

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
