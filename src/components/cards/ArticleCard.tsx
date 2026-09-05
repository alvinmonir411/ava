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
      className={`group bg-white rounded-2xl border border-[#e8e1d5] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#c6a052] hover:shadow-xl ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8 items-center ring-1 ring-[#c6a052]/40' : 'shadow-sm'
      } ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#170b1e] ${featured ? 'md:col-span-6 h-64 md:h-full min-h-[260px]' : 'h-52 w-full'}`}>
        <Image
          src={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#170b1e]/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-[#170b1e]/90 backdrop-blur-md text-[#e5c777] border border-[#c6a052]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      <div className={`p-6 sm:p-8 flex flex-col justify-between ${featured ? 'md:col-span-6' : 'flex-1'}`}>
        <div>
          <div className="flex items-center gap-4 text-xs text-[#595355] mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c6a052]" />
              {formatDate(article.published_at.toString())}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#c6a052]" />
              {article.read_time}
            </span>
          </div>

          <h3 className={`font-serif font-bold text-[#22122b] mb-3 group-hover:text-[#9d7835] transition-colors duration-200 line-clamp-2 leading-snug ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-[#595355] text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-[#f3efe6] flex items-center justify-between">
          <span className="text-xs font-medium text-[#595355]">
            By <strong className="text-[#22122b]">{article.author}</strong>
          </span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22122b] group-hover:text-[#9d7835] transition-colors"
          >
            <span>Read Publication</span>
            <ArrowRight className="w-4 h-4 text-[#c6a052] group-hover:translate-x-1.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
}
