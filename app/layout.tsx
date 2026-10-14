import type { Metadata, Viewport } from "next"
import "./globals.css"
import "./site.css"
import { fontSans, fontMono } from "@/app/fonts"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://shinni.dev"),
  title: "Shinni | System Administrator & Linux Enthusiast",
  description:
    "Linux-focused system administrator specializing in performance, uptime, and secure automation. Explore projects, skills, and get in touch.",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shinni | System Administrator",
    description:
      "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
    url: "https://shinni.dev",
    siteName: "Shinni",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinni | System Administrator",
    description:
      "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
  },
}

export const viewport: Viewport = {
  themeColor: "#2b2622",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <main id="main">{children}</main>
        <SpeedInsights />
        <Analytics />
        <Script id="schema-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Hana Becheva",
            alternateName: "Shinni",
            url: "https://shinni.dev",
            email: "shinni@tutamail.com",
            description:
              "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
            sameAs: [
              "https://github.com/ShinniUwU",
              "https://www.linkedin.com/in/hana-becheva-a7062622b/",
            ],
            jobTitle: "System Administrator",
          })}
        </Script>
      </body>
    </html>
  )
}
