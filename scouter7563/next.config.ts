import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.13", "localhost"],
  images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.thebluealliance.com",
            },
        ],
    },
};

export default nextConfig;