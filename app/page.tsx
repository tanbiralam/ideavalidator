"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IdeaForm from "../src/components/IdeaForm";
import ResultReport from "../src/components/ResultReport";
import { AnalysisResult } from "../src/types";
import { analyzeIdeaFlow } from "../src/utils/analyzer";
import Layout from "../src/components/Layout";

export default function HomePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (idea: string) => {
    try {
      setError(null);
      const analysisResult = await analyzeIdeaFlow(idea);
      setResult(analysisResult);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to analyze idea. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900"
          >
            Validate Your SaaS Idea
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get instant feedback on your startup idea using AI analysis, real
            user pain points, and market trend data.
          </motion.p>
        </div>

        {/* Form Section */}
        <IdeaForm onSubmit={handleSubmit} />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-600 p-4 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Results Section */}
        {result && <ResultReport result={result} />}

        {/* Features Grid */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="text-center space-y-3">
              <span role="img" aria-label="ai" className="text-4xl">
                🤖
              </span>
              <h3 className="text-lg font-semibold">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Get deep insights into your idea&apos;s potential using Gemini
                AI.
              </p>
            </div>

            <div className="text-center space-y-3">
              <span role="img" aria-label="comments" className="text-4xl">
                💬
              </span>
              <h3 className="text-lg font-semibold">Real User Feedback</h3>
              <p className="text-gray-600">
                Discover actual pain points from Reddit discussions.
              </p>
            </div>

            <div className="text-center space-y-3">
              <span role="img" aria-label="chart" className="text-4xl">
                📈
              </span>
              <h3 className="text-lg font-semibold">Market Trends</h3>
              <p className="text-gray-600">
                See interest trends and growth potential over time.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
