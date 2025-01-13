"use client";

import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import ProjectVideo from "@/components/ProjectVideo";
import React from "react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  image: string;
  video?: string;
  slug: string;
  content: React.ReactElement;
  links: {
    github: string;
    live: string;
  };
}

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main className="relative isolate">
        {/* Project header */}
        <div className="mx-auto max-w-7xl px-6 pt-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-10">
              {project.technologies.map((tech) => (
                <Link
                  key={tech}
                  href={`/projects?tech=${encodeURIComponent(tech)}`}
                  className="inline-flex items-center mr-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {tech}
                </Link>
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
              {project.links.github && (
                <a
                  href={project.links.github}
                  className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub →
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Site →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project preview image */}
        <div className="mt-16 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <ProjectVideo
              video={project.video}
              image={project.image}
              title={project.title}
            />
          </div>
        </div>

        {/* Project content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <div className="mt-16 prose prose-lg prose-blue dark:prose-invert">
              {project.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
