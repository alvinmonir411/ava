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
                ? 'bg-white border-[#c6a052] shadow-md ring-1 ring-[#c6a052]/30'
                : 'bg-white/90 border-[#e8e1d5] hover:border-[#c6a052]/60'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c6a052] cursor-pointer"
            >
              <span className={`font-serif text-base sm:text-lg font-bold pr-2 transition-colors ${
                isOpen ? 'text-[#9d7835]' : 'text-[#22122b]'
              }`}>
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#c6a052] shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[#9d7835]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-[#595355] border-t border-[#f3efe6]">
                <p className="whitespace-pre-line">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
