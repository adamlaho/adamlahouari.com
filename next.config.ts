import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // The AMLP paper is dated 2025 (published online 26 Dec 2025), not
        // 2026; keep the previous URL working.
        source: '/publications/lahouari-amlp-2026',
        destination: '/publications/lahouari-amlp-2025',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.adamlahouari.com' }],
        destination: 'https://adamlahouari.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
