'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import {
  getAdminSettingsAction,
  updateAdminSettingsAction,
} from '@/actions/settingsActions';
import {
  FirmSettings,
  DEFAULT_FIRM_SETTINGS,
  DEFAULT_GALLERY_ITEMS,
  GalleryItem,
  HeroContentSettings,
  AboutPrincipalSettings,
  RecognitionContentSettings,
} from '@/types/settings';
import AdminHeader from '@/components/admin/AdminHeader';
import ImageUploadButton from '@/components/admin/ImageUploadButton';
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
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Camera,
  Layers,
  CheckCircle2,
  Award,
  GraduationCap,
  Star,
  User,
  Quote,
  Building2,
  UploadCloud,
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

const PRESET_PORTRAITS = [
  { name: '1. Court Robes & Bands (Main)', url: '/lawyer-hero.jpg' },
  { name: '2. Lincoln’s Inn Barrister Gown', url: '/lawyer-portrait-1.jpg' },
  { name: '3. Managing Partner (Formal Black)', url: '/lawyer-portrait-2.jpg' },
  { name: '4. Chambers Consultation (KLCC)', url: '/lawyer-portrait-3.jpg' },
  { name: '5. Client Advisory & Diligence', url: '/lawyer-portrait-4.jpg' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<FirmSettings | null>(null);
  const [activeTab, setActiveTab] = useState<
    'gallery' | 'hero' | 'about' | 'recognition' | 'heroes' | 'firm'
  >('gallery');
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
        heroContent: {
          ...DEFAULT_FIRM_SETTINGS.heroContent,
          ...(s?.heroContent || {}),
        },
        aboutPrincipal: {
          ...DEFAULT_FIRM_SETTINGS.aboutPrincipal,
          ...(s?.aboutPrincipal || {}),
        },
        recognition: {
          ...DEFAULT_FIRM_SETTINGS.recognition,
          ...(s?.recognition || {}),
        },
        gallery: {
          ...DEFAULT_FIRM_SETTINGS.gallery,
          ...(s?.gallery || {}),
          items:
            s?.gallery?.items && Array.isArray(s.gallery.items) && s.gallery.items.length > 0
              ? s.gallery.items
              : DEFAULT_FIRM_SETTINGS.gallery.items,
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
        toast.success('All settings and website content updated successfully!');
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        toast.error('Failed to update settings.');
      }
    });
  };

  const handleHeroImageChange = (key: keyof typeof DEFAULT_FIRM_SETTINGS.heroImages, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      heroImages: {
        ...settings.heroImages,
        [key]: value,
      },
    });
  };

  const handleHeroContentChange = (field: keyof HeroContentSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      heroContent: {
        ...settings.heroContent,
        [field]: value,
      },
    });
  };

  const handleAboutChange = (field: keyof AboutPrincipalSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      aboutPrincipal: {
        ...settings.aboutPrincipal,
        [field]: value,
      },
    });
  };

  const handleRecognitionChange = (field: keyof RecognitionContentSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      recognition: {
        ...settings.recognition,
        [field]: value,
      },
    });
  };

  // Gallery modification handlers
  const handleGalleryHeaderChange = (field: 'sectionTitle' | 'sectionSubtitle' | 'sectionBadge', value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      gallery: {
        ...settings.gallery,
        [field]: value,
      },
    });
  };

  const handleGalleryItemChange = (index: number, field: keyof GalleryItem, value: string) => {
    if (!settings) return;
    const newItems = [...settings.gallery.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setSettings({
      ...settings,
      gallery: {
        ...settings.gallery,
        items: newItems,
      },
    });
  };

  const handleAddGalleryCard = () => {
    if (!settings) return;
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      src: '/lawyer-portrait-2.jpg',
      alt: 'Principal Lawyer Low Wah Chin (Ava Rachel) 劉華晶',
      title: 'Senior Legal Practitioner',
      subtitle: 'Messrs. Low Wah Chin & Co. Advocates & Solicitors',
      badge: 'Legal Advisory',
      description: 'Dedicated client advocacy and courtroom representation across High Court litigation, corporate agreements, and real estate conveyancing.',
    };
    setSettings({
      ...settings,
      gallery: {
        ...settings.gallery,
        items: [...settings.gallery.items, newItem],
      },
    });
    toast.info('New portrait card added. Customize details and click Save.');
  };

  const handleRemoveGalleryCard = (index: number) => {
    if (!settings) return;
    if (settings.gallery.items.length <= 1) {
      toast.error('At least one portrait card must remain in the gallery.');
      return;
    }
    const newItems = settings.gallery.items.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      gallery: {
        ...settings.gallery,
        items: newItems,
      },
    });
    toast.success('Portrait card removed.');
  };

  const handleMoveGalleryCard = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const newItems = [...settings.gallery.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    setSettings({
      ...settings,
      gallery: {
        ...settings.gallery,
        items: newItems,
      },
    });
  };

  const handleResetGalleryDefaults = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      gallery: {
        ...DEFAULT_FIRM_SETTINGS.gallery,
        items: [...DEFAULT_GALLERY_ITEMS],
      },
    });
    toast.info('Reset gallery cards to default 5 portraits. Click Save to publish.');
  };

  if (!settings) {
    return (
      <div className="p-8 text-center text-white/50 text-xs">
        Loading firm configuration, gallery and website settings...
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
        title="Website Content & Settings Management"
        subtitle="Full dashboard control for non-technical users: upload photos with Cloudinary, edit hero banners, principal lawyer bio, recognition awards, and contact channels."
      />

      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
        {savedSuccess && (
          <div className="p-3.5 sm:p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-2xl animate-in fade-in shadow-lg">
            ✓ All Website Content and Changes Published Live Successfully!
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0A1529] border border-[#B8935A]/30 rounded-2xl w-full overflow-x-auto scrollbar-none pb-2 sm:pb-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Portrait Gallery ({settings.gallery?.items?.length || 5})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'hero'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Hero & Headlines</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>About Principal Lawyer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recognition')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'recognition'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Recognition & Accolades</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('heroes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'heroes'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Backgrounds (7 Pages)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('firm')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'firm'
                ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md'
                : 'text-white/75 hover:text-white hover:bg-[#0F1F3D]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Firm Profile & Contacts</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: PORTRAIT GALLERY & LEADERSHIP */}
          {activeTab === 'gallery' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#B8935A]/20 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Live Website Portrait Showcase</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Portraits & Chambers Leadership Gallery
                  </h3>
                  <p className="text-xs text-white/70 mt-1">
                    Upload new photos directly with Cloudinary, or select from presets. Manage titles, badges, and descriptions shown in the public interactive gallery.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetGalleryDefaults}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0F1F3D] hover:bg-[#1B2F57] text-[#CFA76F] border border-[#B8935A]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddGalleryCard}
                    className="btn-brass px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Photo Card</span>
                  </button>
                </div>
              </div>

              {/* Section Header Text Inputs */}
              <div className="bg-[#0F1F3D] border border-[#B8935A]/25 rounded-2xl p-5 space-y-4">
                <h4 className="font-serif text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#CFA76F]" />
                  <span>Gallery Section Title & Badges</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Section Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionBadge || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionBadge', e.target.value)}
                      placeholder="e.g. Advocate & Solicitor • Lincoln’s Inn Barrister"
                      className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Main Section Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionTitle || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionTitle', e.target.value)}
                      placeholder="e.g. Portraits & Chambers Leadership Gallery"
                      className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionSubtitle || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionSubtitle', e.target.value)}
                      placeholder="e.g. Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶"
                      className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Portrait Cards List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#CFA76F]">
                    Gallery Cards ({settings.gallery.items.length})
                  </span>
                  <span className="text-[11px] text-white/50">
                    Upload new photos, use 1-click photo selectors, or use arrow buttons to reorder
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {settings.gallery.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-[#0F1F3D] border-2 border-[#B8935A]/30 rounded-2xl p-5 shadow-lg space-y-4 hover:border-[#B8935A]/60 transition-all"
                    >
                      {/* Card Header & Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#B8935A] text-[#0F1F3D] text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-serif text-base font-bold text-white">
                            {item.title || `Portrait Card #${idx + 1}`}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-[#CFA76F] bg-[#0A1529] px-2 py-0.5 rounded border border-[#B8935A]/30">
                            {item.badge || 'Badge'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveGalleryCard(idx, 'up')}
                            className="p-1.5 rounded-lg bg-[#0A1529] text-white/70 hover:text-white disabled:opacity-30 transition-colors"
                            title="Move Card Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === settings.gallery.items.length - 1}
                            onClick={() => handleMoveGalleryCard(idx, 'down')}
                            className="p-1.5 rounded-lg bg-[#0A1529] text-white/70 hover:text-white disabled:opacity-30 transition-colors"
                            title="Move Card Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryCard(idx)}
                            className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30 transition-colors ml-2"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Thumbnail Preview & Upload Controls (4 cols) */}
                        <div className="md:col-span-4 lg:col-span-4 space-y-3">
                          <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border-2 border-[#B8935A]/40 bg-[#0A1529] group">
                            <Image
                              src={item.src || '/lawyer-portrait-1.jpg'}
                              alt={item.alt || item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 250px"
                              className="object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0A1529]/90 border border-[#B8935A]/40 text-[9px] font-bold uppercase text-[#CFA76F]">
                              {item.badge}
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-[#0A1529]/90 border border-[#B8935A]/30 rounded text-[10px] text-white text-center truncate">
                              {item.title}
                            </div>
                          </div>

                          {/* Cloudinary Direct Upload Button */}
                          <div className="w-full">
                            <ImageUploadButton
                              onUploaded={(url) => handleGalleryItemChange(idx, 'src', url)}
                              label="Upload New Photo (Cloudinary)"
                              variant="button"
                              className="w-full text-center"
                            />
                          </div>

                          {/* Quick Preset Picker for this card */}
                          <div className="space-y-1 pt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block">
                              Or 1-Click Select Built-in Photo:
                            </span>
                            <div className="flex flex-col gap-1">
                              {PRESET_PORTRAITS.map((p, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => handleGalleryItemChange(idx, 'src', p.url)}
                                  className={`text-left px-2 py-1 rounded text-[10px] truncate transition-colors ${
                                    item.src === p.url
                                      ? 'bg-[#B8935A] text-[#0F1F3D] font-bold'
                                      : 'bg-[#0A1529] text-white/70 hover:text-white border border-white/10'
                                  }`}
                                >
                                  {p.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Fields Form (8 cols) */}
                        <div className="md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block font-bold text-white/80 mb-1">
                              Photo URL (Auto-filled on upload)
                            </label>
                            <input
                              type="text"
                              required
                              value={item.src}
                              onChange={(e) => handleGalleryItemChange(idx, 'src', e.target.value)}
                              placeholder="e.g. https://res.cloudinary.com/... or /lawyer-hero.jpg"
                              className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white font-mono focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-white/80 mb-1">
                              Card Title
                            </label>
                            <input
                              type="text"
                              required
                              value={item.title}
                              onChange={(e) => handleGalleryItemChange(idx, 'title', e.target.value)}
                              placeholder="e.g. Courtroom Trial Advocate"
                              className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-white/80 mb-1">
                              Card Badge (Pill Label)
                            </label>
                            <input
                              type="text"
                              required
                              value={item.badge}
                              onChange={(e) => handleGalleryItemChange(idx, 'badge', e.target.value)}
                              placeholder="e.g. Senior Trial Counsel"
                              className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-bold text-white/80 mb-1">
                              Card Subtitle
                            </label>
                            <input
                              type="text"
                              required
                              value={item.subtitle}
                              onChange={(e) => handleGalleryItemChange(idx, 'subtitle', e.target.value)}
                              placeholder="e.g. Appellate & High Court of Malaya Representation"
                              className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-bold text-white/80 mb-1">
                              Lightbox Modal Full Description
                            </label>
                            <textarea
                              rows={3}
                              value={item.description || ''}
                              onChange={(e) => handleGalleryItemChange(idx, 'description', e.target.value)}
                              placeholder="Detailed credentials narrative displayed in the expanded full-screen lightbox..."
                              className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & HEADLINES */}
          {activeTab === 'hero' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="border-b border-[#B8935A]/20 pb-4">
                <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Homepage Hero Header Content</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Hero Headline, Tagline & Lawyer Portrait
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Modify the central firm titles, motto quote, bar badge, and upload or choose the prominent lawyer portrait displayed on the top of the homepage.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Live Portrait Card Preview, Upload & Selector (5 cols) */}
                <div className="lg:col-span-5 bg-[#0F1F3D] border border-[#B8935A]/25 rounded-2xl p-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                    <Camera className="w-4 h-4 text-[#CFA76F]" />
                    <span>Hero Lawyer Portrait Preview</span>
                  </h4>

                  <div className="relative h-80 w-full rounded-xl overflow-hidden border-2 border-[#B8935A]/40 bg-[#0A1529]">
                    <Image
                      src={settings.heroContent?.heroLawyerPhoto || '/lawyer-portrait-1.jpg'}
                      alt="Hero Lawyer Portrait Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1529]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#0A1529]/90 border border-[#B8935A]/30 rounded-lg text-center">
                      <p className="font-serif text-xs font-bold text-white">
                        {settings.heroContent?.heroLawyerName || 'Low Wah Chin'}
                        {settings.heroContent?.heroLawyerChinese && (
                          <span className="text-[#CFA76F] ml-1">({settings.heroContent.heroLawyerChinese})</span>
                        )}
                      </p>
                      <p className="text-[10px] text-[#CFA76F]">
                        {settings.heroContent?.heroLawyerTitle || 'Managing Partner'}
                      </p>
                    </div>
                  </div>

                  {/* Upload via Cloudinary */}
                  <div>
                    <ImageUploadButton
                      onUploaded={(url) => handleHeroContentChange('heroLawyerPhoto', url)}
                      label="Upload Hero Portrait (Cloudinary)"
                      variant="button"
                      className="w-full text-center"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block">
                      Or 1-Click Select Photo Preset:
                    </span>
                    <div className="flex flex-col gap-1">
                      {PRESET_PORTRAITS.map((p, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleHeroContentChange('heroLawyerPhoto', p.url)}
                          className={`text-left px-2.5 py-1.5 rounded text-xs truncate transition-colors ${
                            settings.heroContent?.heroLawyerPhoto === p.url
                              ? 'bg-[#B8935A] text-[#0F1F3D] font-bold'
                              : 'bg-[#0A1529] text-white/75 hover:text-white border border-white/10'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Inputs (7 cols) */}
                <div className="lg:col-span-7 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Firm Title (Main Headline)
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.firmName || ''}
                      onChange={(e) => handleHeroContentChange('firmName', e.target.value)}
                      placeholder="e.g. Messrs. Low Wah Chin & Co."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Firm Subtitle
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.firmSubtitle || ''}
                      onChange={(e) => handleHeroContentChange('firmSubtitle', e.target.value)}
                      placeholder="e.g. Advocates & Solicitors"
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Official Motto / Quote
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.motto || ''}
                      onChange={(e) => handleHeroContentChange('motto', e.target.value)}
                      placeholder="e.g. “Passion & Duty, Integrity & Care — To the Point.”"
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Established Pill Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.establishedBadge || ''}
                      onChange={(e) => handleHeroContentChange('establishedBadge', e.target.value)}
                      placeholder="e.g. Advocates & Solicitors • High Court of Malaya"
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerName || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerName', e.target.value)}
                        placeholder="e.g. Low Wah Chin (Ava Rachel)"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Chinese Name
                      </label>
                      <input
                        type="text"
                        value={settings.heroContent?.heroLawyerChinese || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerChinese', e.target.value)}
                        placeholder="e.g. 劉華晶"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Professional Title
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerTitle || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerTitle', e.target.value)}
                        placeholder="e.g. Managing Partner & Principal Legal Practitioner"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Subtitle / Credentials
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerSub || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerSub', e.target.value)}
                        placeholder="e.g. Lincoln’s Inn Barrister (London) • Malayan Bar (2011)"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT PRINCIPAL LAWYER */}
          {activeTab === 'about' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="border-b border-[#B8935A]/20 pb-4">
                <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-1">
                  <User className="w-4 h-4" />
                  <span>About Principal Counsel Section</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Principal Lawyer Bio, Quotes & Experience
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Upload portrait or select preset, customize the narrative bio, quote ribbon, benchmark law practice experience, and core practice areas.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Photo, Upload & Quick Picker (4 cols) */}
                <div className="lg:col-span-4 bg-[#0F1F3D] border border-[#B8935A]/25 rounded-2xl p-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                    <Camera className="w-4 h-4 text-[#CFA76F]" />
                    <span>About Section Portrait</span>
                  </h4>

                  <div className="relative h-72 w-full rounded-xl overflow-hidden border-2 border-[#B8935A]/40 bg-[#0A1529]">
                    <Image
                      src={settings.aboutPrincipal?.lawyerPhoto || '/lawyer-portrait-2.jpg'}
                      alt="About Principal Photo"
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Cloudinary Upload */}
                  <div>
                    <ImageUploadButton
                      onUploaded={(url) => handleAboutChange('lawyerPhoto', url)}
                      label="Upload Bio Portrait (Cloudinary)"
                      variant="button"
                      className="w-full text-center"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block">
                      Or 1-Click Select Photo Preset:
                    </span>
                    <div className="flex flex-col gap-1">
                      {PRESET_PORTRAITS.map((p, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleAboutChange('lawyerPhoto', p.url)}
                          className={`text-left px-2.5 py-1.5 rounded text-xs truncate transition-colors ${
                            settings.aboutPrincipal?.lawyerPhoto === p.url
                              ? 'bg-[#B8935A] text-[#0F1F3D] font-bold'
                              : 'bg-[#0A1529] text-white/75 hover:text-white border border-white/10'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Narrative Fields (8 cols) */}
                <div className="lg:col-span-8 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Section Tag Label
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.sectionTag || ''}
                        onChange={(e) => handleAboutChange('sectionTag', e.target.value)}
                        placeholder="e.g. Principal Counsel"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.sectionTitle || ''}
                        onChange={(e) => handleAboutChange('sectionTitle', e.target.value)}
                        placeholder="e.g. About"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.lawyerName || ''}
                        onChange={(e) => handleAboutChange('lawyerName', e.target.value)}
                        placeholder="e.g. Low Wah Chin (Ava Rachel)"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 mb-1">
                        Lawyer Chinese Name
                      </label>
                      <input
                        type="text"
                        value={settings.aboutPrincipal?.lawyerChinese || ''}
                        onChange={(e) => handleAboutChange('lawyerChinese', e.target.value)}
                        placeholder="e.g. 劉華晶"
                        className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Featured Quote / Practice Motto
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.aboutPrincipal?.quote || ''}
                      onChange={(e) => handleAboutChange('quote', e.target.value)}
                      placeholder="e.g. “I am an Advocate & Solicitor Malaysia of 15 years in practice since 11th November 2011.”"
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Bio Narrative (Paragraph 1 - Benchmark Practices & Founding)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.aboutPrincipal?.bioParagraph1 || ''}
                      onChange={(e) => handleAboutChange('bioParagraph1', e.target.value)}
                      placeholder="Founded by senior advocate Low Wah Chin (Ava Rachel)..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Bio Narrative (Paragraph 2 - Corporate In-House Counsel & Risk)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.aboutPrincipal?.bioParagraph2 || ''}
                      onChange={(e) => handleAboutChange('bioParagraph2', e.target.value)}
                      placeholder="In addition to private trial practice, Ms. Low served 1 year at KNM Group Berhad as In-House Legal Counsel..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Core Practice Areas List (Summary)
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.aboutPrincipal?.corePractices || ''}
                      onChange={(e) => handleAboutChange('corePractices', e.target.value)}
                      placeholder="e.g. Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RECOGNITION & PRESS ACCOLADES */}
          {activeTab === 'recognition' && (
            <div className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="border-b border-[#B8935A]/20 pb-4">
                <div className="flex items-center gap-2 text-[#CFA76F] text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Trusted Malaysia & Press Recognition</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Accolades, Editorial Commendations & Stats
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Manage the editorial recommendation text, star rating, quotes, and the 3 key credential metrics shown on the home page.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.badgeLabel || ''}
                      onChange={(e) => handleRecognitionChange('badgeLabel', e.target.value)}
                      placeholder="e.g. Official Editorial Selection"
                      className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Rating Text
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.ratingText || ''}
                      onChange={(e) => handleRecognitionChange('ratingText', e.target.value)}
                      placeholder="e.g. 5.0 Star Commendation"
                      className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Main Section Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.title || ''}
                      onChange={(e) => handleRecognitionChange('title', e.target.value)}
                      placeholder="e.g. Best Law Firms in Kuala Lumpur"
                      className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-lg text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-white/80 mb-1">
                    Recognition Subheading Quote Ribbon
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.recognition?.quote || ''}
                    onChange={(e) => handleRecognitionChange('quote', e.target.value)}
                    placeholder="e.g. “Thank You Trusted Malaysia. We are honored to be recommended on your site.”"
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Editorial Review (Paragraph 1)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.recognition?.paragraph1 || ''}
                      onChange={(e) => handleRecognitionChange('paragraph1', e.target.value)}
                      placeholder="Messrs. Low Wah Chin & Co. Advocates & Solicitors is a firm that provides high-quality legal services..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 mb-1">
                      Editorial Review (Paragraph 2)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.recognition?.paragraph2 || ''}
                      onChange={(e) => handleRecognitionChange('paragraph2', e.target.value)}
                      placeholder="They are highly commended to be professional and thorough in every case..."
                      className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                    />
                  </div>
                </div>

                {/* 3 Metric Stat Blocks */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#CFA76F]" />
                    <span>3 Key Statistical Badges</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <div className="p-3.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#CFA76F] block">Stat #1</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat1Value || ''}
                        onChange={(e) => handleRecognitionChange('stat1Value', e.target.value)}
                        placeholder="e.g. 100%"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white font-bold text-sm"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat1Label || ''}
                        onChange={(e) => handleRecognitionChange('stat1Label', e.target.value)}
                        placeholder="e.g. Bar Certified"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white/80 text-xs"
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="p-3.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#CFA76F] block">Stat #2</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat2Value || ''}
                        onChange={(e) => handleRecognitionChange('stat2Value', e.target.value)}
                        placeholder="e.g. Top 10"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white font-bold text-sm"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat2Label || ''}
                        onChange={(e) => handleRecognitionChange('stat2Label', e.target.value)}
                        placeholder="e.g. KL Law Firms"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white/80 text-xs"
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="p-3.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#CFA76F] block">Stat #3</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat3Value || ''}
                        onChange={(e) => handleRecognitionChange('stat3Value', e.target.value)}
                        placeholder="e.g. 15 Yrs"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white font-bold text-sm"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat3Label || ''}
                        onChange={(e) => handleRecognitionChange('stat3Label', e.target.value)}
                        placeholder="e.g. Practice Experience"
                        className="w-full px-2.5 py-1.5 bg-[#0A1529] border border-white/10 rounded text-white/80 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HERO SECTION IMAGES */}
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
                  Upload custom background images with Cloudinary, customize the image URL, or select from curated presets below.
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

                        {/* Cloudinary Upload for this banner */}
                        <div className="mb-3">
                          <ImageUploadButton
                            onUploaded={(url) => handleHeroImageChange(sec.key, url)}
                            label="Upload Banner (Cloudinary)"
                            variant="button"
                            className="w-full text-center"
                          />
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
                            onChange={(e) => handleHeroImageChange(sec.key, e.target.value)}
                            placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                            className="w-full px-3 py-2 bg-[#0A1529] border border-[#B8935A]/30 rounded-lg text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                          />
                        </div>
                      </div>

                      {/* Quick Presets Picker */}
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA76F] block mb-1.5">
                          Or Select Curated Preset:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {PRESET_HERO_IMAGES.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => handleHeroImageChange(sec.key, preset.url)}
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

          {/* TAB 6: FIRM PROFILE & CONTACTS */}
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
          <div className="p-4 bg-[#0A1529] border-2 border-[#B8935A]/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl sticky bottom-4 z-20 backdrop-blur-md">
            <div className="text-xs text-white/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CFA76F] shrink-0" />
              <span>All updates publish instantly across the live website upon saving.</span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-brass w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Updating & Publishing...' : 'Save & Publish Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
