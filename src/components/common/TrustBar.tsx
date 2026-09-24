import React from 'react';
import { Award, ShieldCheck, Landmark, CheckCircle2 } from 'lucide-react';

interface TrustBarProps {
  className?: string;
}

export default function TrustBar({ className = '' }: TrustBarProps) {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: 'Practising Since 11 Nov 2011',
      subtitle: 'High Court of Malaya',
    },
    {
      icon: Landmark,
      title: 'Member of the Bar',
      subtitle: 'Malaysian Bar Council',
    },
    {
      icon: Award,
      title: 'Lincoln’s Inn Barrister',
      subtitle: 'Called to English Bar 2010',
    },
    {
      icon: CheckCircle2,
      title: 'Top 6 Trusted Practice',
      subtitle: 'Recognized Legal Diligence',
    },
  ];

  return (
    <div className={`bg-[#FAF8F2] border-y border-[#E5DFD3] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {trustSignals.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5DFD3] hover:border-[#4B2A7B] transition-all duration-300 group shadow-xs"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF8F2] border border-[#E5DFD3] flex items-center justify-center shrink-0 text-[#4B2A7B] group-hover:scale-105 group-hover:bg-[#4B2A7B] group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[#2B2D33] text-xs sm:text-sm font-bold tracking-tight truncate group-hover:text-[#4B2A7B] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#2B2D33]/70 text-[11px] sm:text-xs truncate font-medium mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
