import React from 'react';
import { Search, FileCheck, FileSignature, Gavel, Shield, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';

export default function EngagementWorkflow() {
  const steps = [
    {
      step: '01',
      title: 'Conflict Check & Preliminary Brief',
      chinese: '利益冲突核查与初步审阅',
      duration: 'Within 24 Hours',
      icon: Search,
      description: 'We perform a mandatory conflict check under Malaysian Bar Council ethical rulings and review your preliminary summary and key documents under strict solicitor-client privilege.',
      deliverable: 'Confirmed conflict clearance & direct appointment booking with senior counsel.',
    },
    {
      step: '02',
      title: 'Case Merit & Statutory Evaluation',
      chinese: '案情要件与法律评估',
      duration: 'Initial Consultation Session',
      icon: FileCheck,
      description: 'Principal lawyer Ava Rachel Low conducts a thorough merits assessment, auditing the statutory framework, evidentiary strength, risk factors, and financial cost-benefit ratios.',
      deliverable: 'Concrete legal risk appraisal and actionable strategic recommendations.',
    },
    {
      step: '03',
      title: 'Strategic Retainer & Action Plan',
      chinese: '委任授权与费用透明化',
      duration: '1-2 Business Days',
      icon: FileSignature,
      description: 'We issue a structured Letter of Engagement (Warrant to Act) with clear, transparent fee schedules (fixed-fee quotes or staged milestones) without hidden disbursement surprises.',
      deliverable: 'Formal retainer agreement, statutory timeline, and evidence-gathering roadmap.',
    },
    {
      step: '04',
      title: 'Court Advocacy & Transaction Execution',
      chinese: '法庭辩护与事务执行',
      duration: 'According to Case Roadmap',
      icon: Gavel,
      description: 'Deliberate execution across the High Court, Appellate Courts, or commercial negotiation tables. Regular case management updates provided at every critical procedural milestone.',
      deliverable: 'Tenacious representation, decisive court orders, and commercial resolution.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf9f6] text-[#231f20] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6a052]/15 border border-[#c6a052]/30 text-[#9d7835] text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Dignified Legal Process & Fee Transparency</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#22122b] tracking-tight leading-tight mb-4">
              Engagement & Advisory Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#595355] leading-relaxed">
              We uphold the British and Malaysian Bar tradition of intellectual rigor and absolute transparency. Every client matter proceeds through a deliberate four-stage engagement framework.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 100}
                duration={600}
              >
                <div className="h-full bg-white rounded-2xl border border-[#e8e1d5] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:border-[#c6a052] hover:shadow-xl transition-all duration-300 relative group">
                  {/* Step Number Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#c6a052]/70 group-hover:text-[#c6a052] transition-colors">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#22122b] text-[#e5c777] flex items-center justify-center shadow-md group-hover:bg-[#c6a052] group-hover:text-[#170b1e] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    {/* Chinese Subtitle */}
                    <span className="text-[10px] font-serif font-semibold text-[#9d7835] tracking-wider uppercase block mb-1">
                      {item.chinese}
                    </span>

                    <h3 className="font-serif text-lg font-bold text-[#22122b] mb-2 leading-snug group-hover:text-[#9d7835] transition-colors">
                      {item.title}
                    </h3>

                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#f3efe6] text-[10.5px] font-semibold text-[#595355] mb-3">
                      ⏱ {item.duration}
                    </div>

                    <p className="text-xs text-[#595355] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Deliverable Box */}
                  <div className="pt-3 border-t border-[#f3efe6] text-xs">
                    <strong className="text-[#22122b] block text-[11px] font-semibold mb-0.5">
                      Key Milestone Deliverable:
                    </strong>
                    <span className="text-[#595355] text-[11px] leading-tight">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Fee & Transparency Assurance Bar */}
        <ScrollReveal animation="fade-up" delay={300} duration={700}>
          <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-[#22122b] text-white border border-[#c6a052]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#c6a052] text-[#170b1e] flex items-center justify-center font-bold shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#faf9f6]">
                  100% Upfront Fee Transparency Guarantee
                </h4>
                <p className="text-xs text-[#faf9f6]/75 mt-0.5">
                  No hidden disbursements. All professional fees and court expenses are clearly documented in your Letter of Engagement.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#e5c777]">
              <span>Bar Council Compliant</span>
              <span>•</span>
              <span>Fixed & Staged Structures</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
