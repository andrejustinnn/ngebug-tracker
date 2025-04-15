import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'referrer-policy',
            value: 'no-referrer', // untuh hilangin error saat fetch image ke goggle
          }
        ],
      }
    ]
  }
};

export default nextConfig;
