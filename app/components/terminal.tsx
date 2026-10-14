"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

const EMAIL = "shinni@tutamail.com"
const GITHUB = "https://github.com/ShinniUwU"
const LINKEDIN = "https://www.linkedin.com/in/hana-becheva-a7062622b/"

type Line = { id: number; input?: string; out?: ReactNode }

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {label}
  </a>
)

const rows = (items: [string, ReactNode][]) => (
  <div className="term__rows">
    {items.map(([a, b]) => (
      <div key={a}>
        <span className="term__key">{a}</span>
        <span>{b}</span>
      </div>
    ))}
  </div>
)

const SECTIONS: Record<string, string> = {
  top: "top",
  lab: "lab",
  projects: "work",
  work: "work",
  background: "record",
  stack: "record",
  about: "about",
  contact: "contact",
}

function scrollToSection(name: string) {
  const id = SECTIONS[name]
  if (!id) return false
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  return true
}

const COMMANDS: Record<string, { help: string; run: (args: string[]) => ReactNode }> = {
  help: {
    help: "list commands",
    run: () =>
      rows([
        ["whoami", "who is this"],
        ["about", "the short version"],
        ["projects", "what I run and build"],
        ["stack", "systems, services, tools"],
        ["experience", "work and school"],
        ["contact", "how to reach me"],
        ["neofetch", "system info, portfolio edition"],
        ["goto <name>", "scroll the page: lab, projects, background, about, contact"],
        ["cv", "download my CV"],
        ["clear", "clear the screen (or Ctrl+L)"],
      ]),
  },
  whoami: {
    help: "who is this",
    run: () => "shinni (Hana Becheva). Linux sysadmin in the making, homelab builder, studying HBO-ICT & Infrastructure at Fontys.",
  },
  about: {
    help: "the short version",
    run: () => (
      <>
        <p>System administrator with a deep love for Linux and open source. Jumped straight into Arch, no regrets.</p>
        <p>Customer support was the start, infrastructure is the direction. The homelab is how I get there.</p>
        <p>Mostly: I mess with Linux until it just works. Then I break it again.</p>
      </>
    ),
  },
  projects: {
    help: "what I run and build",
    run: () => (
      <>
        {rows([
          ["pbs-fabric", "Proxmox Backup Fabric. Restore-tested backups, Tailscale-only admin. Production"],
          ["solen", "Policy-driven server utility framework in TypeScript. Active"],
          ["monitoring", "Beszel, Uptime Kuma, self-hosted ntfy and a Discord webhook. Production"],
        ])}
        <p className="term__hint">
          Type <code>goto projects</code> for the full write-ups. SOLEN: {ext("https://github.com/ShinniUwU/SOLEN", "github.com/ShinniUwU/SOLEN")}
        </p>
      </>
    ),
  },
  stack: {
    help: "systems, services, tools",
    run: () =>
      rows([
        ["systems", "Fedora (workstation), Debian (server), NixOS (testing), Arch, Ubuntu"],
        ["services", "Minecraft servers, Discord bots, Docker, WireGuard, Jellyfin"],
        ["tools", "fish, Tailscale, Proxmox Backup, Beszel, Uptime Kuma, ntfy, Docker Compose"],
      ]),
  },
  experience: {
    help: "work and school",
    run: () =>
      rows([
        ["2024-now", "LunarLabs, volunteer software engineer (infra and CI, remote)"],
        ["2025-2026", "Alorica, customer support (Sofia)"],
        ["2026-2030", "Fontys University of Applied Sciences, HBO-ICT & Infrastructure (Eindhoven)"],
        ["2019-2024", "Vanya Voynova 132 SU, Hardware and Software Science"],
      ]),
  },
  contact: {
    help: "how to reach me",
    run: () =>
      rows([
        ["email", ext(`mailto:${EMAIL}`, EMAIL)],
        ["github", ext(GITHUB, GITHUB.replace("https://", ""))],
        ["linkedin", ext(LINKEDIN, "Hana Becheva")],
      ]),
  },
  neofetch: {
    help: "system info",
    run: () =>
      rows([
        ["user", "shinni@portfolio"],
        ["role", "Linux sysadmin (in training)"],
        ["shell", "fish (preferred), zsh (daily)"],
        ["editor", "VS Code, Neovim, Nano"],
        ["distros", "Arch, Fedora, Debian, NixOS"],
        ["location", "Heerlen, Netherlands (studying in Eindhoven)"],
        ["uptime", "since the first Arch install"],
      ]),
  },
  ls: { help: "list files", run: () => "about  projects  stack  experience  contact  cv.pdf" },
}

