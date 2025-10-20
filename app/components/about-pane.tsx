"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fontMono } from "@/app/fonts"

export default function AboutPane({ mode = 'tech' as 'tech' | 'plain' }: { mode?: 'tech' | 'plain' }) {
  if (mode === 'plain') {
    return (
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className={`text-lg ${fontMono.className}`}>About (Plain English)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              I run one home lab server that hosts our password manager, media, and a small Minecraft world for my partner and me.
              I keep things fast, private, and reliable — backups are automated, services are isolated, and everything keeps running even without a public IP.
            </p>
            <p>
              If you need something set up or made more reliable, I’m the person who documents it, monitors it, and keeps it online.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className={`text-lg ${fontMono.className}`}>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className={`${fontMono.className} text-xs md:text-sm whitespace-pre-wrap leading-6 bg-background/60 p-4 rounded-md border border-border`}>{`
fav: fish • daily: zsh (compat)
fav: Arch • current: Debian Sid
`}</pre>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dotfile / shell note */}
      <Card className="bg-card/50 backdrop-blur border-primary/20">
        <CardHeader>
          <CardTitle className={`text-lg ${fontMono.className}`}>~/.shellrc</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={`${fontMono.className} text-xs md:text-sm whitespace-pre-wrap leading-6 bg-background/60 p-4 rounded-md border border-border`}>{`
# favorite vs. reality
FAV_SHELL=fish     # but I run zsh now for compatibility
FAV_DISTRO=arch    # currently on debian sid for practicality
`}</pre>
        </CardContent>
      </Card>

      {/* Capabilities as terminal outputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <TerminalBlock title="Networking" lines={[
          "$ ip a | grep inet -> IPv4/IPv6, routes, DNS",
          "$ nft list ruleset -> firewalls, NAT, port forwards",
          "$ tailscale status -> private mesh access",
        ]} />
        <TerminalBlock title="Containers" lines={[
          "$ docker compose up -d -> Jellyfin + *arr + qBittorrent",
          "$ lxc-ls --fancy -> isolated services",
          "$ vaultwarden up -> secrets, self-hosted",
        ]} />
        <TerminalBlock title="Automation" lines={[
          "$ tmux new -As work -> sessions that survive",
          "$ bash/fish + fzf -> quick tooling",
          "$ systemd units -> managed services",
        ]} />
        <TerminalBlock title="Observability" lines={[
          "$ journalctl -fu <svc> -> live logs",
          "$ btop/htop -> resource watch",
          "$ ncdu/du -> disk sanity",
        ]} />
      </div>

      {/* Distro lineage inline */}
      <Card className="bg-card/50 backdrop-blur border-primary/20">
        <CardHeader>
          <CardTitle className={`text-lg ${fontMono.className}`}>Systems I’ve Lived In</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={`${fontMono.className} text-xs md:text-sm whitespace-pre-wrap leading-6 bg-background/60 p-4 rounded-md border border-border`}>{`
Arch → Nobara/Fedora → Arch → Debian Sid (current) | Laptop: Arch → Void
`}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

function TerminalBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <Card className="bg-card/50 backdrop-blur border-primary/20">
      <CardHeader>
        <CardTitle className={`text-lg ${fontMono.className}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className={`${fontMono.className} text-xs md:text-sm whitespace-pre-wrap leading-6 bg-background/60 p-4 rounded-md border border-border`}>{lines.join("\n")}</pre>
      </CardContent>
    </Card>
  )
}
