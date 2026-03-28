# Analog Food

> The signal before the noise. — Find locally sourced, organic, and additive-free food near you.

**analogfood.co** — farms, farmers markets, CSAs, and clean grocers. Not restaurants.

---

## Local development

```bash
# 1. Clone the repo
git clone https://github.com/[USERNAME]/analog-food.git
cd analog-food

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in values (see Environment Variables below)

# 4. Start the dev server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

---

## Database setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your project dashboard
3. Run `supabase/schema.sql` — creates all tables and RLS policies
4. Run `supabase/seed.sql` — seeds 23 NYC vendors + 20 ingredients including Red 40

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role secret |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Cloud Console (optional — Leaflet works without it) |
| `NEXT_PUBLIC_SITE_URL` | `https://analogfood.co` |

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Set environment variables in Vercel dashboard:
# vercel.com → Project → Settings → Environment Variables
# Add all keys from .env.example

# Deploy to production
vercel --prod
```

Or use the Vercel GitHub integration:
1. Push this repo to GitHub
2. Import at vercel.com/new
3. Add environment variables in the dashboard
4. Deploy

---

## Connect domain (analogfood.co)

1. In Vercel → Project → **Settings → Domains** → Add `analogfood.co`
2. Vercel provides DNS records (A record + CNAME)
3. Add those records in your DNS provider (Cloudflare, Namecheap, etc.)
4. DNS propagates in 5–30 minutes

---

## Tech stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + custom color palette
- **TypeScript**
- **Supabase** (PostgreSQL) — vendors, subscribers, ingredients
- **Leaflet.js** — interactive map (Google Maps ready when API key added)
- **Resend** — transactional email for newsletter signups
- **Vercel** — deployment

---

## Database schema

Three tables: `vendors`, `subscribers`, `ingredients`

See `supabase/schema.sql` for full schema with RLS policies.

```
vendors        — farms, farmers markets, CSAs, specialty grocers
subscribers    — newsletter signups (email + zip)
ingredients    — decoder database (name, danger level, banned_in, etc.)
```

Row Level Security is enabled on all tables:
- `vendors` and `ingredients` — public read
- `subscribers` — service role insert only

---

## Project structure

```
src/
  app/
    api/
      subscribe/route.ts       Newsletter signup (Supabase + Resend)
      vendors/route.ts         Vendor search API with zip proximity sort
      ingredients/search/      Ingredient decoder search API
    layout.tsx                 Fonts, metadata, OG tags
    page.tsx                   Main page
  components/
    Navigation.tsx             Sticky nav with Logo
    Logo.tsx                   Sine wave SVG + wordmark
    HeroSection.tsx            Hero with stat pills
    StorySection.tsx           Founding narrative
    DangerSection.tsx          6 danger ingredient cards
    IngredientDecoder.tsx      Search with local + Supabase fallback
    FindCleanFood.tsx          Zip search + map + vendor list
    VendorMap.tsx              Leaflet map (SSR disabled)
    BenefitsSection.tsx        5 benefit cards
    NewsletterSection.tsx      The Signal signup form
    Footer.tsx                 Footer with logo
  data/
    ingredients.ts             Local ingredient data (fallback)
  lib/
    supabase.ts                Supabase client
  types/
    index.ts                   TypeScript types
supabase/
  schema.sql                   Database schema + RLS policies
  seed.sql                     Seed data (23 vendors + 20 ingredients)
public/
  favicon.svg                  Sine wave mark favicon
  leaflet/                     Leaflet marker images
```