const NAMES = [...Object.keys(COMMANDS), "goto", "cv", "clear", "sudo", "cat", "history", "exit"]

function execute(raw: string, ctx: { clear: () => void; history: string[] }): ReactNode | null {
  const [cmd, ...args] = raw.trim().split(/\s+/)
  if (!cmd) return null
  if (cmd === "clear") {
    ctx.clear()
    return null
  }
  if (cmd === "cv") {
    const a = document.createElement("a")
    a.href = "/Hana_Becheva_CV.pdf"
    a.download = ""
    a.click()
    return "Downloading Hana_Becheva_CV.pdf"
  }
  if (cmd === "goto") {
    if (args[0] && scrollToSection(args[0])) return `Scrolling to ${args[0]}…`
    return "usage: goto <lab|projects|background|about|contact>"
  }
  if (cmd === "cat") {
    if (args[0] === "cv.pdf") return "cv.pdf: binary file. Run `cv` to download it."
    const target = args[0]?.replace(/\.txt$/, "")
    if (target && COMMANDS[target]) return COMMANDS[target].run([])
    return `cat: ${args[0] ?? ""}: No such file or directory`
  }
  if (cmd === "sudo") return "shinni is not in the sudoers file. This incident will be reported."
  if (cmd === "rm") return "Nice try. Everything here is backed up and restore-tested."
  if (cmd === "history") return ctx.history.length ? ctx.history.map((h, i) => `${i + 1}  ${h}`).join("\n") : "(empty)"
  if (cmd === "exit") return "There is no exit. Scroll down instead."
  const c = COMMANDS[cmd]
  if (c) return c.run(args)
  return `fish: Unknown command: ${cmd}. Try help.`
}

const CHIPS = ["help", "about", "projects", "stack", "contact"]

export default function Terminal({ onReady }: { onReady?: () => void }) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const idRef = useRef(0)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = (l: Omit<Line, "id">) => setLines((prev) => [...prev, { ...l, id: idRef.current++ }])

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    setHistory((h) => [...h, text])
    setCursor(-1)
    const out = execute(text, { clear: () => setLines([]), history })
    if (text === "clear") return
    push({ input: text, out: out ?? undefined })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value)
      setValue("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(history.length - 1, cursor + 1)
      if (next >= 0) {
        setCursor(next)
        setValue(history[history.length - 1 - next])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = cursor - 1
      setCursor(next)
      setValue(next >= 0 ? history[history.length - 1 - next] : "")
    } else if (e.key === "Tab") {
      e.preventDefault()
      const hit = NAMES.filter((n) => n.startsWith(value))
      if (hit.length === 1) setValue(hit[0] + " ")
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="term__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>shinni@portfolio: ~</span>
      </div>
      <div className="term__log" ref={logRef} role="log" aria-live="polite" aria-label="Terminal output">
        <p className="term__dim">shinni.dev, a portfolio you can type into. Type help, or tap a command:</p>
        <div className="term__chips">
          {CHIPS.map((c) => (
            <button key={c} type="button" onClick={() => run(c)}>
              {c}
            </button>
          ))}
        </div>
        {lines.map((l) => (
          <div key={l.id} className="term__entry">
            <div className="term__cmd">
              <span className="term__prompt">~ $</span> {l.input}
            </div>
            {l.out != null && <div className="term__out">{l.out}</div>}
          </div>
        ))}
      </div>
      <label className="term__line">
        <span className="term__prompt" aria-hidden="true">
          ~ $
        </span>
        <span className="sr-only">Terminal command</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="type a command…"
        />
      </label>
    </div>
  )
}
