const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  experimental: {
    // lucide-react is also optimized by default; listed for clarity. radix-ui is used by @repo/ui.
    optimizePackageImports: ['lucide-react', 'radix-ui'],
  },
  async rewrites() {
    return [
      {
        // Same-origin auth + /api/* so session cookies are set on the web host.
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
