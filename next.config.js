/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,

    domains: [
      "s4.anilist.co",
      "flagsapi.com",
      "artworks.thetvdb.com",
      "media.kitsu.io",
    ],
  },
  env: {
    API_URL: process.env.API,
  },
  // Serve static files from the "public" folder
};
