import { motion } from "framer-motion";
import type { AnalysisResult } from "../types";
import FeatureCard from "./ui/FeatureCard";
import { formatScore, getScoreColor, getVerdictEmoji } from "../utils/analyzer";

interface ResultReportProps {
  result: AnalysisResult;
}

export default function ResultReport({ result }: ResultReportProps) {
  const {
    idea,
    geminiAnalysis,
    painPoints,
    trendData,
    summary,
    score,
    verdict,
  } = result;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* Summary Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Analysis Complete</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{summary}</p>

        <div className="flex items-center justify-center gap-4">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {formatScore(score)}
          </div>
          <div className="text-2xl">
            {getVerdictEmoji(verdict)} {verdict}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem-Solution Fit */}
        <FeatureCard
          title="Problem-Solution Fit"
          icon={
            <span role="img" aria-label="target">
              🎯
            </span>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Fit Score</span>
              <span className="font-semibold">
                {Math.round(geminiAnalysis.problemSolutionFit * 100)}%
              </span>
            </div>
            <p>{geminiAnalysis.competitiveLandscape}</p>
          </div>
        </FeatureCard>

        {/* Technical Feasibility */}
        <FeatureCard
          title="Technical Analysis"
          icon={
            <span role="img" aria-label="gear">
              ⚙️
            </span>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Technical Feasibility</span>
              <span className="font-semibold">
                {Math.round(geminiAnalysis.technicalFeasibility * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Monetization Potential</span>
              <span className="font-semibold">
                {Math.round(geminiAnalysis.monetizationPotential * 100)}%
              </span>
            </div>
          </div>
        </FeatureCard>

        {/* Market Pain Points */}
        <FeatureCard
          title="Market Pain Points"
          icon={
            <span role="img" aria-label="magnifying-glass">
              🔍
            </span>
          }
        >
          <ul className="space-y-3">
            {painPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary-500">•</span>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </FeatureCard>

        {/* Market Trends */}
        <FeatureCard
          title="Market Interest"
          icon={
            <span role="img" aria-label="chart">
              📈
            </span>
          }
        >
          <div className="space-y-4">
            {trendData.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>{trend.keyword}</span>
                  <span className="font-semibold">
                    {trend.avgInterest}% interest
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Growth rate: {(trend.growth * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>

      {/* Suggested Improvements */}
      {geminiAnalysis.suggestedImprovements &&
        geminiAnalysis.suggestedImprovements.length > 0 && (
          <FeatureCard
            title="Suggested Improvements"
            icon={
              <span role="img" aria-label="bulb">
                💡
              </span>
            }
            className="col-span-full"
          >
            <ul className="space-y-2">
              {geminiAnalysis.suggestedImprovements.map(
                (improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{improvement}</span>
                  </li>
                )
              )}
            </ul>
          </FeatureCard>
        )}
    </motion.div>
  );
}
