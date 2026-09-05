'use client';

import React, { useEffect, useState } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 0.5
  className?: string;
}

export default function ParallaxContainer({
  children,
  speed = 0.25,
  className = '',
}: ParallaxContainerProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        transform: `translate3d(0, ${offsetY}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
