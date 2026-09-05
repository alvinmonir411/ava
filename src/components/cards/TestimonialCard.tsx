import React from 'react';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-charcoal-light/40 p-6 sm:p-8 flex flex-col justify-between legal-card-shadow legal-card-hover hover:border-brass/70 transition-all duration-300 relative ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-brass">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-brass/20" />
        </div>

        <p className="text-charcoal text-sm sm:text-base leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
        <div>
          <h4 className="font-serif font-bold text-navy text-sm sm:text-base">
            {testimonial.client_name}
          </h4>
          {testimonial.title && (
            <p className="text-xs text-charcoal-muted">
              {testimonial.title}
            </p>
          )}
          {testimonial.location && (
            <p className="text-[11px] text-brass-dark">
              {testimonial.location}
            </p>
          )}
        </div>
        <span className="text-[11px] font-semibold text-brass-dark/80 bg-cream px-2.5 py-1 rounded-full border border-brass/20">
          {testimonial.source}
        </span>
      </div>
    </div>
  );
}
