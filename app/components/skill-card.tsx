"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillCardProps {
  title: string
  icon: string
  skills: string[]
}

export default function SkillCard({ title, icon, skills }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur border-primary/20 overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/10 rounded-full blur-xl"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-background/50">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

