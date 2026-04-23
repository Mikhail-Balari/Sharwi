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
    ]
  },
  async headers() {
    return [
      {
        source: "/app/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ]
  },
}

export default nextConfig
