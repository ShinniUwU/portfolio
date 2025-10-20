"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fontMono } from "@/app/fonts"

const services = [
  { name: "Vaultwarden", type: "Docker", status: "running" },
  { name: "Jellyfin", type: "Docker", status: "running" },
  { name: "qBittorrent", type: "Docker", status: "running" },
  { name: "Prowlarr", type: "Docker", status: "running" },
  { name: "Flaresolverr", type: "Docker", status: "running" },
  { name: "Sonarr", type: "Docker", status: "running" },
  { name: "Radarr", type: "Docker", status: "running" },
  { name: "Minecraft", type: "LXC + Tailscale", status: "running" },
]

export default function LabSection({ mode = 'tech' as 'tech' | 'plain' }: { mode?: 'tech' | 'plain' }) {
  if (mode === 'plain') {
    return (
      <section id="lab" className="py-4">
        <div className="container mx-auto px-0 md:px-0">
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className={`text-lg ${fontMono.className}`}>Lab (Plain English)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div>
                  <span className="font-medium text-foreground">What I run:</span> Vaultwarden (passwords), Jellyfin (media) + qBittorrent / Prowlarr / Sonarr / Radarr / Flaresolverr, and a Minecraft server.
                </div>
                <div>
                  <span className="font-medium text-foreground">How it’s connected:</span> Minecraft uses Tailscale for private mesh VPN access. Services are isolated in Docker and LXCs on a Proxmox host located in the Netherlands.
                </div>
                <div>
                  <span className="font-medium text-foreground">Privacy mindset:</span> My home router runs OpenWrt with AdGuardHome (3 blocklists), banIP, and irqbalance to keep the network fast, private, and clean.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="lab" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-2 ${fontMono.className}`}>My Lab</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Proxmox mini-PC hosting LXCs and Docker containers — no public IP, access via Tailscale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle>Network Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className={`${fontMono.className} text-xs md:text-sm whitespace-pre-wrap leading-6 bg-background/60 p-4 rounded-md border border-border`}>{`
[ Internet ]  (no public IP for the services)
      |
  [ Home: OpenWrt Router ]
    └─ AdGuardHome (3 lists) • banIP • irqbalance
      (used for home privacy/DNS — NOT routing the server below)

[ Remote: Proxmox Mini-PC — Netherlands ]
  ├─ LXCs / Docker
  │   ├─ Vaultwarden
  │   ├─ Jellyfin + qBittorrent + Prowlarr + Flaresolverr + Sonarr + Radarr
  │   └─ (more services)
  └─ Minecraft server  ⇄  access via Tailscale (mesh, no public IP)
`}</pre>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle>Services Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-3 border rounded-md bg-background/60">
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.type}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        <Badge variant="outline" className="text-xs">{s.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Access: Tailscale-only, internal DNS; ports closed externally.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Router privacy/performance strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="bg-card/50"><CardContent className="p-3 text-sm"><span className="font-medium">OpenWrt</span> on router</CardContent></Card>
          <Card className="bg-card/50"><CardContent className="p-3 text-sm"><span className="font-medium">AdGuardHome</span> 3 blocklists</CardContent></Card>
          <Card className="bg-card/50"><CardContent className="p-3 text-sm"><span className="font-medium">banIP</span> + <span className="font-medium">irqbalance</span></CardContent></Card>
        </div>
      </div>
    </section>
  )
}
