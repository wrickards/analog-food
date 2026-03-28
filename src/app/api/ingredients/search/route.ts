import { NextRequest, NextResponse } from 'next/server'
import { ingredients as localIngredients } from '@/data/ingredients'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim().toLowerCase()
  if (!q) {
    return NextResponse.json({ error: 'Query parameter q is required.' }, { status: 400 })
  }

  // Try Supabase first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Search by name (case-insensitive) or within aliases array
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .or(`name.ilike.%${q}%`)
        .limit(1)
        .single()

      if (!error && data) {
        return NextResponse.json({ ingredient: data })
      }

      // If not found by name, search aliases manually
      const { data: allData } = await supabase.from('ingredients').select('*')
      if (allData) {
        const match = allData.find(
          (ing) =>
            ing.name.toLowerCase().includes(q) ||
            (ing.aliases as string[]).some((a: string) => a.toLowerCase().includes(q))
        )
        if (match) return NextResponse.json({ ingredient: match })
      }
    } catch (err) {
      console.error('Supabase ingredients error:', err)
      // fall through to local
    }
  }

  // Fallback: search local ingredient data
  const match = localIngredients.find(
    (ing) =>
      ing.name.toLowerCase().includes(q) ||
      ing.aliases.some((a) => a.toLowerCase().includes(q))
  )

  if (!match) {
    return NextResponse.json({ notFound: true })
  }

  return NextResponse.json({ ingredient: match })
}
