import Image from "next/image"
import BootHero from "./components/boot-hero"
import CommandPalette from "./components/command-palette"
import HomelabMap from "./components/homelab-map"
import CopyEmail from "./components/copy-email"
import WorkLedger from "./components/work-ledger"
import Year from "./components/year"

const EMAIL = "shinni@tutamail.com"
const GITHUB = "https://github.com/ShinniUwU"
const LINKEDIN = "https://www.linkedin.com/in/hana-becheva-a7062622b/"

type Row = { name: string; note?: string; value: string; now?: boolean }
type Pic = { src: string; alt: string; caption: string }

const RECORD: { group: string; rows: Row[]; pic?: Pic }[] = [
  {
    group: "Experience",
    pic: { src: "/img/sofia.jpg", alt: "A house on a tree-lined street in Sofia", caption: "Sofia, where it started" },
    rows: [
      {
        name: "LunarLabs, volunteer software engineer",
        note: "Internal infrastructure and CI for a small dev team, remote. The tooling I want to work with full time.",
        value: "Nov 2024 to now",
        now: true,
      },
      {
        name: "Alorica, customer support",
        note: "Sofia, on site. Here for a complete work history, not the direction I am building toward.",
        value: "Aug 2025 to Jun 2026",
      },
    ],
  },
  {
    group: "Education",
    pic: { src: "/img/eindhoven.jpg", alt: "The arrivals entrance of Eindhoven Airport", caption: "Eindhoven, where I study" },
    rows: [
      {
        name: "Fontys University of Applied Sciences",
        note: "HBO-ICT & Infrastructure in Eindhoven, building on the homelab background.",
        value: "Sep 2026 to Aug 2030",
        now: true,
      },
      {
        name: "Vanya Voynova 132 SU",
        note: "Hardware and Software Science, GPA 5.43.",
        value: "2019 to 2024",
      },
    ],
  },
  {
    group: "Systems",
    rows: [
      { name: "Fedora", value: "Workstation", now: true },
      { name: "Debian", value: "Server" },
      { name: "NixOS", value: "ThinkPad, testing" },
      { name: "Arch Linux", value: "Expert" },
      { name: "Ubuntu", value: "Familiar" },
    ],
  },
  {
    group: "Services",
    rows: [
      { name: "Game servers", value: "Minecraft" },
      { name: "TypeScript bots", value: "Discord" },
      { name: "Self-hosted services", value: "Docker" },
      { name: "Secure remote access", value: "WireGuard" },
      { name: "Media stack", value: "Jellyfin" },
    ],
  },
  {
    group: "Tools",
    rows: [
      { name: "Fish shell", value: "Preferred" },
      { name: "Tailscale", value: "Mesh" },
      { name: "Proxmox Backup", value: "Backups" },
      { name: "Beszel", value: "Server metrics" },
      { name: "Uptime Kuma", value: "Uptime checks" },
      { name: "ntfy", value: "Alerts" },
      { name: "Docker Compose", value: "Containers" },
    ],
  },
]

