/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "bdp89g4fvu.ufs.sh", protocol: "https" },
      { hostname: "d3tfanr7troppj.cloudfront.net", protocol: "https" },
    ],
  },
};

export default nextConfig;
