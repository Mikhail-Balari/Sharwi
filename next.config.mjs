const appFrameHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'",
  },
]

const expoAppRoutes = [
  "beta",
  "create",
  "feed",
  "login",
  "onboarding",
  "post-detail",
  "profile",
  "register",
  "reputation",
  "reviews",
  "search",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/app",
        destination: "/app/index.html",
      },
      {
        source: "/app/",
        destination: "/app/index.html",
      },
      ...expoAppRoutes.map((route) => ({
        source: `/app/${route}`,
        destination: `/app/${route}.html`,
      })),
      ...expoAppRoutes.map((route) => ({
        source: `/${route}`,
        destination: `/app/${route}.html`,
      })),
      {
        source: "/_expo/:path*",
        destination: "/app/_expo/:path*",
      },
      {
        source: "/assets/:path*",
        destination: "/app/assets/:path*",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/app/:path*",
        headers: appFrameHeaders,
      },
      ...expoAppRoutes.map((route) => ({
        source: `/${route}`,
        headers: appFrameHeaders,
      })),
    ]
  },
}

export default nextConfig
