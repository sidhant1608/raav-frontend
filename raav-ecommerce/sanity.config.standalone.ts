/**
 * This configuration is for standalone Sanity Studio deployment
 * Used when deploying to sanity.studio with `npx sanity deploy`
 * 
 * Note: This is separate from the embedded studio config used in Next.js
 * 
 * For deployed studios, set these environment variables in Sanity's project settings:
 * - SANITY_STUDIO_PROJECT_ID
 * - SANITY_STUDIO_DATASET
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

// Read from environment variables
// For local development: uses NEXT_PUBLIC_* vars
// For deployed studio: uses SANITY_STUDIO_* vars (set in Sanity project settings)
const projectId = 
  process.env.SANITY_STUDIO_PROJECT_ID || 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
  'nn84nakp' // Fallback to your project ID

const dataset = 
  process.env.SANITY_STUDIO_DATASET || 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 
  'production' // Fallback to your dataset

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-06'

export default defineConfig({
  name: 'default',
  title: 'RAAV Studio',
  projectId,
  dataset,
  basePath: '/studio',
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

