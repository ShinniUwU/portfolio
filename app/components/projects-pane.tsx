"use client"

import ProjectStory from "./project-story"

export default function ProjectsPane({ mode = 'tech' as 'tech' | 'plain' }: { mode?: 'tech' | 'plain' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectStory
        title="Home Lab on Debian (no public IP)"
        problem={mode === 'plain' ?
          "I host essential services privately: passwords, media, and a small Minecraft world — without exposing my network."
          : "Self-host services (media, secrets, game server) safely without exposing the network."}
        solution={mode === 'plain' ?
          "A mini-PC running Debian with containers (Docker/LXC). Access is private via Tailscale."
          : "Proxmox mini-PC with LXCs + Docker. Access via Tailscale only. AdGuardHome + banIP on OpenWrt."}
        impact={mode === 'plain' ?
          "Consistent uptime with minimal maintenance; safe access from anywhere."
          : "Stable remote access, ad/tracker reduction, and fewer incidents."}
        stack={["Proxmox", "Docker", "LXC", "OpenWrt", "Tailscale", "AdGuardHome", "banIP"]}
        metrics={["99.9% uptime", "-40% CPU spikes", "0 exposed ports"]}
        details={{
          actions: [
            "Hardened services with network isolation",
            "Private access via Tailscale"
          ],
          infra: ["Proxmox", "Docker", "LXC", "OpenWrt", "Tailscale"],
        }}
      />
      <ProjectStory
        title="Minecraft Server for Friends"
        problem={mode === 'plain' ?
          "We wanted a simple, reliable way to play together without fiddling with ports."
          : "Run a lightweight, reliable Minecraft server without public IP or port forwarding."}
        solution={mode === 'plain' ?
          "The server uses a private VPN (Tailscale) and runs in an isolated environment, with backups."
          : "LXC + Tailscale tunnel; backup scripts with systemd timers."}
        impact={mode === 'plain' ?
          "No downtime during sessions; updates don’t interrupt play."
          : "Zero downtime during sessions; painless updates and maintenance."}
        stack={["Debian", "LXC", "Tailscale", "systemd", "bash"]}
        metrics={["Zero downtime during sessions", "<2 min updates"]}
        details={{
          actions: ["Automated backups", "Health checks"],
          infra: ["Debian", "LXC", "Tailscale"],
        }}
      />
      <ProjectStory
        title="Media Stack"
        problem={mode === 'plain' ?
          "Keep media organized and accessible across devices."
          : "Centrally manage downloads and media libraries across devices."}
        solution={mode === 'plain' ?
          "Apps run together in a container stack with sensible defaults and quick rollback."
          : "Docker-compose for Jellyfin, qBittorrent, Sonarr, Radarr, Prowlarr, Flaresolverr."}
        impact={mode === 'plain' ?
          "Automated pipeline with predictable resource usage."
          : "Automated pipeline with predictable resource footprint and easy rollback."}
        stack={["Docker", "Compose", "Jellyfin", "*arr", "Flaresolverr"]}
        metrics={["<1 min rollbacks", "Predictable resources"]}
        details={{
          actions: ["Container health checks", "Volumes with backups"],
          infra: ["Docker", "Compose"],
        }}
      />
      <ProjectStory
        title="IaC + Containers Lab (WIP)"
        problem={mode === 'plain' ? "Manual setup is slow and inconsistent." : "Drift and manual setup across machines."}
        solution={mode === 'plain' ? "Move toward fully scripted/declarative setup." : "Moving toward declarative provisioning for reproducible servers."}
        impact={mode === 'plain' ? "Faster rebuilds and fewer surprises." : "Fast rebuilds; consistent services across environments."}
        stack={["IaC", "Containers"]}
        metrics={["Repeatable builds", "<10 min provisioning (goal)"]}
        details={{ actions: ["Prototype IaC"], infra: ["Containers"] }}
      />
    </div>
  )
}
