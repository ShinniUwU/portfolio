import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shinni | System Administrator & Linux Enthusiast",
    short_name: "Shinni",
    description:
      "Linux-focused system administrator specializing in performance, uptime, and secure automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0e13",
    theme_color: "#0c0e13",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
