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
      className={`group bg-white rounded-lg border border-[#e8e1d5] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#c6a052] hover:shadow-md ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8 items-center ring-1 ring-[#c6a052]/30' : 'shadow-xs'
      } ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#1a2332] ${featured ? 'md:col-span-6 h-64 md:h-full min-h-[260px]' : 'h-52 w-full'}`}>
        <Image
          src={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101826]/70 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#1a2332]/90 text-[#dcc280] border border-[#c6a052]/40 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
            {article.category}
          </span>
        </div>
      </div>

      <div className={`p-6 flex flex-col justify-between ${featured ? 'md:col-span-6' : 'flex-1'}`}>
        <div>
          <div className="flex items-center gap-4 text-xs text-[#6b7280] mb-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c6a052]" />
              {formatDate(article.published_at.toString())}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c6a052]" />
              {article.read_time}
            </span>
          </div>

          <h3 className={`font-serif font-bold text-[#1a2332] mb-2.5 group-hover:text-[#9d7835] transition-colors line-clamp-2 leading-snug ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-[#4b5563] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-[#6b7280]">
            By <strong className="text-[#1a2332]">{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1a2332] group-hover:text-[#9d7835] transition-colors uppercase tracking-wider"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c6a052] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
