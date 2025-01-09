import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  roles: string[];
  tech: string[];
  image: string;
  video?: string;
  featured?: boolean;
}

interface Project extends ProjectFrontmatter {
  slug: string;
}

// Helper function to get all projects
async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(process.cwd(), "src/content/projects");
  const files = await fs.readdir(projectsDirectory);

  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(projectsDirectory, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data } = matter(source);

        return {
          ...(data as ProjectFrontmatter),
          slug: file.replace(/\.mdx$/, ""),
        };
      })
  );

  // Sort projects: featured first, then by date
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export default async function Projects() {
  const projects = await getProjects();
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tech))
  );

  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main>
        {/* Header */}
        <div className="px-6 pt-32 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Projects
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              A showcase of my technical projects and contributions.
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

        {/* Projects Grid */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.slug}
                title={project.title}
                description={project.description}
                image={project.image}
                link={`/projects/${project.slug}`}
                tags={project.tech}
                type="project"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let's Build Something Together
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
              Have a project in mind? I'd love to help you bring it to life.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
