import { NextRequest, NextResponse } from 'next/server'
import { geocodeZip } from '@/lib/geocode'

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim()

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Valid 5-digit zip code required' }, { status: 400 })
  }

  const center = await geocodeZip(zip)

  if (!center) {
    return NextResponse.json({ error: 'Zip code not found' }, { status: 404 })
  }

  return NextResponse.json(center)
}
