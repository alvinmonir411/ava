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
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-3.5 shadow-sm ${
          light 
            ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40' 
            : 'bg-[#4B2A7B]/10 text-[#4B2A7B] border border-[#4B2A7B]/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-purple-300' : 'bg-[#4B2A7B]'}`} />
          <span>{badge}</span>
        </div>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] ${
        light ? 'text-[#FAF8F2]' : 'text-[#2B2D33]'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
          light ? 'text-[#FAF8F2]/85 font-light' : 'text-[#2B2D33]/75'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-[2px] w-12 bg-gradient-to-r from-[#4B2A7B] to-[#6A3CA8]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#4B2A7B]" />
        <div className="h-[2px] w-6 bg-[#4B2A7B]/40" />
      </div>
    </div>
  );
}
