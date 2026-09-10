'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getAdminPracticesAction, updatePracticeAreaAction } from '@/actions/practiceActions';
import { PracticeArea } from '@/types';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploadButton from '@/components/admin/ImageUploadButton';
import { toast } from 'sonner';
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
  Sparkles,
  FileText,
  ListChecks,
  Search,
  Layers,
  ArrowRight,
} from 'lucide-react';

const PRESET_PRACTICE_HEROES = [
  {
    name: 'Commercial & Contracts',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=85',
  },
  {
    name: 'Courtroom Trial Advocacy',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=85',
  },
  {
    name: 'KL Chambers & Consultation',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    name: 'Corporate Risk & Negotiations',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
  },
  {
    name: 'Law Library & Research',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=85',
  },
];

export default function AdminPracticesPage() {
  const [practices, setPractices] = useState<PracticeArea[]>([]);
  const [editingPractice, setEditingPractice] = useState<PracticeArea | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'media' | 'scope' | 'faqs' | 'seo'>('overview');
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
        toast.success(`Practice area "${editingPractice.title}" updated successfully!`);
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setEditingPractice(null);
        }, 1200);
      } else {
        toast.error('Failed to update practice area.');
      }
    });
  };

  // Scope Checklist Handlers
  const handleAddScopeItem = () => {
    if (!editingPractice) return;
    const current = editingPractice.whatWeHandle || [];
    setEditingPractice({
      ...editingPractice,
      whatWeHandle: [...current, 'New legal deliverable or scope item'],
    });
  };

  const handleUpdateScopeItem = (index: number, val: string) => {
    if (!editingPractice) return;
    const current = [...(editingPractice.whatWeHandle || [])];
    current[index] = val;
    setEditingPractice({
      ...editingPractice,
      whatWeHandle: current,
    });
  };

  const handleRemoveScopeItem = (index: number) => {
    if (!editingPractice) return;
    const current = (editingPractice.whatWeHandle || []).filter((_, i) => i !== index);
    setEditingPractice({
      ...editingPractice,
      whatWeHandle: current,
    });
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    if (!editingPractice) return;
    const current = editingPractice.faqs || [];
    setEditingPractice({
      ...editingPractice,
      faqs: [
        ...current,
        { question: 'Frequently Asked Question Title?', answer: 'Detailed legal counsel answer...' },
      ],
    });
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    if (!editingPractice) return;
    const current = [...(editingPractice.faqs || [])];
    current[index] = {
      ...current[index],
      [field]: val,
    };
    setEditingPractice({
      ...editingPractice,
      faqs: current,
    });
  };

  const handleRemoveFaq = (index: number) => {
    if (!editingPractice) return;
    const current = (editingPractice.faqs || []).filter((_, i) => i !== index);
    setEditingPractice({
      ...editingPractice,
      faqs: current,
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
                      onClick={() => {
                        setEditingPractice({ ...practice });
                        setActiveModalTab('overview');
                      }}
                      className="btn-brass px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                      onClick={() => {
                        setEditingPractice({ ...practice });
                        setActiveModalTab('overview');
                      }}
                      className="btn-brass px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
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

      {/* STATE-OF-THE-ART LUXURY PRACTICE EDITOR MODAL */}
      {editingPractice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040812]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-gradient-to-b from-[#0D1B33] via-[#0A1529] to-[#070E1C] border-2 border-[#B8935A]/50 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(184,147,90,0.15)] flex flex-col max-h-[92vh] overflow-hidden relative">
            
            {/* Top Gold Filigree Accent Ribbon */}
            <div className="h-1.5 bg-gradient-to-r from-[#8C6D38] via-[#F4D085] to-[#8C6D38] w-full shrink-0" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#B8935A]/25 bg-[#0F1F3D]/60 flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2F57]/80 border border-[#B8935A]/40 text-[#CFA76F] text-[10px] font-bold uppercase tracking-widest">
                  <Scale className="w-3.5 h-3.5 text-[#CFA76F]" />
                  <span>Editing Practice Discipline</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {editingPractice.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEditingPractice(null)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-[#1B2F57] border border-transparent hover:border-[#B8935A]/30 transition-all cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-5 sm:px-6 pt-3 pb-1 border-b border-[#B8935A]/20 bg-[#0A1529] flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'overview'
                    ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-[#0F1F3D]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Overview & Narrative</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('media')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'media'
                    ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-[#0F1F3D]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Hero Photography & Upload</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('scope')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'scope'
                    ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-[#0F1F3D]'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Scope Deliverables ({editingPractice.whatWeHandle?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('faqs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'faqs'
                    ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-[#0F1F3D]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Client FAQs ({editingPractice.faqs?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab('seo')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'seo'
                    ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-[#0F1F3D]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>SEO & Meta</span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {savedSuccess && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-xl animate-in fade-in shadow-md">
                  ✓ Practice Area Content Updated & Published Live Successfully!
                </div>
              )}

              {/* TAB 1: OVERVIEW & NARRATIVE */}
              {activeModalTab === 'overview' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/90 mb-1.5">
                        Practice Title (English)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingPractice.title}
                        onChange={(e) =>
                          setEditingPractice({ ...editingPractice, title: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/90 mb-1.5">
                        Chinese Practice Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={editingPractice.chineseTitle || ''}
                        onChange={(e) =>
                          setEditingPractice({ ...editingPractice, chineseTitle: e.target.value })
                        }
                        placeholder="e.g. 合同起草与商业咨询"
                        className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1.5">
                      Tagline / Subheading
                    </label>
                    <input
                      type="text"
                      required
                      value={editingPractice.tagline}
                      onChange={(e) =>
                        setEditingPractice({ ...editingPractice, tagline: e.target.value })
                      }
                      placeholder="e.g. Bespoke Business Agreements & Strategic Commercial Risk Guidance"
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1.5">
                      Short Summary Description (Displayed on cards & preview grids)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingPractice.shortDescription}
                      onChange={(e) =>
                        setEditingPractice({ ...editingPractice, shortDescription: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1.5">
                      Full Page Comprehensive Legal Narrative
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={editingPractice.fullDescription}
                      onChange={(e) =>
                        setEditingPractice({ ...editingPractice, fullDescription: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F] font-mono leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: HERO PHOTOGRAPHY & MEDIA */}
              {activeModalTab === 'media' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left: Big Live Preview Box (5 cols) */}
                    <div className="md:col-span-5 space-y-2">
                      <span className="text-xs font-bold text-white/80 block">
                        Live Active Banner Preview
                      </span>
                      <div className="relative h-56 w-full rounded-2xl overflow-hidden border-2 border-[#B8935A]/40 bg-[#0F1F3D] group shadow-lg">
                        <Image
                          src={editingPractice.heroImage || PRESET_PRACTICE_HEROES[0].url}
                          alt={editingPractice.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1529]/90 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 bg-[#0A1529]/90 border border-[#B8935A]/30 rounded-xl text-[11px] text-white text-center truncate">
                          {editingPractice.title}
                        </div>
                      </div>
                    </div>

                    {/* Right: Upload & Presets (7 cols) */}
                    <div className="md:col-span-7 space-y-4">
                      {/* Cloudinary Direct Upload */}
                      <div className="p-4 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-2xl space-y-2">
                        <span className="text-xs font-bold text-white block">
                          Upload Custom Photo to Cloudinary
                        </span>
                        <p className="text-[11px] text-white/60">
                          Select any PNG, JPG or WebP image from your computer or phone.
                        </p>
                        <ImageUploadButton
                          onUploaded={(url) =>
                            setEditingPractice({ ...editingPractice, heroImage: url })
                          }
                          label="Upload Image (Cloudinary CDN)"
                          variant="button"
                          className="w-full"
                        />
                      </div>

                      {/* Photo URL Input */}
                      <div>
                        <label className="block text-xs font-bold text-white/90 mb-1.5">
                          Direct Photography URL
                        </label>
                        <input
                          type="url"
                          required
                          value={editingPractice.heroImage}
                          onChange={(e) =>
                            setEditingPractice({ ...editingPractice, heroImage: e.target.value })
                          }
                          placeholder="https://res.cloudinary.com/... or https://..."
                          className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#CFA76F]"
                        />
                      </div>

                      {/* Curated Presets */}
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block mb-1.5">
                          Or Select Curated Law Preset:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {PRESET_PRACTICE_HEROES.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() =>
                                setEditingPractice({ ...editingPractice, heroImage: preset.url })
                              }
                              className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                                editingPractice.heroImage === preset.url
                                  ? 'bg-[#B8935A] text-[#0F1F3D] font-bold'
                                  : 'bg-[#0F1F3D] text-white/70 hover:text-white border border-white/10'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SCOPE DELIVERABLES */}
              {activeModalTab === 'scope' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#B8935A]/20 pb-3">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        Service Scope & Matters Handled
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Bullet points displayed in the &ldquo;What We Handle&rdquo; section on the live page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddScopeItem}
                      className="btn-brass px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(!editingPractice.whatWeHandle || editingPractice.whatWeHandle.length === 0) ? (
                      <div className="p-6 rounded-xl bg-[#0F1F3D]/50 border border-dashed border-[#B8935A]/30 text-center text-xs text-white/50">
                        No scope items added yet. Click &ldquo;Add Item&rdquo; above.
                      </div>
                    ) : (
                      editingPractice.whatWeHandle.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 bg-[#0F1F3D] border border-[#B8935A]/20 rounded-xl"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#1B2F57] text-[#CFA76F] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateScopeItem(idx, e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-[#0A1529] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveScopeItem(idx)}
                            className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30 transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: CLIENT FAQS */}
              {activeModalTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#B8935A]/20 pb-3">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white">
                        Practice Frequently Asked Questions
                      </h4>
                      <p className="text-[11px] text-white/60">
                        Q&A accordion displayed on this specific practice area page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="btn-brass px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(!editingPractice.faqs || editingPractice.faqs.length === 0) ? (
                      <div className="p-6 rounded-xl bg-[#0F1F3D]/50 border border-dashed border-[#B8935A]/30 text-center text-xs text-white/50">
                        No FAQs added yet. Click &ldquo;Add FAQ&rdquo; above.
                      </div>
                    ) : (
                      editingPractice.faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-[#0F1F3D] border border-[#B8935A]/25 rounded-2xl space-y-3"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                            <span className="text-[11px] font-bold text-[#CFA76F] uppercase tracking-wider">
                              FAQ #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="p-1 rounded-lg text-rose-300 hover:bg-rose-950 transition-colors"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-white/80 mb-1">
                              Question:
                            </label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                              placeholder="e.g. How long does contract drafting typically take?"
                              className="w-full px-3 py-2 bg-[#0A1529] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-white/80 mb-1">
                              Answer:
                            </label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                              placeholder="Detailed response explaining timeline, statutory procedures..."
                              className="w-full px-3 py-2 bg-[#0A1529] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: SEO & META */}
              {activeModalTab === 'seo' && (
                <div className="space-y-5">
                  <div className="p-4 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-white block">
                      Google Search Snippet Preview
                    </span>
                    <div className="p-3 bg-white rounded-xl text-left space-y-1">
                      <span className="text-xs text-[#1a0dab] font-semibold hover:underline block truncate">
                        {editingPractice.seoTitle || `${editingPractice.title} | Low Wah Chin & Co.`}
                      </span>
                      <span className="text-[10px] text-[#006621] block">
                        https://lowwahchin.com/practices/{editingPractice.slug}
                      </span>
                      <p className="text-xs text-[#545454] line-clamp-2">
                        {editingPractice.seoDescription || editingPractice.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1.5">
                      SEO Meta Title Tag
                    </label>
                    <input
                      type="text"
                      value={editingPractice.seoTitle || ''}
                      onChange={(e) =>
                        setEditingPractice({ ...editingPractice, seoTitle: e.target.value })
                      }
                      placeholder="e.g. Contract Drafting & Commercial Advisory | Low Wah Chin & Co."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 mb-1.5">
                      SEO Meta Description Tag
                    </label>
                    <textarea
                      rows={3}
                      value={editingPractice.seoDescription || ''}
                      onChange={(e) =>
                        setEditingPractice({ ...editingPractice, seoDescription: e.target.value })
                      }
                      placeholder="e.g. Experienced contract lawyers in Kuala Lumpur drafting commercial agreements, MOUs, NDAs..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>
              )}

              {/* Sticky Modal Action Footer */}
              <div className="sticky bottom-0 pt-4 pb-1 border-t border-[#B8935A]/25 bg-[#0A1529]/95 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href={`/practices/${editingPractice.slug}`}
                  target="_blank"
                  className="text-xs text-[#CFA76F] hover:underline flex items-center gap-1 font-semibold self-start sm:self-auto"
                >
                  <span>Preview Live Practice Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingPractice(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#1B2F57] hover:bg-[#253F75] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-brass px-7 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isPending ? 'Publishing Changes...' : 'Save & Publish Updates'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
