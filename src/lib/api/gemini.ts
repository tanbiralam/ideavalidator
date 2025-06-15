import { GoogleGenerativeAI } from "@google/generative-ai";
import type { GeminiAnalysis } from "../../types";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

const ANALYSIS_PROMPT = `Analyze this SaaS idea and provide structured feedback. Include:
1. Key problem being solved
2. Target market
3. Technical feasibility (0-1 score)
4. Monetization potential (0-1 score)
5. Problem-solution fit (0-1 score)
6. Competitive landscape
7. Key keywords for market research

Format the response as JSON matching this TypeScript interface:
interface GeminiAnalysis {
  keywords: string[];
  problemSolutionFit: number;
  technicalFeasibility: number;
  monetizationPotential: number;
  competitiveLandscape: string;
  suggestedImprovements?: string[];
}`;

export async function analyzeIdea(ideaText: string): Promise<GeminiAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([
    ANALYSIS_PROMPT,
    `Idea: ${ideaText}`,
  ]);

  const response = await result.response;
  const text = response.text();

  try {
    return JSON.parse(text) as GeminiAnalysis;
  } catch (error) {
    throw new Error("Failed to parse Gemini response");
  }
}

export async function generateSummary(
  analysis: GeminiAnalysis,
  painPoints: string[],
  trendStrength: number
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent([
    "Generate a 2-3 sentence summary of this idea analysis. Be direct and actionable.",
    `Analysis: ${JSON.stringify(analysis)}`,
    `Key Pain Points: ${painPoints.join(", ")}`,
    `Market Trend Strength: ${trendStrength}/100`,
  ]);

  const response = await result.response;
  return response.text();
}
