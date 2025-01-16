import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import CodeBlock from "@/components/CodeBlock";
import InlineCode from "@/components/InlineCode";
import type { Metadata } from "next/types";
import Link from "next/link";

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
    <th className="px-4 py-3.5 text-left text-sm font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="whitespace-nowrap px-4 py-4 text-sm" {...props} />
  ),
  p: (props: any) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: any) => <li {...props} />,
  h1: (props: any) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 scroll-m-20 border-b border-b-gray-700 pb-1 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="font-medium text-blue-400 underline underline-offset-4 hover:text-blue-500"
      {...props}
    />
  ),
  pre: (props: any) => {
    if (props.children?.type === "code") {
      return <CodeBlock {...props.children.props} />;
    }
    return <pre {...props} />;
  },
  code: (props: any) => {
    if (typeof props.children === "string" && !props.className) {
      return <InlineCode {...props} />;
    }
    return <code {...props} />;
  },
};

// Add generateStaticParams for static generation
export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), "src/content/blog"));
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> {
  // Safely read MDX frontmatter
  try {
    const params = await props.params;
    const slug = params.slug;
    const filePath = path.join(
      process.cwd(),
      "src/content/blog",
      `${slug}.mdx`
    );
    const source = await fs.readFile(filePath, "utf8");
    const { data } = matter(source);

    if (!data) {
      return { title: "Post Not Found" };
    }

    return {
      title: `${data.title} | Adam Scott's Blog`,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        images: [data.featuredImage],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: [data.featuredImage],
      },
    };
  } catch (error) {
    return { title: "Post Not Found" };
  }
}

interface BlogPost {
  title: string;
  description: string;
  date: string;
  featuredImage?: string;
  slug: string;
}

async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);

  // Get all blog posts to find adjacent ones
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const files = await fs.readdir(blogDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(blogDir, file), "utf8");
        const { data } = matter(source);
        return {
          ...(data as BlogPost),
          slug: file.replace(/\.mdx$/, ""),
        };
      })
  );

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Find current post index
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const { content: mdxContent } = await compileMDX({
    source: content,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        // @ts-ignore - Types are not properly exported from rehype-prism-plus
        rehypePlugins: [[rehypePrism, { showLineNumbers: true }]],
      },
    },
  });

  return { data, mdxContent, prevPost, nextPost };
}

export default async function BlogPost(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // Validate and sanitize the slug parameter
  const params = await props.params;
  const slug = params.slug;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  try {
    const { data, mdxContent, prevPost, nextPost } = await getBlogPost(slug);

    return (
      <article className="relative">
        <Navigation forceWhiteBackground />
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full pt-24">
          {data.featuredImage && (
            <Image
              src={data.featuredImage}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90">
            <div className="mx-auto max-w-4xl h-full px-6 flex items-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {data.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative -mt-32 bg-gray-900 rounded-t-3xl">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <div className="prose prose-invert max-w-none">{mdxContent}</div>

            {/* Post Navigation */}
            <nav className="mt-16 border-t border-gray-700 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {prevPost && (
                <Link
                  href={`/${prevPost.slug}`}
                  className="group flex flex-col space-y-3"
                >
                  <span className="text-sm text-gray-400">
                    Previous Article
                  </span>
                  <span className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                    {prevPost.title}
                  </span>
                </Link>
              )}

              {nextPost && (
                <Link
                  href={`/${nextPost.slug}`}
                  className={`group flex flex-col space-y-3 ${
                    !prevPost ? "md:col-start-2" : ""
                  }`}
                >
                  <span className="text-sm text-gray-400">Next Article</span>
                  <span className="font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
