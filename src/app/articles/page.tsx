import React from 'react';
import { getArticles } from '@/db';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import ArticleCard from '@/components/cards/ArticleCard';
import { BookOpen, Sparkles, Award } from 'lucide-react';

import { getFirmSettings } from '@/actions/settingsActions';

export const metadata = constructMetadata({
  title: 'Legal Insights, Articles & Industry Reviews | Messrs. Low Wah Chin & Co.',
  description: 'Read legal analysis, industry recognitions, and statutory guides on Personal Injury, Property Conveyancing, Divorce, and Commercial Litigation in Malaysia by Low, Wah Chin & Co.',
  canonicalUrl: `${SITE_CONFIG.url}/articles`,
});

export default async function ArticlesPage() {
  const settings = await getFirmSettings();
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

      <PageHero
        title="Articles & Legal Commentary"
        subtitle="Practical Legal Knowledge, Courtroom Precedents & Industry Commendations"
        badge="Legal Insights & Accolades"
        badgeIcon={BookOpen}
        breadcrumbs={[{ label: 'Home', href: '/' }]}
        bgImage={settings.heroImages?.articlesHeroImage || "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=85"}
      />

      {/* Main Articles Listing (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article Spotlight */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-4 h-4 text-[#c6a052]" />
                <span>Featured Publication</span>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}

          {/* All Articles Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Award className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>All Publications</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2332]">
              Recent Legal Commentary & Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#4b5563] mt-2 font-light">
              Explore our library of statutory guides and legal analyses for Malaysian citizens, property buyers, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
