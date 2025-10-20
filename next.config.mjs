let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const isVercel = !!process.env.VERCEL
const nextConfig = {
  // Make the site fully static to minimize runtime complexity on Vercel
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    // Avoid CI flakiness due to ESLint config/plugins on Vercel
    ignoreDuringBuilds: true,
  },
  experimental: isVercel
    ? {}
    : {
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
        parallelServerCompiles: true,
      },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
