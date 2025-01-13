import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import NewsSection from "@/components/NewsSection";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";
import { getNews } from "@/lib/getNews";
import FrontendAnimation from "@/components/animations/FrontendAnimation";
import BackendAnimation from "@/components/animations/BackendAnimation";
import CloudDevOpsAnimation from "@/components/animations/CloudDevOpsAnimation";

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();
  const featuredProjects = await getFeaturedProjects();
  const news = await getNews();

  return (
    <div className="bg-background min-h-screen font-sans">
      <Navigation forceWhiteBackground={false} />
      <Hero news={news} />

      {/* Add padding to account for fixed navigation */}
      <div className="">
        {/* Featured Projects Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              A selection of my recent work and contributions.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.title}
                {...project}
                link={`/p/${project.slug}`}
                type="project"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground"
            >
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Featured Blog Posts Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              Thoughts on software development, leadership, and technology.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Card key={post.title} {...post} link={post.slug} type="post" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog"
              className="text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground"
            >
              View all articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Skills & Technologies
            </h2>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              The tools and technologies I work with.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "Frontend Development",
                  description:
                    "React, Next.js, TypeScript, Tailwind CSS, and modern web technologies.",
                  animation: FrontendAnimation,
                },
                {
                  name: "Backend Development",
                  description:
                    "Node.js, Python, RESTful APIs, and database design.",
                  animation: BackendAnimation,
                },
                {
                  name: "Cloud & DevOps",
                  description: "AWS, Docker, Kubernetes, and CI/CD pipelines.",
                  animation: CloudDevOpsAnimation,
                },
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    <div className="mb-6 w-full overflow-hidden rounded-lg bg-zinc-900/80 dark:bg-zinc-800/80 aspect-video">
                      <skill.animation className="h-full w-full" />
                    </div>
                    {skill.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{skill.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
