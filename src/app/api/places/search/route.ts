import { NextRequest, NextResponse } from 'next/server'
import { searchPlacesNearby } from '@/lib/places'

export async function GET(req: NextRequest) {
  const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '')
  const lng = parseFloat(req.nextUrl.searchParams.get('lng') || '')
  const radius = parseFloat(req.nextUrl.searchParams.get('radius') || '5')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 })
  }

  const vendors = await searchPlacesNearby(lat, lng, radius)

  return NextResponse.json({ vendors, count: vendors.length })
}
