# Security Guide — Google Maps API Keys

## Two separate keys required

Analog Food uses two Google Maps API keys with different permission profiles:

| Variable | Use | Restriction type |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Client-side map rendering (browser) | HTTP Referrers |
| `GOOGLE_MAPS_SERVER_KEY` | Server-side Places + Geocoding (API routes) | IP Addresses |

---

## Setting up NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (client-side)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Click **Create Credentials** → **API Key**
3. Click the key name → **Application restrictions** → **HTTP referrers**
4. Add your referrers:
   - `https://analogfood.co/*`
   - `https://www.analogfood.co/*`
   - `http://localhost:3000/*` (for local dev)
5. Under **API restrictions** → **Restrict key** → select:
   - Maps JavaScript API
6. Click Save

## Setting up GOOGLE_MAPS_SERVER_KEY (server-side)

1. Create another API key (or use an existing one)
2. **Application restrictions** → **IP addresses**
3. Add the IP addresses of your Vercel deployment (or leave unrestricted while testing — lock down before production)
4. **API restrictions** → **Restrict key** → select:
   - Places API
   - Geocoding API
5. Click Save

## APIs to enable in Google Cloud Console

Enable these APIs for your project:
- **Maps JavaScript API** — for the interactive map
- **Places API** — for venue search
- **Geocoding API** — for zip → lat/lng conversion

Go to: APIs & Services → Library → search each API → Enable

## Adding keys to Vercel

In Vercel dashboard → Project → Settings → Environment Variables:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = your client key
- `GOOGLE_MAPS_SERVER_KEY` = your server key

Both should be set for all environments (Production, Preview, Development).

## Cost control

Set budget alerts at $10/month to avoid surprise bills:
- Billing → Budgets & alerts → Create budget → $10 threshold with email alerts

Free tier covers:
- 28,000 map loads/month
- 5,000 Geocoding requests/month  
- 5,000 Places Text Search requests/month
