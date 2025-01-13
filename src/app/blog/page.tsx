import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/content";
import ClientBlog from "@/components/blog/ClientBlog";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Blog | Adam Scott - Software Engineer & Technical Leader",
  description:
    "Insights and articles about software development, cloud architecture, and technical leadership from Adam Scott.",
  openGraph: {
    title: "Blog | Adam Scott - Software Engineer & Technical Leader",
    description:
      "Insights and articles about software development, cloud architecture, and technical leadership from Adam Scott.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Adam Scott",
    description:
      "Insights and articles about software development, cloud architecture, and technical leadership from Adam Scott.",
  },
};

function BlogLoading() {
  return (
    <div className="animate-pulse">
      <div className="px-6 pt-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="h-12 bg-muted rounded-lg mb-4"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-8 bg-muted rounded-full"></div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Blog() {
  const posts = await getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="bg-background min-h-screen relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute h-full w-full stroke-muted/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
          style={{
            animation: "gentleRotate 30s linear infinite",
            transformOrigin: "center center",
          }}
        >
          <style>
            {`
              @keyframes gentleRotate {
                0% { transform: rotate(0deg); }
                50% { transform: rotate(30deg); }
                100% { transform: rotate(0deg); }
              }
            `}
          </style>
          <defs>
            <pattern
              id="blogPattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(12)"
            >
              <path
                d="M0 80V70H80"
                fill="none"
                strokeWidth="2"
                strokeDasharray="6 8"
              />
              <circle cx="40" cy="40" r="2" fill="currentColor" stroke="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blogPattern)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#blogPattern)"
            transform="rotate(30)"
            opacity="0.7"
          />
        </svg>
      </div>
      <Navigation forceWhiteBackground />
      <Suspense fallback={<BlogLoading />}>
        <ClientBlog initialPosts={posts} initialTags={allTags} />
      </Suspense>
      <Footer />
    </div>
  );
}
