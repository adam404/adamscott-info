import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { getTestimonials } from "@/lib/content";

const timeline = [
  {
    year: "2014-2024",
    title: "Technology Director / Lead Full-Stack Engineer",
    company: "Launch",
    description:
      "Led cross-functional teams in developing 150+ digital products, implementing serverless architecture, and mentoring remote developers.",
  },
  {
    year: "2009-2014",
    title: "Manager of Technology / Lead Full-Stack Engineer",
    company: "IQ Agency",
    description:
      "Architected projects for high-profile clients including Microsoft, Allstate, and SunTrust, delivering products with a $5M+ annual impact.",
  },
  {
    year: "2007-2009",
    title: "Software Engineer",
    company: "Alogent",
    description:
      "Developed financial software solutions for global clients, implementing TDD practices and contributing to multi-tenant SaaS products.",
  },
];

export default async function About() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-800 to-blue-300 opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        {/* Header */}
        <div className="px-6 pt-32 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              About Me
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Senior Full-Stack Architect with 17+ years of experience
              specializing in React, component-based design systems, and
              scalable backend integration. Proven leader in implementing new
              technologies and fostering collaboration to drive high-performance
              solutions.
            </p>
          </div>
        </div>

        {/* Image and Bio */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-blue-600">
                  Professional Background
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Building Digital Experiences
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  With over 5 years of experience in software development, I
                  specialize in creating robust web applications and leading
                  technical teams to success. My expertise spans frontend and
                  backend development, cloud architecture, and DevOps practices.
                </p>
                <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300">
                  <div>
                    <strong className="font-semibold text-gray-900 dark:text-white">
                      Technical Expertise:
                    </strong>
                    <ul className="mt-2 list-disc pl-8">
                      <li>
                        Front-End Development: React, Next.js, Vue.js, Remix,
                        CSS/SCSS
                      </li>
                      <li>
                        Back-End & Cloud: AWS, GCP, Vercel, Azure, Node.js,
                        Python
                      </li>
                      <li>
                        DevOps & Architecture: Docker, Kubernetes, GitOps,
                        Serverless
                      </li>
                      <li>
                        Leadership: Team Management, Agile Methodologies,
                        Cross-Functional Collaboration
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src="/profile.jpg"
              alt="Profile"
              className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Career Journey
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              A timeline of my professional experience and growth in the tech
              industry.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-x-4 gap-y-2 lg:flex-row"
                >
                  <div className="flex-none text-2xl font-semibold text-blue-600">
                    {item.year}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {item.company}
                    </div>
                    <div className="mt-1 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What People Say
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-900/5"
              >
                <div>
                  <p className="text-lg leading-6 text-gray-900 dark:text-white">
                    {testimonial.content}
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Let's Work Together
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Interested in collaborating or have a project in mind? I'd love to
              hear from you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get in touch
              </Link>
              <Link
                href="/projects"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                View my work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
