"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  inProgress?: boolean
}

export default function ProjectCard({ title, description, tags, image, inProgress = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden bg-card/50 backdrop-blur border-primary/20">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {inProgress && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                In Progress
              </Badge>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

