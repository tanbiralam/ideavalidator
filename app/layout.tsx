import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaValidator - Validate Your SaaS Ideas",
  description:
    "Validate your SaaS ideas using AI analysis, Reddit discussions, and market trends.",
  keywords: [
    "SaaS",
    "startup",
    "validation",
    "AI",
    "market research",
    "idea validation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
