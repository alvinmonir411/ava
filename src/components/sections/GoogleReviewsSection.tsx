'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight, Award, UserCheck } from 'lucide-react';
import { GOOGLE_REVIEWS_DATA, GOOGLE_REVIEWS_META, GoogleReview } from '@/data/googleReviews';

export default function GoogleReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Reviews');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredReviews = selectedCategory === 'All Reviews'
    ? GOOGLE_REVIEWS_DATA
    : GOOGLE_REVIEWS_DATA.filter(r => r.category === selectedCategory);

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 6);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-br from-[#070e1e] via-[#0d1738] to-[#1c0c30] text-[#faf9f6] border-b border-white/10 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[#0F1F3D]/90 via-[#1E1B4B]/90 to-[#2E1065]/90 px-3.5 py-1.5 rounded-full border border-purple-500/40 shadow-sm backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Client Testimonials</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            5.0-Star Legal Advocacy & Client Trust
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Real feedback from individuals, corporations, and international clients represented by principal counsel Low Wah Chin (Ava Rachel) 劉華晶 at Messrs. Low Wah Chin & Co.
          </p>
        </div>

        {/* Google Score & Chambers Trust Card */}
        <div className="bg-gradient-to-r from-[#070e1e] via-[#101538] to-[#1e0c33] border border-white/15 rounded-xl p-5 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left: 5.0 Rating Display */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              {/* Google G Logo Badge */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2.5 sm:p-3 flex items-center justify-center shadow-md shrink-0">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-serif text-3xl sm:text-5xl font-bold text-white">
                    {GOOGLE_REVIEWS_META.rating.toFixed(1)}
                  </span>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mt-1 font-semibold">
                      34 Google Reviews · 100% 5-Star
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/80 mt-2 line-clamp-1">
                  {GOOGLE_REVIEWS_META.business_name}
                </p>
                <p className="text-[10.5px] sm:text-[11px] text-purple-200 font-mono mt-0.5">
                  Colony @ KLCC, 6 Jalan Kia Peng, 50450 Kuala Lumpur
                </p>
              </div>
            </div>

            {/* Right: Direct Review Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <a
                href={GOOGLE_REVIEWS_META.review_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-royal w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-lg group text-center"
              >
                <span>Write a Review on Google</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <a
                href={GOOGLE_REVIEWS_META.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm text-center"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {GOOGLE_REVIEWS_META.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#2563eb] via-[#6366f1] to-[#7e22ce] text-white font-bold shadow-md'
                  : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0F1F3D]/60 border border-white/10 hover:border-purple-400/50 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 shadow-lg relative group backdrop-blur-xs"
            >
              <div>
                {/* Header: Stars & Date (Stars kept gold) */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-white/60 font-mono">
                    {rev.relative_time_description}
                  </span>
                </div>

                {/* Highlight Badge */}
                {rev.highlight && (
                  <div className="mb-3.5 inline-block text-[11px] font-semibold text-purple-200 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-500/30">
                    &ldquo;{rev.highlight}&rdquo;
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light italic mb-4">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {/* Original Language note */}
                {rev.original_language && (
                  <p className="text-[10px] text-purple-300/70 mb-3 font-mono">
                    • Translated by Google ({rev.original_language})
                  </p>
                )}

                {/* Owner Reply Box (if present) */}
                {rev.owner_response && (
                  <div className="mt-4 p-3 bg-white/5 rounded border-l-2 border-indigo-500 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-purple-200">
                      <span>Response from LWCCO (Owner)</span>
                      <span className="text-[10px] text-white/50 font-mono">
                        {rev.owner_response.relative_time_description}
                      </span>
                    </div>
                    <p className="text-xs text-white/80 italic">
                      &ldquo;{rev.owner_response.text}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Reviewer Meta Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-white/15 flex items-center justify-center font-serif text-xs font-bold text-white">
                    {rev.author_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                    <span>{rev.author_name}</span>
                    <span title="Verified Google Review">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" />
                    </span>
                  </h4>
                  {rev.author_badge && (
                    <p className="text-[10px] text-white/60 font-medium">
                      {rev.author_badge}
                    </p>
                  )}
                </div>
              </div>

              <span className="text-[10px] font-semibold text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Google Maps
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle / View All / Read on Google CTA */}
      <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        {filteredReviews.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-lg bg-white/5 text-[#faf9f6] border border-white/20 text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
          >
            {showAll ? `Show Less (${filteredReviews.length})` : `Show All ${filteredReviews.length} Reviews`}
          </button>
        )}

        <a
          href={GOOGLE_REVIEWS_META.review_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient-royal inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold shadow-lg group"
        >
          <span>Read All 34+ Reviews on Google Maps</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  </section>
  );
}
