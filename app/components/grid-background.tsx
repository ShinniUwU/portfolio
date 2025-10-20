"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let raf = 0
    let mouseX = 0, mouseY = 0

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(window.innerHeight, 600)
    }
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5
      mouseY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    onResize()

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      const tiltX = mouseX * 8
      const tiltY = mouseY * 8
      ctx.translate(tiltX, tiltY)
      const spacing = 40
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.08)'
      ctx.lineWidth = 1
      for (let x = 0; x < width + spacing; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height + spacing; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.restore()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [reduce])

  if (reduce) return null

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" />
}

