/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // ✅ THIS LINE GOES HERE
      },
    ],
  },
};

module.exports = nextConfig;