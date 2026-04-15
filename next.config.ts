import type { NextConfig } from "next";

const djangoApiUrl =
  process.env.DJANGO_API_URL ??
  process.env.NEXT_PUBLIC_DJANGO_API_URL ??
  "http://127.0.0.1:8000/api";

const djangoUrl = new URL(djangoApiUrl);
const djangoMediaHost = process.env.DJANGO_MEDIA_HOSTNAME ?? "kalstore-bucket.s3.amazonaws.com";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.64", "192.168.1.68"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: djangoUrl.protocol.replace(":", "") as "http" | "https",
        hostname: djangoUrl.hostname,
        port: djangoUrl.port,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: djangoMediaHost,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
