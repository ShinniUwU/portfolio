import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Hana Becheva | System Administrator & Linux Enthusiast",
  description: "I'm Hana Becheva, a passionate System Administrator specialized in Linux and open-source technologies. Explore my portfolio, projects, and skills—and let's collaborate!",
  icons: {
    icon: "/bash.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
