"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Terminal,
  Server,
  Code,
  Database,
  Shield,
  Zap,
  Globe,
  Menu,
  X
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import Particles from "./components/particles"
import CommandPalette from "./components/command-palette"
import { fontMono } from "@/app/fonts"

export default function Home() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const shouldReduceMotion = useReducedMotion()
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Compute dynamic year on client to avoid SSR/client mismatch
    setYear(new Date().getFullYear())
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <CommandPalette />
        {/* Navigation skeleton */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className={`text-xl font-bold ${fontMono.className}`}>
                <span className="gradient-text">shinni</span>@portfolio
              </div>
              <nav className="hidden md:flex space-x-8" aria-label="Primary">
                <a href="#hero" className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Home
                </a>
                <a href="#about" className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  About
                </a>
                <a href="#skills" className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Skills
                </a>
                <a href="#projects" className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Projects
                </a>
                <a href="#contact" className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  className="hover:bg-primary/10"
                >
                  <Moon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-primary/10"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        {/* Loading skeleton */}
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
              <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CommandPalette />

      {/* Navigation */}
      <header suppressHydrationWarning className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className={`text-xl font-bold ${fontMono.className}`}>
              <span className="gradient-text">shinni</span>@portfolio
            </div>
            <nav className="hidden md:flex space-x-8" aria-label="Primary">
              <button onClick={() => scrollToSection('hero')} className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                About
              </button>
              <button onClick={() => scrollToSection('skills')} className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                Skills
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                Contact
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="hover:bg-primary/10"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden hover:bg-primary/10"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <nav className="py-4 space-y-2" aria-label="Mobile navigation">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors rounded-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors rounded-sm"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors rounded-sm"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors rounded-sm"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-primary hover:bg-primary/10 transition-colors rounded-sm"
                >
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" suppressHydrationWarning className="relative min-h-screen flex items-center justify-center pt-24">
        <Particles className="absolute inset-0 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            // Ensure hero is visible immediately; fade controlled only by scroll
            transition={{ duration: 0 }}
            style={shouldReduceMotion ? undefined : { opacity: heroOpacity }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Terminal className="h-8 w-8 text-primary" />
                  <span className={`text-lg ${fontMono.className} text-muted-foreground`}>System Administrator</span>
                </motion.div>

                <motion.h1
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${fontMono.className}`}
                >
                  <span className="gradient-text">Shinni</span>
                </motion.h1>

                <motion.p
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed"
                >
                  Linux sysadmin focused on <span className="text-primary font-semibold">performance</span>, <span className="text-primary font-semibold">uptime</span>, and <span className="text-primary font-semibold">secure automation</span>
                </motion.p>
              </div>

              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="/Radoslav_Bechev_Resume.txt" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="border-primary/50 hover:bg-primary/10"
                >
                  Contact Me
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">1</div>
                    <div className="text-sm text-muted-foreground">Server</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Distros</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Avatar & Terminal */}
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="relative">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-primary/50 terminal-glow">
                  <Image
                    src="/69644134.jpeg"
                    alt="Shinni avatar"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              <Card className="glass-card w-full max-w-md">
                <CardContent className="p-4">
                  <div className={`${fontMono.className} text-sm space-y-2`}>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">$</span>
                      <span className="text-foreground">whoami</span>
                    </div>
                    <div className="text-muted-foreground ml-4">shinni</div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">$</span>
                      <span className="text-foreground">cat /etc/motd</span>
                    </div>
                    <div className="text-muted-foreground ml-4">
                      Messing with Linux until it just works.<br />
                      Then breaking it again...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
          transition={shouldReduceMotion ? undefined : { repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollToSection('about')}
            aria-label="Scroll down"
            className="hover:bg-primary/10"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${fontMono.className}`}>
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Linux enthusiast with a passion for making systems work efficiently and reliably
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-primary" />
                    My Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a system administrator with a deep love for Linux and open-source technologies.
                    I jumped straight into Arch—no regrets—and now focus on performance, troubleshooting,
                    and system stability.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When I'm not managing servers or troubleshooting issues, I'm exploring new Linux distributions,
                    contributing to open-source projects, and continuously expanding my knowledge in system administration.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-primary" />
                    What I Do
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Infrastructure</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Server hardening & configuration</li>
                        <li>• Container orchestration</li>
                        <li>• Network security & firewalls</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Operations</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Performance monitoring & tuning</li>
                        <li>• Automation & scripting</li>
                        <li>• Disaster recovery planning</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Skills & Preferences */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    Terminal Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">$</span>
                        <span className="text-foreground">cat /etc/favorites</span>
                      </div>
                      <div className="text-muted-foreground ml-4 space-y-1">
                        <div>Shell: <span className="text-primary">fish</span> (preferred) • <span className="text-primary">zsh</span> (daily)</div>
                        <div>Distro: <span className="text-primary">Arch</span> (fav) • <span className="text-primary">Debian Sid</span> (current)</div>
                        <div>Editor: <span className="text-primary">VS Code</span> • <span className="text-primary">Neovim</span> • <span className="text-primary">Nano</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold">Linux Expertise</h4>
                        <p className="text-sm text-muted-foreground">Fedora, Arch, Debian, Ubuntu - from desktop to server</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold">System Optimization</h4>
                        <p className="text-sm text-muted-foreground">Performance tuning, kernel optimization, resource management</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold">Automation & Scripting</h4>
                        <p className="text-sm text-muted-foreground">Bash, Fish, systemd, container orchestration</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-primary" />
                    Current Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">$</span>
                      <span className="text-foreground">echo $CURRENT_FOCUS</span>
                    </div>
                    <div className="text-muted-foreground ml-4 mt-2">
                      Expanding knowledge in containerization and infrastructure as code
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${fontMono.className}`}>
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technical skills and tools I use to build and maintain robust systems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    Operating Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fedora (ThinkPad)</span>
                      <Badge variant="secondary" className="text-xs">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nobara (Main PC)</span>
                      <Badge variant="secondary" className="text-xs">Gaming</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Debian (Server)</span>
                      <Badge variant="secondary" className="text-xs">Production</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Arch Linux</span>
                      <Badge variant="secondary" className="text-xs">Expert</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ubuntu</span>
                      <Badge variant="secondary" className="text-xs">Familiar</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Server className="h-6 w-6 text-primary" />
                    Server Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Game Servers</span>
                      <Badge variant="secondary" className="text-xs">Minecraft</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Discord Bots</span>
                      <Badge variant="secondary" className="text-xs">Python</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Self-Hosted Services</span>
                      <Badge variant="secondary" className="text-xs">Docker</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ZeroTier Tunneling</span>
                      <Badge variant="secondary" className="text-xs">VPN</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Media Stack</span>
                      <Badge variant="secondary" className="text-xs">Jellyfin</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-primary" />
                    Tools & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fish Shell</span>
                      <Badge variant="secondary" className="text-xs">Preferred</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">tmux</span>
                      <Badge variant="secondary" className="text-xs">Sessions</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">fzf</span>
                      <Badge variant="secondary" className="text-xs">Fuzzy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">htop/btop</span>
                      <Badge variant="secondary" className="text-xs">Monitor</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ncdu</span>
                      <Badge variant="secondary" className="text-xs">Disk</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Technical Proficiencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  Technical Proficiencies
                </CardTitle>
                <CardDescription>
                  Core competencies and areas of expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Linux Administration",
                    "Server Optimization",
                    "Troubleshooting",
                    "Network Configuration",
                    "Monitoring Tools",
                    "Performance Tuning",
                    "User Management",
                    "Service Configuration",
                    "Firewall Setup",
                    "Package Management",
                    "Container Orchestration",
                    "Infrastructure as Code",
                    "System Hardening",
                    "Backup & Recovery",
                    "Security Auditing"
                  ].map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm py-2 px-3 hover:bg-primary/10 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${fontMono.className}`}>
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world infrastructure projects and automation solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/minecraft.png"
                    alt="Linux Infrastructure"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Linux Infrastructure Stack
                  </CardTitle>
                  <CardDescription>
                    High-performance server infrastructure with automated deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Built a robust Linux infrastructure stack featuring automated deployments,
                    container orchestration, monitoring, and security hardening with 99.9% uptime.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Debian", "Docker", "systemd", "Monitoring"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Status: <span className="text-primary">Production</span></span>
                      <span>Uptime: 99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/MCSManager.png"
                    alt="Automation Scripts"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    System Automation Suite
                  </CardTitle>
                  <CardDescription>
                    Comprehensive automation scripts for Linux system management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Developed a suite of automation scripts for system monitoring, backup management,
                    and deployment automation, reducing manual tasks by 80%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Bash", "Python", "systemd", "Cron"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Status: <span className="text-primary">Active</span></span>
                      <span>Scripts: 15+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/dockerkub.webp"
                    alt="Security Hardening"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      Completed
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Hardening Framework
                  </CardTitle>
                  <CardDescription>
                    Comprehensive Linux security hardening and monitoring solution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Implemented a complete security hardening framework including firewall configuration,
                    intrusion detection, log monitoring, and automated security updates.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["iptables", "fail2ban", "auditd", "SSH"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Status: <span className="text-green-400">Production</span></span>
                      <span>Security: 100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${fontMono.className}`}>
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your infrastructure needs? Let's connect!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <a
                      href="mailto:shinni@tutamail.com"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors group"
                    >
                      <Mail className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">shinni@tutamail.com</div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/ShinniUwU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors group"
                    >
                      <Github className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-muted-foreground">@ShinniUwU</div>
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/radoslav-borisov-a7062622b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors group"
                    >
                      <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-muted-foreground">Radoslav Bechev</div>
                      </div>
                    </a>

                    <a
                      href="https://shinni.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors group"
                    >
                      <Globe className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="font-medium">Website</div>
                        <div className="text-sm text-muted-foreground">shinni.dev</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Terminal className="h-6 w-6 text-primary" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">$</span>
                        <span className="text-foreground">curl -X POST shinni@tutamail.com</span>
                      </div>
                      <div className="text-muted-foreground ml-4">
                        Ready to discuss your infrastructure needs
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-primary">$</span>
                        <span className="text-foreground">echo "Available for remote work"</span>
                      </div>
                      <div className="text-muted-foreground ml-4">
                        Working from anywhere with stable internet
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    Send a Message
                  </CardTitle>
                  <CardDescription>
                    Drop me a line and I'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const name = (form.elements.namedItem("name") as HTMLInputElement).value
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value
                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value

                    window.location.href = `mailto:shinni@tutamail.com?subject=${encodeURIComponent(
                      "New Contact from " + name,
                    )}&body=${encodeURIComponent("Email: " + email + "\n\n" + message)}`
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
                        placeholder="Tell me about your project or how I can help..."
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className={`text-lg font-bold mb-4 ${fontMono.className}`}>
                <span className="gradient-text">shinni</span>@portfolio
              </h3>
              <p className="text-sm text-muted-foreground">
                Linux system administrator focused on performance, uptime, and secure automation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('about')} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left">About</button>
                <button onClick={() => scrollToSection('skills')} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left">Skills</button>
                <button onClick={() => scrollToSection('projects')} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left">Projects</button>
                <button onClick={() => scrollToSection('contact')} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left">Contact</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ShinniUwU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/radoslav-borisov-a7062622b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:shinni@tutamail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {year ?? ''} Shinni. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground mt-2 md:mt-0">
                Built with Next.js, Tailwind CSS, and Framer Motion
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
