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

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim()
  const type = req.nextUrl.searchParams.get('type')?.trim()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let center: { lat: number; lng: number } | null = null
  let city = ''
  let locationState = ''
  let supabaseVendors: Vendor[] = []
  let googleVendors: Vendor[] = []

  // Geocode the zip if provided
  if (zip) {
    const geo = await geocodeZip(zip)
    if (geo) {
      center = { lat: geo.lat, lng: geo.lng }
      city = geo.city || ''
      locationState = geo.state || ''
    }
  }

  // Fetch verified vendors from Supabase
  // Task 1: Only return vendors where website IS NOT NULL and not empty
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

  // Filter Supabase vendors to within 50 miles of search center, sort by distance
  if (center) {
    const { lat, lng } = center
    supabaseVendors = supabaseVendors
      .filter((v) => haversineDistance(lat, lng, v.lat, v.lng) <= 50)
      .sort(
        (a, b) =>
          haversineDistance(lat, lng, a.lat, a.lng) -
          haversineDistance(lat, lng, b.lat, b.lng)
      )
  }

  // Fetch from Google Places if we have a center
  // Task 1: searchPlacesNearby now only returns results with a confirmed website
  if (center) {
    try {
      const allGoogle = await searchPlacesNearby(center.lat, center.lng, 5)
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

  // Task 3: Return two separate tiers
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
