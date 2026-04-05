'use client'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Vendor, VendorType } from '@/types'

const VendorMap = dynamic(() => import('@/components/VendorMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-cream rounded-2xl">
      <div className="text-forest/40 text-sm">Loading map…</div>
    </div>
  ),
})

const FILTER_OPTIONS: { label: string; value: 'all' | 'verified-only' | VendorType }[] = [
  { label: 'All', value: 'all' },
  { label: '✓ Verified Only', value: 'verified-only' },
  { label: 'Farmers Markets', value: 'farmers-market' },
  { label: 'Farms & CSAs', value: 'farm' },
  { label: 'Specialty Grocers', value: 'specialty-grocer' },
]

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  farm: { label: 'Farm / CSA', color: 'text-green-700', bg: 'bg-green-100' },
  'farmers-market': { label: 'Farmers Market', color: 'text-amber-700', bg: 'bg-amber-100' },
  'specialty-grocer': { label: 'Specialty Grocer', color: 'text-teal-700', bg: 'bg-teal-100' },
  csa: { label: 'CSA', color: 'text-green-700', bg: 'bg-green-100' },
}

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

function formatVerifiedDate(verifiedAt?: string): string | null {
  if (!verifiedAt) return null
  try {
    const date = new Date(verifiedAt)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  } catch {
    return null
  }
}

function VendorCard({
  vendor,
  tier,
  selected,
  onClick,
  cardRef,
  center,
}: {
  vendor: Vendor
  tier: 'verified' | 'nearby'
  selected: boolean
  onClick: () => void
  cardRef: (el: HTMLDivElement | null) => void
  center?: { lat: number; lng: number }
}) {
  const config = TYPE_CONFIG[vendor.type] || TYPE_CONFIG['specialty-grocer']
  const distance =
    center ? haversineDistance(center.lat, center.lng, vendor.lat, vendor.lng) : null
  const verifiedDate = tier === 'verified' ? formatVerifiedDate(vendor.verified_at) : null

  // Website: use real URL or fall back to Google Search
  const websiteUrl = vendor.website
    ? vendor.website
    : `https://www.google.com/search?q=${encodeURIComponent(vendor.name)}`
  const isGoogleFallback = !vendor.website
  const websiteDomain = vendor.website
    ? vendor.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
    : null

  // Directions via Google Maps (works on all platforms)
  const addressQuery = encodeURIComponent(
    [vendor.address, vendor.city, vendor.state, vendor.zip].filter(Boolean).join(', ')
  )
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
        selected
          ? 'border-amber bg-amber/5 shadow-sm'
          : tier === 'verified'
          ? 'border-cream-dark bg-white hover:border-amber/50'
          : 'border-cream-dark hover:border-amber/30'
      }`}
      style={tier === 'nearby' ? { backgroundColor: '#FAFAF7' } : {}}
    >
      {/* Top row: name + tier badge + chevron */}
      <div className="flex items-start justify-between mb-1.5">
        <h4 className="font-semibold text-forest text-sm leading-tight pr-2">{vendor.name}</h4>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {tier === 'verified' ? (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber/15 text-amber-700">
              ✓ Verified
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: '#888780', backgroundColor: '#F0EFE9' }}>
              Unverified
            </span>
          )}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`text-forest/40 flex-shrink-0 transition-transform duration-200 ${
              selected ? 'rotate-180' : ''
            }`}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Type badge */}
      <div className="mb-1.5">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Reviewed by (verified tier only) */}
      {tier === 'verified' && (
        <p className="text-xs mb-1.5" style={{ color: '#6B8F71' }}>
          Reviewed by Analog Food{verifiedDate ? ` · ${verifiedDate}` : ''}
        </p>
      )}

      {/* Address + distance */}
      <p className="text-forest/60 text-xs mb-1.5">
        {vendor.address}
        {vendor.city ? `, ${vendor.city}` : ''}
        {vendor.state ? `, ${vendor.state}` : ''}
        {distance !== null && ` · ${distance < 1 ? '<1' : distance.toFixed(1)} mi`}
      </p>

      {/* Rating */}
      {vendor.rating && (
        <p className="text-amber text-xs font-medium mb-1.5">
          ★ {vendor.rating.toFixed(1)}
          {vendor.user_ratings_total
            ? ` · ${vendor.user_ratings_total.toLocaleString()} reviews`
            : ''}
        </p>
      )}

      {/* Tags (always visible) */}
      <div className="flex flex-wrap gap-1">
        {vendor.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="bg-cream text-forest/60 text-xs px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded content — hours, highlights, website, directions, phone */}
      {selected && (
        <div className="mt-3 pt-3 border-t border-cream-dark space-y-2">
          {/* Hours */}
          {vendor.hours && (
            <p
              className={`text-xs font-medium ${
                vendor.type === 'farmers-market' ? 'text-amber' : 'text-forest/60'
              }`}
            >
              🕐 {vendor.hours}
            </p>
          )}

          {/* Highlights */}
          {vendor.highlights && vendor.highlights.length > 0 && (
            <ul className="space-y-0.5">
              {vendor.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="text-xs text-forest/60 flex items-start gap-1">
                  <span className="text-forest/30 mt-0.5">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Website — full-width button */}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-colors mt-1 min-h-[44px] ${
              isGoogleFallback
                ? 'bg-forest/10 text-forest hover:bg-forest/15'
                : 'bg-forest text-cream hover:bg-forest/90'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {isGoogleFallback ? `Search "${vendor.name}"` : (websiteDomain || 'Visit website')}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          {/* Directions + Phone row */}
          <div className="flex gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-lg text-xs font-semibold bg-cream text-forest hover:bg-cream-dark transition-colors min-h-[44px]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get directions
            </a>
            {vendor.phone && (
              <a
                href={`tel:${vendor.phone.replace(/[^\d+]/g, '')}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-lg text-xs font-semibold bg-cream text-forest hover:bg-cream-dark transition-colors min-h-[44px]"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {vendor.phone}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SuggestForm({ searchedZip }: { searchedZip?: string }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Vendor name is required'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address, website, notes }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-2">🌱</div>
        <p className="text-forest font-semibold mb-1">Thanks — we&apos;ll look into {name || 'it'} personally.</p>
        <p className="text-forest/60 text-sm">If they meet Analog Food&apos;s standards, we&apos;ll add them as a Verified source. We check every suggestion ourselves.</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-forest/70 mb-1">
              Vendor name <span className="text-amber">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Green Acres Farm"
              className="w-full bg-white border-2 border-cream-dark rounded-lg px-3 py-2 text-sm text-forest placeholder-forest/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-forest/70 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Farm Rd, Brooklyn, NY"
              className="w-full bg-white border-2 border-cream-dark rounded-lg px-3 py-2 text-sm text-forest placeholder-forest/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-forest/70 mb-1">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://"
              className="w-full bg-white border-2 border-cream-dark rounded-lg px-3 py-2 text-sm text-forest placeholder-forest/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-forest/70 mb-1">Why it&apos;s clean</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Certified organic, no additives…"
              className="w-full bg-white border-2 border-cream-dark rounded-lg px-3 py-2 text-sm text-forest placeholder-forest/30 focus:outline-none focus:border-amber transition-colors"
            />
          </div>
        </div>
        {error && <p className="text-red-600 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Submit suggestion'}
        </button>
      </form>
      <p className="mt-4 text-xs text-forest/40 leading-relaxed">
        Verified sources are reviewed by the Analog Food team for active operation, clean sourcing
        practices, and an accessible website. We don&apos;t accept payment for verification.
      </p>
    </>
  )
}

