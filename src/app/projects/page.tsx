import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import ProjectsClient from "./projects-client";
import { Metadata } from "next";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  roles: string[];
  tech: string[];
  image: string;
  video?: string;
  featured?: boolean;
}

export interface Project extends ProjectFrontmatter {
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

export const metadata: Metadata = {
  title: "Projects | Adam Scott - Software Engineer & Technical Leader",
  description:
    "Explore my portfolio of technical projects and contributions in web development, cloud architecture, and software engineering.",
  openGraph: {
    title: "Projects | Adam Scott - Software Engineer & Technical Leader",
    description:
      "Explore my portfolio of technical projects and contributions in web development, cloud architecture, and software engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Adam Scott",
    description:
      "Explore my portfolio of technical projects and contributions in web development, cloud architecture, and software engineering.",
  },
};

export default async function Page() {
  const projects = await getProjects();
  const allTags = Array.from(
    new Set(projects.flatMap((project: Project) => project.tech))
  ).sort();

  return <ProjectsClient projects={projects} allTags={allTags} />;
}
