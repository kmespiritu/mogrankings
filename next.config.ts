import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photos are local in /public/photos/ — skip Vercel's paid image optimization
    // This prevents blowing past the 1,000 free optimizations/month limit
    unoptimized: true,
  },
};

export default nextConfig;
