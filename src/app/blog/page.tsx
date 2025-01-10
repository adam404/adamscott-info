import Navigation from "@/components/Navigation";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/content";
import ClientBlog from "@/components/blog/ClientBlog";
import { Metadata } from "next";

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

export default async function Blog() {
  const posts = await getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="bg-background min-h-screen relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute h-full w-full stroke-muted/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] animate-[spin_60s_linear_infinite]"
          aria-hidden="true"
          style={{ animationTimingFunction: "linear" }}
        >
          <defs>
            <pattern
              id="blogPattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(12)"
            >
              <path
                d="M0 50V45H50"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle cx="25" cy="25" r="1" fill="currentColor" stroke="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blogPattern)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#blogPattern)"
            transform="rotate(60)"
            opacity="0.5"
          />
        </svg>
      </div>
      <Navigation forceWhiteBackground />
      <ClientBlog initialPosts={posts} initialTags={allTags} />
      <Footer />
    </div>
  );
}