export default function FindCleanFood() {
  const [zip, setZip] = useState('')
  const [searchedZip, setSearchedZip] = useState('')
  const [filter, setFilter] = useState<'all' | 'verified-only' | VendorType>('all')
  const [verified, setVerified] = useState<Vendor[]>([])
  const [nearby, setNearby] = useState<Vendor[]>([])
  const [city, setCity] = useState('')
  const [locationState, setLocationState] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [mapZoom, setMapZoom] = useState(4)
  const [hasSearched, setHasSearched] = useState(false)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  // Mobile default: show verified only
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setFilter('verified-only')
    }
  }, [])

  const fetchVendors = useCallback(async (searchZip?: string, type?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchZip) params.set('zip', searchZip)
      if (type && type !== 'all' && type !== 'verified-only') params.set('type', type)
      const res = await fetch(`/api/vendors?${params}`)
      if (res.ok) {
        const data = await res.json()
        setVerified(data.verified || [])
        setNearby(data.nearby || [])
        setCity(data.city || '')
        setLocationState(data.state || '')
        if (data.center) {
          setMapCenter(data.center)
          setMapZoom(12)
        }
      }
    } catch {
      setVerified([])
      setNearby([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = () => {
    const trimmed = zip.trim()
    if (!trimmed) return
    setSearchedZip(trimmed)
    setHasSearched(true)
    setSelectedVendor(null)
    const typeFilter = filter !== 'all' && filter !== 'verified-only' ? filter : undefined
    fetchVendors(trimmed, typeFilter)
  }

  const handleFilterChange = (value: typeof filter) => {
    setFilter(value)
    if (hasSearched) {
      // Type filters require a re-fetch; 'all' re-fetches without type; 'verified-only' is UI-only
      if (value !== 'verified-only') {
        fetchVendors(searchedZip, value !== 'all' ? value : undefined)
      }
    }
  }

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    const el = cardRefs.current.get(vendor.id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  // Apply type filter across both tiers
  const filteredVerified = useMemo(() => {
    if (filter === 'all' || filter === 'verified-only') return verified
    return verified.filter((v) => v.type === filter)
  }, [verified, filter])

  const filteredNearby = useMemo(() => {
    if (filter === 'verified-only') return []
    if (filter === 'all') return nearby
    return nearby.filter((v) => v.type === filter)
  }, [nearby, filter])

  const showNearby = filter !== 'verified-only'
  const allFilteredVendors = useMemo(
    () => [...filteredVerified, ...filteredNearby],
    [filteredVerified, filteredNearby]
  )
  const totalCount = filteredVerified.length + filteredNearby.length
  const locationLabel = city ? `${city}${locationState ? `, ${locationState}` : ''}` : searchedZip

  return (
    <section id="find" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
            Find Clean Food
          </p>
          <h2 className="section-heading text-forest mb-4">Clean food near you</h2>
          <p className="text-forest/70 text-lg max-w-xl mx-auto">
            Find farms, farmers markets, CSAs, and specialty grocers committed to organic,
            pesticide-free, locally sourced food.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 max-w-md mx-auto mb-8">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter zip code"
            maxLength={5}
            className="flex-1 bg-white border-2 border-cream-dark rounded-xl px-5 py-3 text-forest placeholder-forest/40 focus:outline-none focus:border-amber transition-colors"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !zip.trim()}
            className="btn-primary py-3 px-6 disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Searching
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {FILTER_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleFilterChange(value)}
              className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                filter === value
                  ? value === 'verified-only'
                    ? 'text-white border-amber'
                    : 'bg-forest text-cream border-forest'
                  : 'bg-white text-forest border-cream-dark hover:border-forest/40'
              }`}
              style={filter === value && value === 'verified-only' ? { backgroundColor: '#C8883A' } : {}}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Task 7 — Result summary bar */}
        {hasSearched && !loading && (
          <p className="text-center text-sm mb-6" style={{ color: '#5F5E5A' }}>
            {totalCount === 0 ? (
              <>
                No sources found near {searchedZip}.{' '}
                <a href="#suggest" className="underline hover:text-forest transition-colors">
                  Suggest a source below.
                </a>
              </>
            ) : filter === 'verified-only' ? (
              `${filteredVerified.length} verified source${filteredVerified.length !== 1 ? 's' : ''} near ${locationLabel}`
            ) : (
              <>
                {totalCount} source{totalCount !== 1 ? 's' : ''} near{' '}
                <span className="font-medium" style={{ color: '#1E3A2F' }}>{locationLabel}</span>
                {' — '}
                <span style={{ color: '#2D5A3D' }}>{filteredVerified.length} verified</span>
                {' · '}
                {filteredNearby.length} unverified
              </>
            )}
          </p>
        )}

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: '600px' }}>
          {/* Left: scrollable two-tier list */}
          <div className="overflow-y-auto pr-1 space-y-0">
            {!hasSearched ? (
              <div className="text-center py-16 text-forest/40">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-medium">Enter a zip code to find clean food near you</p>
                <p className="text-sm mt-1">Works anywhere in the US</p>
              </div>
            ) : loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border-2 border-cream-dark p-4 animate-pulse">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 bg-cream-dark rounded w-2/3" />
                      <div className="h-4 bg-cream-dark rounded w-1/5" />
                    </div>
                    <div className="h-3 bg-cream-dark rounded w-1/2 mb-2" />
                    <div className="flex gap-1">
                      <div className="h-5 bg-cream-dark rounded-full w-16" />
                      <div className="h-5 bg-cream-dark rounded-full w-12" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* ── SECTION 1: Analog Food Verified ── */}
                <div className="flex items-center justify-between mb-3 pt-1">
                  <div className="flex items-center gap-1.5">
                    {/* Amber checkmark icon */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.5" fill="#C8883A" fillOpacity="0.15" stroke="#C8883A" strokeWidth="1" />
                      <path d="M4.5 7l2 2 3-3" stroke="#C8883A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      className="text-xs font-medium uppercase"
                      style={{ color: '#1E3A2F', letterSpacing: '2px', fontSize: '12px' }}
                    >
                      Analog Food Verified
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#8FAF8520', color: '#4A8C5C' }}
                  >
                    {filteredVerified.length} source{filteredVerified.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {filteredVerified.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {filteredVerified.map((vendor) => (
                      <VendorCard
                        key={vendor.id}
                        vendor={vendor}
                        tier="verified"
                        selected={selectedVendor?.id === vendor.id}
                        onClick={() => handleVendorSelect(vendor)}
                        center={mapCenter}
                        cardRef={(el) => {
                          if (el) cardRefs.current.set(vendor.id, el)
                          else cardRefs.current.delete(vendor.id)
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  /* No verified results empty state */
                  <div
                    className="rounded-xl p-4 mb-4"
                    style={{
                      border: '1.5px dashed #C8883A40',
                      backgroundColor: '#C8883A08',
                    }}
                  >
                    <p className="text-sm font-semibold text-forest mb-1">
                      No verified sources near {searchedZip} yet
                    </p>
                    <p className="text-xs text-forest/60 mb-3">
                      We haven&apos;t personally reviewed clean food sources in this area yet. Know a
                      great one?
                    </p>
                    <a
                      href="#suggest"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('suggest')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-xs font-semibold text-amber hover:text-amber/80 transition-colors"
                    >
                      Submit it for review →
                    </a>
                  </div>
                )}

                {/* ── DIVIDER ── */}
                {showNearby && (
                  <div className="relative flex items-center my-4">
                    <div className="flex-1 h-px" style={{ backgroundColor: '#D3C9B0' }} />
                    <span
                      className="px-3 text-[11px] uppercase tracking-widest"
                      style={{ color: '#888780', backgroundColor: '#f5f0e4', letterSpacing: '2px' }}
                    >
                      Unverified nearby sources
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: '#D3C9B0' }} />
                  </div>
                )}

                {/* ── SECTION 2: Nearby (unverified) ── */}
                {showNearby && (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6.5" stroke="#888780" strokeWidth="1" />
                          <text x="7" y="10.5" textAnchor="middle" fill="#888780" fontSize="8" fontFamily="system-ui">i</text>
                        </svg>
                        <span
                          className="text-xs font-medium uppercase"
                          style={{ color: '#888780', letterSpacing: '2px', fontSize: '12px' }}
                        >
                          Nearby sources
                        </span>
                      </div>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#88878010', color: '#888780' }}
                      >
                        {filteredNearby.length} source{filteredNearby.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Disclaimer card */}
                    <div
                      className="rounded-[10px] p-3 mb-3 flex gap-2.5"
                      style={{
                        backgroundColor: '#F5F5F2',
                        border: '0.5px solid #D3C9B0',
                      }}
                    >
                      <span className="text-base leading-none mt-0.5 flex-shrink-0" style={{ color: '#888780' }}>ⓘ</span>
                      <p className="text-[13px] leading-relaxed" style={{ color: '#888780' }}>
                        These results are pulled from Google Maps and haven&apos;t been reviewed by the
                        Analog Food team. All have active websites — but hours, offerings, and quality
                        aren&apos;t verified. Use your judgment and check their website before visiting.
                      </p>
                    </div>

                    {filteredNearby.length > 0 ? (
                      <div className="space-y-3">
                        {filteredNearby.map((vendor) => (
                          <VendorCard
                            key={vendor.id}
                            vendor={vendor}
                            tier="nearby"
                            selected={selectedVendor?.id === vendor.id}
                            onClick={() => handleVendorSelect(vendor)}
                            center={mapCenter}
                            cardRef={(el) => {
                              if (el) cardRefs.current.set(vendor.id, el)
                              else cardRefs.current.delete(vendor.id)
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-forest/40 text-sm py-4">
                        No additional sources found near {searchedZip} within 5 miles.
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* Right: map */}
          <div
            className="rounded-2xl border border-cream-dark shadow-sm overflow-hidden"
            style={{ height: '600px' }}
          >
            <VendorMap
              vendors={allFilteredVendors}
              selectedVendor={selectedVendor}
              onVendorSelect={handleVendorSelect}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>

        {/* Suggest a Source */}
        <div id="suggest" className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-amber font-medium tracking-widest uppercase text-xs mb-2">
              Know a good one?
            </p>
            <h3 className="text-2xl font-serif font-bold text-forest mb-2">Suggest a source</h3>
            <p className="text-forest/60 text-sm">
              Found a great farm, market, or clean grocer that isn&apos;t on the map? Let us know — we verify
              every suggestion.
            </p>
          </div>
          <div className="card">
            <SuggestForm searchedZip={searchedZip} />
          </div>
        </div>
      </div>
    </section>
  )
}
