import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 flex items-center gap-2"
          >
            <span role="img" aria-label="lightbulb">
              💡
            </span>
            IdeaValidator
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/examples"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                IdeaValidator
              </h3>
              <p className="text-gray-600">
                Validate your SaaS ideas with AI, market data, and real user
                insights.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/examples"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Example Ideas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">
                Powered By
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>Gemini AI</li>
                <li>Reddit Data</li>
                <li>Google Trends</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} IdeaValidator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
