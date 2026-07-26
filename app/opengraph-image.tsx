import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0e13",
          backgroundImage:
            "linear-gradient(135deg, #0c0e13 0%, #14161d 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            color: "#f68031",
            marginBottom: 24,
          }}
        >
          <span style={{ marginRight: 12 }}>&gt;</span>
          <span>whoami</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 700,
            letterSpacing: -2,
            background: "linear-gradient(90deg, #f68031 0%, #ffb37a 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Shinni
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#e2e4e9",
            marginTop: 16,
          }}
        >
          Linux System Administrator
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8b8f99",
            marginTop: 24,
          }}
        >
          Performance · Uptime · Secure Automation
        </div>
      </div>
    ),
    { ...size }
  )
}
