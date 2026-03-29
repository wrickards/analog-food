import { Client } from '@googlemaps/google-maps-services-js'
import { Vendor, VendorType } from '@/types'

const SEARCH_TERMS = [
  'organic farm produce',
  'farmers market',
  'health food store organic',
  'natural food store',
  'food cooperative grocery',
  'CSA farm share',
  'farm stand produce',
  'specialty organic grocer',
]

// Chain stores to exclude — goal is indie/local sources only
const CHAIN_BLOCKLIST = [
  'whole foods',
  'trader joe',
  'walmart',
  'target',
  'kroger',
  'safeway',
  'albertsons',
  'publix',
  'stop & shop',
  'giant food',
  'harris teeter',
  'king soopers',
  'fred meyer',
  'ralphs',
  'vons',
  'jewel',
  "shaw's",
  'star market',
  'winn-dixie',
  'food lion',
  'aldi',
  'lidl',
  'costco',
  "sam's club",
  'bjs wholesale',
  'sprouts farmers',
  'natural grocers',
  'earth fare',
  'fresh market',
  'wegmans',
  'meijer',
  'h-e-b',
  'piggly wiggly',
  'hy-vee',
  'price chopper',
  'market basket',
  'shoprite',
  'acme markets',
  'fairway market',
  'morton williams',
  'western beef',
  'key food',
  'c-town',
  'associated supermarket',
  'bravo supermarket',
  'compare foods',
  "d'agostino",
]

function isChainStore(name: string): boolean {
  const lower = name.toLowerCase()
  return CHAIN_BLOCKLIST.some((chain) => lower.includes(chain))
}

function inferVendorType(name: string): VendorType {
  const lower = name.toLowerCase()
  if (
    lower.includes("farmers market") ||
    lower.includes("farmer's market") ||
    lower.includes('greenmarket') ||
    lower.includes('farmstand') ||
    lower.includes('farm stand') ||
    lower.includes('farm market') ||
    (lower.includes('farm') && lower.includes('bazaar'))
  )
    return 'farmers-market'
  if (
    lower.includes('csa') ||
    lower.includes('community supported agriculture')
  )
    return 'csa'
  if (
    lower.includes('farm') &&
    !lower.includes('pharmacy') &&
    !lower.includes('insurance') &&
    !lower.includes('bureau')
  )
    return 'farm'
  return 'specialty-grocer'
}

function inferTags(name: string, rating?: number): string[] {
  const lower = name.toLowerCase()
  const tags: string[] = []

  if (lower.includes('organic')) tags.push('organic')
  if (lower.includes('natural')) tags.push('natural')
  if (lower.includes('local') || lower.includes('locally')) tags.push('local')
  if (lower.includes('farm') && !lower.includes('pharmacy')) tags.push('farm-fresh')
  if (lower.includes('co-op') || lower.includes('coop') || lower.includes('cooperative')) tags.push('co-op')
  if (lower.includes('holistic') || lower.includes('wellness')) tags.push('health food')
  if (lower.includes('artisan') || lower.includes('craft')) tags.push('artisan')
  if (lower.includes('green') || lower.includes('eco')) tags.push('sustainable')
  if (rating && rating >= 4.5) tags.push('highly rated')

  return tags.length > 0 ? tags : ['local']
}

function parseAddress(formatted: string): {
  address: string
  city: string
  state: string
  zip: string
} {
  // "123 Main St, New York, NY 10001, USA" or "New York, NY 10001, USA"
  const clean = formatted.replace(', USA', '').replace(', United States', '')
  const parts = clean.split(',').map((s) => s.trim())
  const address = parts[0] || ''
  const city = parts[1] || ''
  const stateZipParts = (parts[2] || '').trim().split(' ')
  const state = stateZipParts[0] || ''
  const zip = stateZipParts[1] || ''
  return { address, city, state, zip }
}

export async function searchPlacesNearby(
  lat: number,
  lng: number,
  radiusMiles = 5
): Promise<Vendor[]> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY
  if (!apiKey) return []

  const client = new Client()
  const radiusMeters = Math.min(radiusMiles * 1609.34, 50000)
  type PlaceResult = {
    place_id: string
    name: string
    formatted_address: string
    geometry: { location: { lat: number; lng: number } }
    types: string[]
    rating?: number
    user_ratings_total?: number
  }
  const allPlaces = new Map<string, PlaceResult>()

  // Run all search terms in parallel
  const results = await Promise.allSettled(
    SEARCH_TERMS.map((term) =>
      client.textSearch({
        params: {
          query: term,
          location: `${lat},${lng}`,
          radius: radiusMeters,
          key: apiKey,
        },
      })
    )
  )

  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    for (const place of result.value.data.results) {
      if (!place.place_id || !place.geometry?.location || !place.name) continue
      if (!allPlaces.has(place.place_id)) {
        allPlaces.set(place.place_id, place as PlaceResult)
      }
    }
  }

  const vendors: Vendor[] = []

  for (const [placeId, place] of Array.from(allPlaces.entries())) {
    if (isChainStore(place.name)) continue

    const { address, city, state, zip } = parseAddress(place.formatted_address || '')
    const type = inferVendorType(place.name)
    const tags = inferTags(place.name, place.rating)

    vendors.push({
      id: `google_${placeId}`,
      name: place.name,
      type,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      address,
      city,
      state,
      zip,
      tags,
      highlights: [],
      verified: false,
      source: 'google',
      place_id: placeId,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      created_at: new Date().toISOString(),
    })
  }

  return vendors
}
