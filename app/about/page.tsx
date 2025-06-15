"use client";

import FeatureCard from "@/src/components/ui/FeatureCard";
import { motion } from "framer-motion";
import Layout from "../layout";

export default function AboutPage() {
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
            How IdeaValidator Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            We combine AI analysis, real user feedback, and market data to give
            you actionable insights about your SaaS idea.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            title="1. AI Analysis"
            icon={
              <span role="img" aria-label="robot">
                🤖
              </span>
            }
          >
            <p>
              We use Gemini AI to analyze your idea across multiple dimensions:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Problem-solution fit assessment</li>
              <li>• Technical feasibility analysis</li>
              <li>• Monetization potential evaluation</li>
              <li>• Competitive landscape overview</li>
            </ul>
          </FeatureCard>

          <FeatureCard
            title="2. Reddit Insights"
            icon={
              <span role="img" aria-label="comments">
                💬
              </span>
            }
          >
            <p>
              We scan relevant subreddits to find real user pain points and
              discussions:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Analysis of user frustrations</li>
              <li>• Sentiment analysis of discussions</li>
              <li>• Identification of market gaps</li>
              <li>• Validation of problem existence</li>
            </ul>
          </FeatureCard>

          <FeatureCard
            title="3. Market Trends"
            icon={
              <span role="img" aria-label="chart">
                📈
              </span>
            }
          >
            <p>We analyze Google Trends data to understand market interest:</p>
            <ul className="mt-4 space-y-2">
              <li>• Historical interest trends</li>
              <li>• Growth rate analysis</li>
              <li>• Seasonal patterns</li>
              <li>• Geographic distribution</li>
            </ul>
          </FeatureCard>

          <FeatureCard
            title="4. Final Verdict"
            icon={
              <span role="img" aria-label="checkmark">
                ✅
              </span>
            }
          >
            <p>We combine all data points to generate actionable insights:</p>
            <ul className="mt-4 space-y-2">
              <li>• Market fit score (0-100)</li>
              <li>• Build/Refine/Avoid recommendation</li>
              <li>• Specific improvement suggestions</li>
              <li>• Next steps guidance</li>
            </ul>
          </FeatureCard>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-2xl p-8 mt-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Powered by Modern Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-2">AI & Analysis</h3>
              <p className="text-gray-600">
                We use Google&apos;s Gemini AI for deep analysis and natural
                language understanding.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Sources</h3>
              <p className="text-gray-600">
                Real-time data from Reddit API and Google Trends provides market
                validation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Infrastructure</h3>
              <p className="text-gray-600">
                Built on Next.js and Supabase for reliability and speed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
