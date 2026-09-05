'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, ClipboardCheck, Phone, ArrowRight, Shield } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

interface PreparationChecklistCardProps {
  practiceTitle: string;
  checklist?: string[];
  className?: string;
}

export default function PreparationChecklistCard({
  practiceTitle,
  checklist,
  className = '',
}: PreparationChecklistCardProps) {
  const defaultItems = [
    'Primary executed agreements, contract drafts, or relevant dispute notices',
    'Official written correspondence (formal letters, email threads, WhatsApp chat logs)',
    'Identity documents (NRIC or Passport) and SSM company registration profile',
    'Chronological summary of key dates, parties involved, and estimated financial claims',
  ];

  const items = checklist && checklist.length > 0 ? checklist : defaultItems;
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-white border border-[#c6a052]/40 shadow-xl ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#f3efe6]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c6a052]/15 text-[#9d7835] text-[10.5px] font-bold uppercase tracking-wider mb-2">
            <ClipboardCheck className="w-3.5 h-3.5 text-[#c6a052]" />
            <span>Consultation Preparation Checklist</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#22122b]">
            What to Prepare Before Your Consultation
          </h3>
          <p className="text-xs text-[#595355] mt-1 leading-relaxed">
            For {practiceTitle}. Having these documents ready enables senior counsel to evaluate your statutory merits swiftly.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="text-center p-2.5 rounded-xl bg-[#faf9f6] border border-[#e8e1d5] shrink-0">
          <span className="font-mono text-base font-bold text-[#9d7835]">
            {completedCount}/{items.length}
          </span>
          <span className="block text-[9px] uppercase font-semibold text-[#595355]">
            Ready
          </span>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2.5 mb-6">
        {items.map((item, idx) => {
          const isChecked = !!checkedState[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                isChecked
                  ? 'bg-[#c6a052]/10 border-[#c6a052] text-[#22122b]'
                  : 'bg-[#faf9f6] border-[#e8e1d5] hover:border-[#c6a052]/50 text-[#231f20]'
              }`}
            >
              <div className="mt-0.5 shrink-0 text-[#c6a052]">
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-[#c6a052]" />
                ) : (
                  <Square className="w-4 h-4 text-[#595355]/40" />
                )}
              </div>
              <span
                className={`text-xs leading-relaxed select-none ${
                  isChecked ? 'font-semibold text-[#22122b]' : 'text-[#595355]'
                }`}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-4 rounded-xl bg-[#22122b] text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <Shield className="w-4 h-4 text-[#c6a052] shrink-0" />
          <span className="text-[#faf9f6]/85">
            Documents submitted are protected by 100% Legal Privilege.
          </span>
        </div>

        <WhatsAppButton
          variant="compact"
          label="Submit Brief on WhatsApp"
          message={`Hello Messrs. Low, Wah Chin & Co., I am preparing my brief for ${practiceTitle} and would like to schedule a consultation.`}
          className="w-full sm:w-auto text-center justify-center text-xs"
        />
      </div>
    </div>
  );
}
