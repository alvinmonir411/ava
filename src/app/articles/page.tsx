import React from 'react';
import Image from 'next/image';
import { getArticles } from '@/db';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import SectionHeading from '@/components/common/SectionHeading';
import ArticleCard from '@/components/cards/ArticleCard';
import TrustBar from '@/components/common/TrustBar';
import { BookOpen, Sparkles, Award, FileText } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Malaysian Legal Insights, Articles & Industry Reviews | Low, Wah Chin & Co.',
  description: 'Read legal analysis, industry recognitions, and statutory guides on Personal Injury, Property Conveyancing, Divorce, and Commercial Litigation in Malaysia by Low, Wah Chin & Co.',
  canonicalUrl: `${SITE_CONFIG.url}/articles`,
});

export default async function ArticlesPage() {
  const articles = await getArticles();
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Articles', url: `${SITE_CONFIG.url}/articles` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Header */}
      <section className="relative bg-[#170b1e] text-[#faf9f6] py-20 sm:py-28 overflow-hidden border-b border-[#c6a052]/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=85"
            alt="Messrs. Low, Wah Chin & Co. Legal Publications"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65 brightness-95 contrast-105 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Legal Insights & Accolades</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf9f6] mb-4">
            Articles & Legal Publications
          </h1>
          <p className="font-serif italic text-[#e5c777] text-lg sm:text-xl mb-4">
            &ldquo;Practical Legal Knowledge, Courtroom Precedents & Industry Commendations&rdquo;
          </p>
          <p className="text-[#faf9f6]/85 text-base sm:text-lg leading-relaxed font-light">
            Stay informed with authoritative legal commentary, statutory guides, and independent recognition of Messrs. Low, Wah Chin & Co.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main Articles Listing */}
      <section className="py-20 md:py-28 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-[#c6a052]" />
                <span>Featured Publication</span>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}

          {/* Regular Articles Grid */}
          <SectionHeading
            badge="All Publications"
            title="Recent Legal Commentary & Guides"
            subtitle="Explore our library of legal guides written for Malaysian citizens, property owners, and business operators."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
