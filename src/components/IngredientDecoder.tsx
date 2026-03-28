'use client'
import { useState, useMemo } from 'react'
import { ingredients } from '@/data/ingredients'
import { Ingredient, DangerLevel } from '@/types'

const quickPills = ['Red 40', 'HFCS', 'BHT', 'Aspartame', 'Potassium Bromate', 'Titanium Dioxide']

const dangerConfig: Record<DangerLevel, { label: string; color: string; bg: string }> = {
  high: { label: 'High Risk', color: 'text-red-700', bg: 'bg-red-100' },
  medium: { label: 'Medium Risk', color: 'text-orange-700', bg: 'bg-orange-100' },
  low: { label: 'Low Risk', color: 'text-yellow-700', bg: 'bg-yellow-100' },
}

export default function IngredientDecoder() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Ingredient | null>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ingredients.filter(
      (ing) =>
        ing.name.toLowerCase().includes(q) ||
        ing.aliases.some((a) => a.toLowerCase().includes(q))
    )
  }, [query])

  const handleSearch = (term: string) => {
    setQuery(term)
    const q = term.toLowerCase()
    const found = ingredients.find(
      (ing) =>
        ing.name.toLowerCase().includes(q) ||
        ing.aliases.some((a) => a.toLowerCase().includes(q))
    )
    setSelected(found || null)
  }

  const handleSelect = (ing: Ingredient) => {
    setSelected(ing)
    setQuery(ing.name)
  }

  const danger = selected ? dangerConfig[selected.danger_level] : null

  return (
    <section id="decoder" className="py-24 bg-cream-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber font-medium tracking-widest uppercase text-sm mb-4">
            Ingredient Decoder
          </p>
          <h2 className="section-heading text-forest mb-4">
            What&apos;s really in your food?
          </h2>
          <p className="text-forest/70 text-lg max-w-xl mx-auto">
            Type any ingredient name to see if it&apos;s been banned elsewhere &mdash; and why.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search an ingredient (e.g. Red 40, BHT, aspartame...)"
            className="w-full bg-white border-2 border-cream-dark rounded-2xl px-6 py-4 text-forest text-lg placeholder-forest/40 focus:outline-none focus:border-amber transition-colors"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setSelected(null) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest transition-colors text-xl"
            >
              &times;
            </button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        {results.length > 0 && !selected && (
          <div className="bg-white rounded-xl border border-cream-dark shadow-lg mb-4 overflow-hidden">
            {results.slice(0, 5).map((ing) => (
              <button
                key={ing.id}
                onClick={() => handleSelect(ing)}
                className="w-full text-left px-5 py-3 hover:bg-cream flex items-center justify-between border-b border-cream-dark last:border-0 transition-colors"
              >
                <span className="font-medium text-forest">{ing.name}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dangerConfig[ing.danger_level].bg} ${dangerConfig[ing.danger_level].color}`}>
                  {dangerConfig[ing.danger_level].label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Quick pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => handleSearch(pill)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                pill === 'Red 40'
                  ? 'bg-red-100 border-red-200 text-red-700 hover:bg-red-200'
                  : 'bg-white border-cream-dark text-forest hover:bg-cream hover:border-amber/50'
              }`}
            >
              {pill === 'Red 40' && <span className="mr-1.5">&#9733;</span>}
              {pill}
            </button>
          ))}
        </div>

        {/* Result card */}
        {selected ? (
          <div className="bg-white rounded-2xl shadow-md border border-cream-dark overflow-hidden">
            <div className={`px-6 py-4 flex items-center justify-between ${
              selected.danger_level === 'high' ? 'bg-red-50 border-b border-red-100' :
              selected.danger_level === 'medium' ? 'bg-orange-50 border-b border-orange-100' :
              'bg-yellow-50 border-b border-yellow-100'
            }`}>
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest">{selected.name}</h3>
                <p className="text-forest/60 text-sm mt-0.5">
                  Also known as: {selected.aliases.join(', ')}
                </p>
              </div>
              {danger && (
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${danger.bg} ${danger.color}`}>
                  {danger.label}
                </span>
              )}
            </div>

            <div className="p-6 space-y-6">
              <p className="text-forest/80 leading-relaxed">{selected.description}</p>

              {/* Banned in */}
              <div>
                <p className="text-xs font-semibold text-forest/50 uppercase tracking-wider mb-3">
                  Banned or restricted in
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.banned_in.map((country) => (
                    <span
                      key={country}
                      className="bg-forest/10 text-forest px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clean alternative */}
              <div className="bg-cream rounded-xl p-4">
                <p className="text-xs font-semibold text-forest/50 uppercase tracking-wider mb-2">
                  Clean alternative
                </p>
                <p className="text-forest/80 text-sm leading-relaxed">{selected.clean_alternative}</p>
              </div>

              {/* Personal note */}
              {selected.personal_note && (
                <div className="border-l-4 border-amber bg-amber/5 rounded-r-xl p-4">
                  <p className="text-xs font-semibold text-amber uppercase tracking-wider mb-2">
                    Founder&apos;s Note
                  </p>
                  <p className="text-forest/80 text-sm italic leading-relaxed">
                    {selected.personal_note}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-forest/40">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">Search for an ingredient above or click a quick-pick</p>
          </div>
        )}
      </div>
    </section>
  )
}
