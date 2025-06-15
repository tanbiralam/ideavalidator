import { ReactNode } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface FeatureCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function FeatureCard({
  title,
  icon,
  className,
  children,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={twMerge(
        "bg-white rounded-2xl shadow-md p-6 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-primary-500">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="text-gray-600">{children}</div>
    </motion.div>
  );
}
