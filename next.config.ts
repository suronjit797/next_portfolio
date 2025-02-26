import type { NextConfig } from "next";
// import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dcpqgolpx/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
    ],
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Enable React strict mode
  reactStrictMode: true,
};

export default nextConfig;

// export default withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// })(nextConfig);
