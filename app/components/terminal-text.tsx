"use client"

import { useState, useEffect } from "react"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  cursorBlinkSpeed?: number
}

export default function TerminalText({ text, typingSpeed = 50, cursorBlinkSpeed = 500 }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  // Typing effect
  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
    }
  }, [displayedText, text, typingSpeed])

  // Cursor blinking effect
  useEffect(() => {
    if (!isTyping) {
      const interval = setInterval(() => {
        setCursorVisible((prev) => !prev)
      }, cursorBlinkSpeed)
      return () => clearInterval(interval)
    }
  }, [isTyping, cursorBlinkSpeed])

  return (
    <div className="font-mono text-sm md:text-base inline-flex">
      <span className="text-primary mr-2">$</span>
      <span>{displayedText}</span>
      <span
        className={`${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity ml-0.5 bg-primary w-2 h-5 inline-block`}
      ></span>
    </div>
  )
}

