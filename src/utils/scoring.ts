import type {
  GeminiAnalysis,
  PainPoint,
  TrendResult,
  VerdictType,
} from "../types";

interface ScoreWeights {
  problemSolutionFit: number;
  technicalFeasibility: number;
  monetizationPotential: number;
  painPoints: number;
  marketTrends: number;
}

const DEFAULT_WEIGHTS: ScoreWeights = {
  problemSolutionFit: 0.3, // 30% - Most important
  technicalFeasibility: 0.2, // 20% - Important but not critical
  monetizationPotential: 0.2, // 20% - Equal to technical feasibility
  painPoints: 0.15, // 15% - Real user pain validation
  marketTrends: 0.15, // 15% - Market interest validation
};

export function calculateScore(
  analysis: GeminiAnalysis,
  painPoints: PainPoint[],
  trends: TrendResult[],
  weights: ScoreWeights = DEFAULT_WEIGHTS
): number {
  // Normalize all scores to 0-100 range
  const scores = {
    problemSolutionFit: analysis.problemSolutionFit * 100,
    technicalFeasibility: analysis.technicalFeasibility * 100,
    monetizationPotential: analysis.monetizationPotential * 100,
    painPoints: calculatePainPointScore(painPoints),
    marketTrends: calculateTrendScore(trends),
  };

  // Calculate weighted average
  const totalScore = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + scores[key as keyof typeof scores] * weight;
  }, 0);

  // Round to nearest integer
  return Math.round(totalScore);
}

function calculatePainPointScore(painPoints: PainPoint[]): number {
  if (painPoints.length === 0) return 0;

  // Average of relevance scores (0-1) * 100
  const relevanceScore =
    (painPoints.reduce((sum, point) => sum + point.relevance, 0) /
      painPoints.length) *
    100;

  // Average sentiment (-1 to 1) mapped to 0-100
  const sentimentScore =
    (painPoints.reduce((sum, point) => sum + point.sentiment, 0) /
      painPoints.length +
      1) *
    50;

  // Weight relevance more than sentiment
  return relevanceScore * 0.7 + sentimentScore * 0.3;
}

function calculateTrendScore(trends: TrendResult[]): number {
  if (trends.length === 0) return 0;

  return (
    trends.reduce((sum, trend) => {
      const interestScore = trend.avgInterest; // Already 0-100
      const growthScore = (trend.growth + 1) * 50; // Map -1 to 1 range to 0-100
      return sum + (interestScore * 0.6 + growthScore * 0.4);
    }, 0) / trends.length
  );
}

export function getVerdict(score: number): VerdictType {
  if (score >= 70) return "Build It";
  if (score >= 40) return "Needs Refinement";
  return "Avoid for Now";
}
