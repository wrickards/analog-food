import { NextRequest, NextResponse } from 'next/server'
import { geocodeZip } from '@/lib/geocode'
import { searchPlacesNearby } from '@/lib/places'
import { Vendor } from '@/types'

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function reverseGeocode(lat: number, lng: number): Promise<{ city: string; state: string }> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (!apiKey) return { city: '', state: '' }
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.status !== 'OK' || !data.results?.length) return { city: '', state: '' }
    const components = data.results[0].address_components as Array<{ types: string[]; long_name: string; short_name: string }>
    let city = ''
    let state = ''
    for (const c of components) {
      if (c.types.includes('locality')) city = c.long_name
      if (c.types.includes('administrative_area_level_1')) state = c.short_name
    }
    return { city, state }
  } catch {
    return { city: '', state: '' }
  }
}

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim()
  const latParam = req.nextUrl.searchParams.get('lat')
  const lngParam = req.nextUrl.searchParams.get('lng')
  const radiusParam = req.nextUrl.searchParams.get('radius')
  const type = req.nextUrl.searchParams.get('type')?.trim()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let center: { lat: number; lng: number } | null = null
  let city = ''
  let locationState = ''
  let supabaseVendors: Vendor[] = []
  let googleVendors: Vendor[] = []

  // Determine center: lat/lng params take priority over zip geocoding
  if (latParam && lngParam) {
    const lat = parseFloat(latParam)
    const lng = parseFloat(lngParam)
    if (!isNaN(lat) && !isNaN(lng)) {
      center = { lat, lng }
      // Reverse geocode to get city/state for display
      const geo = await reverseGeocode(lat, lng)
      city = geo.city
      locationState = geo.state
    }
  } else if (zip) {
    const geo = await geocodeZip(zip)
    if (geo) {
      center = { lat: geo.lat, lng: geo.lng }
      city = geo.city || ''
      locationState = geo.state || ''
    }
  }

  // Radius in meters for Google Places (default 8000m ≈ 5 miles)
  const radiusMeters = radiusParam ? parseInt(radiusParam) : 8000
  // Radius in miles for Supabase filter (convert from meters)
  const radiusMiles = radiusMeters / 1609.34

  // Fetch verified vendors from Supabase
  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      let query = supabase
        .from('vendors')
        .select('*')
        .eq('verified', true)
        .not('website', 'is', null)
        .neq('website', '')

      if (type) query = query.eq('type', type)

      const { data, error } = await query.order('name')
      if (!error && data) {
        supabaseVendors = data.map((v) => ({ ...v, source: 'supabase' as const }))
      }
    } catch (err) {
      console.error('Supabase vendors error:', err)
    }
  }

  // Filter Supabase vendors to within radius of search center, sort by distance
  if (center) {
    const { lat, lng } = center
    const maxMiles = Math.max(radiusMiles, 50) // always include up to 50mi for verified
    supabaseVendors = supabaseVendors
      .filter((v) => haversineDistance(lat, lng, v.lat, v.lng) <= maxMiles)
      .sort(
        (a, b) =>
          haversineDistance(lat, lng, a.lat, a.lng) -
          haversineDistance(lat, lng, b.lat, b.lng)
      )
  }

  // Fetch from Google Places if we have a center
  if (center) {
    try {
      const radiusMilesForPlaces = radiusMeters / 1609.34
      const allGoogle = await searchPlacesNearby(center.lat, center.lng, radiusMilesForPlaces)
      googleVendors = type ? allGoogle.filter((v) => v.type === type) : allGoogle
    } catch (err) {
      console.error('Google Places error:', err)
    }
  }

  // Deduplicate: remove Google results whose name closely matches a Supabase vendor
  const supabaseNames = new Set(supabaseVendors.map((v) => v.name.toLowerCase().replace(/[^a-z0-9]/g, '')))
  const dedupedGoogle = googleVendors.filter(
    (v) => !supabaseNames.has(v.name.toLowerCase().replace(/[^a-z0-9]/g, ''))
  )

  // Sort Google vendors by distance if we have a center
  if (center) {
    const { lat, lng } = center
    dedupedGoogle.sort(
      (a, b) =>
        haversineDistance(lat, lng, a.lat, a.lng) -
        haversineDistance(lat, lng, b.lat, b.lng)
    )
  }

  return NextResponse.json({
    verified: supabaseVendors,
    nearby: dedupedGoogle,
    center,
    city,
    state: locationState,
    verifiedCount: supabaseVendors.length,
    nearbyCount: dedupedGoogle.length,
  })
}
