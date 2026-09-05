import React from 'react';
import { Award, ShieldCheck, Landmark, CheckCircle2 } from 'lucide-react';

interface TrustBarProps {
  className?: string;
}

export default function TrustBar({ className = '' }: TrustBarProps) {
  const trustSignals = [
    {
      icon: ShieldCheck,
      title: '15+ Years Practice',
      subtitle: 'Called to Bar 2011',
    },
    {
      icon: Landmark,
      title: 'Malaysian Bar Registered',
      subtitle: 'High Court of Malaya',
    },
    {
      icon: Award,
      title: 'Lincoln’s Inn Barrister',
      subtitle: 'Called to English Bar 2010',
    },
    {
      icon: CheckCircle2,
      title: 'Trusted Malaysia Top 6',
      subtitle: 'Recognized Legal Excellence',
    },
  ];

  return (
    <div className={`bg-[#0F1F3D] border-y border-[#B8935A]/35 py-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trustSignals.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl bg-[#1B2F57]/60 border border-[#B8935A]/25 hover:border-[#B8935A]/50 transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B8935A]/20 border border-[#B8935A]/40 flex items-center justify-center shrink-0 text-[#CFA76F]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white text-xs sm:text-sm font-bold tracking-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[#CFA76F] text-[11px] sm:text-xs truncate font-medium mt-0.5">
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
