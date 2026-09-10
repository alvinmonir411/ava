import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Scale, LucideIcon } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
  breadcrumbs?: BreadcrumbItem[];
  bgImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  badge = 'Advocates & Solicitors • High Court of Malaya',
  badgeIcon: BadgeIcon = Scale,
  breadcrumbs = [{ label: 'Home', href: '/' }],
  bgImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85',
}: PageHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#070e1e] via-[#0f1738] to-[#1c0c30] text-[#faf7fc] py-14 sm:py-18 overflow-hidden border-b border-white/10">
      {/* Background Image with Enhanced Visibility and Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80 sm:opacity-85 brightness-95 contrast-105"
        />
        {/* Directional gradient protecting text readability while keeping the image fully visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e1e]/95 via-[#0f1738]/85 to-[#1c0c30]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e]/95 via-transparent to-[#1c0c30]/35" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 mb-4" aria-label="Breadcrumb">
              {breadcrumbs.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors truncate max-w-[200px]">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium truncate max-w-[200px]">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
              <ChevronRight className="w-3.5 h-3.5 text-white/30 shrink-0" />
              <span className="text-purple-200 font-medium truncate max-w-[240px]">{title}</span>
            </nav>
          )}

          {/* Badge Pill */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-gradient-to-r from-[#0F1F3D]/90 via-[#1E1B4B]/90 to-[#2E1065]/90 text-white text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] mb-3 shadow-xs max-w-full backdrop-blur-md">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
              <span className="truncate">{badge}</span>
            </div>
          )}

          {/* Large Serif Title */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-3 drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="font-serif italic text-purple-100/90 text-sm sm:text-lg max-w-2xl leading-relaxed">
              &ldquo;{subtitle}&rdquo;
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
