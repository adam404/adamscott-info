"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { ContentItem } from "@/lib/content";
import ProjectVideo from "@/components/ProjectVideo";
import Navigation from "@/components/Navigation";
import AsteroidsBackground from "@/components/AsteroidsBackground";

interface ProjectsClientProps {
  initialProjects: ContentItem[];
  initialTags: string[];
}

function ProjectsContent({
  initialProjects,
  initialTags,
}: ProjectsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");
  const [showUI, setShowUI] = useState(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const filteredProjects = currentTag
    ? initialProjects.filter((project) => project.tags.includes(currentTag))
    : initialProjects;

  const handleTagClick = (tag: string) => {
    const newQueryString = createQueryString(
      "tag",
      currentTag === tag ? "" : tag
    );
    router.push(`${pathname}${newQueryString ? `?${newQueryString}` : ""}`);
  };

  return (
    <div className="bg-background min-h-screen relative isolate overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AsteroidsBackground onFire={setShowUI} />
      </div>
      <div
        className={`relative ${showUI ? "z-10" : "pointer-events-none"}`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const isInteractive = target.closest(
            'button, a, input, textarea, article, [role="button"]'
          );
          if (!isInteractive) {
            setShowUI((prev) => !prev);
          }
        }}
      >
        {showUI && (
          <>
            <Navigation />
            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-wider text-foreground sm:text-4xl">
                    Projects
                    {currentTag && (
                      <span className="ml-3 inline-flex items-center px-3 py-1 text-sm font-medium tracking-wider rounded-full bg-primary/10 text-primary">
                        Filtered by {currentTag}
                        <button
                          onClick={() => handleTagClick(currentTag)}
                          className="ml-2 hover:text-primary/80"
                          aria-label="Clear filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-muted-foreground">
                    A collection of my professional work and side projects
                  </p>
                </div>

                {/* Tags filter */}
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                  {initialTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        currentTag === tag
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Projects grid */}
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <div key={project.slug} className="group">
                      <article className="flex flex-col items-start">
                        <Link href={`/p/${project.slug}`} className="w-full">
                          <div className="relative w-full">
                            <ProjectVideo
                              video={project.video}
                              image={project.image}
                              title={project.title}
                            />
                          </div>
                        </Link>
                        <div className="max-w-xl">
                          <div className="mt-8 flex items-center gap-x-4 text-xs">
                            <time
                              dateTime={project.date}
                              className="text-muted-foreground"
                            >
                              {new Date(project.date).toLocaleDateString()}
                            </time>
                            {project.featured && (
                              <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                                Featured
                              </span>
                            )}
                          </div>
                          <Link href={`/p/${project.slug}`} className="block">
                            <div className="relative">
                              <h3 className="mt-3 text-lg font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                                {project.title}
                              </h3>
                              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                                {project.description}
                              </p>
                            </div>
                          </Link>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProjectsClient(props: ProjectsClientProps) {
  return (
    <Suspense>
      <ProjectsContent {...props} />
    </Suspense>
  );
}
