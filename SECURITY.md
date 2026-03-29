# Security Guide — Google Maps API Keys

## Two separate keys required

Analog Food uses two Google Maps API keys with different permission profiles:

| Variable | Use | Restriction type |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Client-side map rendering (browser) | HTTP Referrers |
| `GOOGLE_MAPS_SERVER_KEY` | Server-side Places + Geocoding (API routes) | API type only |

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

Vercel serverless functions run on dynamic infrastructure with no fixed IP addresses, so IP-based restrictions are not possible. The key is secured by restricting which APIs it can call — it lives only in Vercel's encrypted environment variables and is never sent to the browser.

1. Create a second API key (keep it separate from the client key)
2. **Application restrictions** → **None** (Vercel has no static IPs)
3. **API restrictions** → **Restrict key** → select only:
   - Places API
   - Geocoding API
4. Click Save

Even without IP restrictions, this key is safe because:
- It is never included in client-side JavaScript bundles
- It is only accessible inside your `/api/vendors` and `/api/geocode` server routes
- If leaked, it can only call Places and Geocoding — nothing else

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
