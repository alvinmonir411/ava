import React from 'react';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#E5DFD3] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#4B2A7B]/50 hover:shadow-xl relative shadow-sm ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-[#4B2A7B]">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-[#4B2A7B]/25" />
        </div>

        <p className="text-[#2B2D33]/90 text-sm sm:text-base leading-relaxed italic mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
        <div>
          <h4 className="font-serif font-bold text-[#2B2D33] text-sm sm:text-base">
            {testimonial.client_name}
          </h4>
          {testimonial.title && (
            <p className="text-xs text-[#2B2D33]/70">
              {testimonial.title}
            </p>
          )}
          {testimonial.location && (
            <p className="text-[11px] text-[#4B2A7B] font-medium">
              {testimonial.location}
            </p>
          )}
        </div>
        <span className="text-[10px] font-bold text-[#4B2A7B] bg-[#4B2A7B]/10 px-2.5 py-1 rounded-full border border-[#4B2A7B]/20 uppercase tracking-wider">
          {testimonial.source}
        </span>
      </div>
    </div>
  );
}
