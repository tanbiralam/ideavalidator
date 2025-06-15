import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";

interface IdeaFormProps {
  onSubmit: (idea: string) => Promise<void>;
}

const MAX_CHARS = 300;

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [idea, setIdea] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const charCount = idea.length;
  const isOverLimit = charCount > MAX_CHARS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverLimit || !idea.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(idea);
      setIdea(""); // Clear form on success
    } catch (error) {
      console.error("Failed to submit idea:", error);
      // You might want to show an error toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label
          htmlFor="idea"
          className="block text-lg font-medium text-gray-700"
        >
          Describe your SaaS idea
        </label>
        <p className="text-sm text-gray-500">
          Keep it concise (1-3 sentences). Focus on the core problem and
          solution.
        </p>
        <div className="relative">
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A platform that helps indie hackers validate their startup ideas using AI, Reddit discussions, and market trends..."
            className="w-full h-32 px-4 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            disabled={isSubmitting}
          />
          <div
            className={`absolute bottom-2 right-2 text-sm ${
              isOverLimit ? "text-red-500" : "text-gray-500"
            }`}
          >
            {charCount}/{MAX_CHARS}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isOverLimit || !idea.trim() || isSubmitting}
          isLoading={isSubmitting}
        >
          Analyze Idea
        </Button>
      </div>
    </motion.form>
  );
}
