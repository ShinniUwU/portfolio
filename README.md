# shinni.dev

Personal portfolio site, live at [shinni.dev](https://shinni.dev).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- React 19
- Tailwind CSS + [Radix UI](https://www.radix-ui.com/) primitives
- Framer Motion for animation
- Deployed on [Vercel](https://vercel.com/) (Analytics + Speed Insights)

## Development

```bash
bun install
bun dev      # start dev server at localhost:3000
bun run build # static export to out/
bun run lint
```

## Structure

```
app/
  page.tsx           # the whole one-page site
  layout.tsx          # metadata, fonts, JSON-LD
  opengraph-image.tsx  # generated social share image
  robots.ts / sitemap.ts
  components/          # page-level sections (hero, about, projects, contact, ...)
components/ui/         # shared shadcn/radix-based UI primitives
lib/                    # utilities
public/                 # static assets
```
