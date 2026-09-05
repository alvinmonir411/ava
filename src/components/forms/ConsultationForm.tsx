'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { submitInquiry } from '@/actions/submitInquiry';
import { Send, Shield, PhoneCall, CheckCircle } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';

interface ConsultationFormProps {
  defaultPracticeArea?: string;
  className?: string;
}

export const PRACTICE_OPTIONS = [
  // 9 Core Client Practice Areas
  'Contract Drafting & Commercial Advisory',
  'Contractual Dispute Claims (Breach of Contract)',
  'Debt Recovery Claims (LODs & Insolvency)',
  'Tort Claims & Civil Liabilities (Negligence & Personal Injury)',
  'Corporate & Commercial Law',
  'Real Estate & Conveyancing (SPA & Title Transfers)',
  'Civil, Commercial & Appellate Litigation',
  'Family, Probate & Estate Administration (Wills & LA)',
  'Employment & Industrial Relations (Section 20 IRA)',
  // Specialized Practice Scopes
  'Medical Negligence & Surgical Malpractice',
  'Letter Writing & LODs (Letters of Demand)',
  'Tenancy Agreement Disputes & Eviction Orders',
  'Defamation Claims & Justification',
  'Contractor Negligence & Construction Claims',
  'Small Claims & Subordinate Court Assistance',
  'Other Legal Matter',
];

export function resolvePracticeArea(input?: string | null): string {
  if (!input) return '';
  const clean = input.trim().toLowerCase();

  // 1. Direct case-insensitive match
  const exact = PRACTICE_OPTIONS.find((opt) => opt.toLowerCase() === clean);
  if (exact) return exact;

  // 2. Slug & alias dictionary
  const slugMap: Record<string, string> = {
    'contract-drafting-commercial-advisory': 'Contract Drafting & Commercial Advisory',
    'contract-drafting': 'Contract Drafting & Commercial Advisory',
    'commercial-advisory': 'Contract Drafting & Commercial Advisory',

    'contractual-dispute-claims': 'Contractual Dispute Claims (Breach of Contract)',
    'contract-dispute': 'Contractual Dispute Claims (Breach of Contract)',
    'breach-of-contract': 'Contractual Dispute Claims (Breach of Contract)',

    'debt-recovery-claims': 'Debt Recovery Claims (LODs & Insolvency)',
    'debt-recovery-winding-up': 'Debt Recovery Claims (LODs & Insolvency)',
    'debt-recovery': 'Debt Recovery Claims (LODs & Insolvency)',

    'tort-claims-civil-liabilities': 'Tort Claims & Civil Liabilities (Negligence & Personal Injury)',
    'bodily-injury-claims': 'Tort Claims & Civil Liabilities (Negligence & Personal Injury)',
    'personal-injury': 'Tort Claims & Civil Liabilities (Negligence & Personal Injury)',
    'dispute-resolution-claims': 'Tort Claims & Civil Liabilities (Negligence & Personal Injury)',

    'corporate-commercial': 'Corporate & Commercial Law',
    'company-matters-agreements': 'Corporate & Commercial Law',
    'company-matters': 'Corporate & Commercial Law',
    'commercial-law': 'Corporate & Commercial Law',

    'real-estate-conveyancing': 'Real Estate & Conveyancing (SPA & Title Transfers)',
    'property-conveyancing': 'Real Estate & Conveyancing (SPA & Title Transfers)',
    'property': 'Real Estate & Conveyancing (SPA & Title Transfers)',
    'conveyancing': 'Real Estate & Conveyancing (SPA & Title Transfers)',

    'civil-commercial-litigation': 'Civil, Commercial & Appellate Litigation',
    'litigation': 'Civil, Commercial & Appellate Litigation',
    'civil-litigation': 'Civil, Commercial & Appellate Litigation',

    'family-probate-estate': 'Family, Probate & Estate Administration (Wills & LA)',
    'family-divorce': 'Family, Probate & Estate Administration (Wills & LA)',
    'will-estate-distribution': 'Family, Probate & Estate Administration (Wills & LA)',
    'will-writing-probate-advice': 'Family, Probate & Estate Administration (Wills & LA)',

    'employment-industrial-relations': 'Employment & Industrial Relations (Section 20 IRA)',
    'employment-labour-claims': 'Employment & Industrial Relations (Section 20 IRA)',
    'employment-law': 'Employment & Industrial Relations (Section 20 IRA)',

    'medical-negligence-claims': 'Medical Negligence & Surgical Malpractice',
    'letter-writing-lods': 'Letter Writing & LODs (Letters of Demand)',
    'tenancy-agreement-disputes': 'Tenancy Agreement Disputes & Eviction Orders',
    'defamation-claims-justification': 'Defamation Claims & Justification',
    'contractor-negligence-claims': 'Contractor Negligence & Construction Claims',
    'small-claims-assistance': 'Small Claims & Subordinate Court Assistance',
  };

  if (slugMap[clean]) return slugMap[clean];

  // 3. Substring match
  const partial = PRACTICE_OPTIONS.find(
    (opt) =>
      opt.toLowerCase().includes(clean) ||
      clean.includes(opt.toLowerCase().replace(/[^a-z0-9]/g, ''))
  );
  if (partial) return partial;

  return '';
}

