import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import components from "@/components/mdx";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: {
    name: string;
    image: string;
  };
  slug: string;
  content: string;
  tags: string[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/content/blog",
      `${slug}.mdx`
    );

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      console.log(`File not found: ${filePath}`);
      return null;
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    // Validate required fields
    if (!data.title || !data.description || !data.date) {
      console.log(`Missing required fields in ${slug}`);
      return null;
    }

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      author: {
        name: "Adam Scott",
        image: "/profile.jpg",
      },
      slug: slug,
      content: content,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = await fs.readdir(blogDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(".mdx", ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: `${post.title} | Adam Scott's Blog`,
    description: post.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) notFound();

  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main className="relative isolate">
        {/* Article header */}
        <div className="mx-auto max-w-7xl px-6 pt-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-x-4 text-xs">
              <time dateTime={post.date} className="text-gray-500">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-1">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    className="h-6 w-6 rounded-full bg-gray-50"
                    width={24}
                    height={24}
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
          </div>
        </div>

        {/* Article content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-16 prose prose-lg prose-blue dark:prose-invert">
              <MDXRemote source={post.content} components={components} />
            </div>
          </div>
        </div>

        {/* Author bio */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
              <div className="flex items-center gap-x-4">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full bg-gray-50"
                  width={40}
                  height={40}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {post.author.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Software Engineer & Technical Leader
                  </p>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                Software engineer and technical leader specializing in web
                development and cloud architecture.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
