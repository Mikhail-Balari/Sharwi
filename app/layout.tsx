import type { Metadata, Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

export const metadata: Metadata = {
  title: "Sharwi | Turn Real Work Into Reputation and Business Impact",
  description:
    "Sharwi gives professionals a Personal Layer and companies an Enterprise Layer to turn real work into visible reputation and measurable business impact.",
}

export const viewport: Viewport = {
  themeColor: "#06090f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4JFEK747YT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-4JFEK747YT', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
