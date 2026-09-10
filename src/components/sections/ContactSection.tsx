'use client';

import React, { useState, useTransition } from 'react';
import { submitInquiry, ActionResponse } from '@/actions/submitInquiry';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { toast } from 'sonner';

export default function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [formResponse, setFormResponse] = useState<ActionResponse | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget;

    startTransition(async () => {
      try {
        const res = await submitInquiry(null, formData);
        setFormResponse(res);
        if (res.success) {
          toast.success(res.message);
          formElement.reset();
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error('An unexpected error occurred. Please try contacting us directly.');
      }
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#faf7fc] text-[#261833] border-b border-[#e7dbf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: "Get in Touch" Information (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#9d7835] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c6a052]" />
                <span>Confidential Inquiry</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e0d33] leading-tight">
                Get in Touch
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#3c2a4f] leading-relaxed">
              We welcome your legal inquiries. Every submission is treated with strict Legal Professional Privilege under Section 126 of the Evidence Act 1950. Our senior advocates will review your matter and respond within one business day.
            </p>

            {/* Address & Direct Contact Block */}
            <div className="p-6 bg-white rounded-lg border border-[#e7dbf2] space-y-4 text-xs sm:text-sm shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Main Chambers</strong>
                  <span className="text-[#564566] leading-relaxed block">
                    Colony @ KLCC, Level 1, Vipod Residences,<br />
                    6 Jalan Kia Peng, 50450 Kuala Lumpur
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Telephone</strong>
                  <a href="tel:+60175483157" className="text-[#9d7835] hover:underline font-semibold">
                    +60 17-548 3157
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Email Inquiries</strong>
                  <a href="mailto:lwclegal5@gmail.com" className="text-[#9d7835] hover:underline font-semibold">
                    lwclegal5@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c6a052] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#1e0d33] block">Consultation Hours</strong>
                  <span className="text-[#564566]">Monday – Friday: 9:00 AM – 5:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <WhatsAppButton variant="inline" label="Inquire Direct on WhatsApp" />
            </div>
          </div>

          {/* Right Column: Formal Contact Form (7 cols) */}
          <div className="md:col-span-7 bg-white p-7 sm:p-9 rounded-lg border border-[#e7dbf2] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#1e0d33] mb-2">
              Schedule a Consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#564566] mb-6">
              Please provide brief details of your matter. All inquiries are strictly confidential.
            </p>

            {formResponse?.success && (
              <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Inquiry Successfully Received</p>
                  <p className="mt-0.5">{formResponse.message}</p>
                </div>
              </div>
            )}

            {formResponse && !formResponse.success && (
              <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Please check the required fields</p>
                  <p className="mt-0.5">{formResponse.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                    First Name <span className="text-[#9d7835]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="e.g. Rachel"
                    className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                  />
                  {formResponse?.errors?.firstName && (
                    <p className="text-[11px] text-red-600 mt-1">{formResponse.errors.firstName[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                    Last Name <span className="text-[#9d7835]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="e.g. Tan"
                    className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                  />
                  {formResponse?.errors?.lastName && (
                    <p className="text-[11px] text-red-600 mt-1">{formResponse.errors.lastName[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                    Email Address <span className="text-[#9d7835]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. name@example.com"
                    className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                  />
                  {formResponse?.errors?.email && (
                    <p className="text-[11px] text-red-600 mt-1">{formResponse.errors.email[0]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                    Phone / WhatsApp <span className="text-[#9d7835]">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +60 12-345 6789"
                    className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                  />
                  {formResponse?.errors?.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{formResponse.errors.phone[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="practiceArea" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                  Legal Matter Category <span className="text-[#9d7835]">*</span>
                </label>
                <select
                  id="practiceArea"
                  name="practiceArea"
                  required
                  defaultValue="Legal Advice & Consultation"
                  className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                >
                  <option value="Legal Advice & Consultation">Legal Advice & Consultation</option>
                  <option value="Property & Conveyancing">Property & Conveyancing</option>
                  <option value="Family & Divorce Matters">Family & Divorce Matters</option>
                  <option value="Dispute Resolution & Claims">Dispute Resolution & Claims</option>
                  <option value="Wills & Estate Distribution">Wills & Estate Distribution</option>
                  <option value="Company Matters & Agreements">Company Matters & Agreements</option>
                  <option value="Other Legal Services">Other Legal Services</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#1e0d33] mb-1.5">
                  Summary of Legal Matter <span className="text-[#9d7835]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Please describe the nature of your legal issue, relevant dates, or questions..."
                  className="w-full px-3.5 py-2.5 rounded border border-purple-200 text-sm text-[#1e0d33] focus:outline-none focus:border-[#c6a052] transition-colors bg-[#faf7fc]"
                />
                {formResponse?.errors?.message && (
                  <p className="text-[11px] text-red-600 mt-1">{formResponse.errors.message[0]}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-gold w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isPending ? (
                    <span>Submitting Confidential Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Confidential Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
