import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Educational Mitra — Free Admission Counselling Indore',
  description: 'Educational Mitra is Indore\'s trusted education consultancy since 2012. Free counselling for MBA, BBA, B.Tech, MBBS, Law & Study Abroad. 200+ partner colleges.',
  metadataBase: new URL('https://educationalmitra.in'),
  openGraph: {
    siteName: 'Educational Mitra',
    locale: 'en_IN',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Educational Mitra',
  description: 'Free admission counselling for MBA, BBA, B.Tech, MBBS, Law & Study Abroad in Indore since 2012.',
  url: 'https://educationalmitra.in',
  telephone: '+917909500055',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '402, 4th Floor, Silver Sanchora Castle, RNT Marg, South Tukoganj',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.7196,
    longitude: 75.8577,
  },
  openingHours: 'Mo-Sa 10:00-19:30',
  priceRange: 'Free',
  founder: {
    '@type': 'Person',
    name: 'Ravi Shukla',
  },
  foundingDate: '2012',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
