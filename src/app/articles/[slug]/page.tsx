import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getArticleBySlug } from '@/db';
import { constructMetadata, getBreadcrumbSchema, getArticleSchema, SITE_CONFIG } from '@/lib/metadata';
import JsonLd from '@/components/common/JsonLd';
import ArticleCard from '@/components/cards/ArticleCard';
import ConsultationForm from '@/components/forms/ConsultationForm';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import TrustBar from '@/components/common/TrustBar';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowRight,
  Shield,
  Share2,
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
      title: 'Article Not Found | Low, Wah Chin & Co.',
      description: 'The requested legal article could not be found.',
    });
  }

  return constructMetadata({
    title: `${article.title} | Low, Wah Chin & Co.`,
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

      {/* Article Header */}
      <section className="bg-[#170b1e] text-[#faf9f6] py-16 sm:py-24 border-b border-[#c6a052]/30 relative overflow-hidden">
        {article.cover_image_url && (
          <div className="absolute inset-0 z-0">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-65 brightness-95 contrast-105 scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#170b1e]/90 via-[#22122b]/70 to-[#170b1e]/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e] via-transparent to-[#170b1e]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#faf9f6]/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#e5c777] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c6a052]/60" />
            <Link href="/articles" className="hover:text-[#e5c777] transition-colors">Articles</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#c6a052]/60" />
            <span className="text-[#e5c777] font-medium truncate">{article.category}</span>
          </nav>

          <div className="inline-block bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {article.category}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#faf9f6]/80 pt-4 border-t border-[#c6a052]/25">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#c6a052]" />
              <span>By <strong className="text-white">{article.author}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c6a052]" />
              <span>{formatDate(article.published_at.toString())}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c6a052]" />
              <span>{article.read_time}</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Main Article Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Lead / Excerpt */}
          <div className="p-6 sm:p-8 bg-[#faf9f6] rounded-2xl border-l-4 border-[#c6a052] mb-10 shadow-sm border border-[#e8e1d5]">
            <p className="font-serif italic text-base sm:text-lg text-[#22122b] leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Body Prose */}
          <div className="prose prose-lg text-[#231f20] leading-relaxed space-y-6">
            {article.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl font-bold text-[#22122b] pt-4">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-serif text-xl font-bold text-[#22122b] pt-2">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-[#c6a052] pl-4 py-2 italic text-[#22122b] bg-[#faf9f6] my-4 rounded-r-lg">
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
                <p key={idx} className="text-base sm:text-lg leading-relaxed text-[#231f20]" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-8 mt-12 border-t border-[#e8e1d5] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#595355] uppercase tracking-wider mr-2">Topic Tags:</span>
              {article.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="bg-[#faf9f6] text-[#22122b] text-xs font-medium px-3 py-1.5 rounded-lg border border-[#e8e1d5]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Callout */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#22122b] text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl border border-[#c6a052]/40">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#c6a052]">
              <Image
                src="/profile-image.avif"
                alt={article.author}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs text-[#e5c777] uppercase font-bold tracking-wider block mb-1">
                Author & Legal Counsel
              </span>
              <h4 className="font-serif text-xl font-bold text-white mb-1">
                {article.author}
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Advocate & Solicitor of the High Court of Malaya and Lincoln’s Inn Barrister (London, UK). Providing fearless advocacy and compassionate legal counsel in Kuala Lumpur.
              </p>
            </div>
            <WhatsAppButton variant="compact" label="Inquire Direct" />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-[#faf9f6] border-t border-[#c6a052]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl font-bold text-[#22122b] mb-8 text-center">
              More Legal Insights & Commentary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-20 bg-[#170b1e] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
