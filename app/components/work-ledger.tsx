"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Path = { name: string; open: boolean }

const PATHS: Path[] = [
  { name: "Proxmox UI", open: false },
  { name: "SSH", open: false },
  { name: "Backup server", open: false },
]

function ReachDemo() {
  const [tailnet, setTailnet] = useState(false)

  return (
    <div className="reach">
      <p className="reach__ask">Try reaching the admin side of the homelab</p>
      <div className="reach__switch" role="group" aria-label="Where the request comes from">
        <button type="button" aria-pressed={!tailnet} onClick={() => setTailnet(false)}>
          From the internet
        </button>
        <button type="button" aria-pressed={tailnet} onClick={() => setTailnet(true)}>
          From my tailnet
        </button>
      </div>
      <ul className="reach__list" aria-live="polite">
        {PATHS.map((p) => (
          <li key={p.name}>
            <span>{p.name}</span>
            <span className="reach__val">{tailnet ? "reachable" : "no route"}</span>
          </li>
        ))}
      </ul>
      <p className="reach__note">A sketch of how the setup is meant to behave, not a live scan.</p>
    </div>
  )
}

const PROJECTS = [
  {
    id: "pbs",
    name: "Proxmox Backup Fabric",
    kind: "Homelab backups",
    status: "Production",
    text: "Segmented homelab backups with secure remote access. A Proxmox Backup Server workflow with scheduled snapshots, Tailscale-only admin paths, and IaC-managed restore tests, so a backup only counts once it has been restored.",
    made: "Proxmox, PBS, Tailscale and IaC",
    visual: <ReachDemo />,
  },
  {
    id: "solen",
    name: "SOLEN",
    kind: "Server utility framework",
    status: "Active",
    text: "A policy-driven guardian of the machine. SOLEN unifies backups, health checks and maintenance into one consistent runner built for secure automation.",
    made: "TypeScript, Node, backups and health checks",
    href: "https://github.com/ShinniUwU/SOLEN",
    visual: (
      <Image src="/solen_logo.webp" alt="SOLEN: a dragon above a castle" width={600} height={600} className="frame__img" />
    ),
  },
  {
    id: "telemetry",
    name: "Monitoring & Alerting",
    kind: "Monitoring and alerts",
    status: "Production",
    text: "Server metrics from Beszel agents, uptime checks from Uptime Kuma, and alerts through a self-hosted ntfy server and a Discord webhook. Tuned until a notification means something: after nightly false alarms from a reconnecting 5G line, the agents now report to a hub on the LAN instead of through Cloudflare.",
    made: "Beszel, Uptime Kuma, ntfy and a Discord webhook",
    visual: (
      <ul className="flow">
        <li>
          <span>Beszel</span>
          <span>server metrics</span>
        </li>
        <li>
          <span>Uptime Kuma</span>
          <span>uptime checks</span>
        </li>
        <li>
          <span>ntfy</span>
          <span>self-hosted alerts</span>
        </li>
        <li>
          <span>Discord</span>
          <span>webhook</span>
        </li>
      </ul>
    ),
  },
]

export default function WorkLedger() {
  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Hides the side-by-side details only once script is running, so without
    // script every project keeps its full text stacked under its row.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true)
  }, [])

  return (
    <ul className="ledger" data-ready={ready ? "" : undefined}>
      {PROJECTS.map((p, i) => (
        <li
          key={p.id}
          className={`project${i === active ? " is-active" : ""}`}
          onMouseEnter={() => setActive(i)}
        >
          <button
            type="button"
            className="row"
            aria-controls={`detail-${p.id}`}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span className="row__name">{p.name}</span>
            <span className="row__kind">{p.kind}</span>
            <span className="row__val">{p.status}</span>
          </button>
          <div className="detail" id={`detail-${p.id}`}>
            <div className="frame">{p.visual}</div>
            <p className="detail__text">{p.text}</p>
            <p className="detail__made">Built with {p.made}.</p>
            {p.href && (
              <a className="link" href={p.href} target="_blank" rel="noopener noreferrer">
                View the repository
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
