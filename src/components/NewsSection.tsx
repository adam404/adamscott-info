"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Latest News</h2>
        <div className="flex md:grid pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 gap-6 md:grid-cols-3 snap-x snap-mandatory">
          {news.map((item, index) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-card hover:bg-card/80 transition-colors flex-none w-[85vw] sm:w-[60vw] md:w-auto snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={item.urlToImage || "/placeholder-news.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {format(new Date(item.publishedAt), "MMM d, yyyy")}
                </p>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
