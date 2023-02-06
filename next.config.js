/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s4.anilist.co"],
  },
  env: {
    API_URL: process.env.API,
  },
};