function RecordGroup({ g }: { g: (typeof RECORD)[number] }) {
  return (
    <div className={`group${g.pic ? " group--pic" : ""}`}>
      {g.pic && (
        <figure className="place rise d2">
          <Image src={g.pic.src} alt={g.pic.alt} width={480} height={480} />
          <figcaption>{g.pic.caption}</figcaption>
        </figure>
      )}
      <h3 className="rise">{g.group}</h3>
      <ul>
        {g.rows.map((r) => (
          <li key={r.name} className="rise d1">
            <span className={`dot${r.now ? " dot--now" : ""}`} aria-hidden="true" />
            <span className="rrow__name">
              {r.name}
              {r.note && <span className="rrow__note">{r.note}</span>}
            </span>
            <span className="rrow__val">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <div className="site">
      <CommandPalette />

      <header className="bar">
        <a href="#top" className="bar__mark" translate="no">
          shinni<span aria-hidden="true">@portfolio</span>
        </a>
        <nav aria-label="Primary">
          <a href="#lab">Lab</a>
          <a href="#work">Projects</a>
          <a href="#record">Background</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <BootHero />

      <section className="intro" id="intro" aria-label="Summary">
        <p className="intro__lead rise">
          Linux sysadmin in the making. At home I run what a small company would: restore-tested backups, private
          admin access, and alerts that stay quiet until something is really wrong.
        </p>
        <div className="intro__cols">
          <p className="rise d1">
            <b>Who I am.</b> Hana Becheva, known online as Shinni. I jumped straight into Arch and never regretted
            it. Today it is Fedora on the workstation, Debian on the server and NixOS on the ThinkPad as a testing
            ground.
          </p>
          <p className="rise d2">
            <b>What I do.</b> Server hardening, containers with Docker Compose, performance tuning, scripting in Bash
            and Fish, and disaster recovery. My own tool, SOLEN, rolls backups and health checks into one runner.
          </p>
          <p className="rise d3">
            <b>Where I am.</b> I live in Heerlen, Netherlands, and study at Fontys in Eindhoven from September 2026 to
            August 2030. My earlier work and school were in Sofia, Bulgaria. Remote work is fine.
          </p>
          <p className="rise d4">
            <b>How to reach me.</b> Email is fastest at {EMAIL}. My code lives on GitHub as ShinniUwU, and the full
            history is on LinkedIn and in the CV.
          </p>
        </div>
      </section>

      <section className="labsec" id="lab" aria-label="The homelab">
        <div className="labsec__head">
          <h2 className="rise">The lab</h2>
          <p className="rise d1">
            One Proxmox host at home runs everything on this map. Flip the switch to see what only my own devices can
            reach, and tap any part for how it is set up.
          </p>
        </div>
        <div className="rise d2">
          <HomelabMap />
        </div>
      </section>

      <section className="work" id="work">
        <div className="col">
          <h2 className="rise">Projects</h2>
        </div>
        <div className="col col--wide rise d1">
          <WorkLedger />
        </div>
      </section>

      <section className="record" id="record">
        <div className="col">
          <h2 className="rise">Background</h2>
          {RECORD.slice(0, 2).map((g) => (
            <RecordGroup key={g.group} g={g} />
          ))}
        </div>
        <div className="col col--wide stack">
          {RECORD.slice(2).map((g) => (
            <RecordGroup key={g.group} g={g} />
          ))}
        </div>
      </section>

      <section className="about" id="about" aria-label="About">
        <div className="letter">
          <Image className="letter__face rise" src="/img/avatar.jpg" alt="Shinni" width={44} height={44} />
          <p className="rise d1">
            I am a system administrator with a deep love for Linux and open source. I jumped straight into Arch, no
            regrets, and these days I focus on performance, troubleshooting and system stability.
          </p>
          <p className="rise d2">
            Customer support was my start and infrastructure is where I am heading. The homelab is how I get there:
            backups that get restored on purpose, admin panels reachable only over a private network, and alerts tuned
            until a notification means something.
          </p>
          <p className="rise d3">
            When I am not on a server I am trying new distributions, contributing where I can, and learning
            containerisation and infrastructure as code. Mostly,{" "}
            <mark>I mess with Linux until it just works.</mark> Then I break it again.
          </p>
          <p className="letter__sign rise d4">
            <span className="letter__name">Shinni</span>
            <span className="letter__role">Linux system administrator</span>
          </p>
        </div>
      </section>

      <section className="dark" id="contact">
        <div className="contact">
          <p className="contact__lead rise">
            Got an infrastructure problem, an open role or a homelab question? Write to me.
          </p>
          <figure className="contact__pic rise d1">
            <Image src="/img/avatar.jpg" alt="Shinni" width={160} height={160} />
            <figcaption>Shinni</figcaption>
          </figure>
          <div className="contact__links rise d2">
            <p className="contact__ask">Where do you want to start?</p>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a> <CopyEmail />
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                  GitHub, ShinniUwU
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  LinkedIn, Hana Becheva
                </a>
              </li>
            </ul>
            <p className="contact__note">Based in Heerlen, studying in Eindhoven. Available for remote work.</p>
          </div>
        </div>

        <p className="credits">
          Photos via Wikimedia Commons: Sofia by Todor Bozhinov and Eindhoven Airport by CoolmenNL (both CC BY-SA 3.0). 3D model:{" "}
          <a href="https://sketchfab.com/3d-models/lenovo-thinkpad-laptop-c46575a1769040159db80dd60b727f7c" target="_blank" rel="noopener noreferrer">
            Lenovo ThinkPad Laptop
          </a>{" "}
          by masanimations (CC BY 4.0) via Sketchfab.
        </p>

        <footer className="foot">
          <span>Linux system administrator</span>
          <nav aria-label="Footer">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="/Hana_Becheva_CV.pdf" download>
              CV
            </a>
          </nav>
          <span className="foot__end">
            © <Year /> Shinni
          </span>
        </footer>
      </section>
    </div>
  )
}
