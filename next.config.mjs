import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    // Ensure proper RSC handling
    serverActions: {
      bodySizeLimit: "2mb", // Adjust as needed
    },
    // Optional: Enable if needed
    serverComponentsExternalPackages: ["sharp", "canvas"],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
