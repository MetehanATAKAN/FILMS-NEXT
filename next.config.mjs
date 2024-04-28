/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        TOKEN_KEY: process.env.TOKEN_KEY,
    },
        images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
              },
            ],
          },
};

export default nextConfig;
