import React from 'react';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getInquiriesAction } from '@/actions/inquiryActions';
import { getAdminPracticesAction } from '@/actions/practiceActions';
import { getAdminArticlesAction } from '@/actions/articleActions';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import {
  Inbox,
  Scale,
  FileText,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect('/admin/login');
  }

  const inquiries = await getInquiriesAction();
  const practices = await getAdminPracticesAction();
  const articles = await getAdminArticlesAction();

  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const inReviewInquiries = inquiries.filter((i) => i.status === 'in_review' || i.status === 'scheduled');

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Manage consultation leads, practice areas, legal articles, and firm settings."
        action={
          <Link
            href="/admin/inquiries"
            className="btn-brass px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>View Inquiries ({inquiries.length})</span>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Leads */}
          <div className="bg-[#0A1529] p-6 rounded-2xl border border-[#B8935A]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                <Inbox className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Live CRM
              </span>
            </div>
            <span className="text-3xl font-bold font-serif text-white block">
              {inquiries.length}
            </span>
            <span className="text-xs text-white/70 font-medium block mt-1">
              Total Inquiries Received
            </span>
          </div>

          {/* Card 2: New Pending */}
          <div className="bg-[#0A1529] p-6 rounded-2xl border border-[#B8935A]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-500/30">
                Action Required
              </span>
            </div>
            <span className="text-3xl font-bold font-serif text-white block">
              {newInquiries.length}
            </span>
            <span className="text-xs text-white/70 font-medium block mt-1">
              New Pending Inquiries
            </span>
          </div>

          {/* Card 3: Practice Areas */}
          <div className="bg-[#0A1529] p-6 rounded-2xl border border-[#B8935A]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] bg-[#B8935A]/15 px-2.5 py-1 rounded-full border border-[#B8935A]/30">
                6 Core + 12 Scope
              </span>
            </div>
            <span className="text-3xl font-bold font-serif text-white block">
              {practices.length}
            </span>
            <span className="text-xs text-white/70 font-medium block mt-1">
              Active Practice Disciplines
            </span>
          </div>

          {/* Card 4: Articles */}
          <div className="bg-[#0A1529] p-6 rounded-2xl border border-[#B8935A]/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-500/30">
                Published
              </span>
            </div>
            <span className="text-3xl font-bold font-serif text-white block">
              {articles.length}
            </span>
            <span className="text-xs text-white/70 font-medium block mt-1">
              Published Legal Insights
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Recent Inquiries & Quick Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Inquiries List (7 cols) */}
          <div className="lg:col-span-7 bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#B8935A]/20 pb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-white">
                  Recent Consultation Leads
                </h2>
                <p className="text-xs text-white/60">
                  Latest client inquiries from website booking forms
                </p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs text-[#CFA76F] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {inquiries.slice(0, 5).map((inquiry) => {
                const isNew = inquiry.status === 'new';
                const cleanPhone = inquiry.phone.replace(/[^0-9+]/g, '');
                const waLink = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                  `Hello ${inquiry.name}, this is Low Wah Chin & Co. regarding your consultation inquiry on ${inquiry.practice_area}.`
                )}`;

                return (
                  <div
                    key={inquiry.id}
                    className="p-4 rounded-xl bg-[#0F1F3D] border border-[#B8935A]/20 hover:border-[#B8935A]/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-white">
                            {inquiry.name}
                          </strong>
                          {isNew && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                              New Lead
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#CFA76F] font-semibold block mt-0.5">
                          {inquiry.practice_area}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="p-2 rounded-lg bg-[#1B2F57] text-[#CFA76F] hover:bg-[#B8935A] hover:text-[#0F1F3D] transition-colors"
                          title="Call Client"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    <p className="text-xs text-white/75 line-clamp-2 leading-relaxed">
                      {inquiry.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/5">
                      <span>{inquiry.phone} • {inquiry.email}</span>
                      <span>{new Date(inquiry.created_at).toLocaleDateString('en-MY')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Management Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-base font-bold text-white border-b border-[#B8935A]/20 pb-3">
                Quick Content Management
              </h3>

              <div className="space-y-2.5">
                <Link
                  href="/admin/practices"
                  className="p-3.5 rounded-xl bg-[#0F1F3D] hover:bg-[#1B2F57] border border-[#B8935A]/25 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#CFA76F] transition-colors">
                        Edit Practice Areas
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Update hero photos, scopes & FAQs
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#CFA76F] transition-colors" />
                </Link>

                <Link
                  href="/admin/articles"
                  className="p-3.5 rounded-xl bg-[#0F1F3D] hover:bg-[#1B2F57] border border-[#B8935A]/25 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#CFA76F] transition-colors">
                        Manage Articles & Insights
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Publish new legal updates and press
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#CFA76F] transition-colors" />
                </Link>

                <Link
                  href="/admin/settings"
                  className="p-3.5 rounded-xl bg-[#0F1F3D] hover:bg-[#1B2F57] border border-[#B8935A]/25 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#B8935A]/20 text-[#CFA76F] flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#CFA76F] transition-colors">
                        Firm Profile & Contacts
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Update phone, WhatsApp & Bar Council No.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#CFA76F] transition-colors" />
                </Link>
              </div>
            </div>

            {/* Firm Status Summary */}
            <div className="bg-gradient-to-br from-[#0F1F3D] to-[#0A1529] border border-[#B8935A]/40 rounded-3xl p-6 shadow-xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#CFA76F] block">
                Firm Identity Active
              </span>
              <h4 className="font-serif text-base font-bold text-white">
                Low Wah Chin & Co.
              </h4>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Advocates & Solicitors • Member of the Malaysian Bar Council No. <strong>BC/L/2019</strong>. Head office located at Colony @ KLCC, Vipod Residences, Kuala Lumpur.
              </p>
              <div className="pt-2">
                <Link
                  href="/"
                  target="_blank"
                  className="btn-brass px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>Preview Public Website</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
