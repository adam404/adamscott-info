"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAnimate, motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

interface HeroProps {
  news: NewsItem[];
}

export default function Hero({ news }: HeroProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        duration: 0.5,
      }
    );
  }, [animate]);

  return (
    <div className="relative isolate overflow-hidden hero">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div
          ref={scope}
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
        >
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="/about" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                Engineering Manager @ Stealth Startup
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Software Engineer & Technical Leader
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I build scalable web applications and lead technical teams to
            deliver exceptional digital experiences.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary/90"
            >
              Get in touch
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-solid border-border transition-colors flex items-center justify-center hover:bg-accent hover:text-accent-foreground text-sm font-semibold leading-6 px-4 py-2.5"
            >
              View projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mt-0 xl:ml-32">
          <h2 className="text-lg sm:text-2xl lg:text-sm font-semibold mb-4 text-foreground lg:text-muted-foreground">
            In The News
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-[240px] scrollbar-none hover:scrollbar pb-4 lg:pb-0 lg:flex-col">
            {news.map((item, index) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col overflow-hidden rounded-lg shadow-sm bg-card hover:bg-card/80 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="h-32 relative">
                  <Image
                    src={item.urlToImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <p className="text-[10px] text-muted-foreground">
                    {format(new Date(item.publishedAt), "MMM d, yyyy")}
                  </p>
                  <h3 className="text-xs font-medium mt-1 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
