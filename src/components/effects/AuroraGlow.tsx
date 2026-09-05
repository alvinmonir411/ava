'use client';

import React from 'react';

interface AuroraGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'gold' | 'violet' | 'multi';
  rounded?: string;
}

export default function AuroraGlow({
  children,
  className = '',
  glowColor = 'multi',
  rounded = 'rounded-2xl',
}: AuroraGlowProps) {
  const glowStyles = {
    gold: 'from-[#e5c777]/40 via-[#c6a052]/20 to-transparent',
    violet: 'from-[#7928ca]/40 via-[#3b174f]/20 to-transparent',
    multi: 'from-[#c6a052]/35 via-[#7928ca]/30 to-[#3b82f6]/25',
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Luminous Pulsating Aurora Glow Underlay */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${glowStyles[glowColor]} ${rounded} blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />
      {/* Content */}
      <div className={`relative ${rounded}`}>{children}</div>
    </div>
  );
}
