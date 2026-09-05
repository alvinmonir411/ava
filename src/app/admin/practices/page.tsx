'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getAdminPracticesAction, updatePracticeAreaAction } from '@/actions/practiceActions';
import { PracticeArea } from '@/types';
import AdminHeader from '@/components/admin/AdminHeader';
import Image from 'next/image';
import Link from 'next/link';
import {
  Scale,
  Edit,
  ExternalLink,
  CheckCircle2,
  Image as ImageIcon,
  HelpCircle,
  Plus,
  Trash2,
  Save,
  X,
} from 'lucide-react';

export default function AdminPracticesPage() {
  const [practices, setPractices] = useState<PracticeArea[]>([]);
  const [editingPractice, setEditingPractice] = useState<PracticeArea | null>(null);
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getAdminPracticesAction().then(setPractices);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPractice) return;

    startTransition(async () => {
      const res = await updatePracticeAreaAction(editingPractice.slug, editingPractice);
      if (res.success && res.practice) {
        setPractices((prev) =>
          prev.map((p) => (p.slug === editingPractice.slug ? res.practice! : p))
        );
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setEditingPractice(null);
        }, 1200);
      }
    });
  };

  const corePractices = practices.slice(0, 6);
  const serviceOfferings = practices.slice(6);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Practice Areas & Service Scope CMS"
        subtitle="Manage descriptions, hero photography, scope checklists, and FAQs across all 18 legal disciplines."
      />

      <div className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-10">
        {/* Section 1: Core Practice Disciplines (Top 6) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#B8935A]/30 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F]">
                Priority Section (1–6)
              </span>
              <h2 className="font-serif text-xl font-bold text-white">
                Core Practice Disciplines (6)
              </h2>
            </div>
            <span className="text-xs text-white/60">
              Shown first in navigation & directory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePractices.map((practice, idx) => (
              <div
                key={practice.slug}
                className="bg-[#0A1529] rounded-2xl border border-[#B8935A]/30 overflow-hidden shadow-lg hover:border-[#B8935A]/60 transition-all flex flex-col"
              >
                {/* Hero Thumbnail */}
                <div className="relative h-44 w-full bg-[#0F1F3D]">
                  <Image
                    src={practice.heroImage}
                    alt={practice.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover brightness-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1529]/90 backdrop-blur-md border border-[#B8935A]/40 text-[10px] font-bold text-[#CFA76F]">
                    Core #{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white leading-tight">
                      {practice.title}
                    </h3>
                    <p className="text-xs text-[#CFA76F] font-medium line-clamp-1 mt-1">
                      {practice.tagline}
                    </p>
                    <p className="text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                      {practice.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#B8935A]/20 flex items-center justify-between">
                    <button
                      onClick={() => setEditingPractice({ ...practice })}
                      className="btn-brass px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>

                    <Link
                      href={`/practices/${practice.slug}`}
                      target="_blank"
                      className="text-xs text-white/70 hover:text-[#CFA76F] flex items-center gap-1 font-medium"
                    >
                      <span>Public Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Specialized Service Offerings & Scope (Following 12) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#B8935A]/30 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F]">
                Secondary Scope (7–18)
              </span>
              <h2 className="font-serif text-xl font-bold text-white">
                Specialized Service Offerings & Scope (12)
              </h2>
            </div>
            <span className="text-xs text-white/60">
              Specific claims and dispute procedures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceOfferings.map((practice, idx) => (
              <div
                key={practice.slug}
                className="bg-[#0A1529] rounded-2xl border border-[#B8935A]/30 overflow-hidden shadow-lg hover:border-[#B8935A]/60 transition-all flex flex-col"
              >
                {/* Hero Thumbnail */}
                <div className="relative h-44 w-full bg-[#0F1F3D]">
                  <Image
                    src={practice.heroImage}
                    alt={practice.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover brightness-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1529]/90 backdrop-blur-md border border-[#B8935A]/40 text-[10px] font-bold text-white/80">
                    Scope #{idx + 7}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white leading-tight">
                      {practice.title}
                    </h3>
                    <p className="text-xs text-[#CFA76F] font-medium line-clamp-1 mt-1">
                      {practice.tagline}
                    </p>
                    <p className="text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                      {practice.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#B8935A]/20 flex items-center justify-between">
                    <button
                      onClick={() => setEditingPractice({ ...practice })}
                      className="btn-brass px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>

                    <Link
                      href={`/practices/${practice.slug}`}
                      target="_blank"
                      className="text-xs text-white/70 hover:text-[#CFA76F] flex items-center gap-1 font-medium"
                    >
                      <span>Public Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Editor Modal */}
      {editingPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSave}
            className="w-full max-w-3xl bg-[#0A1529] border-2 border-[#B8935A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#B8935A]/25 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#CFA76F] block">
                  Editing Practice Discipline
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {editingPractice.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPractice(null)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-[#0F1F3D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alert on Save */}
            {savedSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-xl animate-in fade-in">
                ✓ Practice Area Content Updated Successfully!
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Title & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1.5">
                    Practice Title
                  </label>
                  <input
                    type="text"
                    value={editingPractice.title}
                    onChange={(e) =>
                      setEditingPractice({ ...editingPractice, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1.5">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={editingPractice.tagline}
                    onChange={(e) =>
                      setEditingPractice({ ...editingPractice, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>
              </div>

              {/* Hero Image URL with Live Preview */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Hero Photography URL
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    value={editingPractice.heroImage}
                    onChange={(e) =>
                      setEditingPractice({ ...editingPractice, heroImage: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                  <div className="w-16 h-10 rounded-lg overflow-hidden relative border border-[#B8935A]/40 shrink-0 bg-[#0F1F3D]">
                    <Image
                      src={editingPractice.heroImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Short Description (Card preview)
                </label>
                <textarea
                  rows={2}
                  value={editingPractice.shortDescription}
                  onChange={(e) =>
                    setEditingPractice({ ...editingPractice, shortDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Full Page Narrative & Background
                </label>
                <textarea
                  rows={5}
                  value={editingPractice.fullDescription}
                  onChange={(e) =>
                    setEditingPractice({ ...editingPractice, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B8935A]/25">
              <button
                type="button"
                onClick={() => setEditingPractice(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1B2F57] text-white text-xs font-semibold hover:bg-[#1B2F57]/80"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="btn-brass px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? 'Saving Changes...' : 'Save & Publish Updates'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
