import { NextRequest, NextResponse } from 'next/server'

// NYC zip code centroids for proximity sorting
const ZIP_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  '10001': { lat: 40.7484, lng: -73.9967 }, // Chelsea
  '10002': { lat: 40.7157, lng: -73.9863 }, // Lower East Side
  '10003': { lat: 40.7316, lng: -73.9897 }, // East Village
  '10004': { lat: 40.7004, lng: -74.0399 }, // Financial District
  '10005': { lat: 40.7074, lng: -74.0113 },
  '10006': { lat: 40.7090, lng: -74.0131 },
  '10007': { lat: 40.7135, lng: -74.0078 },
  '10009': { lat: 40.7264, lng: -73.9773 },
  '10010': { lat: 40.7396, lng: -73.9836 }, // Flatiron
  '10011': { lat: 40.7428, lng: -74.0002 }, // Chelsea
  '10012': { lat: 40.7258, lng: -74.0013 }, // SoHo
  '10013': { lat: 40.7195, lng: -74.0051 }, // Tribeca
  '10014': { lat: 40.7335, lng: -74.0059 }, // West Village
  '10016': { lat: 40.7467, lng: -73.9821 }, // Murray Hill
  '10017': { lat: 40.7527, lng: -73.9738 }, // Midtown East
  '10018': { lat: 40.7564, lng: -73.9924 }, // Hell's Kitchen
  '10019': { lat: 40.7654, lng: -73.9860 }, // Upper West Side/Hell's Kitchen
  '10021': { lat: 40.7710, lng: -73.9593 }, // Upper East Side
  '10022': { lat: 40.7589, lng: -73.9663 },
  '10023': { lat: 40.7784, lng: -73.9818 }, // Upper West Side
  '10024': { lat: 40.7869, lng: -73.9756 },
  '10025': { lat: 40.7975, lng: -73.9665 },
  '10026': { lat: 40.8037, lng: -73.9539 }, // Harlem
  '10027': { lat: 40.8116, lng: -73.9538 },
  '10028': { lat: 40.7768, lng: -73.9523 },
  '10029': { lat: 40.7917, lng: -73.9434 },
  '10030': { lat: 40.8185, lng: -73.9444 },
  '10031': { lat: 40.8244, lng: -73.9502 },
  '10032': { lat: 40.8393, lng: -73.9414 },
  '10033': { lat: 40.8494, lng: -73.9355 },
  '10034': { lat: 40.8656, lng: -73.9256 }, // Inwood
  '10035': { lat: 40.7993, lng: -73.9340 },
  '10036': { lat: 40.7607, lng: -73.9917 }, // Times Square area
  '10037': { lat: 40.8140, lng: -73.9373 },
  '10038': { lat: 40.7080, lng: -74.0006 },
  '10039': { lat: 40.8262, lng: -73.9381 },
  '10040': { lat: 40.8581, lng: -73.9319 },
  // Brooklyn
  '11201': { lat: 40.6942, lng: -73.9900 }, // Downtown Brooklyn
  '11202': { lat: 40.6928, lng: -73.9903 },
  '11203': { lat: 40.6515, lng: -73.9363 },
  '11204': { lat: 40.6195, lng: -73.9840 },
  '11205': { lat: 40.6973, lng: -73.9660 }, // Clinton Hill
  '11206': { lat: 40.7059, lng: -73.9450 }, // Bushwick/Williamsburg
  '11207': { lat: 40.6738, lng: -73.9030 },
  '11208': { lat: 40.6693, lng: -73.8762 },
  '11209': { lat: 40.6247, lng: -74.0305 }, // Bay Ridge
  '11210': { lat: 40.6326, lng: -73.9438 },
  '11211': { lat: 40.7143, lng: -73.9547 }, // Williamsburg
  '11212': { lat: 40.6628, lng: -73.9155 },
  '11213': { lat: 40.6710, lng: -73.9388 },
  '11214': { lat: 40.6006, lng: -73.9976 }, // Bensonhurst
  '11215': { lat: 40.6601, lng: -73.9836 }, // Park Slope
  '11216': { lat: 40.6757, lng: -73.9498 }, // Crown Heights
  '11217': { lat: 40.6826, lng: -73.9793 }, // Boerum Hill
  '11218': { lat: 40.6464, lng: -73.9760 }, // Kensington
  '11219': { lat: 40.6312, lng: -73.9985 }, // Borough Park
  '11220': { lat: 40.6401, lng: -74.0156 }, // Sunset Park
  '11221': { lat: 40.6913, lng: -73.9296 }, // Bushwick
  '11222': { lat: 40.7244, lng: -73.9513 }, // Greenpoint
  '11223': { lat: 40.5989, lng: -73.9735 },
  '11224': { lat: 40.5763, lng: -73.9920 }, // Coney Island
  '11225': { lat: 40.6610, lng: -73.9558 }, // Crown Heights/Flatbush
  '11226': { lat: 40.6444, lng: -73.9559 }, // Flatbush
  '11228': { lat: 40.6177, lng: -74.0152 },
  '11229': { lat: 40.5971, lng: -73.9422 },
  '11230': { lat: 40.6222, lng: -73.9643 },
  '11231': { lat: 40.6763, lng: -74.0019 }, // Red Hook/Carroll Gardens
  '11232': { lat: 40.6555, lng: -74.0066 },
  '11233': { lat: 40.6717, lng: -73.9222 },
  '11234': { lat: 40.6087, lng: -73.9184 },
  '11235': { lat: 40.5870, lng: -73.9476 }, // Brighton Beach
  '11236': { lat: 40.6327, lng: -73.9061 },
  '11237': { lat: 40.7041, lng: -73.9258 },
  '11238': { lat: 40.6811, lng: -73.9670 }, // Prospect Heights/Park Slope
  '11239': { lat: 40.6486, lng: -73.8788 },
  // Queens
  '11101': { lat: 40.7492, lng: -73.9371 }, // Long Island City
  '11102': { lat: 40.7720, lng: -73.9305 }, // Astoria
  '11103': { lat: 40.7699, lng: -73.9228 },
  '11104': { lat: 40.7440, lng: -73.9251 },
  '11105': { lat: 40.7795, lng: -73.9098 },
  '11106': { lat: 40.7626, lng: -73.9290 },
  '11354': { lat: 40.7674, lng: -73.8304 }, // Flushing
  '11355': { lat: 40.7479, lng: -73.8213 },
  '11356': { lat: 40.7825, lng: -73.8412 },
  '11357': { lat: 40.7885, lng: -73.8299 },
  '11358': { lat: 40.7592, lng: -73.8042 },
  '11360': { lat: 40.7929, lng: -73.8071 },
  '11361': { lat: 40.7701, lng: -73.7690 },
  '11362': { lat: 40.7641, lng: -73.7338 },
  '11363': { lat: 40.7741, lng: -73.7480 },
  '11364': { lat: 40.7454, lng: -73.7655 },
  '11365': { lat: 40.7347, lng: -73.7912 },
  '11366': { lat: 40.7235, lng: -73.7898 },
  '11367': { lat: 40.7274, lng: -73.8210 },
  '11368': { lat: 40.7490, lng: -73.8621 },
  '11369': { lat: 40.7630, lng: -73.8792 },
  '11370': { lat: 40.7603, lng: -73.8926 },
  '11371': { lat: 40.7743, lng: -73.8741 },
  '11372': { lat: 40.7514, lng: -73.8862 },
  '11373': { lat: 40.7371, lng: -73.8710 },
  '11374': { lat: 40.7294, lng: -73.8631 },
  '11375': { lat: 40.7219, lng: -73.8437 }, // Forest Hills
  '11377': { lat: 40.7449, lng: -73.9095 }, // Woodside/Sunnyside
  '11378': { lat: 40.7260, lng: -73.9107 },
  '11379': { lat: 40.7221, lng: -73.8595 },
  '11385': { lat: 40.7039, lng: -73.8907 }, // Ridgewood
  '11415': { lat: 40.7083, lng: -73.8328 },
  '11418': { lat: 40.7026, lng: -73.8377 },
  '11419': { lat: 40.6932, lng: -73.8263 },
  '11420': { lat: 40.6736, lng: -73.8261 },
  '11421': { lat: 40.6970, lng: -73.8520 },
  '11422': { lat: 40.6589, lng: -73.7521 },
  '11423': { lat: 40.7136, lng: -73.7696 },
  '11424': { lat: 40.7162, lng: -73.8275 },
  '11425': { lat: 40.7126, lng: -73.8116 },
  '11426': { lat: 40.7325, lng: -73.7221 },
  '11427': { lat: 40.7254, lng: -73.7464 },
  '11428': { lat: 40.7137, lng: -73.7432 },
  '11429': { lat: 40.6955, lng: -73.7464 },
  '11430': { lat: 40.6454, lng: -73.7841 }, // JFK Airport area
  '11432': { lat: 40.7100, lng: -73.7949 },
  '11433': { lat: 40.6943, lng: -73.7844 },
  '11434': { lat: 40.6659, lng: -73.7738 },
  '11435': { lat: 40.6944, lng: -73.8099 },
  '11436': { lat: 40.6723, lng: -73.8001 },
  // Bronx
  '10451': { lat: 40.8195, lng: -73.9236 },
  '10452': { lat: 40.8382, lng: -73.9225 },
  '10453': { lat: 40.8545, lng: -73.9157 },
  '10454': { lat: 40.8059, lng: -73.9167 },
  '10455': { lat: 40.8136, lng: -73.9100 },
  '10456': { lat: 40.8285, lng: -73.9103 },
  '10457': { lat: 40.8469, lng: -73.9025 },
  '10458': { lat: 40.8615, lng: -73.8879 }, // Fordham
  '10459': { lat: 40.8262, lng: -73.8960 },
  '10460': { lat: 40.8385, lng: -73.8821 },
  '10461': { lat: 40.8438, lng: -73.8446 },
  '10462': { lat: 40.8400, lng: -73.8620 },
  '10463': { lat: 40.8798, lng: -73.9127 },
  '10464': { lat: 40.8559, lng: -73.7963 },
  '10465': { lat: 40.8291, lng: -73.8198 },
  '10466': { lat: 40.8983, lng: -73.8436 },
  '10467': { lat: 40.8744, lng: -73.8670 },
  '10468': { lat: 40.8665, lng: -73.9006 },
  '10469': { lat: 40.8724, lng: -73.8449 },
  '10470': { lat: 40.9010, lng: -73.8591 },
  '10471': { lat: 40.9007, lng: -73.9009 },
  '10472': { lat: 40.8299, lng: -73.8739 },
  '10473': { lat: 40.8193, lng: -73.8556 },
  '10474': { lat: 40.8136, lng: -73.8759 },
  '10475': { lat: 40.8783, lng: -73.8285 },
  // Staten Island
  '10301': { lat: 40.6448, lng: -74.0998 },
  '10302': { lat: 40.6288, lng: -74.1166 },
  '10303': { lat: 40.6317, lng: -74.1364 },
  '10304': { lat: 40.6136, lng: -74.0912 },
  '10305': { lat: 40.5983, lng: -74.0753 },
  '10306': { lat: 40.5731, lng: -74.1213 },
  '10307': { lat: 40.5111, lng: -74.2156 },
  '10308': { lat: 40.5517, lng: -74.1498 },
  '10309': { lat: 40.5434, lng: -74.1849 },
  '10310': { lat: 40.6333, lng: -74.1248 },
  '10312': { lat: 40.5437, lng: -74.1654 },
  '10314': { lat: 40.6126, lng: -74.1683 },
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8 // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim()
  const type = req.nextUrl.searchParams.get('type')?.trim()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      let query = supabase.from('vendors').select('*')
      if (type) query = query.eq('type', type)

      const { data, error } = await query.order('name')

      if (!error && data && data.length > 0) {
        let vendors = data

        // Sort by distance if zip provided
        if (zip && ZIP_CENTROIDS[zip]) {
          const { lat, lng } = ZIP_CENTROIDS[zip]
          vendors = vendors
            .map((v) => ({ ...v, _dist: haversineDistance(lat, lng, v.lat, v.lng) }))
            .sort((a, b) => a._dist - b._dist)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(({ _dist, ...v }) => v)
        }

        return NextResponse.json({ vendors, count: vendors.length })
      }
    } catch (err) {
      console.error('Supabase vendors error:', err)
    }
  }

  // Fallback: return empty so client uses sample data
  return NextResponse.json({ vendors: [], count: 0 })
}
