"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FeatureCard from "@/src/components/ui/FeatureCard";
import { getExampleIdeas } from "@/src/lib/supabase/client";
import { StoredIdea } from "@/src/types";
import {
  getScoreColor,
  formatScore,
  getVerdictEmoji,
} from "@/src/utils/analyzer";
import Layout from "../layout";

export default function ExamplesPage() {
  const [ideas, setIdeas] = useState<StoredIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExamples() {
      try {
        const examples = await getExampleIdeas(5);
        setIdeas(examples);
      } catch (err) {
        console.error("Failed to load examples:", err);
        setError("Failed to load example ideas. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadExamples();
  }, []);

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
            Validated Ideas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Browse through some recently validated SaaS ideas to see how our
            analysis works.
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-600 p-4 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 gap-8">
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FeatureCard
                title={
                  <div className="flex items-center justify-between">
                    <span>SaaS Idea</span>
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono ${getScoreColor(idea.score)}`}
                      >
                        {formatScore(idea.score)}
                      </span>
                      <span>
                        {getVerdictEmoji(idea.verdict)} {idea.verdict}
                      </span>
                    </div>
                  </div>
                }
              >
                <div className="space-y-4">
                  <p className="text-lg">{idea.text}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(idea.timestamp).toLocaleDateString()}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Analysis Summary</h4>
                    <p>{idea.summary}</p>
                  </div>
                </div>
              </FeatureCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && !error && ideas.length === 0 && (
          <div className="text-center text-gray-500">
            No example ideas available yet.
          </div>
        )}
      </div>
    </Layout>
  );
}
