import { Client } from '@googlemaps/google-maps-services-js'

// Fallback centroids for common NYC zip codes (used when Google key is absent)
const ZIP_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  '10001': { lat: 40.7484, lng: -73.9967 },
  '10002': { lat: 40.7157, lng: -73.9863 },
  '10003': { lat: 40.7316, lng: -73.9897 },
  '10007': { lat: 40.7135, lng: -74.0078 },
  '10009': { lat: 40.7264, lng: -73.9773 },
  '10010': { lat: 40.7396, lng: -73.9836 },
  '10011': { lat: 40.7428, lng: -74.0002 },
  '10012': { lat: 40.7258, lng: -74.0013 },
  '10013': { lat: 40.7195, lng: -74.0051 },
  '10014': { lat: 40.7335, lng: -74.0059 },
  '10016': { lat: 40.7467, lng: -73.9821 },
  '10018': { lat: 40.7564, lng: -73.9924 },
  '10019': { lat: 40.7654, lng: -73.9860 },
  '10021': { lat: 40.7710, lng: -73.9593 },
  '10023': { lat: 40.7784, lng: -73.9818 },
  '10025': { lat: 40.7975, lng: -73.9665 },
  '10026': { lat: 40.8037, lng: -73.9539 },
  '10031': { lat: 40.8244, lng: -73.9502 },
  '10036': { lat: 40.7607, lng: -73.9917 },
  '11201': { lat: 40.6942, lng: -73.9900 },
  '11205': { lat: 40.6973, lng: -73.9660 },
  '11206': { lat: 40.7059, lng: -73.9450 },
  '11211': { lat: 40.7143, lng: -73.9547 },
  '11215': { lat: 40.6601, lng: -73.9836 },
  '11216': { lat: 40.6757, lng: -73.9498 },
  '11217': { lat: 40.6826, lng: -73.9793 },
  '11222': { lat: 40.7244, lng: -73.9513 },
  '11225': { lat: 40.6610, lng: -73.9558 },
  '11231': { lat: 40.6763, lng: -74.0019 },
  '11238': { lat: 40.6811, lng: -73.9670 },
  '11101': { lat: 40.7492, lng: -73.9371 },
  '11102': { lat: 40.7720, lng: -73.9305 },
  '11354': { lat: 40.7674, lng: -73.8304 },
  '11377': { lat: 40.7449, lng: -73.9095 },
}

export async function geocodeZip(zip: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY

  if (!apiKey) {
    return ZIP_CENTROIDS[zip] ?? null
  }

  try {
    const client = new Client()
    const response = await client.geocode({
      params: {
        address: zip,
        components: 'country:US',
        key: apiKey,
      },
    })

    const result = response.data.results[0]
    if (!result) return ZIP_CENTROIDS[zip] ?? null

    const { lat, lng } = result.geometry.location
    return { lat, lng }
  } catch (e) {
    console.error('Geocode error:', e)
    return ZIP_CENTROIDS[zip] ?? null
  }
}
