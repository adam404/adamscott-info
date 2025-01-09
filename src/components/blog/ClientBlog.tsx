"use client";

import { useState } from "react";
import Card from "@/components/Card";

interface ClientBlogProps {
  initialPosts: any[];
  initialTags: string[];
}

export default function ClientBlog({
  initialPosts,
  initialTags,
}: ClientBlogProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? initialPosts.filter((post) => post.tags.includes(selectedTag))
    : initialPosts;

  return (
    <main>
      {/* Header */}
      <div className="px-6 pt-32 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Blog
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Thoughts and insights on software development, leadership, and
            technology.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20"
            >
              Clear Filter
            </button>
          )}
          {initialTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "bg-primary/10 text-primary ring-primary/20 hover:bg-primary/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.title}
              {...post}
              link={`/blog/${post.slug}`}
              type="post"
            />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="relative isolate overflow-hidden bg-card px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get notified about new articles
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-muted-foreground">
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
              className="min-w-0 flex-auto rounded-md border-0 bg-card/5 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-card/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
