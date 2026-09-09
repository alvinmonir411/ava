import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Scale, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  bgImage?: string;
}

export default function Hero({
  bgImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85',
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-[#1a2332] text-[#faf9f6] overflow-hidden">
      {/* Full-width background image with balanced high-visibility overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Messrs. Low Wah Chin & Co. Advocates & Solicitors Kuala Lumpur Courtroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 sm:opacity-90 brightness-95 contrast-105"
        />
        {/* Layered dark navy overlay balanced for rich contrast and full image visibility */}
        <div className="absolute inset-0 bg-[#101826]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101826]/90 via-transparent to-[#101826]/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Established Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#c6a052]/50 bg-[#1a2332]/70 text-[#dcc280] text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] font-semibold mb-6 shadow-sm max-w-full text-center">
          <Scale className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
          <span className="truncate">Advocates & Solicitors • High Court of Malaya • Admitted 2011</span>
        </div>

        {/* Large Serif Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-6 drop-shadow-md">
          Messrs. Low Wah Chin & Co.
          <span className="block text-xl sm:text-3xl md:text-4xl text-[#dcc280] font-serif font-normal mt-2">
            Advocates & Solicitors
          </span>
        </h1>

        {/* Short Tagline in lighter weight */}
        <p className="font-serif italic text-[#f3efe6] text-base sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-10 text-white/90">
          &ldquo;Passion & Duty, Integrity & Care — To the Point.&rdquo;
        </p>

        {/* One Outlined / Ghost-style Contact Us button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="btn-ghost-light w-full sm:w-auto px-9 py-4 rounded-lg text-sm sm:text-base font-semibold text-center flex items-center justify-center gap-2 shadow-lg hover:border-[#dcc280] hover:text-[#dcc280]"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 text-[#c6a052]" />
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#c6a052]/30 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-[#faf9f6]/80 font-medium">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
            <span>Lincoln’s Inn Barrister (London)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
            <span>Malaysian Bar Council BC/L/2019</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c6a052] shrink-0" />
            <span>Kuala Lumpur Chambers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
