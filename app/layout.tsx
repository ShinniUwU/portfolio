import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { fontSans } from "@/app/fonts"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL("https://shinni.dev"),
  title: "Shinni | System Administrator & Linux Enthusiast",
  description:
    "Linux-focused system administrator specializing in performance, uptime, and secure automation. Explore projects, skills, and get in touch.",
  icons: {
    icon: "/bash.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Shinni | System Administrator",
    description:
      "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
    url: "https://shinni.dev",
    siteName: "Shinni",
    images: [
      { url: "/bash.png", width: 512, height: 512, alt: "Shinni logo" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shinni | System Administrator",
    description:
      "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
    images: ["/bash.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-primary text-primary-foreground px-3 py-2 rounded-md"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main id="main" suppressHydrationWarning>{children}</main>
        </ThemeProvider>
        <Script id="schema-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Shinni",
            url: "https://shinni.dev",
            sameAs: [
              "https://github.com/ShinniUwU",
              "https://www.linkedin.com/in/radoslav-borisov-a7062622b/",
            ],
            jobTitle: "System Administrator",
          })}
        </Script>
      </body>
    </html>
  )
}
