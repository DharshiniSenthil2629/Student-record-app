/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Prevents ESLint errors from stopping your Vercel build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
