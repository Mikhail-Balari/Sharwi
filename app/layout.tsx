import type { Metadata, Viewport } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Sharwi - Real work deserves real visibility',
  description: 'Sharwi transforms everyday work into visible impact, for professionals and the organizations they power.',
}

export const viewport: Viewport = {
  themeColor: '#050301',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4JFEK747YT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4JFEK747YT', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">

        {/* Floating ember particles — fixed, pointer-events none, z-index 3 */}
        <div aria-hidden="true">
          <div className="ember ember-1" />
          <div className="ember ember-2" />
          <div className="ember ember-3" />
          <div className="ember ember-4" />
          <div className="ember ember-5" />
          <div className="ember ember-6" />
          <div className="ember ember-7" />
          <div className="ember ember-8" />
          <div className="ember ember-9" />
          <div className="ember ember-10" />
          <div className="ember ember-11" />
          <div className="ember ember-12" />
          <div className="ember ember-13" />
          <div className="ember ember-14" />
          <div className="ember ember-15" />
          <div className="ember ember-16" />
          <div className="ember ember-17" />
          <div className="ember ember-18" />
          <div className="ember ember-19" />
          <div className="ember ember-20" />
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
