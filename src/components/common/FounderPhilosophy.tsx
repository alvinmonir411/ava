import React from 'react';
import Image from 'next/image';
import { Award, Landmark, Scale, Shield, Globe2, BookOpen, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import AuroraBackground from '../effects/AuroraBackground';
import AuroraGlow from '../effects/AuroraGlow';

export default function FounderPhilosophy() {
  return (
    <AuroraBackground
      intensity="medium"
      showGrid={true}
      className="py-16 sm:py-24 bg-[#14081c] text-[#faf9f6] border-t border-[#c6a052]/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Portrait & Formal Lincoln's Inn Accreditation (5 cols) */}
          <ScrollReveal animation="fade-up" duration={700} className="lg:col-span-5">
            <AuroraGlow glowColor="multi" rounded="rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#c6a052]/50 shadow-2xl bg-[#22122b] p-2">
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/lawyer-portrait-1.jpg"
                    alt="Ava Rachel Low (刘华律师) Barrister-at-Law Lincoln's Inn London & Advocate High Court of Malaya"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top filter brightness-100 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14081c] via-[#14081c]/20 to-transparent" />
                </div>

                {/* Bottom Accreditation Badge */}
                <div className="mt-2 p-4 rounded-xl bg-[#14081c]/95 border border-[#c6a052]/30 text-white backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#faf9f6]">
                        Ava Rachel Low (刘华律师)
                      </h4>
                      <p className="text-[#e5c777] text-xs font-semibold">
                        Barrister-at-Law • Lincoln’s Inn, London (Called 2010)
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#faf9f6]/80 bg-[#241133] px-2.5 py-1 rounded border border-[#c6a052]/30">
                      BC/L/2019
                    </span>
                  </div>
                </div>
              </div>
            </AuroraGlow>
          </ScrollReveal>

          {/* Right Column: Judicial Philosophy Narrative (7 cols) */}
          <ScrollReveal animation="fade-up" delay={200} duration={700} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full aurora-pill text-[#e5c777] text-xs font-bold uppercase tracking-wider animate-float-slow">
              <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Founder Insight & Judicial Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight aurora-text-gradient">
              &ldquo;Advocacy is not merely argument—it is the art of deliberate, principled clarity.&rdquo;
            </h2>

            <p className="text-sm sm:text-base text-[#faf9f6]/90 leading-relaxed font-light">
              Founded on <strong>11th November 2011</strong>, Messrs. Low, Wah Chin & Co. was conceived as an antidote to formulaic, impersonal legal practice. Principal counsel <strong>Ava Rachel Low (刘华律师)</strong> synthesizes classical British Barrister trial discipline with seasoned Malaysian corporate and litigation experience from leading national benchmark practices (including <em>Shook Lin & Bok</em>, <em>Sreenevasan</em>, and <em>Azim, Tunku Farik & Wong</em>).
            </p>

            {/* 3 Pillar Statements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl aurora-glass border border-[#c6a052]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e5c777] uppercase tracking-wider mb-1.5">
                  <Shield className="w-4 h-4 text-[#c6a052]" />
                  <span>Ethical Trial Craft</span>
                </div>
                <p className="text-xs text-[#faf9f6]/80 leading-relaxed font-light">
                  Rigorous statutory research, uncompromising witness preparation, and decisive composure before the bench.
                </p>
              </div>

              <div className="p-4 rounded-xl aurora-glass border border-[#c6a052]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e5c777] uppercase tracking-wider mb-1.5">
                  <Globe2 className="w-4 h-4 text-[#c6a052]" />
                  <span>Multilingual Fluency</span>
                </div>
                <p className="text-xs text-[#faf9f6]/80 leading-relaxed font-light">
                  Complete bilingual command across English, Bahasa Malaysia, and Mandarin/Cantonese for seamless regional representation.
                </p>
              </div>
            </div>

            {/* Bilingual Representation Callout */}
            <div className="p-4 rounded-xl bg-[#14081c]/80 backdrop-blur-md border-l-4 border-[#c6a052] border border-[#c6a052]/20 text-xs text-[#faf9f6]/90 space-y-1.5 shadow-lg">
              <p className="font-serif italic text-sm text-[#e5c777]">
                &ldquo;以专业之智，行正义之道；以严谨之心，护当事人之权益。&rdquo;
              </p>
              <p className="text-[11.5px] text-[#faf9f6]/80 font-light">
                We represent private individuals, SMEs, and foreign corporations navigating complex Malaysian regulatory, dispute, and conveyancing matters with equal poise and distinction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </AuroraBackground>
  );
}
