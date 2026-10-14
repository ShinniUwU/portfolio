"use client"

import { useState } from "react"

const EMAIL = "shinni@tutamail.com"

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <button
        type="button"
        className="copy"
        onClick={() => {
          navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
        }}
      >
        {copied ? "Copied" : "Copy address"}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  )
}
