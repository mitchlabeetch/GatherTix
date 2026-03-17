/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@ticketing/ui", "@ticketing/shared", "@ticketing/database"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/trpc/:path*",
        destination: `${process.env.API_URL || "http://localhost:3001"}/trpc/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
