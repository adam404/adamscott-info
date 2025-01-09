import Navigation from "@/components/Navigation";
import Card from "@/components/Card";
import { getAllPosts } from "@/lib/content";
import ClientBlog from "@/components/blog/ClientBlog";

export const revalidate = 3600; // Revalidate every hour

export default async function Blog() {
  const posts = await getAllPosts();
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  return (
    <div className="bg-background min-h-screen">
      <Navigation forceWhiteBackground />
      <ClientBlog initialPosts={posts} initialTags={allTags} />
    </div>
  );
}
