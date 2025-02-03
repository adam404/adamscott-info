import { unstable_cache } from "next/cache";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

const BLOCKED_TERMS = ["trump", "politic", "proud boys", "nazi"];

const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch,the-verge,wired&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`,
    { next: { revalidate: 900 } } // 15 minutes cache
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();
  return data.articles
    .filter((article: NewsItem) => {
      if (
        !article.title ||
        !article.description ||
        !article.url ||
        !article.publishedAt ||
        !article.urlToImage ||
        article.title === "[Removed]" ||
        article.title.includes("The Verge") ||
        article.urlToImage.toLowerCase().endsWith(".mp4")
      ) {
        return false;
      }

      const contentToCheck = (
        article.title +
        " " +
        article.description
      ).toLowerCase();
      return !BLOCKED_TERMS.some((term) => contentToCheck.includes(term));
    })
    .slice(0, 3);
};

export const getNews = unstable_cache(
  async () => fetchNews(),
  ["news-cache"],
  { revalidate: 900 } // 15 minutes cache
);
