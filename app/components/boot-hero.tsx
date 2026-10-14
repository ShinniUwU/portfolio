"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import Terminal from "./terminal"
import BootScreen, { KERNEL_LINES } from "./boot-screen"
import { SCREEN_PX_H, SCREEN_PX_W } from "./screen-size"

// three.js only downloads when the 3D intro is actually going to run
const LaptopScene = dynamic(() => import("./laptop-scene"), { ssr: false })

type Mode = "pending" | "3d" | "static"

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))

function canRun3d(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  if (!window.matchMedia("(min-width: 900px)").matches) return false
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

export default function BootHero() {
  const root = useRef<HTMLElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const [mode, setMode] = useState<Mode>("pending")
  const [stage, setStage] = useState(0)
  const [lines, setLines] = useState(0)
  const [typed, setTyped] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Decides once after hydration. The page is readable either way.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(canRun3d() ? "3d" : "static")
  }, [])

  useEffect(() => {
    if (mode !== "3d") return
    const el = root.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? clamp(-rect.top / span) : 0
      progress.current = p
      el.style.setProperty("--p", p.toFixed(4))
      el.dataset.gone = p > 0.15 ? "1" : "0"

      const next = p < 0.34 ? 0 : p < 0.42 ? 1 : p < 0.52 ? 2 : p < 0.7 ? 3 : p < 0.78 ? 4 : 5
      setStage((s) => (s === next ? s : next))
      const n = Math.floor(clamp((p - 0.52) / 0.17) * KERNEL_LINES.length)
      setLines((l) => (l === n ? l : n))
      const t = Math.round(clamp((p - 0.7) / 0.07) * 10) / 10
      setTyped((v) => (v === t ? v : t))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" })
    io.observe(el)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [mode])

  return (
    <section ref={root} className="boot" id="top" data-mode={mode} aria-label="Introduction">
      <div className="boot__sticky">
        <div className="boot__copy">
          <h1 className="boot__h">
            Shinni keeps Linux <span className="soft">running.</span>
          </h1>
          <p className="boot__p">
            Homelab builder with restore-tested backups, Tailscale-only admin access and alerts that fire only when
            something is actually wrong. Studying HBO-ICT &amp; Infrastructure in Eindhoven.
          </p>
          <div className="boot__actions">
            <a className="btn" href="/Hana_Becheva_CV.pdf" download>
              Download CV
            </a>
            <a className="link" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        {mode === "3d" ? (
          <div className="boot__stage">
            <LaptopScene progress={progress} screenRef={screenRef} spin={stage <= 1} visible={visible} />
            {stage > 0 && (
              <div
                ref={screenRef}
                className="boot__screen"
                style={{ width: SCREEN_PX_W, height: SCREEN_PX_H, pointerEvents: stage === 5 ? "auto" : "none" }}
              >
                <BootScreen stage={stage} lines={lines} typed={typed} />
              </div>
            )}
          </div>
        ) : (
          <div className="boot__card">
            <Terminal />
          </div>
        )}

        {mode === "3d" && (
          <>
            <p className="boot__hint" aria-hidden="true">
              Drag to spin the laptop. Scroll to boot it.
            </p>
            <a className="boot__skip" href="#intro">
              Skip the animation
            </a>
          </>
        )}
      </div>
    </section>
  )
}
