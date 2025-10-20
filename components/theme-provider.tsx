"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <div suppressHydrationWarning>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </div>
  )
}
