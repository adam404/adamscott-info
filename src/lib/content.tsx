import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import React from "react";

interface ContentItem {
  title: string;
  description: string;
  date: string;
  image: string;
  video?: string;
  featured?: boolean;
  tags: string[];
  slug: string;
  content?: JSX.Element;
}

const components = {
  table: (props: any) => (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-800/50" {...props} />,
  tbody: (props: any) => (
    <tbody className="divide-y divide-gray-700 bg-transparent" {...props} />
  ),
  tr: (props: any) => <tr className="hover:bg-gray-800/50" {...props} />,
  th: (props: any) => (
    <th
      className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="whitespace-nowrap px-4 py-4 text-sm text-gray-300"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-gray-300 leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol
      className="my-6 ml-6 list-decimal [&>li]:mt-2 text-gray-300"
      {...props}
    />
  ),
  li: (props: any) => <li className="text-gray-300" {...props} />,
  h1: (props: any) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-gray-100"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 scroll-m-20 border-b border-b-gray-700 pb-1 text-3xl font-semibold tracking-tight text-gray-100 first:mt-0"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-gray-100"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="font-medium text-blue-400 underline underline-offset-4 hover:text-blue-500"
      {...props}
    />
  ),
};

async function getContentFromDirectory(
  directory: string,
  filterFeatured: boolean = true
): Promise<ContentItem[]> {
  const contentDir = path.join(process.cwd(), directory);
  const files = await fs.readdir(contentDir);

  const contentItems = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content: mdxContent } = matter(source);

        const { content } = await compileMDX({
          source: mdxContent,
          components,
          options: {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          },
        });

        return {
          title: data.title,
          description: data.description,
          date: data.date,
          image: data.featuredImage || data.image,
          video: data.video,
          featured: data.featured || false,
          tags: data.tags || [],
          slug: file.replace(".mdx", ""),
          content,
        };
      })
  );

  const sortedItems = contentItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return filterFeatured
    ? sortedItems.filter((item) => item.featured)
    : sortedItems;
}

export async function getFeaturedPosts(limit = 3): Promise<ContentItem[]> {
  const posts = await getContentFromDirectory("src/content/blog", true);
  return posts.slice(0, limit);
}

export async function getAllPosts(): Promise<ContentItem[]> {
  return getContentFromDirectory("src/content/blog", false);
}

export async function getFeaturedProjects(limit = 3): Promise<ContentItem[]> {
  const projects = await getContentFromDirectory("src/content/projects");
  return projects.slice(0, limit);
}

export async function getTestimonials() {
  return [
    {
      content:
        "Adam is an excellent listener. He's thoughtful and takes his time asking clarifying questions to make sure he understands what is not only been asked of him in terms of potential solutions, but he gets at the reason for asking for particular solutions. He then communicates his recommendations in a calm, clear manner.",
      author: "Team Lead",
      role: "Product Manager",
    },
    {
      content:
        "Adam consistently goes above and beyond what is asked for him. I wonder how he is able to attend all the meetings he does, manage everyone under him, and still have time to write some code.",
      author: "Senior Developer",
      role: "Engineering Team",
    },
    {
      content:
        "He listens carefully to all disciplines in order to provide thoughtful approaches for designs that may initially be overly complicated to develop. I appreciate that he offers solves for tricky approaches rather than just flagging issues.",
      author: "Design Director",
      role: "Creative Team",
    },
    {
      content:
        "If there is any value I would connect to Adam, it is true grit. This man has been given so many ridiculously short time frames, too few resources to get things done, and so much pressure to deliver.",
      author: "Project Manager",
      role: "Management Team",
    },
  ];
}
