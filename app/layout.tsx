import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: 'NEXA — Numerical Engine for Exact Answers',
  description:
    'Experience the most accurate, stunning, and feature-complete calculator web application. Arbitrary precision math, symbolic computation, graphing, and more.',
  keywords: [
    'calculator',
    'scientific calculator',
    'graphing calculator',
    'math',
    'symbolic math',
    'arbitrary precision',
  ],
  authors: [{ name: 'NEXA Team' }],
  creator: 'NEXA',
  publisher: 'NEXA',
  applicationName: 'NEXA',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NEXA',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexa-calc.com',
    title: 'NEXA — Numerical Engine for Exact Answers',
    description:
      'Experience the most accurate, stunning, and feature-complete calculator web application.',
    siteName: 'NEXA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEXA Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXA — Numerical Engine for Exact Answers',
    description:
      'Experience the most accurate, stunning, and feature-complete calculator web application.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
