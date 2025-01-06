import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Card from '@/components/Card'

const projects = [
  {
    title: 'Next.js Portfolio Website',
    description: 'A modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.',
    image: '/projects/portfolio.png',
    link: '/projects/portfolio',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Cloud Infrastructure Management',
    description: 'Automated cloud infrastructure management system using Terraform and AWS.',
    image: '/projects/cloud.png',
    link: '/projects/cloud-infrastructure',
    tags: ['AWS', 'Terraform', 'DevOps'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL.',
    image: '/projects/ecommerce.png',
    link: '/projects/ecommerce',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat application with user authentication and message history.',
    image: '/projects/chat.png',
    link: '/projects/chat',
    tags: ['WebSocket', 'React', 'Node.js'],
  },
  {
    title: 'DevOps Pipeline Automation',
    description: 'Automated CI/CD pipeline setup for containerized applications.',
    image: '/projects/devops.png',
    link: '/projects/devops',
    tags: ['Docker', 'Jenkins', 'Kubernetes'],
  },
  {
    title: 'API Gateway Service',
    description: 'Microservices API gateway with rate limiting and authentication.',
    image: '/projects/api.png',
    link: '/projects/api-gateway',
    tags: ['Microservices', 'Node.js', 'Redis'],
  },
]

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

export default function Projects() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />

      <main>
        {/* Header */}
        <div className="px-6 pt-32 sm:pt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Projects</h1>
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
                key={project.title}
                {...project}
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
  )
} 