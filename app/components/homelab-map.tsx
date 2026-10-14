"use client"

import { useState } from "react"

/*
 * An illustrative map of the homelab, kept high level on purpose: no addresses, ports or weak spots.
 * Coordinates are percentages of a 100 x 58 board.
 */
type View = "internet" | "tailnet"
type Group = "public" | "admin" | "ops"

type Node = {
  id: string
  label: string
  sub: string
  x: number
  y: number
  group: Group
  views: View[]
  detail: string
}

const NODES: Node[] = [
  {
    id: "internet",
    label: "Internet",
    sub: "public traffic",
    x: 8,
    y: 26,
    group: "public",
    views: ["internet"],
    detail: "Public traffic. Only web, mail and game ports are forwarded to the lab. Everything else is dropped.",
  },
  {
    id: "router",
    label: "Router",
    sub: "OpenWrt",
    x: 28,
    y: 26,
    group: "public",
    views: ["internet"],
    detail:
      "OpenWrt router with AdGuard Home for DNS, a firewall, and traffic shaping. Network changes go through a rollback timer, so a bad change undoes itself.",
  },
  {
    id: "caddy",
    label: "Caddy",
    sub: "reverse proxy",
    x: 47,
    y: 15,
    group: "public",
    views: ["internet"],
    detail: "Caddy sits in front of the web services and handles HTTPS certificates automatically.",
  },
  {
    id: "nextcloud",
    label: "Nextcloud",
    sub: "files + office",
    x: 68,
    y: 14,
    group: "public",
    views: ["internet"],
    detail: "Nextcloud with Collabora Office and a whiteboard backend.",
  },
  {
    id: "vaultwarden",
    label: "Vaultwarden",
    sub: "passwords",
    x: 88,
    y: 14,
    group: "public",
    views: ["internet"],
    detail: "A self-hosted password manager.",
  },
  {
    id: "jellyfin",
    label: "Jellyfin",
    sub: "media",
    x: 68,
    y: 26,
    group: "public",
    views: ["internet"],
    detail: "Jellyfin with hardware transcoding, plus the usual media automation stack running in Docker.",
  },
  {
    id: "bots",
    label: "Bots + web apps",
    sub: "Docker",
    x: 88,
    y: 26,
    group: "public",
    views: ["internet"],
    detail: "Discord bots and small web apps, each in its own container.",
  },
  {
    id: "games",
    label: "Game servers",
    sub: "Minecraft, Satisfactory",
    x: 68,
    y: 38,
    group: "public",
    views: ["internet"],
    detail: "Minecraft and Satisfactory servers, each on its own forwarded port and in its own container.",
  },
  {
    id: "mail",
    label: "Mailcow",
    sub: "email",
    x: 88,
    y: 38,
    group: "public",
    views: ["internet"],
    detail: "Self-hosted email with Mailcow.",
  },
  {
    id: "tailnet",
    label: "Tailscale",
    sub: "my devices",
    x: 8,
    y: 44,
    group: "admin",
    views: ["tailnet"],
    detail: "My devices on a private Tailscale network. This is the only way to the admin side of the host.",
  },
  {
    id: "admin",
    label: "Admin",
    sub: "Proxmox UI + SSH",
    x: 47,
    y: 40,
    group: "admin",
    views: ["tailnet"],
    detail:
      "The Proxmox web UI and SSH. Reachable only over Tailscale. The Proxmox firewall enforces it, and containers cannot reach these ports either.",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    sub: "Beszel + Uptime Kuma",
    x: 68,
    y: 50,
    group: "ops",
    views: ["internet", "tailnet"],
    detail:
      "Beszel agents report to a hub on the LAN, and Uptime Kuma checks the services. Moving the agents to the LAN hub ended the nightly false alarms.",
  },
  {
    id: "backups",
    label: "Backups",
    sub: "Proxmox Backup",
    x: 88,
    y: 50,
    group: "ops",
    views: ["internet", "tailnet"],
    detail: "Scheduled snapshots to a separate disk, with restore tests, because a backup only counts once it has been restored.",
  },
  {
    id: "alerts",
    label: "Alerts",
    sub: "ntfy + Discord",
    x: 47,
    y: 53,
    group: "ops",
    views: ["internet", "tailnet"],
    detail: "Alerts go to a self-hosted ntfy server and a Discord webhook, tuned so a notification means something.",
  },
]

const EDGES: [string, string, View | "both"][] = [
  ["internet", "router", "internet"],
  ["router", "caddy", "internet"],
  ["caddy", "nextcloud", "internet"],
  ["caddy", "vaultwarden", "internet"],
  ["caddy", "jellyfin", "internet"],
  ["caddy", "bots", "internet"],
  ["router", "games", "internet"],
  ["router", "mail", "internet"],
  ["tailnet", "admin", "tailnet"],
  ["monitoring", "alerts", "both"],
]

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

const path = (a: Node, b: Node) => {
  const mx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
}

const GROUPS: { id: Group; title: string }[] = [
  { id: "public", title: "Public path" },
  { id: "admin", title: "Admin path" },
  { id: "ops", title: "Keeping it healthy" },
]

export default function HomelabMap() {
  const [view, setView] = useState<View>("internet")
  const [active, setActive] = useState("admin")
  const current = byId[active]

  const sub = (n: Node) => (n.id === "admin" ? (view === "tailnet" ? "reachable" : "no route from here") : n.sub)

  const button = (n: Node, cls: string, style?: React.CSSProperties) => (
    <button
      key={n.id}
      type="button"
      className={`${cls}${active === n.id ? " is-active" : ""}${n.views.includes(view) ? "" : " is-dim"}`}
      style={style}
      onMouseEnter={() => setActive(n.id)}
      onFocus={() => setActive(n.id)}
      onClick={() => setActive(n.id)}
      aria-pressed={active === n.id}
    >
      <span className="node__label">{n.label}</span>
      <span className="node__sub">{sub(n)}</span>
    </button>
  )

  return (
    <div className="lab">
      <div className="lab__switch" role="group" aria-label="Where the connection comes from">
        <button type="button" aria-pressed={view === "internet"} onClick={() => setView("internet")}>
          From the internet
        </button>
        <button
          type="button"
          aria-pressed={view === "tailnet"}
          onClick={() => {
            setView("tailnet")
            setActive("admin")
          }}
        >
          From my tailnet
        </button>
      </div>

      {/* desktop: a board with lines */}
      <div className="lab__board">
        <div className="lab__host" aria-hidden="true">
          <span>Proxmox host</span>
        </div>
        <svg className="lab__lines" viewBox="0 0 100 58" preserveAspectRatio="none" aria-hidden="true">
          {EDGES.map(([a, b, v]) => {
            const on = v === "both" || v === view
            return (
              <path
                key={`${a}-${b}`}
                d={path(byId[a], byId[b])}
                className={`edge${on ? " edge--on" : " edge--off"}${v === "both" ? " edge--ops" : ""}`}
              />
            )
          })}
        </svg>
        {NODES.map((n) => button(n, "node", { left: `${n.x}%`, top: `${(n.y / 58) * 100}%` }))}
      </div>

      {/* phones and tablets: the same parts as grouped lists */}
      <div className="lab__lists">
        {GROUPS.map((g) => (
          <div key={g.id}>
            <h3>{g.title}</h3>
            <ul>
              {NODES.filter((n) => n.group === g.id).map((n) => (
                <li key={n.id}>{button(n, "node node--list")}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="lab__detail" aria-live="polite">
        <strong>{current.label}.</strong> {current.detail}
      </p>
      <p className="lab__note">Illustrative map of how it is set up, not a live scan.</p>
    </div>
  )
}
