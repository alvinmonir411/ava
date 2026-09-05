import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  alignment = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
          light 
            ? 'bg-brass/20 text-brass-light border border-brass/30' 
            : 'bg-brass/10 text-brass-dark border border-brass/25'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brass"></span>
          {badge}
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
        light ? 'text-cream' : 'text-navy'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          light ? 'text-cream/80' : 'text-charcoal-muted'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-0.5 w-16 bg-brass ${isCenter ? 'mx-auto' : ''}`} />
    </div>
  );
}
