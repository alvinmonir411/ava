import React from 'react';
import { Award, ShieldCheck, Landmark, CheckCircle2 } from 'lucide-react';

interface TrustBarProps {
  className?: string;
}

export default function TrustBar({ className = '' }: TrustBarProps) {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: '15+ Years Court Practice',
      subtitle: 'Called to Bar 2011',
    },
    {
      icon: Landmark,
      title: 'Malaysian Bar Council',
      subtitle: 'High Court of Malaya',
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
    <div className={`bg-[#170b1e] border-y border-[#c6a052]/30 py-6 px-4 sm:px-6 lg:px-8 shadow-inner ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trustSignals.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#22122b]/80 border border-[#c6a052]/25 hover:border-[#c6a052]/60 hover:bg-[#2e173b] transition-all duration-300 group shadow-md"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#c6a052]/15 border border-[#c6a052]/40 flex items-center justify-center shrink-0 text-[#e5c777] group-hover:scale-110 group-hover:bg-[#c6a052] group-hover:text-[#170b1e] transition-all duration-300">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[#faf9f6] text-xs sm:text-sm font-bold tracking-tight truncate group-hover:text-[#e5c777] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[#e5c777]/90 text-[11px] sm:text-xs truncate font-medium mt-0.5">
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
