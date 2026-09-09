'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import {
  getAdminSettingsAction,
  updateAdminSettingsAction,
} from '@/actions/settingsActions';
import { FirmSettings, DEFAULT_FIRM_SETTINGS } from '@/types/settings';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import {
  Settings,
  Save,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Scale,
  ImageIcon,
  Eye,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

const PRESET_HERO_IMAGES = [
  {
    name: 'Courtroom Heritage (Classic)',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Modern Legal Chambers (KLCC)',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Kuala Lumpur Skyline & High Court',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Law Library & Jurisprudence',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Scales of Justice & Statutory Volumes',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=85',
  },
  {
    name: 'Executive Consultation Suite',
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85',
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<FirmSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'firm' | 'heroes'>('heroes');
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getAdminSettingsAction().then((s) => {
      setSettings({
        ...DEFAULT_FIRM_SETTINGS,
        ...s,
        heroImages: {
          ...DEFAULT_FIRM_SETTINGS.heroImages,
          ...(s?.heroImages || {}),
        },
      });
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    startTransition(async () => {
      const res = await updateAdminSettingsAction(settings);
      if (res.success) {
        setSettings(res.settings);
        toast.success('Firm Profile & Hero Section Images saved successfully!');
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        toast.error('Failed to update settings.');
      }
    });
  };

  const handleHeroChange = (key: keyof typeof DEFAULT_FIRM_SETTINGS.heroImages, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      heroImages: {
        ...settings.heroImages,
        [key]: value,
      },
    });
  };

  if (!settings) {
    return (
      <div className="p-8 text-center text-white/50 text-xs">
        Loading firm configuration and hero settings...
      </div>
    );
  }

  const heroSections = [
    {
      key: 'homeHeroImage' as const,
      label: 'Home Page Hero Image',
      pageRoute: '/',
      description: 'The primary visual banner on the homepage behind the firm headline & tagline.',
    },
    {
      key: 'aboutHeroImage' as const,
      label: 'About Us Page Hero Image',
      pageRoute: '/about',
      description: 'Background header banner displayed on the About Our Law Practice page.',
    },
    {
      key: 'ourTeamHeroImage' as const,
      label: 'Our Team & Leadership Hero Image',
      pageRoute: '/our-team',
      description: 'Header banner for principal lawyer Low Wah Chin’s profile and credentials page.',
    },
    {
      key: 'practicesHeroImage' as const,
      label: 'Practice Areas Directory Hero Image',
      pageRoute: '/practices',
      description: 'Header banner for the full practice areas & legal disciplines directory.',
    },
    {
      key: 'articlesHeroImage' as const,
      label: 'Articles & Insights Hero Image',
      pageRoute: '/articles',
      description: 'Header banner displayed on the legal publications and industry reviews page.',
    },
    {
      key: 'faqHeroImage' as const,
      label: 'FAQ Page Hero Image',
      pageRoute: '/faq',
      description: 'Header banner displayed across the Frequently Asked Questions page.',
    },
    {
      key: 'contactHeroImage' as const,
      label: 'Contact Chambers Hero Image',
      pageRoute: '/contact',
      description: 'Header banner for the KLCC location and consultation scheduling page.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Firm Settings & Hero Image Management"
        subtitle="Manage section hero images, contact channels, Bar Council credentials, and office coordinates."
      />

      <div className="p-6 sm:p-8 max-w-5xl w-full mx-auto space-y-6">
        {savedSuccess && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-2xl animate-in fade-in shadow-lg">
            ✓ Settings and Hero Images Updated & Published Live Successfully!
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0A1529] border border-[#B8935A]/30 rounded-2xl w-full sm:w-auto self-start">
          <button
            type="button"
            onClick={() => setActiveTab('heroes')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'heroes'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Section Images</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('firm')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'firm'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Firm Profile & Contacts</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: HERO SECTION IMAGES */}
          {activeTab === 'heroes' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="border-b border-[#B8935A]/20 pb-4">
                <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Fully Visible Hero Backgrounds</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Hero Section Images Across Every Page
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  All hero section images are rendered with optimal brightness and contrast for maximum clarity. You can customize the image URL for any section or select from curated presets below.
                </p>
              </div>

              {/* Grid of all hero section image editors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {heroSections.map((sec) => {
                  const currentUrl = settings.heroImages[sec.key] || DEFAULT_FIRM_SETTINGS.heroImages[sec.key];

                  return (
                    <div
                      key={sec.key}
                      className="bg-[#0F1F3D] border border-[#B8935A]/25 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#B8935A]/50 transition-all"
                    >
                      <div>
                        {/* Section Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-serif text-sm font-bold text-white">
                              {sec.label}
                            </h4>
                            <span className="text-[10px] text-[#CFA76F] font-mono">
                              Route: {sec.pageRoute}
                            </span>
                          </div>
                          <a
                            href={sec.pageRoute}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#0A1529] text-[#CFA76F] hover:bg-[#B8935A] hover:text-[#0F1F3D] transition-colors"
                            title="Preview Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <p className="text-[11px] text-white/60 mb-3">
                          {sec.description}
                        </p>

                        {/* Live Image Preview Thumbnail */}
                        <div className="relative h-36 w-full rounded-xl overflow-hidden border border-[#B8935A]/40 bg-[#0A1529] mb-3 group">
                          <Image
                            src={currentUrl}
                            alt={sec.label}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1529]/90 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/90">
                            <span className="bg-[#0A1529]/80 px-2 py-0.5 rounded border border-[#B8935A]/30 truncate max-w-[200px]">
                              Preview: Active Banner
                            </span>
                            <span className="text-[#CFA76F] font-bold">100% Visible</span>
                          </div>
                        </div>

                        {/* Image URL Input */}
                        <div>
                          <label className="block text-[11px] font-bold text-white/80 mb-1">
                            Background Image URL
                          </label>
                          <input
                            type="url"
                            required
                            value={currentUrl}
                            onChange={(e) => handleHeroChange(sec.key, e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                          />
                        </div>
                      </div>

                      {/* Quick Presets Picker */}
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block mb-1.5">
                          Quick Preset Options:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {PRESET_HERO_IMAGES.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => handleHeroChange(sec.key, preset.url)}
                              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                                currentUrl === preset.url
                                  ? 'bg-[#B8935A] text-[#0F1F3D] font-bold shadow-xs'
                                  : 'bg-[#0A1529] text-white/70 hover:text-white border border-white/10 hover:border-[#B8935A]/40'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: FIRM PROFILE & CONTACTS */}
          {activeTab === 'firm' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              {/* Section 1: Firm Legal Identity */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-white border-b border-[#B8935A]/20 pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#CFA76F]" />
                  <span>Firm Legal Identity</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Primary Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.companyName}
                      onChange={(e) =>
                        setSettings({ ...settings, companyName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Firm Qualification Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.qualificationTitle}
                      onChange={(e) =>
                        setSettings({ ...settings, qualificationTitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1.5">
                    Malaysian Bar Council Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.barCouncilNumber}
                    onChange={(e) =>
                      setSettings({ ...settings, barCouncilNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>
              </div>

              {/* Section 2: Contact Numbers & Email */}
              <div className="space-y-4 pt-4 border-t border-[#B8935A]/20">
                <h3 className="font-serif text-base font-bold text-white border-b border-[#B8935A]/20 pb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#CFA76F]" />
                  <span>Contact Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Primary Phone / WhatsApp Line
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) =>
                        setSettings({ ...settings, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={settings.email}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Office Address & Operating Hours */}
              <div className="space-y-4 pt-4 border-t border-[#B8935A]/20">
                <h3 className="font-serif text-base font-bold text-white border-b border-[#B8935A]/20 pb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#CFA76F]" />
                  <span>Chambers Location & Hours</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Full Head Office Address
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={settings.streetAddress}
                      onChange={(e) =>
                        setSettings({ ...settings, streetAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1.5">
                      Operating Hours Declaration
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.operatingHours}
                      onChange={(e) =>
                        setSettings({ ...settings, operatingHours: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Save Bar */}
          <div className="p-4 bg-[#0A1529] border border-[#B8935A]/40 rounded-2xl flex items-center justify-between shadow-xl">
            <div className="text-xs text-white/70">
              <span>Changes take effect immediately across all live pages.</span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-brass px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Updating & Publishing...' : 'Save Settings & Hero Images'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
