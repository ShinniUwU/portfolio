"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Download, Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import Particles from "./components/particles"
import TerminalText from "./components/terminal-text"
import SkillCard from "./components/skill-card"
import ProjectCard from "./components/project-card"

export default function Home() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const aboutRef = useRef<HTMLElement | null>(null)
  const skillsRef = useRef<HTMLElement | null>(null)
  const projectsRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)
  

  function scrollToSection(ref: React.RefObject<HTMLElement | null>) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLInputElement).value

    window.location.href = `mailto:shinni@tutamail.com
    ?subject=${encodeURIComponent("New Contact from " + name)}
    &body=${encodeURIComponent("Email: " + email + "\n\n" + message)}`
  }
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground font-mono">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="text-lg font-bold">
                <span className="text-primary">Hana</span> Becheva
              </div>
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => scrollToSection({ current: document.getElementById("hero") })}
                  className="text-sm hover:text-primary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-sm hover:text-primary transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection(skillsRef)}
                  className="text-sm hover:text-primary transition-colors"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="text-sm hover:text-primary transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </nav>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
          <Particles className="absolute inset-0 -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
            className="container mx-auto px-4 text-center z-10"
          >
            <div className="mb-6 relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary mx-auto">
                <img
                  src="/69644134.jpeg"
                  alt="Hana Becheva"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Hana Becheva</h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6"> Linux power user | Breaking, fixing, and optimizing servers daily</h2>
            <div className="mb-8">
              <TerminalText text="Messing with Linux until it just works. Then breaking it again.." />
            </div>
            <div className="flex justify-center gap-4">
            <Button asChild>
  <a href="/resume.pdf" download>
    <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
    Download Resume
  </a>
</Button>
              <Button variant="outline" onClick={() => scrollToSection(contactRef)}>
                Contact Me
              </Button>
            </div>
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <Button variant="ghost" size="icon" onClick={() => scrollToSection(aboutRef)} aria-label="Scroll down">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
                <p className="mb-4 text-muted-foreground">
                I'm a passionate System Administrator with a deep love for Linux and open-source technologies.
                 I kept getting told to try Linux, denied it for a while, and then jumped straight into Arch—no regrets.
                  That curiosity led me to focus on optimizing server performance, troubleshooting issues, and ensuring system stability.
                </p>
                <p className="text-muted-foreground">
                  When I'm not managing servers or troubleshooting issues, I'm exploring new Linux distributions,
                  contributing to open-source projects, and continuously expanding my knowledge in system
                  administration.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Key Highlights:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">→</span>
                      Expert in Linux distributions including Fedora, Arch, and Debian
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">→</span>
                      Specialized in server management and troubleshooting
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">→</span>
                      Passionate about system stability and optimization
                    </li>
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Terminal Facts</CardTitle>
                    <CardDescription>Some interesting tidbits about me</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-background/50 p-4 rounded-md border border-border">
                      <p className="font-mono text-sm">
                        <span className="text-primary">$</span> whoami
                        <br />
                        <span className="text-muted-foreground">
                          A problem-solver who loves the challenge of making systems work efficiently
                        </span>
                      </p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-md border border-border">
                      <p className="font-mono text-sm">
                        <span className="text-primary">$</span> cat /etc/favorites
                        <br />
                        <span className="text-muted-foreground">
                          Favorite Shell: Fish
                          <br />
                          Favorite Editor:
                          <br />
                          - VS Code (for programming & automation)
                          <br />
                          - Nano/Vim (for quick edits on headless servers)
                          <br />
                          - Neovim (for the flex and when I feel special 😆)
                          <br />
                          Favorite Distro: Fedora
                        </span>
                      </p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-md border border-border">
                      <p className="font-mono text-sm">
                        <span className="text-primary">$</span> echo $CURRENT_FOCUS
                        <br />
                        <span className="text-muted-foreground">
                          Expanding knowledge in containerization and infrastructure as code
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Skills & Expertise</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SkillCard title="Operating Systems" icon="🐧" 
  skills={["Fedora (ThinkPad)", "Nobara (Main PC)", "Debian (Headless Server)", "Knows Arch Well", "Ubuntu"]} />

<SkillCard title="Server Management" icon="🖥️" 
  skills={["Game Servers", "Discord Bots", "Self-Hosted Services (Nextcloud/Jellyfin - Planned)", "ZeroTier Tunneling"]} />

<SkillCard title="Tools & Technologies" icon="🛠️" 
  skills={["Fish", "ZeroTier", "Playit.gg", "TLDR", "Eza", "htop/btop", "tmux", "fzf", "ncdu"]} />

<SkillCard title="Infrastructure Management" icon="🛠️" 
  skills={["System Optimization (Kernel Switching, fsync)", "Server Performance", "Configuration Management", "Nginx & Caddy (Learning)"]} />

            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl">Technical Proficiencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
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
                      "Package Management (dnf, pacman, apt)",
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs py-1">
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
        <section ref={projectsRef} className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Projects</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="Self-Hosted Game & Bot Server"
                description="A Debian-based headless server for managing game servers and Discord bots. Implemented with security best practices and performance optimizations."
                tags={["Debian", "Game Servers", "Discord Bots", "Security"]}
                image="/minecraft.png"
              />
              <ProjectCard
                title="MCSManager Setup for Non-Tech Users"
                description="Implemented a GUI solution for easier Minecraft server management, making it accessible for users without technical expertise."
                tags={["MCSManager", "GUI", "User Experience", "Documentation"]}
                image="/MCSManager.png"
              />
              <ProjectCard
                title="Future Learning Project"
                description="Currently expanding knowledge in containerization and infrastructure as code to implement more efficient deployment strategies."
                tags={["Learning", "Containerization", "Infrastructure", "DevOps"]}
                image="/dockerkub.webp"
                inProgress
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <div className="w-20 h-1 bg-primary mx-auto"></div>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Contact Form</CardTitle>
                    <CardDescription>Send me a message and I'll get back to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Input placeholder="Name" name="name" />
                      </div>
                      <div className="space-y-2">
                        <Input type="email" placeholder="Email" name="email" />
                      </div>
                      <div className="space-y-2">
                        <Textarea placeholder="Your message" name="message" rows={5} />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">Connect With Me</CardTitle>
                    <CardDescription>Find me on these platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-background/50 p-4 rounded-md border border-border">
                      <p className="font-mono text-sm mb-4">
                        <span className="text-primary">$</span> contact --method=social
                        <br />
                      </p>
                      <div className="space-y-4">
                        <a
                          href="https://github.com/ShinniUwU"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                          <span>GitHub</span>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/radoslav-borisov-a7062622b/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span>LinkedIn</span>
                        </a>
                        <a
                          href="https://shinni.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                          <span>shinni.dev</span>
                        </a>
                        <a
                          href="mailto:shinni@tutamail.com"
                          className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                          <span>Email Me</span>
                        </a>
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-md border border-border">
                      <p className="font-mono text-sm">
                        <span className="text-primary">$</span> location
                        <br />
                        <span className="text-muted-foreground">
                          Working remotely from anywhere with a stable internet connection
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Hana Becheva. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