export default function ConsultationForm({
  defaultPracticeArea,
  className = '',
}: ConsultationFormProps) {
  const [selectedPractice, setSelectedPractice] = useState<string>(() =>
    resolvePracticeArea(defaultPracticeArea)
  );
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (defaultPracticeArea) {
      const resolved = resolvePracticeArea(defaultPracticeArea);
      if (resolved) {
        setSelectedPractice(resolved);
        return;
      }
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramPractice = params.get('practice') || params.get('service') || params.get('area');
      if (paramPractice) {
        const resolved = resolvePracticeArea(paramPractice);
        if (resolved) {
          setSelectedPractice(resolved);
        }
      }
    }
  }, [defaultPracticeArea]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await submitInquiry(null, formData);

      if (response.success) {
        setIsSubmitted(true);
        toast.success('Consultation Request Received', {
          description: response.message,
          duration: 6000,
        });
        form.reset();
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        toast.error('Submission Failed', {
          description: response.message,
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Submission Error', {
        description: 'Unable to send request. Please contact us via WhatsApp or telephone.',
      });
    } finally {
      setIsPending(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-white p-8 sm:p-10 rounded-2xl border-2 border-[#c6a052]/50 shadow-2xl text-center ${className}`}>
        <div className="w-16 h-16 bg-[#c6a052]/15 text-[#9d7835] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#c6a052]/30">
          <CheckCircle className="w-8 h-8 text-[#c6a052]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#22122b] mb-3">
          Consultation Request Submitted
        </h3>
        <p className="text-[#595355] text-base leading-relaxed max-w-md mx-auto mb-6">
          Thank you for reaching out to Messrs. Low, Wah Chin & Co. Our principal advocate will review your brief with strict confidentiality within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <WhatsAppButton
            variant="inline"
            label="Need Urgent Help? Chat on WhatsApp"
            message="Hello Messrs. Low, Wah Chin & Co., I just submitted an inquiry on your website and would like an urgent response."
          />
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-3 rounded-lg border border-[#22122b]/30 text-[#22122b] font-semibold text-sm hover:bg-[#f3efe6] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-5 sm:p-8 lg:p-10 rounded-2xl border border-[#c6a052]/30 shadow-2xl ${className}`}>
      <div className="mb-5 pb-5 border-b border-[#f3efe6]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a052]/15 text-[#9d7835] border border-[#c6a052]/30 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
          <Shield className="w-3.5 h-3.5 text-[#c6a052]" />
          <span>Privileged & Confidential</span>
        </div>
        <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#22122b] leading-tight">
          Schedule Legal Consultation
        </h3>
        <p className="text-[#595355] text-xs sm:text-base mt-1.5 leading-relaxed">
          Submit your brief for confidential partner-level review under Malaysian law.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="e.g. John"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="e.g. Tan"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="e.g. client@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              Contact / WhatsApp Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="e.g. +60 12-345 6789"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label htmlFor="practiceArea" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              Practice Discipline / Matter Type <span className="text-red-500">*</span>
            </label>
            <select
              id="practiceArea"
              name="practiceArea"
              required
              value={selectedPractice}
              onChange={(e) => setSelectedPractice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all font-medium"
            >
              <option value="" disabled>Select Practice Area</option>
              <optgroup label="Primary Malaysian Practice Disciplines (9 Core Areas)">
                {PRACTICE_OPTIONS.slice(0, 9).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </optgroup>
              <optgroup label="Specialized Legal Scope & Procedures">
                {PRACTICE_OPTIONS.slice(9, 15).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </optgroup>
              <optgroup label="Other General Inquiries">
                <option value="Other Legal Matter">Other Legal Matter</option>
              </optgroup>
            </select>
            {errors.practiceArea && (
              <p className="text-red-500 text-xs mt-1">{errors.practiceArea[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
              Preferred Date / Urgency
            </label>
            <input
              type="text"
              id="preferredDate"
              name="preferredDate"
              placeholder="e.g. Urgent / This Week"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-[#22122b] mb-1">
            Summary of Your Legal Matter <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            required
            placeholder="Please provide key facts, parties involved, relevant dates, and desired outcome..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#e8e1d5] bg-[#faf9f6] text-[#231f20] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c6a052] focus:border-[#c6a052] transition-all resize-y"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-[#170b1e] border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Brief...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Consultation Request</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-[#595355]">
            <Shield className="w-4 h-4 text-[#c6a052] shrink-0" />
            <span>100% Confidential Legal Privilege</span>
          </div>
        </div>
      </form>

      <div className="mt-6 pt-5 border-t border-[#f3efe6] flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-[#faf9f6] p-3.5 sm:p-4 rounded-xl border border-[#e8e1d5]">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <PhoneCall className="w-4 h-4 text-[#c6a052] shrink-0 hidden sm:block" />
          <div className="text-xs">
            <span className="font-bold text-[#22122b] block">Prefer Direct Conversation?</span>
            <span className="text-[#595355]">Call our KLCC chambers at +60 17-548 3157</span>
          </div>
        </div>
        <WhatsAppButton
          variant="compact"
          label="Direct WhatsApp"
          message="Hello Messrs. Low, Wah Chin & Co., I have a legal matter and would like to speak directly with counsel."
          className="w-full sm:w-auto text-center justify-center text-xs"
        />
      </div>
    </div>
  );
}
