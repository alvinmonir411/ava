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
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#4B2A7B] shadow-md ring-1 ring-[#4B2A7B]/30'
                : 'bg-white border-[#E5DFD3] hover:border-[#4B2A7B]/40'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B2A7B] cursor-pointer"
            >
              <span className={`font-serif text-base sm:text-lg font-bold pr-2 transition-colors ${
                isOpen ? 'text-[#4B2A7B]' : 'text-[#2B2D33]'
              }`}>
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#4B2A7B] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#4B2A7B]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-[#2B2D33]/80 border-t border-[#E5DFD3]">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
