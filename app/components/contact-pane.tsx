"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { fontMono } from "@/app/fonts"

export default function ContactPane() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value
    window.location.href = `mailto:shinni@tutamail.com?subject=${encodeURIComponent(
      "New Contact from " + name,
    )}&body=${encodeURIComponent("Email: " + email + "\n\n" + message)}`
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur h-full">
        <CardHeader>
          <CardTitle className={`text-lg ${fontMono.className}`}>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Name" name="name" />
            <Input type="email" placeholder="Email" name="email" />
            <Textarea placeholder="Your message" name="message" rows={5} />
            <Button type="submit" className="w-full">Send</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur h-full">
        <CardHeader>
          <CardTitle className={`text-lg ${fontMono.className}`}>Reach me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div>Email me → <a href="mailto:shinni@tutamail.com" className="underline">shinni@tutamail.com</a></div>
          <div>GitHub → <a href="https://github.com/ShinniUwU" target="_blank" rel="noreferrer" className="underline">github.com/ShinniUwU</a></div>
          <div>Website → <a href="https://shinni.dev" target="_blank" rel="noreferrer" className="underline">shinni.dev</a></div>
        </CardContent>
      </Card>
    </div>
  )
}

