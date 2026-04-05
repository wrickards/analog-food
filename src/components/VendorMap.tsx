'use client'
import { useEffect, useRef, useState } from 'react'
import { Vendor } from '@/types'

interface VendorMapProps {
  vendors: Vendor[]
  selectedVendor: Vendor | null
  onVendorSelect: (vendor: Vendor) => void
  center?: { lat: number; lng: number }
  zoom?: number
}

const BRAND_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#ede8d8' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#b8d4e0' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#d8d0be' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c4b99a' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#c4d8b8' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#1e3a2f' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f0e4', weight: 2 }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#2d5a3d' }] },
]

const MARKER_COLORS: Record<string, string> = {
  farm: '#2D5A3D',
  csa: '#8FAF85',
  'farmers-market': '#C8883A',
  'specialty-grocer': '#4A8C5C',
}

function buildPopup(vendor: Vendor): string {
  const verifiedBadge = vendor.verified
    ? `<span style="display:inline-block;background:#2D5A3D;color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;margin-bottom:5px;">✓ Analog Food Verified</span><br>`
    : ''
  const rating = vendor.rating
    ? `<p style="color:#C8883A;font-size:11px;margin:0 0 4px;">★ ${vendor.rating.toFixed(1)}${vendor.user_ratings_total ? ` · ${vendor.user_ratings_total.toLocaleString()} reviews` : ''}</p>`
    : ''
  const hours = vendor.hours
    ? `<p style="color:#888;font-size:11px;margin:0 0 5px;">🕐 ${vendor.hours}</p>`
    : ''
  const highlights =
    vendor.highlights.length > 0
      ? `<ul style="margin:4px 0 7px;padding-left:14px;font-size:12px;color:#555;">${vendor.highlights
          .slice(0, 3)
          .map((h) => `<li style="margin-bottom:2px;">${h}</li>`)
          .join('')}</ul>`
      : ''

  const addressQuery = encodeURIComponent(
    [vendor.address, vendor.city, vendor.state, vendor.zip].filter(Boolean).join(', ')
  )
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`
  const websiteUrl = vendor.website
    ? vendor.website
    : `https://www.google.com/search?q=${encodeURIComponent(vendor.name)}`
  const websiteLabel = vendor.website ? 'Visit website' : 'Search on Google'

  const websiteLink = `<a href="${websiteUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#2D5A3D;color:#fff;font-size:11px;font-weight:600;padding:5px 10px;border-radius:6px;text-decoration:none;margin-right:6px;">${websiteLabel} ↗</a>`
  const directionsLink = `<a href="${directionsUrl}" target="_blank" rel="noopener" style="display:inline-block;background:#f0ece0;color:#1E3A2F;font-size:11px;font-weight:600;padding:5px 10px;border-radius:6px;text-decoration:none;margin-right:6px;">Directions ↗</a>`
  const phoneLink = vendor.phone
    ? `<a href="tel:${vendor.phone.replace(/[^\d+]/g, '')}" style="display:inline-block;background:#f0ece0;color:#1E3A2F;font-size:11px;font-weight:600;padding:5px 10px;border-radius:6px;text-decoration:none;">📞 ${vendor.phone}</a>`
    : ''

  return `
    <div style="font-family:system-ui;min-width:200px;max-width:280px;padding:4px 0;">
      ${verifiedBadge}
      <strong style="font-size:14px;color:#1E3A2F;display:block;margin-bottom:3px;">${vendor.name}</strong>
      <p style="color:#666;font-size:12px;margin:0 0 4px;">${vendor.address}${vendor.city ? `, ${vendor.city}` : ''}</p>
      ${rating}${hours}${highlights}
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;">${websiteLink}${directionsLink}${phoneLink}</div>
    </div>
  `
}

