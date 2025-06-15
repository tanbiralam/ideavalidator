import type { PainPoint } from "../../types";

const REDDIT_API_BASE = "https://www.reddit.com";

interface RedditPost {
  data: {
    title: string;
    selftext: string;
    url: string;
    score: number;
    created_utc: number;
  };
}

interface RedditSearchResponse {
  data: {
    children: RedditPost[];
  };
}

export async function searchRedditPosts(
  keywords: string[]
): Promise<PainPoint[]> {
  const searchQuery = keywords.join(" OR ");
  const subreddits = ["SaaS", "startups", "Entrepreneur", "software"];

  const results: PainPoint[] = [];

  for (const subreddit of subreddits) {
    const response = await fetch(
      `${REDDIT_API_BASE}/r/${subreddit}/search.json?q=${encodeURIComponent(
        searchQuery
      )}&sort=relevance&limit=5`,
      {
        headers: {
          "User-Agent": "IdeaValidator/1.0",
        },
      }
    );

    if (!response.ok) continue;

    const data: RedditSearchResponse = await response.json();

    const painPoints = data.data.children
      .filter((post) => post.data.score > 5) // Only posts with some engagement
      .map((post) => ({
        source: `https://reddit.com${post.data.url}`,
        text: post.data.selftext || post.data.title,
        relevance: calculateRelevance(post.data, keywords),
        sentiment: analyzeSentiment(post.data.selftext || post.data.title),
      }));

    results.push(...painPoints);
  }

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 5); // Return top 5 most relevant results
}

function calculateRelevance(
  post: RedditPost["data"],
  keywords: string[]
): number {
  const text = `${post.title} ${post.selftext}`.toLowerCase();
  const keywordMatches = keywords.filter((k) =>
    text.includes(k.toLowerCase())
  ).length;
  const keywordScore = keywordMatches / keywords.length;
  const ageInDays = (Date.now() / 1000 - post.created_utc) / (60 * 60 * 24);
  const recencyScore = Math.max(0, 1 - ageInDays / 365); // Newer is better, max age 1 year

  return keywordScore * 0.7 + recencyScore * 0.3;
}

function analyzeSentiment(text: string): number {
  const positiveWords = [
    "love",
    "great",
    "awesome",
    "perfect",
    "helpful",
    "amazing",
  ];
  const negativeWords = [
    "hate",
    "bad",
    "terrible",
    "awful",
    "useless",
    "horrible",
  ];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter((word) =>
    lowerText.includes(word)
  ).length;
  const negativeCount = negativeWords.filter((word) =>
    lowerText.includes(word)
  ).length;

  if (positiveCount === 0 && negativeCount === 0) return 0;
  return (
    (positiveCount - negativeCount) / Math.max(positiveCount + negativeCount, 1)
  );
}
