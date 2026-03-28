'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
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

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  farm: { label: 'Farm / CSA', color: 'text-green-700', bg: 'bg-green-100' },
  'farmers-market': { label: 'Farmers Market', color: 'text-amber-700', bg: 'bg-amber-100' },
  'specialty-grocer': { label: 'Specialty Grocer', color: 'text-teal-700', bg: 'bg-teal-100' },
  csa: { label: 'CSA', color: 'text-green-700', bg: 'bg-green-100' },
}

const SAMPLE_VENDORS: Vendor[] = [
  {
    id: '1', name: 'Brooklyn Grange Rooftop Farm', type: 'farm',
    lat: 40.7282, lng: -73.9442, address: '37-18 Northern Blvd', city: 'Long Island City', state: 'NY', zip: '11101',
    website: 'https://brooklyngrangefarm.com', phone: '718-708-5986', hours: 'Seasonal farm stand — check website',
    tags: ['organic', 'rooftop', 'CSA available', 'NYC'],
    highlights: ["Nation's largest rooftop soil farm", 'Certified organic', 'CSA shares available', 'Community events'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '2', name: 'Grand Army Plaza Greenmarket', type: 'farmers-market',
    lat: 40.6739, lng: -73.9700, address: 'Grand Army Plaza', city: 'Brooklyn', state: 'NY', zip: '11238',
    website: 'https://www.grownyc.org/greenmarket/brooklyn-grand-army-plaza', hours: 'Saturdays 8am–4pm, year-round',
    tags: ['GrowNYC', 'year-round', 'organic vendors', 'Brooklyn'],
    highlights: ['Year-round Saturday market', 'Multiple certified organic farms', 'Seasonal local produce', 'Artisan food producers'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '3', name: 'Re_ Grocery', type: 'specialty-grocer',
    lat: 40.6782, lng: -73.9442, address: '175 Third Ave', city: 'Brooklyn', state: 'NY', zip: '11217',
    website: 'https://re-grocery.com', hours: 'Mon–Sat 9am–9pm, Sun 10am–7pm',
    tags: ['zero waste', 'organic', 'local', 'specialty'],
    highlights: ['Zero-waste focus', 'Certified organic products', 'Locally sourced where possible', 'Plastic-free bulk section'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '4', name: 'Farm to People', type: 'specialty-grocer',
    lat: 40.7128, lng: -74.0060, address: 'Online + NYC Delivery', city: 'New York', state: 'NY', zip: '10001',
    website: 'https://farmtopeople.com', hours: 'Online store, local delivery',
    tags: ['delivery', 'CSA-style', 'organic', 'direct from farms'],
    highlights: ['Direct farmer relationships', 'Weekly curated boxes', 'Certified organic options', 'Transparent sourcing'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '5', name: 'Windfall Farms at Union Square Greenmarket', type: 'farmers-market',
    lat: 40.7359, lng: -73.9906, address: 'Union Square Park (Vendor)', city: 'New York', state: 'NY', zip: '10003',
    website: 'https://www.grownyc.org/greenmarket/manhattan-union-square-m', hours: 'Mon, Wed, Fri, Sat 8am–6pm',
    tags: ['GrowNYC', 'certified organic', 'vegetables', 'herbs'],
    highlights: ['Certified organic vegetables', 'Rare heirloom varieties', 'Year-round presence at Union Square', 'Hudson Valley grown'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '6', name: 'Stoneledge Farm CSA', type: 'csa',
    lat: 41.9848, lng: -74.5285, address: '5349 County Route 22', city: 'South Cairo', state: 'NY', zip: '12482',
    website: 'https://stoneledgefarm.com', hours: 'CSA pickup points throughout NYC',
    tags: ['CSA', 'certified organic', 'Hudson Valley', 'year-round'],
    highlights: ['Certified organic for 30+ years', 'Year-round CSA shares', 'Multiple NYC pickup locations', 'Community-focused'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '7', name: 'Prospect Park Farmers Market', type: 'farmers-market',
    lat: 40.6601, lng: -73.9683, address: 'Prospect Park W & 15th St', city: 'Brooklyn', state: 'NY', zip: '11215',
    website: 'https://www.grownyc.org', hours: 'Saturdays 8am–1pm (seasonal)',
    tags: ['Brooklyn', 'seasonal', 'local farms'],
    highlights: ['Local Brooklyn vendors', 'Seasonal produce', 'Artisan products'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '8', name: 'Eataly NYC Flatiron', type: 'specialty-grocer',
    lat: 40.7424, lng: -73.9893, address: '200 Fifth Ave', city: 'New York', state: 'NY', zip: '10010',
    website: 'https://www.eataly.com/us_en/stores/nyc-flatiron/', hours: 'Daily 9am–11pm',
    tags: ['Italian', 'imported', 'quality ingredients', 'specialty'],
    highlights: ['Import quality Italian products', 'Fresh pasta and bread', 'Specialty organic selections', 'Artisan producers'],
    verified: false, created_at: new Date().toISOString(),
  },
  {
    id: '9', name: 'Greenhouse Holistic', type: 'specialty-grocer',
    lat: 40.7282, lng: -73.9537, address: '23 Meadow St', city: 'Brooklyn', state: 'NY', zip: '11206',
    website: 'https://www.greenholisticnyc.com', hours: 'Mon–Sat 10am–8pm, Sun 11am–6pm',
    tags: ['holistic', 'organic', 'supplements', 'local'],
    highlights: ['Certified organic grocery', 'Natural supplements', 'Local NYC producers', 'Knowledgeable staff'],
    verified: true, created_at: new Date().toISOString(),
  },
  {
    id: '10', name: 'Queens County Farm Museum', type: 'farm',
    lat: 40.7416, lng: -73.7425, address: '73-50 Little Neck Pkwy', city: 'Floral Park', state: 'NY', zip: '11004',
    website: 'https://queensfarm.org', hours: 'Farm stand Sat–Sun 10am–4pm (seasonal)',
    tags: ['historic', 'educational', 'organic', 'farm stand'],
    highlights: ["NYC's largest working farm", 'Historic farm since 1697', 'Seasonal farm stand', 'Educational programming'],
    verified: true, created_at: new Date().toISOString(),
  },
]

function VendorCard({
  vendor, selected, onClick, cardRef,
}: {
  vendor: Vendor
  selected: boolean
  onClick: () => void
  cardRef: (el: HTMLButtonElement | null) => void
}) {
  const config = typeConfig[vendor.type] || typeConfig['farm']
  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected ? 'border-amber bg-amber/5 shadow-sm' : 'border-cream-dark bg-white hover:border-amber/50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-forest text-sm leading-tight pr-2">{vendor.name}</h4>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>
      <p className="text-forest/60 text-xs mb-2">{vendor.address}, {vendor.city}, {vendor.state}</p>
      {vendor.hours && (
        <p className={`text-xs mb-2 font-medium ${
          vendor.type === 'farmers-market' ? 'text-amber' : 'text-forest/50'
        }`}>
          🕐 {vendor.hours}
        </p>
      )}
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

export default function FindCleanFood() {
  const [zip, setZip] = useState('')
  const [searchedZip, setSearchedZip] = useState('')
  const [filter, setFilter] = useState<'all' | VendorType>('all')
  const [vendors, setVendors] = useState<Vendor[]>(SAMPLE_VENDORS)
  const [loading, setLoading] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
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
        if (data.vendors?.length) {
          setVendors(data.vendors)
          return
        }
      }
    } catch {
      // fall through to sample data
    } finally {
      setLoading(false)
    }
    // Fallback to sample data
    setVendors(SAMPLE_VENDORS)
  }, [])

  useEffect(() => {
    fetchVendors()
  }, [fetchVendors])

  const handleSearch = () => {
    if (!zip.trim()) return
    setSearchedZip(zip.trim())
    fetchVendors(zip.trim(), filter !== 'all' ? filter : undefined)
  }

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    // Scroll the card into view
    const el = cardRefs.current.get(vendor.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const filteredVendors = vendors.filter(
    (v) => filter === 'all' || v.type === filter
  )

  return (
    <section id="find" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
            Find Clean Food
          </p>
          <h2 className="section-heading text-forest mb-4">
            Clean food near you
          </h2>
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
            disabled={loading}
            className="btn-primary py-3 px-6 disabled:opacity-70"
          >
            {loading ? '…' : 'Search'}
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {FILTER_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
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
        {searchedZip && (
          <p className="text-center text-forest/60 text-sm mb-6">
            {filteredVendors.length} result{filteredVendors.length !== 1 ? 's' : ''} near {searchedZip}
          </p>
        )}

        {/* Two panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: '600px' }}>
          {/* Left: scrollable list */}
          <div className="overflow-y-auto space-y-3 pr-1">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  selected={selectedVendor?.id === vendor.id}
                  onClick={() => handleVendorSelect(vendor)}
                  cardRef={(el) => {
                    if (el) cardRefs.current.set(vendor.id, el)
                    else cardRefs.current.delete(vendor.id)
                  }}
                />
              ))
            ) : (
              <div className="text-center py-12 text-forest/40">
                <div className="text-4xl mb-3">🌱</div>
                <p>No vendors found for this filter.</p>
              </div>
            )}
          </div>

          {/* Right: map — no overflow-hidden so popups aren't clipped */}
          <div
            className="rounded-2xl border border-cream-dark shadow-sm"
            style={{ height: '600px', overflow: 'hidden' }}
          >
            <VendorMap
              vendors={filteredVendors}
              selectedVendor={selectedVendor}
              onVendorSelect={handleVendorSelect}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
