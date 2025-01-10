import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import ProjectContent from "./project-content";

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
};

interface Project {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  image: string;
  video?: string;
  slug: string;
  content: JSX.Element;
  links: {
    github: string;
    live: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/content/projects",
      `${slug}.mdx`
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

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

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      technologies: data.tech || [],
      image: data.image,
      video: data.video,
      slug: slug,
      content: mdxContent,
      links: {
        github: data.github || "",
        live: data.url || "",
      },
    };
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), "src/content/projects");
  const files = await fs.readdir(projectsDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(".mdx", ""),
    }));
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Adam Scott's Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [project.image],
      publishedTime: project.date,
      modifiedTime: project.date,
      authors: ["Adam Scott"],
      tags: project.technologies,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
      creator: "@adamscott",
    },
  };
}

export default async function ProjectPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) notFound();

  return <ProjectContent project={project} />;
}
