'use client'
import { useState, useRef, useCallback } from 'react'
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

const FILTER_OPTIONS: { label: string; value: 'all' | VendorType }[] = [
  { label: 'All', value: 'all' },
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

function VendorCard({
  vendor,
  selected,
  onClick,
  cardRef,
  center,
}: {
  vendor: Vendor
  selected: boolean
  onClick: () => void
  cardRef: (el: HTMLButtonElement | null) => void
  center?: { lat: number; lng: number }
}) {
  const config = TYPE_CONFIG[vendor.type] || TYPE_CONFIG['specialty-grocer']
  const distance =
    center ? haversineDistance(center.lat, center.lng, vendor.lat, vendor.lng) : null

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-amber bg-amber/5 shadow-sm'
          : 'border-cream-dark bg-white hover:border-amber/50'
      }`}
    >
      {/* Top row: name + type badge */}
      <div className="flex items-start justify-between mb-1.5">
        <h4 className="font-semibold text-forest text-sm leading-tight pr-2">{vendor.name}</h4>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.bg} ${config.color}`}
        >
          {config.label}
        </span>
      </div>

      {/* Verified badge */}
      {vendor.verified && (
        <div className="flex items-center gap-1 mb-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-forest px-2 py-0.5 rounded-full">
            ✓ Analog Food Verified
          </span>
        </div>
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

      {/* Hours */}
      {vendor.hours && (
        <p
          className={`text-xs mb-1.5 font-medium ${
            vendor.type === 'farmers-market' ? 'text-amber' : 'text-forest/50'
          }`}
        >
          🕐 {vendor.hours}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {vendor.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="bg-cream text-forest/60 text-xs px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

function SuggestForm() {
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
        <p className="text-forest font-semibold mb-1">Thanks for the tip!</p>
        <p className="text-forest/60 text-sm">We&apos;ll review it and add it to the map if it&apos;s a good fit.</p>
      </div>
    )
  }

  return (
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
  )
}

export default function FindCleanFood() {
  const [zip, setZip] = useState('')
  const [searchedZip, setSearchedZip] = useState('')
  const [filter, setFilter] = useState<'all' | VendorType>('all')
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [mapZoom, setMapZoom] = useState(4)
  const [verifiedCount, setVerifiedCount] = useState(0)
  const [googleCount, setGoogleCount] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const fetchVendors = useCallback(async (searchZip?: string, type?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchZip) params.set('zip', searchZip)
      if (type && type !== 'all') params.set('type', type)
      const res = await fetch(`/api/vendors?${params}`)
      if (res.ok) {
        const data = await res.json()
        setVendors(data.vendors || [])
        setVerifiedCount(data.verified_count || 0)
        setGoogleCount(data.google_count || 0)
        if (data.center) {
          setMapCenter(data.center)
          setMapZoom(12)
        }
      }
    } catch {
      setVendors([])
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
    fetchVendors(trimmed, filter !== 'all' ? filter : undefined)
  }

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    const el = cardRefs.current.get(vendor.id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const filteredVendors = vendors.filter((v) => filter === 'all' || v.type === filter)

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
              onClick={() => {
                setFilter(value)
                if (hasSearched) fetchVendors(searchedZip, value !== 'all' ? value : undefined)
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                filter === value
                  ? 'bg-forest text-cream border-forest'
                  : 'bg-white text-forest border-cream-dark hover:border-forest/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Result count */}
        {hasSearched && !loading && (
          <p className="text-center text-forest/60 text-sm mb-6">
            {filteredVendors.length === 0 ? (
              `No results near ${searchedZip}`
            ) : (
              <>
                {filteredVendors.length} result{filteredVendors.length !== 1 ? 's' : ''} near{' '}
                <span className="font-medium text-forest">{searchedZip}</span>
                {verifiedCount > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <span className="text-white bg-forest text-xs font-semibold px-2 py-0.5 rounded-full">
                      ✓ {verifiedCount} verified
                    </span>
                  </span>
                )}
                {googleCount > 0 && (
                  <span className="text-forest/40 ml-1">
                    · {googleCount} from Google
                  </span>
                )}
              </>
            )}
          </p>
        )}

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: '600px' }}>
          {/* Left: scrollable list */}
          <div className="overflow-y-auto space-y-3 pr-1">
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
            ) : filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  selected={selectedVendor?.id === vendor.id}
                  onClick={() => handleVendorSelect(vendor)}
                  center={mapCenter}
                  cardRef={(el) => {
                    if (el) cardRefs.current.set(vendor.id, el)
                    else cardRefs.current.delete(vendor.id)
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12 text-forest/40">
                <div className="text-4xl mb-3">🌱</div>
                <p>No results for this filter. Try &quot;All&quot; or a different zip.</p>
              </div>
            )}
          </div>

          {/* Right: map */}
          <div
            className="rounded-2xl border border-cream-dark shadow-sm overflow-hidden"
            style={{ height: '600px' }}
          >
            <VendorMap
              vendors={filteredVendors}
              selectedVendor={selectedVendor}
              onVendorSelect={handleVendorSelect}
              center={mapCenter}
              zoom={mapZoom}
            />
          </div>
        </div>

        {/* Suggest a Source */}
        <div className="mt-16 max-w-2xl mx-auto">
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
            <SuggestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
