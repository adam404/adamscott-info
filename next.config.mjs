import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, 'src'),
    };

    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Analyze bundle if ANALYZE is set
const analyzeBundleEnabled = process.env.ANALYZE === "true";
const withBundleAnalysis = withBundleAnalyzer({
  enabled: analyzeBundleEnabled,
});

export default withBundleAnalysis(withMDX(nextConfig));
