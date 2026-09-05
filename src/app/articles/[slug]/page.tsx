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
      title: 'Article Not Found | LWCCO',
      description: 'The requested legal article could not be found.',
    });
  }

  return constructMetadata({
    title: `${article.title} | LWCCO`,
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
      <section className="bg-navy text-cream py-16 sm:py-20 border-b border-brass/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#B8935A_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-cream/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brass-light transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brass/60" />
            <Link href="/articles" className="hover:text-brass-light transition-colors">Articles</Link>
            <ChevronRight className="w-3.5 h-3.5 text-brass/60" />
            <span className="text-brass-light font-medium truncate">{article.category}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass/20 text-brass-light border border-brass/30 text-xs font-bold uppercase tracking-wider mb-4">
            <span>{article.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-cream/80 pt-4 border-t border-brass/20">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brass" />
              <span>By <strong className="text-cream">{article.author}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brass" />
              <span>{formatDate(article.published_at.toString())}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brass" />
              <span>{article.read_time}</span>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Article Body Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cover Image */}
          {article.cover_image_url && (
            <div className="relative h-[320px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-xl mb-12 border border-charcoal-light/30">
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          )}

          {/* Formatted Markdown/Text Content */}
          <div className="prose prose-lg max-w-none text-charcoal leading-relaxed space-y-6 font-light">
            {article.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-navy pt-6 pb-2 border-b border-cream-dark">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="font-serif text-xl sm:text-2xl font-bold text-navy pt-4">
                    {block.replace('#### ', '')}
                  </h4>
                );
              }
              if (block.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="border-l-4 border-brass pl-6 py-3 my-6 bg-cream rounded-r-xl italic font-serif text-base sm:text-lg text-navy">
                    {block.replace('> ', '')}
                  </blockquote>
                );
              }
              if (block.startsWith('- ')) {
                const listItems = block.split('\n').map((li) => li.replace('- ', ''));
                return (
                  <ul key={idx} className="space-y-2.5 my-4 pl-0 list-none">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-3 text-base text-charcoal">
                        <span className="w-2 h-2 rounded-full bg-brass mt-2 shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-base sm:text-lg leading-relaxed text-charcoal">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-cream-dark flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mr-2">
                Topics:
              </span>
              {article.tags.map((tag: string, tIdx: number) => (
                <span
                  key={tIdx}
                  className="bg-cream px-3 py-1 rounded-full text-xs text-navy font-semibold border border-charcoal-light/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Card Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-cream border border-brass/30 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-brass">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                alt="Ava Rachel Low"
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brass-dark">Author & Managing Counsel</span>
              <h4 className="font-serif text-xl font-bold text-navy mt-0.5">
                Low Wah Chin (Ava Rachel)
              </h4>
              <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                Advocate & Solicitor of the High Court of Malaya • Barrister-at-Law, Lincoln’s Inn, London. 15+ years of litigation and appellate experience in civil, banking, corporate, and personal injury law.
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <Link
                  href="/contact"
                  className="btn-brass px-4 py-2 rounded-lg text-xs font-bold"
                >
                  Request Case Review
                </Link>
                <WhatsAppButton variant="compact" label="Direct WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-cream border-t border-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-navy">
                Related Legal Publications
              </h3>
              <Link
                href="/articles"
                className="text-xs font-bold text-brass-dark hover:underline"
              >
                View All Articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      <section className="py-20 bg-navy text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-cream">
              Have Questions Regarding This Legal Topic?
            </h2>
            <p className="text-cream/80 text-sm mt-2">
              Book a confidential consultation with senior counsel at LWCCO.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
