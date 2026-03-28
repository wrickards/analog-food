import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const vendors = [
  {
    name: 'Brooklyn Grange Rooftop Farm',
    type: 'farm',
    lat: 40.7282,
    lng: -73.9442,
    address: '37-18 Northern Blvd',
    city: 'Long Island City',
    state: 'NY',
    zip: '11101',
    website: 'https://brooklyngrangefarm.com',
    phone: '718-708-5986',
    hours: 'Seasonal farm stand, see website for dates',
    tags: ['organic', 'rooftop', 'CSA', 'NYC'],
    highlights: ["Nation's largest rooftop soil farm", 'Certified organic', 'CSA shares available'],
    verified: true,
  },
  {
    name: 'Grand Army Plaza Greenmarket',
    type: 'farmers-market',
    lat: 40.6739,
    lng: -73.9700,
    address: 'Grand Army Plaza',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11238',
    website: 'https://www.grownyc.org/greenmarket/brooklyn-grand-army-plaza',
    hours: 'Saturdays 8am–4pm, year-round',
    tags: ['GrowNYC', 'year-round', 'organic vendors'],
    highlights: ['Year-round Saturday market', 'Multiple certified organic farms'],
    verified: true,
  },
  // Add more as needed...
]

const ingredientData = [
  {
    name: 'Red 40 (Allura Red)',
    aliases: ['Red 40', 'Allura Red AC', 'FD&C Red No. 40', 'E129'],
    danger_level: 'high',
    description: 'A petroleum-derived synthetic dye used to color foods red or orange.',
    banned_in: ['European Union (warning label required)', 'Norway', 'Finland'],
    clean_alternative: 'Beet juice powder, pomegranate juice concentrate, or hibiscus extract',
    personal_note: "Analog Food's founder has experienced this firsthand — his son becomes violently ill hours after consuming Red 40.",
  },
  // Add more...
]

async function seed() {
  console.log('Seeding vendors...')
  const { error: vendorError } = await supabase.from('vendors').upsert(vendors)
  if (vendorError) console.error('Vendor seed error:', vendorError)
  else console.log(`Seeded ${vendors.length} vendors`)

  console.log('Seeding ingredients...')
  const { error: ingError } = await supabase.from('ingredients').upsert(ingredientData)
  if (ingError) console.error('Ingredient seed error:', ingError)
  else console.log(`Seeded ${ingredientData.length} ingredients`)

  console.log('Done!')
}

seed()
