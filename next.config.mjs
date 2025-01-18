import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  distDir: ".next",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
  webpack: (config, { isServer }) => {
    // Optimize the bundle size
    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [...(config.optimization.minimizer || [])],
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
