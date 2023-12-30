/** @type {import('next').NextConfig} */
const commitHash = require('child_process')
    .execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.yipnyap.me', 'ecwxmakixjrsklydfmtl.supabase.co', 'cdn.discordapp.com', 'unavatar.io'],
  },
  env: {
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
};

module.exports = nextConfig;
