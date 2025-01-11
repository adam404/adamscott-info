"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Card from "@/components/Card";
import AsteroidsBackground from "@/components/AsteroidsBackground";
import Footer from "@/components/Footer";
import { useState } from "react";

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

interface ProjectsClientProps {
  projects: Project[];
  allTags: string[];
}

export default function ProjectsClient({
  projects,
  allTags,
}: ProjectsClientProps) {
  const [isFiring, setIsFiring] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tech.includes(selectedTag))
    : projects;

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Background */}
      <AsteroidsBackground onFire={setIsFiring} />

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-300 ${isFiring ? "opacity-0" : "opacity-100"}`}
      >
        <Navigation forceWhiteBackground />

        <main>
          {/* Header */}
          <div className="px-6 pt-32 sm:pt-40 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Projects
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                A showcase of my technical projects and contributions.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-purple-500 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Clear Filter
                </button>
              )}
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold leading-6 ring-1 ring-inset transition-colors ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white ring-blue-500"
                      : "bg-blue-500/10 text-blue-300 ring-blue-500/20 hover:bg-blue-500/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card
                  key={project.slug}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  video={project.video}
                  link={`/p/${project.slug}`}
                  tags={project.tech}
                  type="project"
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="relative isolate overflow-hidden bg-white/10 backdrop-blur-sm px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 border border-white/20">
              <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's Build Something Together
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
                Have a project in mind? I'd love to help you bring it to life.
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/contact"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer dark />
      </div>
    </div>
  );
}
