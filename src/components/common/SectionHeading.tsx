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
            ? 'bg-[#c6a052]/20 text-[#e5c777] border border-[#c6a052]/40' 
            : 'bg-[#c6a052]/15 text-[#9d7835] border border-[#c6a052]/30'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052]" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] ${
        light ? 'text-[#faf9f6]' : 'text-[#22122b]'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
          light ? 'text-[#faf9f6]/85 font-light' : 'text-[#595355]'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-[2px] w-12 bg-gradient-to-r from-[#c6a052] to-[#e5c777]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#c6a052]" />
        <div className="h-[2px] w-6 bg-[#c6a052]/40" />
      </div>
    </div>
  );
}
