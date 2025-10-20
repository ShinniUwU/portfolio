"use client"

import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export default function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setOpen(false)
    }
  }

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => goTo("hero")}>Home</CommandItem>
          <CommandItem onSelect={() => goTo("about")}>About</CommandItem>
          <CommandItem onSelect={() => goTo("skills")}>Skills</CommandItem>
          <CommandItem onSelect={() => goTo("projects")}>Projects</CommandItem>
          <CommandItem onSelect={() => goTo("contact")}>Contact</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => openExternal("https://github.com/ShinniUwU")}>GitHub</CommandItem>
          <CommandItem onSelect={() => openExternal("https://shinni.dev")}>Website</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

