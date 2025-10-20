"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { fontMono } from "@/app/fonts"
import AboutPane from "./about-pane"
import LabSection from "./lab-section"
import ProjectsPane from "./projects-pane"
import ContactPane from "./contact-pane"
import { Github, Mail } from "lucide-react"
import GridBackground from "./grid-background"

type Pane = "about" | "lab" | "projects" | "contact"
type Mode = "tech" | "plain"

export default function Workspace() {
  const [pane, setPane] = useState<Pane>("about")
  const [mode, setMode] = useState<Mode>('tech')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") setPane("about")
      if (e.key === "2") setPane("lab")
      if (e.key === "3") setPane("projects")
      if (e.key === "4") setPane("contact")
      if (e.key.toLowerCase() === 't') setMode((m) => (m === 'tech' ? 'plain' : 'tech'))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    // Load saved mode after mount to avoid SSR/client mismatch
    try {
      const saved = localStorage.getItem('mode') as Mode | null
      if (saved) setMode(saved)
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('mode', mode) } catch {}
  }, [mode])

  const paneTitle = useMemo(() => {
    switch (pane) {
      case 'about': return 'About'
      case 'lab': return 'Lab'
      case 'projects': return 'Projects'
      case 'contact': return 'Contact'
    }
  }, [pane])

  return (
    <div className="relative container mx-auto px-4 pt-28 pb-10 min-h-screen">
      <GridBackground />
      {/* Workspace header */}
      <div className={cn(
        "mb-6 rounded-md border bg-background/70 backdrop-blur",
        "flex items-center justify-between px-3 h-12",
        fontMono.className
      )}>
        <div className="flex items-center gap-2 text-sm">
          <Tab label="About" active={pane === "about"} onClick={() => setPane("about")} hotkey="1" />
          <Tab label="Lab" active={pane === "lab"} onClick={() => setPane("lab")} hotkey="2" />
          <Tab label="Projects" active={pane === "projects"} onClick={() => setPane("projects")} hotkey="3" />
          <Tab label="Contact" active={pane === "contact"} onClick={() => setPane("contact")} hotkey="4" />
          <div className="ml-3 flex items-center gap-2 text-xs">
            <ModeToggle mode={mode} setMode={setMode} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>servers: <span className="text-foreground">1</span></span>
          <span>shell: <span className="text-foreground">fav: fish • daily: zsh (compat)</span></span>
          <span>distro: <span className="text-foreground">fav: Arch • current: Debian Sid</span></span>
          <a href="https://github.com/ShinniUwU" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
          <a href="mailto:shinni@tutamail.com" className="underline" aria-label="Email">Email me → shinni@tutamail.com</a>
        </div>
      </div>

      {/* Pane body */}
      <div className="relative overflow-hidden rounded-md border shadow-[0_0_30px_-20px_theme(colors.primary.DEFAULT)]">
        <div className={cn("px-4 py-2 border-b bg-background/80", fontMono.className)}>
          <span className="text-sm">{paneTitle} {mode === 'tech' ? '▌' : '|'}</span>
        </div>
        <Scanlines />
        <div className="relative p-4 md:p-6">
          {pane === "about" && <AboutPane mode={mode} />}
          {pane === "lab" && <LabSection mode={mode} />}
          {pane === "projects" && <ProjectsPane mode={mode} />}
          {pane === "contact" && <ContactPane />}
          <div className="mt-6 text-xs text-muted-foreground">
            Not a sysadmin? No problem. Switch to Plain English to see what these tools do for real users and teams.
          </div>
        </div>
      </div>
    </div>
  )
}

function Tab({ label, active, onClick, hotkey }: { label: string; active: boolean; onClick: () => void; hotkey?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-sm border transition-colors",
        active ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent hover:text-accent-foreground border-border"
      )}
    >
      {label} {hotkey && <span className="opacity-60">[{hotkey}]</span>}
    </button>
  )
}

function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:100%_3px]"
    />
  )
}

function ModeToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="inline-flex rounded-sm border overflow-hidden">
      <button
        className={cn("px-2 py-1 text-xs", mode === 'tech' ? "bg-primary text-primary-foreground" : "hover:bg-accent")}
        onClick={() => setMode('tech')}
        aria-pressed={mode === 'tech'}
      >
        Tech
      </button>
      <button
        className={cn("px-2 py-1 text-xs border-l", mode === 'plain' ? "bg-primary text-primary-foreground" : "hover:bg-accent")}
        onClick={() => setMode('plain')}
        aria-pressed={mode === 'plain'}
      >
        Plain English
      </button>
    </div>
  )
}
