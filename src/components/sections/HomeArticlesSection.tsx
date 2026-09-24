import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Article } from '@/types';
import ArticleCard from '@/components/cards/ArticleCard';

interface HomeArticlesSectionProps {
  articles: Article[];
}

export default function HomeArticlesSection({ articles }: HomeArticlesSectionProps) {
  if (!articles || articles.length === 0) return null;
  const displayArticles = articles.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F2] text-[#2B2D33] border-b border-[#E5DFD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D8C7F0] bg-white text-[#4B2A7B] text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#4B2A7B]" />
              <span>Legal Insights & Commentary</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2D33] tracking-tight">
              Latest Articles & Precedents
            </h2>
            <p className="text-sm sm:text-base text-[#2B2D33]/80 mt-3 font-light">
              Clear, practical commentary on Malaysian statutory law, High Court precedents, and practical legal strategies.
            </p>
          </div>

          <div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#4B2A7B] text-[#4B2A7B] hover:bg-[#4B2A7B] hover:text-white bg-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayArticles.map((article) => (
            <ArticleCard key={article.id || article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
