import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface Project {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  image: string;
  slug: string;
  content: string;
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

    return {
      title: data.title,
      description: data.description,
      date: data.date,
      technologies: data.technologies || [],
      image: data.image,
      slug: slug,
      content: content,
      links: {
        github: data.github || "",
        live: data.live || "",
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

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Adam Scott's Projects`,
    description: project.description,
  };
}

export default async function ProjectPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main className="relative isolate">
        {/* Project header */}
        <div className="mx-auto max-w-7xl px-6 pt-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-10">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-6 flex items-center gap-x-4 text-xs">
              <time dateTime={project.date} className="text-gray-500">
                {format(new Date(project.date), "MMMM d, yyyy")}
              </time>
            </div>
            <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
              {project.description}
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href={project.links.github}
                className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
              <a
                href={project.links.live}
                className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Site →
              </a>
            </div>
          </div>
        </div>

        {/* Project preview image */}
        <div className="mt-16 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={675}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Project content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-16 prose prose-lg prose-blue dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
