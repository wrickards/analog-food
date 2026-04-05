export type VendorType = 'farm' | 'farmers-market' | 'specialty-grocer' | 'csa'

export interface Vendor {
  id: string
  name: string
  type: VendorType
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zip: string
  website?: string
  phone?: string
  hours?: string
  tags: string[]
  highlights: string[]
  verified: boolean
  verified_at?: string
  verified_by?: string
  verification_notes?: string
  notes?: string
  source?: 'supabase' | 'google'
  place_id?: string
  rating?: number
  user_ratings_total?: number
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  zip: string
  created_at: string
}

export type DangerLevel = 'high' | 'medium' | 'low'

export interface Ingredient {
  id: string
  name: string
  aliases: string[]
  danger_level: DangerLevel
  description: string
  banned_in: string[]
  clean_alternative: string
  personal_note?: string
}
