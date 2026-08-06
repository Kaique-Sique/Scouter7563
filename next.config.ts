import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables the React Compiler (auto-memoization) — see the Next.js docs.
  reactCompiler: true,
  // Lets the dev server accept requests from these origins in addition to
  // localhost — useful for testing on a phone/tablet on the same LAN
  // during pit scouting.
  allowedDevOrigins: ["192.168.1.13", "localhost"],
  images: {
        // `next/image` refuses to load remote images unless the host is
        // explicitly allow-listed. TBA's team avatar/media assets are
        // served from this domain (see TeamHeader's avatar/banner props).
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.thebluealliance.com",
            },
        ],
    },
};

export default nextConfig;