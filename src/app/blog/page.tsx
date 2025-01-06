import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

const posts = [
  {
    title: "Building Scalable Web Applications",
    description:
      "Learn how to build and deploy scalable web applications using modern technologies.",
    image: "/blog/scalable-apps.png",
    link: "/blog/building-scalable-web-applications",
    date: "2024-03-01",
    tags: ["Web Development", "Architecture", "Performance"],
  },
  {
    title: "The Future of Frontend Development",
    description:
      "Exploring upcoming trends and technologies in frontend development.",
    image: "/blog/frontend-future.png",
    link: "/blog/future-of-frontend-development",
    date: "2024-02-15",
    tags: ["Frontend", "Web Development", "Trends"],
  },
  {
    title: "TypeScript Best Practices",
    description:
      "Essential TypeScript patterns and practices for better code quality.",
    image: "/blog/typescript.png",
    link: "/blog/typescript-best-practices",
    date: "2024-02-01",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  // Add more blog posts here
];

const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

export default function Blog() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main>
        {/* Header */}
        <div className="px-6 pt-32 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Thoughts and insights on software development, leadership, and
              technology.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-500 ring-1 ring-inset ring-blue-500/20 hover:bg-blue-500/20"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.title} {...post} type="post" />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get notified about new articles
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Subscribe to my newsletter to receive updates about new blog posts
              and tech insights.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
