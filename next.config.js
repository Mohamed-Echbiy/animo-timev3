/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
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
  async rewrites() {
    return [
      {
        source: "/app*",
        destination: "/public/:path*",
      },
    ];
  },
};
