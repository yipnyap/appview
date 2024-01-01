/** @type {import('next').NextConfig} */
const commitHash = require('child_process')
    .execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost"],
    },
  },
  images: {
    domains: ['api.yipnyap.me', 'ecwxmakixjrsklydfmtl.supabase.co', 'cdn.discordapp.com', 'unavatar.io', 'localhost'],
  },
  env: {
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
    domains: [{ domain: 'localhost', defaultLocale: 'en-US' }]
  },
};

module.exports = nextConfig;
