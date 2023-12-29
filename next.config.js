/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.yipnyap.me', 'ecwxmakixjrsklydfmtl.supabase.co', 'cdn.discordapp.com'],
  },
};

module.exports = nextConfig;
