/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      's.gravatar.com',
      'sls-auction-bucket-dev.s3.ap-southeast-1.amazonaws.com',
    ],
  },
  serverRuntimeConfig: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
};

module.exports = withImages(nextConfig);
