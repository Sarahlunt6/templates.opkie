/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Inline critical CSS (critters) — the stylesheet is otherwise a
    // render-blocking hop ahead of the hero on throttled mobile.
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
