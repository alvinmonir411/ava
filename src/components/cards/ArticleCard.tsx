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
      className={`group bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-indigo-400 hover:shadow-xl ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8 items-center ring-2 ring-indigo-500/40' : 'shadow-xs'
      } ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#0F1F3D] ${featured ? 'md:col-span-6 h-64 md:h-full min-h-[260px]' : 'h-52 w-full'}`}>
        <Image
          src={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e]/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-[#0F1F3D]/95 via-[#1E1B4B]/95 to-[#2E1065]/95 text-white border border-purple-500/40 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      <div className={`p-6 flex flex-col justify-between ${featured ? 'md:col-span-6' : 'flex-1'}`}>
        <div>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              {formatDate(article.published_at.toString())}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {article.read_time}
            </span>
          </div>

          <h3 className={`font-serif font-bold text-[#0F1F3D] mb-2.5 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            By <strong className="text-[#0F1F3D]">{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0F1F3D] group-hover:text-indigo-600 transition-colors uppercase tracking-wider"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
