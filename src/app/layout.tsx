import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Analog Food — The signal before the noise',
  description: 'Find locally sourced, organic, and additive-free food near you. Farms, farmers markets, and clean grocers. Not Whole Foods.',
  keywords: ['organic food', 'clean eating', 'food additives', 'farmers markets', 'local farms', 'pesticide free'],
  metadataBase: new URL('https://analogfood.co'),
  openGraph: {
    title: 'Analog Food — The signal before the noise',
    description: 'Find clean food near you — farms, markets, and sources free from harmful additives.',
    url: 'https://analogfood.co',
    siteName: 'Analog Food',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Analog Food — The signal before the noise',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analog Food — The signal before the noise',
    description: 'Find clean food near you — farms, markets, and sources free from harmful additives.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="font-sans bg-cream text-forest antialiased">
        {children}
      </body>
    </html>
  )
}
