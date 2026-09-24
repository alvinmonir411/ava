import React from 'react';

interface SectionDividerProps {
  className?: string;
  glyph?: 'diamond' | 'section' | 'star' | 'scale' | '❖' | '§' | '✦' | '⚖';
  light?: boolean;
  theme?: 'light' | 'dark';
}

export default function SectionDivider({
  className = '',
  glyph = 'diamond',
  light = false,
  theme,
}: SectionDividerProps) {
  const isLight = light || theme === 'light';

  const renderGlyph = () => {
    switch (glyph) {
      case 'section':
      case '§':
        return '§';
      case 'star':
      case '✦':
        return '✦';
      case 'scale':
      case '⚖':
        return '⚖';
      case 'diamond':
      case '❖':
      default:
        return '❖';
    }
  };

  return (
    <div className={`flex items-center justify-center my-8 sm:my-12 px-4 ${className}`}>
      <div
        className={`h-[1px] flex-1 max-w-xs sm:max-w-md bg-gradient-to-r ${
          isLight
            ? 'from-transparent via-[#4B2A7B]/30 to-[#4B2A7B]/80'
            : 'from-transparent via-purple-400/30 to-purple-400/70'
        }`}
      />
      <span
        className={`px-3 sm:px-4 text-xs sm:text-sm font-serif ${
          isLight ? 'text-[#4B2A7B]' : 'text-purple-300'
        } select-none tracking-widest`}
      >
        {renderGlyph()}
      </span>
      <div
        className={`h-[1px] flex-1 max-w-xs sm:max-w-md bg-gradient-to-l ${
          isLight
            ? 'from-transparent via-[#4B2A7B]/30 to-[#4B2A7B]/80'
            : 'from-transparent via-purple-400/30 to-purple-400/70'
        }`}
      />
    </div>
  );
}

