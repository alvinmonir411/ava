import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export default function ArticleCard({ article, featured = false, className = '' }: ArticleCardProps) {
  return (
    <article
      className={`group bg-white rounded-2xl border border-charcoal-light/40 overflow-hidden flex flex-col justify-between legal-card-shadow legal-card-hover hover:border-brass/70 transition-all duration-300 ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8 items-center' : ''
      } ${className}`}
    >
      <div className={`relative overflow-hidden bg-navy/10 ${featured ? 'md:col-span-6 h-64 md:h-full min-h-[260px]' : 'h-52 w-full'}`}>
        <Image
          src={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-navy/90 backdrop-blur-md text-brass-light border border-brass/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </div>

      <div className={`p-6 sm:p-8 flex flex-col justify-between ${featured ? 'md:col-span-6' : 'flex-1'}`}>
        <div>
          <div className="flex items-center gap-4 text-xs text-charcoal-muted mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brass" />
              {formatDate(article.published_at.toString())}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brass" />
              {article.read_time}
            </span>
          </div>

          <h3 className={`font-serif font-bold text-navy mb-3 group-hover:text-brass-dark transition-colors duration-200 line-clamp-2 ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
          <span className="text-xs font-medium text-charcoal-muted">
            By <strong className="text-navy">{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy group-hover:text-brass transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
