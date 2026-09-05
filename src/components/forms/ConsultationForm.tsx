'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { submitInquiry } from '@/actions/submitInquiry';
import { Send, Shield, PhoneCall, CheckCircle } from 'lucide-react';
import WhatsAppButton from '../common/WhatsAppButton';

interface ConsultationFormProps {
  defaultPracticeArea?: string;
  className?: string;
}

const PRACTICE_OPTIONS = [
  'Legal Advice & General Consultation',
  'Property & Conveyancing Law',
  'Family & Divorce Law',
  'Dispute Resolution, Accident & Injury Claims',
  'Will Writing & Estate Distribution',
  'Company Matters, Commercial Agreements & Litigation',
  'Other Legal Matter',
];

export default function ConsultationForm({
  defaultPracticeArea,
  className = '',
}: ConsultationFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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
      <div className={`bg-white p-8 sm:p-10 rounded-2xl border-2 border-brass/40 shadow-xl text-center ${className}`}>
        <div className="w-16 h-16 bg-brass/15 text-brass-dark rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-brass" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-3">
          Consultation Request Submitted
        </h3>
        <p className="text-charcoal-muted text-base leading-relaxed max-w-md mx-auto mb-6">
          Thank you for reaching out to Messrs. Low Wah Chin & Co. Our senior legal team has received your inquiry and will review your matter confidentially within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <WhatsAppButton
            variant="inline"
            label="Need Urgent Help? Chat on WhatsApp"
            message="Hello LWCCO, I just submitted an inquiry on your website and would like an urgent response."
          />
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-3 rounded-lg border border-navy/30 text-navy font-semibold text-sm hover:bg-cream-dark transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-brass/25 shadow-xl ${className}`}>
      <div className="mb-6 pb-6 border-b border-cream-dark">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
          Request a Confidential Consultation
        </h3>
        <p className="text-charcoal-muted text-sm sm:text-base mt-2">
          Share the details of your legal matter. All submissions are protected under strict legal professional privilege.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="e.g. John"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="e.g. Tan"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="e.g. client@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              Contact / WhatsApp Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="e.g. +60 12-345 6789"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="practiceArea" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              Practice Area / Legal Service <span className="text-red-500">*</span>
            </label>
            <select
              id="practiceArea"
              name="practiceArea"
              required
              defaultValue={defaultPracticeArea || ''}
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            >
              <option value="" disabled>Select Practice Discipline</option>
              {PRACTICE_OPTIONS.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.practiceArea && (
              <p className="text-red-500 text-xs mt-1">{errors.practiceArea[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
              Preferred Consultation Date / Time
            </label>
            <input
              type="text"
              id="preferredDate"
              name="preferredDate"
              placeholder="e.g. Next Tuesday morning, or Urgent"
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-navy mb-1.5">
            Summary of Your Legal Matter <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Please provide key facts, dates, counterparties involved, and any urgency..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-light/50 bg-cream/30 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-brass focus:border-brass transition-all resize-y"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="btn-brass px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Book Legal Consultation</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-charcoal-muted">
            <Shield className="w-4 h-4 text-brass shrink-0" />
            <span>100% Confidential Legal Privilege</span>
          </div>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-cream-dark flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream/50 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-brass shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-navy block">Prefer Direct Conversation?</span>
            <span className="text-charcoal-muted">Call our KLCC office at +60 17-548 3157</span>
          </div>
        </div>
        <WhatsAppButton
          variant="compact"
          label="Direct WhatsApp"
          message="Hello Messrs. Low Wah Chin & Co., I have a legal matter and would like to speak directly with counsel."
        />
      </div>
    </div>
  );
}
