'use client';

import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vibrant';
  showGrid?: boolean;
}

export default function AuroraBackground({
  children,
  className = '',
  intensity = 'medium',
  showGrid = true,
}: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: 'opacity-35',
    medium: 'opacity-60',
    vibrant: 'opacity-85',
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Aurora Ambient Gradient Mesh */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${opacityMap[intensity]}`}
        aria-hidden="true"
      >
        {/* Layer 1: Deep Royal Purple Aurora Ribbon */}
        <div className="absolute -top-[25%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-br from-[#4B2A7B]/35 via-[#3A1F60]/45 to-transparent blur-[110px] animate-aurora-1" />

        {/* Layer 2: Radiant Royal Purple Glow */}
        <div className="absolute top-[5%] -right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-[#4B2A7B]/30 via-[#3A1F60]/20 to-transparent blur-[130px] animate-aurora-2" />

        {/* Layer 3: Soft Royal Purple Foundation */}
        <div className="absolute -bottom-[20%] left-[25%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#4B2A7B]/20 via-[#3A1F60]/20 to-transparent blur-[120px] animate-aurora-3" />

        {/* Layer 4: Floating Central Luminous Purple Core */}
        <div className="absolute top-[35%] left-[20%] w-[45vw] h-[35vw] max-w-[600px] max-h-[450px] rounded-full bg-gradient-to-r from-[#4B2A7B]/20 via-[#3A1F60]/15 to-transparent blur-[95px] animate-aurora-pulse" />

        {/* Geometric Micro Grid for Crisp Architectural Depth */}
        {showGrid && (
          <div className="absolute inset-0 bg-[radial-gradient(#4B2A7B_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        )}
      </div>

      {/* Children Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
