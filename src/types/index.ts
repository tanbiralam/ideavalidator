export type VerdictType = "Build It" | "Needs Refinement" | "Avoid for Now";

export interface StoredIdea {
  id: string;
  text: string;
  score: number;
  verdict: VerdictType;
  summary: string;
  timestamp: Date;
}

export interface GeminiAnalysis {
  marketPotential: number;
  technicalComplexity: number;
  competitiveLandscape: number;
  userNeedScore: number;
  uniquenessScore: number;
  reasoning: string[];
}

export interface PainPoint {
  source: string;
  text: string;
  relevance: number;
  sentiment: number;
}

export interface TrendResult {
  keyword: string;
  timelineData: {
    time: string;
    value: number;
  }[];
  avgInterest: number;
  growth: number;
}

export interface AnalysisResult {
  idea: string;
  aiAnalysis: GeminiAnalysis;
  painPoints: string[];
  trendStrength: number;
  summary: string;
  verdict: "Build It" | "Needs Refinement" | "Avoid";
  score: number;
}