export default function VendorMap({
  vendors,
  selectedVendor,
  onVendorSelect,
  center,
  zoom,
}: VendorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const infoWindowRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [noApiKey, setNoApiKey] = useState(false)
  const onVendorSelectRef = useRef(onVendorSelect)
  onVendorSelectRef.current = onVendorSelect

  // Initialize Google Maps once
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      setNoApiKey(true)
      return
    }

    let mounted = true
    ;(async () => {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader')
        const loader = new Loader({ apiKey, version: 'weekly' })
        await loader.load()

        if (!mounted || !mapRef.current) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gm = (window as any).google.maps

        const map = new gm.Map(mapRef.current, {
          center: center || { lat: 39.5, lng: -98.35 },
          zoom: zoom || 4,
          styles: BRAND_STYLES,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        })

        mapInstanceRef.current = map
        infoWindowRef.current = new gm.InfoWindow()
        setMapLoaded(true)
      } catch (e) {
        console.error('Google Maps init error:', e)
      }
    })()

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Place/update markers when vendors or selection changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gm = (window as any).google.maps

    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    vendors.forEach((vendor) => {
      const color = MARKER_COLORS[vendor.type] || '#2D5A3D'
      const isSelected = selectedVendor?.id === vendor.id
      const isVerified = vendor.verified

      const marker = new gm.Marker({
        position: { lat: vendor.lat, lng: vendor.lng },
        map: mapInstanceRef.current,
        title: vendor.name,
        icon: {
          path: gm.SymbolPath.CIRCLE,
          scale: isSelected ? 11 : 7,
          fillColor: color,
          fillOpacity: isVerified ? 1 : 0.6,
          strokeColor: '#ffffff',
          strokeWeight: isVerified ? 3 : 1.5,
        },
        zIndex: isSelected ? 100 : isVerified ? 10 : 5,
      })

      marker.addListener('click', () => {
        onVendorSelectRef.current(vendor)
        infoWindowRef.current?.setContent(buildPopup(vendor))
        infoWindowRef.current?.open(mapInstanceRef.current, marker)
      })

      if (isSelected) {
        infoWindowRef.current?.setContent(buildPopup(vendor))
        infoWindowRef.current?.open(mapInstanceRef.current, marker)
      }

      markersRef.current.push(marker)
    })
  }, [mapLoaded, vendors, selectedVendor])

  // Pan to selected vendor
  useEffect(() => {
    if (!mapLoaded || !selectedVendor || !mapInstanceRef.current) return
    mapInstanceRef.current.panTo({ lat: selectedVendor.lat, lng: selectedVendor.lng })
    mapInstanceRef.current.setZoom(14)
  }, [mapLoaded, selectedVendor])

  // Update map center/zoom after a search
  useEffect(() => {
    if (!mapLoaded || !center || !mapInstanceRef.current) return
    mapInstanceRef.current.panTo(center)
    if (zoom) mapInstanceRef.current.setZoom(zoom)
  }, [mapLoaded, center, zoom])

  if (noApiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-cream/50 rounded-2xl">
        <div className="text-center p-6">
          <div className="text-3xl mb-3">🗺️</div>
          <p className="text-forest/60 text-sm font-medium">Map requires a Google Maps API key</p>
          <p className="text-forest/40 text-xs mt-1">
            Add <code className="bg-cream px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to .env.local
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full" style={{ minHeight: '500px' }}>
      <div ref={mapRef} className="w-full h-full" />
      {/* Map legend */}
      <div
        className="absolute bottom-8 left-3 rounded-lg pointer-events-none z-10"
        style={{
          background: 'white',
          border: '0.5px solid #D3C9B0',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '11px',
          color: '#5F5E5A',
          lineHeight: '1.7',
        }}
      >
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4" fill="#2D5A3D" stroke="white" strokeWidth="1.5" />
          </svg>
          <span>Analog Food Verified</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4" fill="#2D5A3D" fillOpacity="0.6" stroke="white" strokeWidth="0.75" />
          </svg>
          <span>Nearby (unverified)</span>
        </div>
      </div>
    </div>
  )
}
