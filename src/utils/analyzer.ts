import { analyzeIdea, generateSummary } from "../lib/api/gemini";
import { searchRedditPosts } from "../lib/api/reddit";
import { analyzeTrends } from "../lib/api/trends";
import { storeIdea } from "../lib/supabase/client";
import { AnalysisResult } from "../types";
import { calculateScore, getVerdict } from "./scoring";

export async function analyzeIdeaFlow(
  ideaText: string
): Promise<AnalysisResult> {
  // Step 1: Get AI analysis and keywords
  const geminiAnalysis = await analyzeIdea(ideaText);

  // Step 2: Parallel processing of Reddit and Trends data
  const [painPoints, trendData] = await Promise.all([
    searchRedditPosts(geminiAnalysis.keywords),
    analyzeTrends(geminiAnalysis.keywords),
  ]);

  // Step 3: Calculate score and verdict
  const score = calculateScore(geminiAnalysis, painPoints, trendData);
  const verdict = getVerdict(score);

  // Step 4: Generate summary
  const summary = await generateSummary(
    geminiAnalysis,
    painPoints.map((p) => p.text),
    trendData[0]?.avgInterest ?? 0
  );

  // Step 5: Store in Supabase
  const timestamp = new Date();
  await storeIdea({
    text: ideaText,
    score,
    verdict,
    summary,
    timestamp,
  });

  // Step 6: Return complete analysis
  return {
    idea: {
      text: ideaText,
      score,
      verdict,
      timestamp,
    },
    geminiAnalysis,
    painPoints,
    trendData,
    summary,
    score,
    verdict,
    timestamp,
  };
}

export function formatScore(score: number): string {
  return `${score}/100`;
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-500";
  if (score >= 40) return "text-yellow-500";
  return "text-red-500";
}

export function getVerdictEmoji(verdict: string): string {
  switch (verdict) {
    case "Build It":
      return "✅";
    case "Needs Refinement":
      return "🟡";
    case "Avoid for Now":
      return "❌";
    default:
      return "❓";
  }
}
