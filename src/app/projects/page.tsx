import { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import Card from "@/components/Card";
import ProjectsClient from "./projects-client";
import type { ContentItem } from "@/lib/content";

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
  const projects = await getAllProjects();
  const allTags = Array.from(
    new Set(
      projects.flatMap((project: ContentItem) =>
        project.tags.map((tag) => tag.trim())
      )
    )
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return <ProjectsClient initialProjects={projects} initialTags={allTags} />;
}
