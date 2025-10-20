"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { fontMono } from "@/app/fonts"

function formatTime(d: Date) {
  const hh = d.getHours().toString().padStart(2, "0")
  const mm = d.getMinutes().toString().padStart(2, "0")
  const ss = d.getSeconds().toString().padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

export default function TmuxBar() {
  const [now, setNow] = useState<Date>(new Date())
  const [uptime, setUptime] = useState(1234) // minutes
  const [cpu, setCpu] = useState(3.2)
  const [mem, setMem] = useState(42)
  const [ping, setPing] = useState(18)

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
      // Blend values to look alive but stable
      setCpu((v) => clamp(randDrift(v, 0.3), 0.5, 22.0))
      setMem((v) => clamp(randDrift(v, 1.0), 20, 85))
      setPing((v) => clamp(randDrift(v, 3), 10, 60))
      setUptime((v) => v + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const uptimeStr = `${Math.floor(uptime / 60)}h ${(uptime % 60).toString().padStart(2, "0")}m`

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] h-7",
        "bg-black/70 text-green-400 border-b border-green-700/40",
        "px-3 flex items-center justify-between",
        fontMono.className
      )}
      aria-label="tmux status bar"
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="text-green-500">shinni@lab</span>
        <span className="text-green-600">/home</span>
        <span className="text-green-600">(tmux)</span>
        <span className="hidden md:inline text-green-600">status: attached</span>
      </div>
      <div className="flex items-center gap-4 text-xs">
        <span>uptime {uptimeStr}</span>
        <span>cpu {cpu.toFixed(1)}%</span>
        <span>mem {mem}%</span>
        <span>ping {Math.round(ping)}ms</span>
        <span className="text-green-500">{formatTime(now)}</span>
      </div>
    </div>
  )
}

function randDrift(value: number, range: number) {
  return value + (Math.random() * 2 - 1) * range
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

