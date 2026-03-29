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
  description: 'Analog Food helps you find locally sourced, organic, and additive-free food near you — farms, farmers markets, and clean grocers, not Whole Foods.',
  keywords: ['organic food', 'clean eating', 'food additives', 'farmers markets', 'local farms', 'pesticide free'],
  openGraph: {
    title: 'Analog Food',
    description: 'The signal before the noise. Find clean food near you.',
    type: 'website',
    url: 'https://analogfood.com',
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
