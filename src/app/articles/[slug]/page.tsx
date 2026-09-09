import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getArticleBySlug } from '@/db';
import { constructMetadata, getBreadcrumbSchema, getArticleSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import PageHero from '@/components/layout/PageHero';
import ArticleCard from '@/components/cards/ArticleCard';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowRight,
  Shield,
  Share2,
  BookOpen,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found | Messrs. Low Wah Chin & Co.',
      description: 'The requested legal article could not be found.',
    });
  }

  return constructMetadata({
    title: `${article.title} | Messrs. Low Wah Chin & Co.`,
    description: article.excerpt,
    canonicalUrl: `${SITE_CONFIG.url}/articles/${article.slug}`,
    ogImage: article.cover_image_url || undefined,
  });
}

export default async function IndividualArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Articles', url: `${SITE_CONFIG.url}/articles` },
    { name: article.title, url: `${SITE_CONFIG.url}/articles/${article.slug}` },
  ]);

  const articleSchema = getArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    url: `${SITE_CONFIG.url}/articles/${article.slug}`,
    publishedAt: article.published_at.toString(),
    author: article.author,
    imageUrl: article.cover_image_url || undefined,
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, articleSchema]} />

      {/* Article Page Hero */}
      <PageHero
        title={article.title}
        subtitle={`Published on ${formatDate(article.published_at.toString())} · ${article.read_time}`}
        badge={article.category}
        badgeIcon={BookOpen}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles' },
        ]}
        bgImage={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85'}
      />

      {/* Main Article Content (Light Section) */}
      <section className="py-20 lg:py-28 bg-[#faf9f6] text-[#231f20] border-b border-[#e5e7eb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Lead / Excerpt */}
          <div className="p-6 sm:p-8 bg-white rounded-lg border-l-4 border-[#c6a052] mb-10 shadow-xs border border-[#e8e1d5]">
            <p className="font-serif italic text-base sm:text-lg text-[#1a2332] leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Body Prose */}
          <div className="bg-white p-6 sm:p-10 rounded-lg border border-[#e8e1d5] shadow-xs space-y-6 text-[#374151] leading-relaxed">
            {article.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl font-bold text-[#1a2332] pt-4 border-b border-gray-100 pb-2">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-serif text-lg font-bold text-[#1a2332] pt-2">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-[#c6a052] pl-4 py-2 italic text-[#1a2332] bg-[#faf9f6] my-4 rounded-r-md">
                    {block.replace('> ', '').replace(/\*/g, '')}
                  </blockquote>
                );
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n- ');
                return (
                  <ul key={idx} className="space-y-2 text-sm sm:text-base pl-0 list-none my-4">
                    {items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] mt-2 shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-base sm:text-lg leading-relaxed text-[#374151]" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
              );
            })}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 mt-8 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider mr-2">Topic Tags:</span>
                {article.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="bg-[#faf9f6] text-[#1a2332] text-xs font-medium px-2.5 py-1 rounded border border-[#e8e1d5]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author Bio Callout */}
          <div className="mt-10 p-6 sm:p-8 rounded-lg bg-[#1a2332] text-white flex flex-col sm:flex-row items-center gap-6 shadow-md border border-[#c6a052]/40">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c6a052]">
              <Image
                src="/lawyer-portrait-1.jpg"
                alt={article.author}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-[10px] text-[#dcc280] uppercase font-bold tracking-wider block mb-1">
                Author & Legal Counsel
              </span>
              <h4 className="font-serif text-lg font-bold text-white mb-1">
                {article.author}
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Advocate & Solicitor of the High Court of Malaya and Lincoln’s Inn Barrister (London, UK). Providing fearless advocacy and compassionate legal counsel in Kuala Lumpur.
              </p>
            </div>
            <WhatsAppButton variant="compact" label="Inquire Direct" />
          </div>
        </div>
      </section>

      {/* Related Articles (Alternating Section) */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white border-t border-[#e5e7eb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl font-bold text-[#1a2332] mb-8 text-center">
              More Legal Insights & Commentary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form (Dark Section) */}
      <section className="py-20 bg-[#1a2332] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Request a Legal Consultation
            </h3>
            <p className="text-xs text-[#faf9f6]/75">
              Strictly confidential communications under Legal Professional Privilege.
            </p>
          </div>
          <div className="bg-white text-[#231f20] p-6 sm:p-8 rounded-lg shadow-xl">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
