"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectVideo from "./ProjectVideo";

interface CardProps {
  title: string;
  description: string;
  image: string;
  video?: string;
  link: string;
  date?: string;
  tags?: string[];
  type: "project" | "post";
}

export default function Card({
  title,
  description,
  image,
  video,
  link,
  date,
  tags,
  type,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg"
    >
      <div className="flex-shrink-0">
        <Link href={link} aria-label={`View ${title}`}>
          {type === "project" ? (
            <ProjectVideo video={video} image={image} title={title} />
          ) : (
            <Image
              className="h-48 w-full object-cover transition-transform hover:scale-105"
              src={image}
              alt={`Cover image for ${title}`}
              width={500}
              height={300}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex-1">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Link href={link} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </Link>
        </div>
        <div className="mt-6">
          {date && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
          <Link
            href={link}
            className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400"
          >
            {type === "project" ? "View Project" : "Read Post"}
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
