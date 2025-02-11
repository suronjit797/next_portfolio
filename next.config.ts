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
};

export default nextConfig

// export default withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// })(nextConfig);
