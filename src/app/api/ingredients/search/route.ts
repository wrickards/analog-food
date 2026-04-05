import { NextRequest, NextResponse } from 'next/server'
import { ingredients as localIngredients } from '@/data/ingredients'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q) {
    return NextResponse.json({ error: 'Query parameter q is required.' }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Use the RPC fuzzy search function for ranked results
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('search_ingredients', { query: q })

      if (!rpcError && rpcData && rpcData.length > 0) {
        return NextResponse.json({ ingredient: rpcData[0], suggestions: rpcData.slice(1) })
      }

      // RPC function not yet deployed — fall back to ILIKE search
      if (rpcError) {
        const { data, error } = await supabase
          .from('ingredients')
          .select('*')
          .or(
            `name.ilike.%${q}%`
          )
          .limit(5)

        if (!error && data && data.length > 0) {
          // Client-side rank: exact name match > starts-with > contains > alias match
          const qLower = q.toLowerCase()
          const ranked = [...data].sort((a, b) => {
            const rankA = rankMatch(a.name, a.aliases as string[], qLower)
            const rankB = rankMatch(b.name, b.aliases as string[], qLower)
            return rankA - rankB
          })
          return NextResponse.json({ ingredient: ranked[0], suggestions: ranked.slice(1) })
        }

        // If name ILIKE found nothing, try alias search
        const { data: allData } = await supabase.from('ingredients').select('*')
        if (allData) {
          const qLower = q.toLowerCase()
          const matches = allData
            .filter(
              (ing) =>
                ing.name.toLowerCase().includes(qLower) ||
                (ing.aliases as string[]).some((a: string) => a.toLowerCase().includes(qLower))
            )
            .sort((a, b) => {
              const rankA = rankMatch(a.name, a.aliases as string[], qLower)
              const rankB = rankMatch(b.name, b.aliases as string[], qLower)
              return rankA - rankB
            })
            .slice(0, 5)

          if (matches.length > 0) {
            return NextResponse.json({ ingredient: matches[0], suggestions: matches.slice(1) })
          }
        }
      }

      // Nothing found in Supabase
      return NextResponse.json({ notFound: true, query: q })
    } catch (err) {
      console.error('Supabase ingredients error:', err)
      // fall through to local data
    }
  }

  // Fallback: search local ingredient data
  const qLower = q.toLowerCase()
  const matches = localIngredients
    .filter(
      (ing) =>
        ing.name.toLowerCase().includes(qLower) ||
        ing.aliases.some((a) => a.toLowerCase().includes(qLower))
    )
    .sort((a, b) => rankMatch(a.name, a.aliases, qLower) - rankMatch(b.name, b.aliases, qLower))
    .slice(0, 5)

  if (matches.length === 0) {
    return NextResponse.json({ notFound: true, query: q })
  }

  return NextResponse.json({ ingredient: matches[0], suggestions: matches.slice(1) })
}

function rankMatch(name: string, aliases: string[], q: string): number {
  const nameLower = name.toLowerCase()
  if (nameLower === q) return 0
  if (nameLower.startsWith(q)) return 1
  if (nameLower.includes(q)) return 2
  if (aliases.some((a) => a.toLowerCase() === q)) return 3
  if (aliases.some((a) => a.toLowerCase().startsWith(q))) return 4
  return 5
}
