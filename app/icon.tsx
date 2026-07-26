import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0e13",
          borderRadius: 6,
          color: "#f68031",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        #!
      </div>
    ),
    { ...size }
  )
}
