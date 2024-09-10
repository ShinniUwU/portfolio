/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['opengraph.githubassets.com'],
  },
  // ... any other existing configurations
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/contact-and-resume',
        destination: '/app/ContactAndResume',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
