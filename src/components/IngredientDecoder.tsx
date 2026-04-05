'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Ingredient, DangerLevel } from '@/types'

const quickPills = ['Red 40', 'MSG', 'Ractopamine', 'Natural Flavors', 'TBHQ', 'Aspartame']

const dangerConfig: Record<DangerLevel, { label: string; color: string; bg: string }> = {
  high: { label: 'High Risk', color: 'text-red-700', bg: 'bg-red-100' },
  medium: { label: 'Medium Risk', color: 'text-orange-700', bg: 'bg-orange-100' },
  low: { label: 'Low Risk', color: 'text-yellow-700', bg: 'bg-yellow-100' },
}

export default function IngredientDecoder() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Ingredient | null>(null)
  const [suggestions, setSuggestions] = useState<Ingredient[]>([])
  const [notFound, setNotFound] = useState(false)
  const [notFoundQuery, setNotFoundQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [ingredientCount, setIngredientCount] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch total ingredient count on mount
  useEffect(() => {
    fetch('/api/ingredients/count')
      .then((r) => r.json())
      .then((d) => setIngredientCount(d.count ?? null))
      .catch(() => null)
  }, [])

  const searchAPI = useCallback(async (term: string) => {
    const trimmed = term.trim()
    if (!trimmed) {
      setSelected(null)
      setSuggestions([])
      setNotFound(false)
      setShowDropdown(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/ingredients/search?q=${encodeURIComponent(trimmed)}`)
      const data = await res.json()

      if (data.ingredient) {
        // If there's a strong match (name starts with query or exact alias), auto-select
        const q = trimmed.toLowerCase()
        const name = data.ingredient.name.toLowerCase()
        const autoSelect =
          name === q ||
          name.startsWith(q) ||
          (data.ingredient.aliases as string[]).some(
            (a: string) => a.toLowerCase() === q
          )

        setSuggestions(data.suggestions || [])
        setNotFound(false)

        if (autoSelect) {
          setSelected(data.ingredient)
          setShowDropdown(false)
        } else {
          // Show dropdown with top result + suggestions
          const all = [data.ingredient, ...(data.suggestions || [])]
          setSuggestions(all)
          setSelected(null)
          setShowDropdown(true)
        }
      } else if (data.notFound) {
        setSelected(null)
        setSuggestions([])
        setNotFound(true)
        setNotFoundQuery(trimmed)
        setShowDropdown(false)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    setSelected(null)
    setNotFound(false)

    // Debounce API calls while typing
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!value.trim()) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }
    debounceRef.current = setTimeout(() => searchAPI(value), 300)
  }

  const handleSearch = (term: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setQuery(term)
    searchAPI(term)
  }

  const handleSelect = (ing: Ingredient) => {
    setSelected(ing)
    setQuery(ing.name)
    setSuggestions([])
    setShowDropdown(false)
    setNotFound(false)
  }

  const handleClear = () => {
    setQuery('')
    setSelected(null)
    setSuggestions([])
    setNotFound(false)
    setShowDropdown(false)
    inputRef.current?.focus()
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
        <div className="relative mb-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) handleSearch(query)
              if (e.key === 'Escape') handleClear()
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="Search an ingredient (e.g. potassium sorbate, E202, ractopamine...)"
            className="w-full bg-white border-2 border-cream-dark rounded-2xl px-6 py-4 text-forest text-lg placeholder-forest/40 focus:outline-none focus:border-amber transition-colors"
          />
          {loading && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <svg className="animate-spin h-4 w-4 text-forest/30" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest transition-colors text-xl"
            >
              &times;
            </button>
          )}
        </div>

        {/* Ingredient count */}
        {ingredientCount !== null && (
          <p className="text-center mb-4 text-[12px]" style={{ color: '#888780' }}>
            Searching {ingredientCount.toLocaleString()} ingredients — updated regularly
          </p>
        )}

        {/* Autocomplete dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="bg-white rounded-xl border border-cream-dark shadow-lg mb-4 overflow-hidden">
            {suggestions.slice(0, 5).map((ing) => (
              <button
                key={ing.id}
                onMouseDown={() => handleSelect(ing)}
                className="w-full text-left px-5 py-3 hover:bg-cream flex items-center justify-between border-b border-cream-dark last:border-0 transition-colors"
              >
                <div>
                  <span className="font-medium text-forest">{ing.name}</span>
                  {ing.aliases && ing.aliases.length > 0 && (
                    <span className="text-forest/40 text-xs ml-2">
                      {ing.aliases.slice(0, 2).join(', ')}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${dangerConfig[ing.danger_level].bg} ${dangerConfig[ing.danger_level].color}`}>
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
                {selected.aliases && selected.aliases.length > 0 && (
                  <p className="text-forest/60 text-sm mt-0.5">
                    Also known as: {selected.aliases.join(', ')}
                  </p>
                )}
              </div>
              {danger && (
                <span className={`text-sm font-bold px-4 py-1.5 rounded-full flex-shrink-0 ml-4 ${danger.bg} ${danger.color}`}>
                  {danger.label}
                </span>
              )}
            </div>

            <div className="p-6 space-y-6">
              <p className="text-forest/80 leading-relaxed">{selected.description}</p>

              {/* Banned in */}
              {selected.banned_in && selected.banned_in.length > 0 && (
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
              )}

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

        ) : notFound ? (
          /* Not-found state */
          <div className="bg-white rounded-2xl border border-cream-dark p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-forest text-lg mb-2">
                We don&apos;t have data on &ldquo;{notFoundQuery}&rdquo; yet
              </h3>
              <p className="text-forest/60 text-sm leading-relaxed max-w-md mx-auto">
                Our database covers the most common concerning additives, but we&apos;re always
                expanding. For any ingredient not in our database, we recommend checking:
              </p>
            </div>

            <div className="space-y-2 max-w-sm mx-auto mb-6">
              <a
                href="https://www.ewg.org/foodscores"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-cream hover:bg-cream-dark border border-cream-dark transition-colors group"
              >
                <div>
                  <p className="font-medium text-forest text-sm">EWG Food Scores</p>
                  <p className="text-forest/50 text-xs">ewg.org/foodscores</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-forest/30 group-hover:text-forest/60 transition-colors">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a
                href="https://www.fda.gov/food/food-additives-petitions/food-additive-status-list"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-cream hover:bg-cream-dark border border-cream-dark transition-colors group"
              >
                <div>
                  <p className="font-medium text-forest text-sm">FDA Food Additive Database</p>
                  <p className="text-forest/50 text-xs">fda.gov — Food Additive Status List</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-forest/30 group-hover:text-forest/60 transition-colors">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-cream hover:bg-cream-dark border border-cream-dark transition-colors group"
              >
                <div>
                  <p className="font-medium text-forest text-sm">Open Food Facts</p>
                  <p className="text-forest/50 text-xs">world.openfoodfacts.org</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-forest/30 group-hover:text-forest/60 transition-colors">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <div className="text-center">
              <p className="text-forest/50 text-sm">
                Know an ingredient we should add?{' '}
                <a
                  href={`mailto:hello@analogfood.co?subject=Ingredient suggestion: ${encodeURIComponent(notFoundQuery)}&body=I searched for "${notFoundQuery}" and it wasn't in your database. Please consider adding it.`}
                  className="text-amber font-semibold hover:text-amber/80 transition-colors"
                >
                  Suggest it →
                </a>
              </p>
            </div>
          </div>

        ) : (
          /* Default empty state */
          <div className="text-center py-12 text-forest/40">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">Search for an ingredient above or click a quick-pick</p>
          </div>
        )}
      </div>
    </section>
  )
}
