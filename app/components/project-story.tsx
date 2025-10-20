"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectStoryProps {
  title: string
  problem: string
  solution: string
  impact: string
  stack?: string[]
  link?: string
  metrics?: string[]
  details?: {
    actions?: string[]
    infra?: string[]
  }
}

export default function ProjectStory({ title, problem, solution, impact, stack = [], link, metrics = [], details = {} }: ProjectStoryProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setOpen(true)}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>{title}</span>
            <span className="flex gap-2">
              {stack?.slice(0,2).map((s) => (
                <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
              ))}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <span className="font-semibold">Problem:</span> <span className="text-muted-foreground">{problem}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">Solution:</span> <span className="text-muted-foreground">{solution}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">Impact:</span> <span className="text-muted-foreground">{impact}</span>
          </div>
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {stack.map((s) => (
                <Badge key={s} variant="outline" className="text-xs">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="problem">
            <TabsList>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="infra">Infra</TabsTrigger>
            </TabsList>
            <TabsContent value="problem" className="text-sm text-muted-foreground">
              {problem}
            </TabsContent>
            <TabsContent value="actions" className="text-sm text-muted-foreground">
              <ul className="list-disc ml-6">
                {(details?.actions || [solution]).map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="impact" className="text-sm text-muted-foreground">
              <div className="space-y-2">
                <div>{impact}</div>
                <div className="flex flex-wrap gap-2">
                  {(metrics || []).map((m) => (
                    <Badge key={m} variant="secondary" className="text-[10px]">{m}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="infra" className="text-sm text-muted-foreground">
              <div className="flex flex-wrap gap-2">
                {(details?.infra || stack).map((m) => (
                  <Badge key={m} variant="outline" className="text-[10px]">{m}</Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
