import { client } from './sanity'

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    primaryColor,
    secondaryColor,
    features,
    announcement,
    maintenanceMode
  }`

  return await client.fetch(query)
}

export async function isMaintenanceMode(): Promise<boolean> {
  // Only enable maintenance mode in production
  const isProduction = process.env.NODE_ENV === 'production'
  if (!isProduction) return false

  const settings = await getSiteSettings()
  return settings?.maintenanceMode?.enabled ?? false
}
