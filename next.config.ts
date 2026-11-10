import type { NextConfig } from 'next';

/** STATIC_EXPORT=1 npm run build → plain HTML/CSS/JS in /out (any static host). */
const isExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = isExport
  ? { output: 'export', trailingSlash: true, images: { unoptimized: true } }
  : {
      images: { formats: ['image/avif', 'image/webp'] },
      async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            ],
          },
        ];
      },
    };

export default nextConfig;
