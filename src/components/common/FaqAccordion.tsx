'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-cream-light border-brass shadow-md'
                : 'bg-white/80 border-charcoal-light/40 hover:border-brass/50'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              <span className="font-serif text-base sm:text-lg font-bold text-navy pr-2">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-brass shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-charcoal-muted border-t border-cream-dark">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
