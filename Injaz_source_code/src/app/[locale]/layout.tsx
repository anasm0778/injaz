import type { Metadata } from 'next'
import {Inter} from 'next/font/google'
import "./globals.css"
import { GoogleTagManager } from '@next/third-parties/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://injazrent.ae/'),
  title: 'Logic Rent A Car Dubai | Affordable Car Rental No Deposit | Monthly Car Rental Dubai',
  description: 'Reliable & affordable car rental in Dubai & Abu Dhabi. Daily, weekly & monthly car hire. SUVs, sedans & luxury cars. Book online with Logic Rent a Car.',
  applicationName: 'Logic Rent A Car',
  keywords: [
    'affordable car rental', 'car rental no deposit', 'cheapest monthly car rental', 'luxury car rental dubai cheap',
    'rent car in dubai without deposit', 'near rent a car', 'rent a car international city', 'best rental car prices',
    'car rental dubai marina', 'cheapest rent a car', 'car rental rates', 'cheap weekly car rentals',
    'discounted car rentals', 'cheap airport rentals', 'rental cars dubai', 'range rover rental dubai',
    'rent a car no deposit dubai', 'lowest car rental rates', 'rent car dubai no deposit', 'weekly rental car rates',
    'car rental dxb', 'rent a car abu dhabi airport', 'cheap rent a car', 'car rental near me',
    'car rental online', 'cheap car rentals near me', 'airport car rentals', 'car rental dubai airport terminal 2',
    'cheap airport car rentals', 'rental car deals near me', 'best place to rent a car', 'car rental dubai airport terminal 1',
    'best car rental prices', 'rental car app', 'month to month car rental', 'month long car rental',
    'monthly car rental rates', 'cheapest way to rent a car for a month', 'long term car rental dubai',
    'car rental Dubai', '1 month car rental dubai', 'month to month car lease', 'subscription car service',
    'car subscription no deposit', 'car rental app dubai', 'car on subscription', 'rent a car monthly basis',
    'car rental per month', 'best way to rent a car for a month', 'best monthly car rental', 'monthly car rental app',
    'rent car low cost', 'car rental dubai', 'car subscription near me', 'car rental monthly subscription',
    'car rental abu dhabi', 'car rental uae', 'rent luxury car dubai', 'dubai luxury car rental',
    'rent a car dubai', 'rent a car for aed 500 per month', 'rent a car without deposit near me',
    'rent a car dubai airport', 'car rent cheap', 'rent cheap car', 'rent a car near me',
    'cheapest monthly car rental', 'cheap long term car rental in dubai', 'cheapest car rentals in dubai',
    'one month car rental in dubai', 'monthly car rentals near me in dubai', '3 month car rental in dubai',
    'monthly car lease in dubai', 'car rental dubai no deposit in dubai', 'car rental in dubai',
    'carrentals in dubai', 'car rental companies in dubai', 'best car rental company in dubai',
    'daily rent a car dubai', 'logic term rental car in dubai', 'rent a car uae', 'dubai rent a car',
    'cheap car rental in dubai', 'cheap cars rental in dubai', 'cheap rent a car dubai',
    'rent a car for a month', 'rent a car for a month in dubai', 'rent a car in business bay',
    'rent a car in downtown', 'rent a car in jvc', 'rent a car in jlt', 'rent a car in jabal ali',
    'rent a car in silicon oasis', 'rent a car in jumeirah', 'rent a car in nad al sheba',
    'rent a car in zabeel', 'rent a car in alqouz', 'rent a car in mudon dubai',
    'rent nissan patrol in dubai', 'rent mercedes in dubai', 'rent mazda in dubai',
    'rent toyota in dubai', 'rent kia in dubai', 'rent a car for aed 600 per month in dubai',
    'car rental', 'car rentals', 'car rental companies', 'best car rental company',
    'car rental places near me', 'best car rental', 'suv rental near me', 'cheapest rental cars near me',
    'car rental places', 'car rental services', 'cheapest place to rent a car', 'rent a car today',
    'rental cars near me', 'car rental in Abu Dhabi', 'Car rentals in Abu Dhabi',
    'car rental companies in Abu Dhabi', 'best car rental company in Abu Dhabi',
    'car rental places near me in Abu Dhabi', 'best car rental in Abu Dhabi',
    'suv rental near me in Abu Dhabi', 'cheapest rental cars near me in Abu Dhabi',
    'car rental places in Abu Dhabi', 'car rental services in Abu Dhabi',
    'cheapest place to rent a car in Abu Dhabi', 'rent a car today in Abu Dhabi',
    'rental cars near me in Abu Dhabi', 'rent a car in yas', 'yas island rent a car',
    'rent a car in yas island', 'khalifa city rent a car', 'rent a car in mbz', 'mbz rent a car',
    'rent a car in musaffah', 'musaffah rent a car', 'car rental in musaffah',
    'rent a car in shabiya', 'rent a car mussafah', 'mussafah car rentals',
    'car rentals in mussafah', 'cheap car rental in musaffah', 'best rent a car in musaffah',
    'rent a car in mussafah without deposit', 'logic dubai rent a car'
  ],
  authors: [{name: 'Logic Rent A Car', url: 'https://injazrent.ae/'}],
  creator: 'Logic Rent A Car',
  publisher: 'Logic Rent A Car',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-AE': '/ar-AE',
    }
  },
  openGraph: {
    title: 'Logic Rent A Car Dubai | Affordable Car Rental No Deposit | Monthly Car Rental Dubai',
    description: 'Reliable & affordable car rental in Dubai & Abu Dhabi. Daily, weekly & monthly car hire. SUVs, sedans & luxury cars. Book online with Logic Rent a Car.',
    url: 'https://injazrent.ae/',
    siteName: 'Logic Rent A Car',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://injazrent.ae/logic%20white%20colour%20logo.png',
        width: 1200,
        height: 630,
        alt: 'Logic Rent A Car Dubai - Best Car Rental Service',
      },
    ],
  },
  twitter: {
    title: 'Logic Rent A Car Dubai | Affordable Car Rental No Deposit',
    description: 'Reliable & affordable car rental in Dubai & Abu Dhabi. Daily, weekly & monthly car hire. SUVs, sedans & luxury cars. Book online with Logic Rent a Car.',
    site: '@logicrent',
    card: 'summary_large_image',
    images: ['https://injazrent.ae/logic%20white%20colour%20logo.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <GoogleTagManager gtmId="GTM-KBG7S42T" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
