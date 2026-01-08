import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN in production for more reliable data fetching
  // CDN can cache empty results or stale data, causing deployment issues
  useCdn: process.env.NODE_ENV === 'development',
})
