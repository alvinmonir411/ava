import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/db';
import { constructMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import ArticleCard from '@/components/cards/ArticleCard';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { BookOpen, Sparkles, Award, Scale, ArrowRight, ShieldCheck } from 'lucide-react';

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
      <section className="py-20 lg:py-28 bg-[#faf7fc] text-[#1e0d33] border-b border-[#ebdff5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Principal Author & Editorial Leadership Banner */}
          <div className="mb-16 p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo Frame */}
              <div className="md:col-span-4 lg:col-span-3 flex justify-center">
                <div className="relative w-48 h-56 sm:w-52 sm:h-64 rounded-xl overflow-hidden border-2 border-indigo-400 shadow-md bg-[#120720] group">
                  <Image
                    src="/lawyer-portrait-3.jpg"
                    alt="Low Wah Chin (Ava Rachel) 劉華晶 Principal Legal Author"
                    fill
                    sizes="(max-width: 768px) 192px, 208px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120720]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[#faf7fc] text-[10px] font-mono bg-[#1e0d33]/90 py-0.5 rounded border border-white/20">
                    Principal Legal Author
                  </div>
                </div>
              </div>

              {/* Author Details & Bio */}
              <div className="md:col-span-8 lg:col-span-9 space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider">
                  <Scale className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Senior Counsel Commentary</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e0d33]">
                  Legal Commentary by Low Wah Chin (Ava Rachel) 劉華晶
                </h3>
                
                <p className="text-xs sm:text-sm text-[#594d63] leading-relaxed max-w-3xl">
                  Lincoln’s Inn Barrister & Advocate & Solicitor of the High Court of Malaya. Delivering authoritative analysis on Malaysian jurisprudence, corporate commercial contract structuring, conveyancing regulations, and courtroom dispute precedents.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Link
                    href="/our-team"
                    className="btn-gradient-royal px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>View Principal Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <WhatsAppButton variant="compact" label="Inquire on Case Merits" />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Article Spotlight */}
          {featuredArticle && (
            <div className="mb-16">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Featured Publication</span>
              </div>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}

          {/* All Articles Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>All Publications</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e0d33]">
              Recent Legal Commentary & Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#594d63] mt-2 font-light">
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
