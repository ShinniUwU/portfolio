"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fontMono } from "@/app/fonts"

const distros = [
  { name: "Nobara", note: "start", accent: "bg-purple-600" },
  { name: "Fedora", note: "refined", accent: "bg-blue-600" },
  { name: "Debian", note: "current", accent: "bg-red-600" },
  { name: "Arch", note: "mainstay", accent: "bg-cyan-600" },
  { name: "Void", note: "ThinkPad", accent: "bg-emerald-600" },
]

export default function DistroTimeline() {
  return (
    <section id="distros" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-2 ${fontMono.className}`}>Systems I’ve Lived In</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">A quick journey through my Linux environments.</p>
        </motion.div>

        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border" />
              <div className="relative grid grid-cols-5 gap-2">
                {distros.map((d, i) => (
                  <div key={d.name} className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full border-2 border-background ${d.accent}`}></div>
                    <div className={`${fontMono.className} mt-3 text-sm`}>{d.name}</div>
                    <Badge variant="outline" className="mt-1 text-xs">{d.note}</Badge>
                    {i < distros.length - 1 && <div className="sr-only">→</div>}
                  </div>
                ))}
              </div>
            </div>
            <div className={`${fontMono.className} mt-6 text-xs text-muted-foreground p-3 rounded-md border bg-background/60`}>
{`# ascii badges
[Nobara] -> [Fedora] -> [Debian: current] -> [Arch: mainstay] -> [Void: ThinkPad]`}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
