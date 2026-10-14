# shinni.dev

Portfolio of Hana Becheva (Shinni), a Linux sysadmin in training. Live at [shinni.dev](https://shinni.dev).

## What's on it

- **A 3D ThinkPad that boots as you scroll.** The lid opens, GRUB and the kernel log run on the screen, and the camera pushes into a live terminal you can type into (`help`, `about`, `projects`, `stack`, `goto lab`, `neofetch`, and a few jokes).
- **The Lab:** an interactive map of the homelab. Flip between "from the internet" and "from my tailnet" to see which parts are reachable, and tap a node for how it is set up. It is illustrative and deliberately has no addresses or ports.
- A normal one-page site under the intro (summary, projects, background, about, contact), so it can be skimmed without touching the 3D part.
- `Ctrl+K` command palette.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export) and React 19
- [three.js](https://threejs.org/) with [react-three-fiber](https://r3f.docs.pmnd.rs/) and drei for the laptop scene
- Plain CSS in `app/site.css` for the page. Tailwind is only kept for the shadcn command dialog (`components/ui`).
- Type: Inter and DM Mono. Visual style adapted from the Warp `DESIGN.md` in [awesome-design-md](https://github.com/VoltAgent/awesome-design-md), with a peach accent.
- Deployed on [Vercel](https://vercel.com/) (Analytics and Speed Insights)

## Development

```bash
bun install
bun dev       # dev server at localhost:3000
bun run build # static export to out/
bun run lint
```

## How the intro works

- `app/components/boot-hero.tsx` turns scroll position into a progress value from 0 to 1 and picks the boot stage (closed, firmware, GRUB, kernel log, login, terminal).
- `app/components/laptop-scene.tsx` loads the model, hinges the lid, moves the camera, and each frame projects the four corners of the screen to page pixels. A CSS `matrix3d` pins the real DOM terminal onto the 3D screen, so the terminal is ordinary, accessible React.
- three.js and the model only load on desktops that allow motion and have WebGL. Phones, reduced-motion users, save-data connections and no-WebGL browsers get the same page with a plain terminal card, and there is a "Skip the animation" link.

## Structure

```
app/
  page.tsx            # the one-page site
  layout.tsx          # metadata, fonts, JSON-LD
  site.css            # all page styling
  components/
    boot-hero.tsx     # scroll progress, boot stages, fallbacks
    laptop-scene.tsx  # 3D scene (loaded on demand)
    boot-screen.tsx   # BIOS, GRUB, kernel log and login screens
    terminal.tsx      # the interactive terminal
    homelab-map.tsx   # the Lab map
    work-ledger.tsx   # projects list with the reach demo
components/ui/        # shadcn command dialog
public/
  models/laptop.glb   # ThinkPad model (see credits)
  img/                # photos
```

## Credits

- 3D model: [Lenovo ThinkPad Laptop](https://sketchfab.com/3d-models/lenovo-thinkpad-laptop-c46575a1769040159db80dd60b727f7c) by masanimations, CC BY 4.0, via Sketchfab.
- Photos via Wikimedia Commons: Sofia by Todor Bozhinov and Eindhoven Airport by CoolmenNL, both CC BY-SA 3.0.

## Deploy note

Vercel only publishes to shinni.dev from the project's **Production Branch**. If a push shows up as a Preview, check Settings, Git, Production Branch.
