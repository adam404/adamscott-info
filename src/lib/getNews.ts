import { unstable_cache } from "next/cache";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

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
    .filter(
      (article: NewsItem) =>
        article.title &&
        article.title !== "[Removed]" &&
        !article.title.includes("The Verge") &&
        article.description &&
        article.url &&
        article.publishedAt &&
        article.urlToImage &&
        !article.title.toLowerCase().includes("trump") &&
        !article.description.toLowerCase().includes("trump") &&
        !article.title.toLowerCase().includes("politic") &&
        !article.description.toLowerCase().includes("politic")
    )
    .slice(0, 3);
};

export const getNews = unstable_cache(
  async () => fetchNews(),
  ["news-cache"],
  { revalidate: 900 } // 15 minutes cache
);
