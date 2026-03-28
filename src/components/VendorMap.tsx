'use client'
import { useEffect, useRef, useCallback } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { Vendor } from '@/types'

interface VendorMapProps {
  vendors: Vendor[]
  selectedVendor: Vendor | null
  onVendorSelect: (vendor: Vendor) => void
}

const markerColors: Record<string, string> = {
  farm: '#2D5A3D',
  csa: '#8FAF85',
  'farmers-market': '#C8883A',
  'specialty-grocer': '#4A8C5C',
}

export default function VendorMap({ vendors, selectedVendor, onVendorSelect }: VendorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([])
  const onVendorSelectRef = useRef(onVendorSelect)
  onVendorSelectRef.current = onVendorSelect

  const placeMarkers = useCallback(async (vendorList: Vendor[], selected: Vendor | null) => {
    if (!mapInstanceRef.current) return
    const L = (await import('leaflet')).default

    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    vendorList.forEach((vendor) => {
      const color = markerColors[vendor.type] || '#2D5A3D'
      const isSelected = selected?.id === vendor.id
      const size = isSelected ? 18 : 12

      const icon = L.divIcon({
        html: `<div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};border:2.5px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.35);
          transition:all 0.2s;
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        className: '',
      })

      const marker = L.marker([vendor.lat, vendor.lng], { icon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div style="font-family:system-ui;min-width:200px;max-width:280px;padding:4px 0;">
            <strong style="font-size:14px;color:#1E3A2F;display:block;margin-bottom:4px;">${vendor.name}</strong>
            <p style="color:#666;font-size:12px;margin:0 0 4px;">${vendor.address}, ${vendor.city}</p>
            ${vendor.hours ? `<p style="color:#888;font-size:11px;margin:0 0 6px;">🕐 ${vendor.hours}</p>` : ''}
            <ul style="margin:6px 0 8px;padding-left:14px;font-size:12px;color:#555;">
              ${vendor.highlights.slice(0, 3).map((h) => `<li style="margin-bottom:2px;">${h}</li>`).join('')}
            </ul>
            ${vendor.website ? `<a href="${vendor.website}" target="_blank" rel="noopener" style="color:#C8883A;font-size:12px;font-weight:600;">Visit website →</a>` : ''}
          </div>
        `)

      marker.on('click', () => onVendorSelectRef.current(vendor))
      markersRef.current.push(marker)

      if (isSelected) {
        marker.openPopup()
      }
    })
  }, [])

  // Init map once
  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || mapInstanceRef.current) return

    let mounted = true
    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      })

      if (!mounted || !mapRef.current || mapInstanceRef.current) return

      const map = L.map(mapRef.current, {
        center: [40.7128, -73.9060],
        zoom: 11,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map

      // Place initial markers after map is ready
      setTimeout(() => {
        map.invalidateSize()
        placeMarkers(vendors, selectedVendor)
      }, 100)
    }

    initMap()

    return () => {
      mounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers when vendors or selection changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      placeMarkers(vendors, selectedVendor)
    }
  }, [vendors, selectedVendor, placeMarkers])

  // Pan to selected vendor
  useEffect(() => {
    if (selectedVendor && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedVendor.lat, selectedVendor.lng], 14, {
        animate: true,
        duration: 0.8,
      })
    }
  }, [selectedVendor])

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  )
}
