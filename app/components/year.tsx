"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

// Reads the visitor's clock so the year stays correct between static-export builds.
export default function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  )
  return <span suppressHydrationWarning>{year ?? ""}</span>
}
