import { Client, PlaceType1 } from '@googlemaps/google-maps-services-js'
import { Vendor, VendorType } from '@/types'

// Task 4 — Targeted search queries with biasing type
const SEARCH_QUERIES: Array<{ query: string; type: string }> = [
  { query: 'organic grocery store', type: 'grocery_or_supermarket' },
  { query: 'farmers market', type: 'food' },
  { query: 'organic farm stand', type: 'food' },
  { query: 'food co-op', type: 'grocery_or_supermarket' },
  { query: 'natural food store', type: 'grocery_or_supermarket' },
  { query: 'CSA farm share pickup', type: 'food' },
  { query: 'organic produce market', type: 'grocery_or_supermarket' },
  { query: 'health food store', type: 'food' },
  { query: 'farm to table grocery', type: 'grocery_or_supermarket' },
  { query: 'community farm market', type: 'food' },
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

// Task 1 — Strict place type allowlist
const ALLOWED_PLACE_TYPES = [
  'grocery_or_supermarket',
  'supermarket',
  'health',
  'food',
  'bakery',
  'meal_takeaway',
  'store',
  'market',
  'natural_food_store',
  'farm',
  'farmer_market',
  'produce',
]

// Task 1 — Hard exclusions: if ANY of these appear in types, exclude immediately
const EXCLUDED_PLACE_TYPES = [
  'park',
  'tourist_attraction',
  'jewelry_store',
  'clothing_store',
  'gym',
  'spa',
  'beauty_salon',
  'hair_care',
  'doctor',
  'hospital',
  'pharmacy',
  'real_estate_agency',
  'car_dealer',
  'car_repair',
  'lodging',
  'school',
  'church',
  'place_of_worship',
  'museum',
  'art_gallery',
  'amusement_park',
  'stadium',
  'campground',
  'cemetery',
  'courthouse',
  'embassy',
  'fire_station',
  'police',
  'post_office',
  'library',
  'movie_theater',
  'night_club',
  'bar',
  'liquor_store',
  'gas_station',
  'atm',
  'bank',
  'insurance_agency',
  'lawyer',
  'accounting',
  'electrician',
  'plumber',
  'roofing_contractor',
  'moving_company',
  'storage',
  'laundry',
  'pet_store',
  'veterinary_care',
  'zoo',
  'aquarium',
  'rv_park',
  'parking',
  'subway_station',
  'bus_station',
  'airport',
  'dentist',
]

// Types that are too generic to count as a food signal on their own
const GENERIC_TYPES = new Set(['store', 'point_of_interest', 'establishment'])

// Task 2 — Food-positive name keywords
const FOOD_POSITIVE_KEYWORDS = [
  'farm', 'farms', 'farmers', 'farmstead',
  'market', 'markets', 'marketplace',
  'grocery', 'grocer', 'grocers',
  'food', 'foods', 'foodco',
  'organic', 'organics',
  'natural', 'naturals',
  'co-op', 'coop', 'cooperative',
  'harvest', 'fresh', 'garden', 'gardens',
  'produce', 'provisions',
  'health', 'healthy',
  'green', 'greens',
  'pantry', 'kitchen',
  'community supported',
  'csa',
  'whole', 'wholesome',
  'local', 'locally',
  'seeds', 'roots',
  'earth', 'earthly',
  'pure', 'clean',
  'veggie', 'vegetable',
  'herb', 'herbs', 'herbal',
  'sprout', 'sprouts',
  'meadow', 'meadows',
  'valley', 'orchard',
  'ranch', 'ranches',
  'pasture', 'pastures',
]

// Task 2 — Non-food name keywords that signal this is the wrong business
const FOOD_NEGATIVE_KEYWORDS = [
  'park', 'parks', 'recreation',
  'jewel', 'jewelry', 'jeweller',
  'salon', 'spa', 'beauty',
  'clinic', 'medical', 'dental', 'dentist',
  'church', 'temple', 'mosque',
  'school', 'academy', 'university',
  'hotel', 'motel', 'inn', 'lodge',
  'gym', 'fitness', 'yoga',
  'pharmacy', 'drug',
  'bank', 'credit union', 'financial',
  'insurance', 'attorney', 'law',
  'auto', 'automotive', 'motors',
  'tire', 'tires',
  'realty', 'real estate', 'realtors',
  'construction', 'roofing', 'plumbing',
  'electric', 'electrical',
  'museum', 'gallery', 'theater', 'theatre',
  'airport', 'terminal',
]

function isChainStore(name: string): boolean {
  const lower = name.toLowerCase()
  return CHAIN_BLOCKLIST.some((chain) => lower.includes(chain))
}

function checkNameKeywords(name: string): { hasFoodName: boolean; hasNonFoodName: boolean } {
  const upper = name.toUpperCase()
  const hasFoodName = FOOD_POSITIVE_KEYWORDS.some((kw) => upper.includes(kw.toUpperCase()))
  const hasNonFoodName = FOOD_NEGATIVE_KEYWORDS.some((kw) => upper.includes(kw.toUpperCase()))
  return { hasFoodName, hasNonFoodName }
}

// Task 6 — Reject social media / directory URLs as "real" websites
function isSocialOrDirectory(url: string): boolean {
  const lower = url.toLowerCase()
  return (
    lower.includes('facebook.com') ||
    lower.includes('instagram.com') ||
    lower.includes('yelp.com') ||
    lower.includes('maps.google.com') ||
    lower.includes('tripadvisor.com')
  )
}

// Task 6 — .gov exception: only exclude .gov if the place is clearly a park/rec center, not a market
function isGovParkSite(url: string, name: string): boolean {
  if (!url.toLowerCase().includes('.gov')) return false
  const lower = name.toLowerCase()
  // If it's a farmers market or farm market on a .gov site, keep it
  if (lower.includes('farmers market') || lower.includes('farm market') || lower.includes('farmersmarket')) return false
  return true
}

// Task 3 — Confidence scoring
function calculateFoodConfidence(
  place: PlaceResult,
  website: string,
  openingHoursText: string[] | undefined
): number {
  let score = 0

  if (place.types.includes('grocery_or_supermarket')) score += 2
  if (place.types.includes('food')) score += 2
  if (place.types.includes('health')) score += 1
  if (place.types.includes('bakery')) score += 2

  const { hasFoodName } = checkNameKeywords(place.name)
  if (hasFoodName) score += 2

  // Real website (not social/directory)
  if (!isSocialOrDirectory(website)) score += 1

  // Established business (has review history)
  if ((place.user_ratings_total ?? 0) >= 10) score += 1

  // Price level present (food retailers almost always have it)
  if (place.price_level !== undefined) score += 1

  // Hours on file
  if (openingHoursText && openingHoursText.length > 0) score += 1

  return score
}

// Task 5 — Proximity deduplication (30 meters threshold)
function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function deduplicateByProximity(vendors: Vendor[]): Vendor[] {
  const kept: Vendor[] = []
  for (const vendor of vendors) {
    const tooClose = kept.some(
      (existing) => haversineMeters(vendor.lat, vendor.lng, existing.lat, existing.lng) < 30
    )
    if (!tooClose) kept.push(vendor)
    // If too close, discard — the earlier entry had higher confidence (sorted before this call)
  }
  return kept
}

function inferVendorType(name: string): VendorType {
  const lower = name.toLowerCase()
  if (
    lower.includes('farmers market') ||
    lower.includes("farmer's market") ||
    lower.includes('greenmarket') ||
    lower.includes('farmstand') ||
    lower.includes('farm stand') ||
    lower.includes('farm market') ||
    (lower.includes('farm') && lower.includes('bazaar'))
  )
    return 'farmers-market'
  if (lower.includes('csa') || lower.includes('community supported agriculture')) return 'csa'
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
  const clean = formatted.replace(', USA', '').replace(', United States', '')
  const parts = clean.split(',').map((s) => s.trim())
  const address = parts[0] || ''
  const city = parts[1] || ''
  const stateZipParts = (parts[2] || '').trim().split(' ')
  const state = stateZipParts[0] || ''
  const zip = stateZipParts[1] || ''
  return { address, city, state, zip }
}

type PlaceResult = {
  place_id: string
  name: string
  formatted_address: string
  geometry: { location: { lat: number; lng: number } }
  types: string[]
  rating?: number
  user_ratings_total?: number
  price_level?: number
}

const MAX_PLACE_DETAILS = 40

export async function searchPlacesNearby(
  lat: number,
  lng: number,
  radiusMiles = 5
): Promise<Vendor[]> {
  const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY
  if (!apiKey) return []

  const client = new Client()
  const radiusMeters = Math.min(radiusMiles * 1609.34, 50000)
  const allPlaces = new Map<string, PlaceResult>()

  // Step 1: Run all targeted text searches in parallel
  const searchResults = await Promise.allSettled(
    SEARCH_QUERIES.map(({ query, type }) =>
      client.textSearch({
        params: {
          query,
          location: `${lat},${lng}`,
          radius: radiusMeters,
          type: type as PlaceType1,
          key: apiKey,
        },
      })
    )
  )

  for (const result of searchResults) {
    if (result.status !== 'fulfilled') continue
    for (const place of result.value.data.results) {
      if (!place.place_id || !place.geometry?.location || !place.name) continue
      if (isChainStore(place.name)) continue
      if (!allPlaces.has(place.place_id)) {
        allPlaces.set(place.place_id, place as PlaceResult)
      }
    }
  }

  // Step 2: Apply Task 1 + Task 2 pre-filters before fetching details
  // This avoids wasting Place Details API calls on obvious non-food results
  const preFiltered: Array<[string, PlaceResult]> = []

  for (const [placeId, place] of Array.from(allPlaces.entries())) {
    const types = place.types

    // Task 1a — Hard exclusion check
    const hasExcludedType = types.some((t: string) => EXCLUDED_PLACE_TYPES.includes(t))
    if (hasExcludedType) {
      const reason = `excluded_place_type: ${types.find((t) => EXCLUDED_PLACE_TYPES.includes(t))}`
      console.log('FILTERED OUT:', { name: place.name, types, reason, website: 'pre-detail' })
      continue
    }

    // Task 1b — Allowlist check
    const hasAllowedType = types.some((t: string) => ALLOWED_PLACE_TYPES.includes(t))
    if (!hasAllowedType) {
      console.log('FILTERED OUT:', { name: place.name, types, reason: 'no_allowed_type', website: 'pre-detail' })
      continue
    }

    // Task 1c — Generic-only types need food-positive name to proceed
    const isOnlyGenericTypes = types.every((t: string) => GENERIC_TYPES.has(t))
    const { hasFoodName, hasNonFoodName } = checkNameKeywords(place.name)

    // Task 2a — Immediate exclusion on non-food name (unless a food-positive term overrides)
    if (hasNonFoodName && !hasFoodName) {
      const reason = `negative_keyword: ${FOOD_NEGATIVE_KEYWORDS.find((kw) => place.name.toUpperCase().includes(kw.toUpperCase()))}`
      console.log('FILTERED OUT:', { name: place.name, types, reason, website: 'pre-detail' })
      continue
    }

    // Task 2b — Generic-only types require food-positive name
    if (isOnlyGenericTypes && !hasFoodName) {
      console.log('FILTERED OUT:', { name: place.name, types, reason: 'generic_type_no_food_name', website: 'pre-detail' })
      continue
    }

    preFiltered.push([placeId, place])
  }

  // Step 3: Fetch Place Details (capped to MAX_PLACE_DETAILS)
  const cappedPlaces = preFiltered.slice(0, MAX_PLACE_DETAILS)

  const detailResults = await Promise.allSettled(
    cappedPlaces.map(([placeId]) =>
      client.placeDetails({
        params: {
          place_id: placeId,
          fields: ['website', 'formatted_phone_number', 'opening_hours'],
          key: apiKey,
        },
      })
    )
  )

  const vendors: Vendor[] = []

  for (let i = 0; i < cappedPlaces.length; i++) {
    const [placeId, place] = cappedPlaces[i]
    const detailResult = detailResults[i]

    if (detailResult.status !== 'fulfilled') continue
    const detail = detailResult.value.data.result

    const website = detail.website
    const phone = detail.formatted_phone_number
    const openingHoursText = detail.opening_hours?.weekday_text

    // Task 6 — Require a real website (not missing, not social/directory)
    if (!website || website.trim() === '') {
      console.log('FILTERED OUT:', { name: place.name, types: place.types, reason: 'no_website', website: 'none' })
      continue
    }
    if (isSocialOrDirectory(website)) {
      console.log('FILTERED OUT:', { name: place.name, types: place.types, reason: 'social_or_directory_website', website })
      continue
    }
    // Task 6 — Reject .gov park/recreation pages (but keep legitimate .gov farmers markets)
    if (isGovParkSite(website, place.name)) {
      console.log('FILTERED OUT:', { name: place.name, types: place.types, reason: 'gov_park_website', website })
      continue
    }

    // Task 3 — Confidence scoring
    const score = calculateFoodConfidence(place, website, openingHoursText)
    if (score < 2) {
      console.log('FILTERED OUT:', { name: place.name, types: place.types, reason: `low_confidence_score: ${score}`, website })
      continue
    }

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
      website,
      phone,
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

  // Task 5 — Deduplicate results within 30 meters of each other
  return deduplicateByProximity(vendors)
}
