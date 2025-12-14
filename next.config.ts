import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
    qualities: [75, 100],
  },
  reactStrictMode: true,
  poweredByHeader: false, // remove o cabeçalho "X-Powered-By: Next.js"
};

export default nextConfig;
