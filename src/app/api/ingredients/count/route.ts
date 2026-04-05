import { NextResponse } from 'next/server'
import { ingredients as localIngredients } from '@/data/ingredients'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { count, error } = await supabase
        .from('ingredients')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        return NextResponse.json({ count })
      }
    } catch (err) {
      console.error('Supabase count error:', err)
    }
  }

  // Fallback to local data count
  return NextResponse.json({ count: localIngredients.length })
}
