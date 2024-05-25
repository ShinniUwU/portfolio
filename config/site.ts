export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Hana's Portfolio",
  description: "Welcome to my portfolio. Learn more about me and my experiance",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About me",
      href: "#AboutMe",
    },
    {
      label: "Experiance",
      href: "/pricing",
    },
    {
      label: "Repos",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/profile",
    },
    {
      label: "About me",
      href: "/dashboard",
    },
    {
      label: "Experiance",
      href: "/projects",
    },
    {
      label: "Repos",
      href: "/team",
    },
  ],
  links: {
    github: "https://github.com/ShinniUwU",
    twitter: "https://x.com/ShinniOffical",
  },
};
