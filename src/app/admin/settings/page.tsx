'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Image from 'next/image';
import {
  getAdminSettingsAction,
  updateAdminSettingsAction,
} from '@/actions/settingsActions';
import {
  FirmSettings,
  DEFAULT_FIRM_SETTINGS,
  DEFAULT_GALLERY_ITEMS,
  DEFAULT_WHY_CHOOSE_US_SETTINGS,
  DEFAULT_CAREER_HISTORY,
  GalleryItem,
  HeroContentSettings,
  AboutPrincipalSettings,
  WhyChooseUsSettings,
  WhyChooseUsItem,
  RecognitionContentSettings,
  SectionVisibilitySettings,
} from '@/types/settings';
import { CareerHistoryItem } from '@/types';
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
  Briefcase,
  Star,
  User,
  Quote,
  Building2,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Compass,
  Banknote,
  Edit3,
  Target,
  X,
  ChevronUp,
  ChevronDown,
  Calendar,
  Lock,
  Landmark,
  Check,
  AlertCircle,
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
  { name: '1. Primary Hero Portrait (Seated Court Dress - Grey Background)', url: '/hero_image.jpeg' },
  { name: '2. Lincoln’s Inn Barrister (Seated Court Dress - Dark Background)', url: '/lawyer-portrait-1.jpg' },
  { name: '3. Managing Partner & Principal (3/4 Profile Court Dress)', url: '/lawyer-portrait-4.jpg' },
  { name: '4. Executive Chambers Portrait (Glasses & Tie)', url: '/lawyer-hero.jpg' },
  { name: '5. Client Advocacy & Diligence (Hands Clasped)', url: '/lawyer-portrait-2.jpg' },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<FirmSettings | null>(null);
  const [activeTab, setActiveTab] = useState<
    'sections' | 'whychooseus' | 'experience' | 'gallery' | 'hero' | 'about' | 'recognition' | 'heroes' | 'firm'
  >('sections');
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Career History edit state
  const [editingCareerIdx, setEditingCareerIdx] = useState<number | null>(null);
  const [isAddingCareer, setIsAddingCareer] = useState(false);
  const [newCareerForm, setNewCareerForm] = useState<CareerHistoryItem>({
    period: '',
    firm: '',
    role: '',
    department: '',
    principal: '',
    supervisor: '',
    keyResponsibilities: [],
    notableMatters: [],
  });
  const [tempResp, setTempResp] = useState('');
  const [tempMatter, setTempMatter] = useState('');

  // Editing existing item temp sub-inputs
  const [editTempResp, setEditTempResp] = useState('');
  const [editTempMatter, setEditTempMatter] = useState('');

  const checkTabsScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  useEffect(() => {
    checkTabsScroll();
    window.addEventListener('resize', checkTabsScroll);
    return () => window.removeEventListener('resize', checkTabsScroll);
  }, [settings]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkTabsScroll, 200);
    }
  };

  const handleSelectTab = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    const el = document.getElementById(`tab-btn-${tabId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

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
          pastExperienceHighlights:
            s?.aboutPrincipal?.pastExperienceHighlights &&
            Array.isArray(s.aboutPrincipal.pastExperienceHighlights) &&
            s.aboutPrincipal.pastExperienceHighlights.length > 0
              ? s.aboutPrincipal.pastExperienceHighlights
              : (DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || []),
        },
        whyChooseUs: {
          ...DEFAULT_WHY_CHOOSE_US_SETTINGS,
          ...(s?.whyChooseUs || {}),
          items:
            s?.whyChooseUs?.items && Array.isArray(s.whyChooseUs.items) && s.whyChooseUs.items.length > 0
              ? s.whyChooseUs.items
              : DEFAULT_WHY_CHOOSE_US_SETTINGS.items,
        },
        careerHistory:
          s?.careerHistory && Array.isArray(s.careerHistory) && s.careerHistory.length > 0
            ? s.careerHistory
            : (DEFAULT_FIRM_SETTINGS.careerHistory || []),
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
        sections: {
          ...DEFAULT_FIRM_SETTINGS.sections,
          ...(s?.sections || {}),
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
    const updatedAbout = {
      ...settings.aboutPrincipal,
      [field]: value,
    };
    if (field === 'pastExperienceItem1' || field === 'pastExperienceItem2') {
      const highlights = [...(updatedAbout.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || [])];
      if (field === 'pastExperienceItem1') highlights[0] = value;
      if (field === 'pastExperienceItem2') highlights[1] = value;
      updatedAbout.pastExperienceHighlights = highlights;
    }
    setSettings({
      ...settings,
      aboutPrincipal: updatedAbout,
    });
  };

  // 1. Highlight points for AboutPrincipal (Homepage & About)
  const handleHighlightChange = (index: number, value: string) => {
    if (!settings) return;
    const current = [...(settings.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || [])];
    current[index] = value;
    setSettings({
      ...settings,
      aboutPrincipal: {
        ...settings.aboutPrincipal,
        pastExperienceHighlights: current,
        pastExperienceItem1: current[0] || '',
        pastExperienceItem2: current[1] || '',
      },
    });
  };

  const handleAddHighlight = () => {
    if (!settings) return;
    const current = [...(settings.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || [])];
    current.push('New Chambers Experience Highlight Point');
    setSettings({
      ...settings,
      aboutPrincipal: {
        ...settings.aboutPrincipal,
        pastExperienceHighlights: current,
        pastExperienceItem1: current[0] || '',
        pastExperienceItem2: current[1] || '',
      },
    });
    toast.success('Added new past experience highlight point.');
  };

  const handleDeleteHighlight = (index: number) => {
    if (!settings) return;
    const current = [...(settings.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || [])];
    current.splice(index, 1);
    setSettings({
      ...settings,
      aboutPrincipal: {
        ...settings.aboutPrincipal,
        pastExperienceHighlights: current,
        pastExperienceItem1: current[0] || '',
        pastExperienceItem2: current[1] || '',
      },
    });
    toast.info('Removed highlight point.');
  };

  const handleMoveHighlight = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const current = [...(settings.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= current.length) return;
    const temp = current[index];
    current[index] = current[targetIdx];
    current[targetIdx] = temp;
    setSettings({
      ...settings,
      aboutPrincipal: {
        ...settings.aboutPrincipal,
        pastExperienceHighlights: current,
        pastExperienceItem1: current[0] || '',
        pastExperienceItem2: current[1] || '',
      },
    });
  };

  // 2. Career History Items (Full Timeline on /our-team)
  const handleCareerFieldChange = (index: number, field: keyof CareerHistoryItem, value: any) => {
    if (!settings) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    list[index] = {
      ...list[index],
      [field]: value,
    };
    setSettings({
      ...settings,
      careerHistory: list,
    });
  };

  const handleAddCareerResp = (index: number, resp: string) => {
    if (!settings || !resp.trim()) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const currentResps = [...(list[index].keyResponsibilities || [])];
    currentResps.push(resp.trim());
    list[index] = { ...list[index], keyResponsibilities: currentResps };
    setSettings({ ...settings, careerHistory: list });
    setEditTempResp('');
  };

  const handleDeleteCareerResp = (index: number, rIdx: number) => {
    if (!settings) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const currentResps = [...(list[index].keyResponsibilities || [])];
    currentResps.splice(rIdx, 1);
    list[index] = { ...list[index], keyResponsibilities: currentResps };
    setSettings({ ...settings, careerHistory: list });
  };

  const handleAddCareerMatter = (index: number, matter: string) => {
    if (!settings || !matter.trim()) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const currentMatters = [...(list[index].notableMatters || [])];
    currentMatters.push(matter.trim());
    list[index] = { ...list[index], notableMatters: currentMatters };
    setSettings({ ...settings, careerHistory: list });
    setEditTempMatter('');
  };

  const handleDeleteCareerMatter = (index: number, mIdx: number) => {
    if (!settings) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const currentMatters = [...(list[index].notableMatters || [])];
    currentMatters.splice(mIdx, 1);
    list[index] = { ...list[index], notableMatters: currentMatters };
    setSettings({ ...settings, careerHistory: list });
  };

  const handleDeleteCareerItem = (index: number) => {
    if (!settings) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const removed = list.splice(index, 1);
    setSettings({ ...settings, careerHistory: list });
    if (editingCareerIdx === index) setEditingCareerIdx(null);
    toast.info(`Removed career role: ${removed[0]?.firm || 'Role'}`);
  };

  const handleMoveCareerItem = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const list = [...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setSettings({ ...settings, careerHistory: list });
    if (editingCareerIdx === index) setEditingCareerIdx(targetIdx);
  };

  const handleSaveNewCareer = () => {
    if (!settings) return;
    if (!newCareerForm.firm.trim() || !newCareerForm.role.trim() || !newCareerForm.period.trim()) {
      toast.error('Please provide at least the Firm name, Role, and Period.');
      return;
    }
    const list = [newCareerForm, ...(settings.careerHistory || DEFAULT_CAREER_HISTORY)];
    setSettings({ ...settings, careerHistory: list });
    setIsAddingCareer(false);
    setNewCareerForm({
      period: '',
      firm: '',
      role: '',
      department: '',
      principal: '',
      supervisor: '',
      keyResponsibilities: [],
      notableMatters: [],
    });
    setTempResp('');
    setTempMatter('');
    toast.success('Added new career position! Remember to click Save All Settings to publish.');
  };

  const handleResetCareerHistory = () => {
    if (!settings) return;
    if (confirm('Are you sure you want to reset your career history to the default Chambers positions?')) {
      setSettings({
        ...settings,
        careerHistory: DEFAULT_CAREER_HISTORY,
      });
      setEditingCareerIdx(null);
      toast.success('Reset career history to default.');
    }
  };

  // 3. Why Choose Us handlers
  const handleWhyChooseUsHeaderChange = (field: keyof WhyChooseUsSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      whyChooseUs: {
        ...(settings.whyChooseUs || DEFAULT_WHY_CHOOSE_US_SETTINGS),
        [field]: value,
      },
    });
  };

  const handleWhyChooseUsItemChange = (index: number, field: keyof WhyChooseUsItem, value: string) => {
    if (!settings) return;
    const currentItems = [...(settings.whyChooseUs?.items || DEFAULT_WHY_CHOOSE_US_SETTINGS.items)];
    currentItems[index] = {
      ...currentItems[index],
      [field]: value,
    };
    setSettings({
      ...settings,
      whyChooseUs: {
        ...(settings.whyChooseUs || DEFAULT_WHY_CHOOSE_US_SETTINGS),
        items: currentItems,
      },
    });
  };

  const handleAddWhyChooseUsItem = () => {
    if (!settings) return;
    const currentItems = [...(settings.whyChooseUs?.items || DEFAULT_WHY_CHOOSE_US_SETTINGS.items)];
    currentItems.push({
      id: Date.now().toString(),
      title: 'New Strategic Pillar',
      description: 'Detail why prospective clients and corporations should choose your firm for this area.',
      icon: 'ShieldCheck',
      highlight: 'Chambers Advantage',
    });
    setSettings({
      ...settings,
      whyChooseUs: {
        ...(settings.whyChooseUs || DEFAULT_WHY_CHOOSE_US_SETTINGS),
        items: currentItems,
      },
    });
    toast.success('Added new pillar to Why Choose Us.');
  };

  const handleDeleteWhyChooseUsItem = (index: number) => {
    if (!settings) return;
    const currentItems = [...(settings.whyChooseUs?.items || DEFAULT_WHY_CHOOSE_US_SETTINGS.items)];
    currentItems.splice(index, 1);
    setSettings({
      ...settings,
      whyChooseUs: {
        ...(settings.whyChooseUs || DEFAULT_WHY_CHOOSE_US_SETTINGS),
        items: currentItems,
      },
    });
    toast.info('Removed pillar.');
  };

  const handleMoveWhyChooseUsItem = (index: number, direction: 'up' | 'down') => {
    if (!settings) return;
    const currentItems = [...(settings.whyChooseUs?.items || DEFAULT_WHY_CHOOSE_US_SETTINGS.items)];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentItems.length) return;
    const temp = currentItems[index];
    currentItems[index] = currentItems[targetIdx];
    currentItems[targetIdx] = temp;
    setSettings({
      ...settings,
      whyChooseUs: {
        ...(settings.whyChooseUs || DEFAULT_WHY_CHOOSE_US_SETTINGS),
        items: currentItems,
      },
    });
  };

  const handleResetWhyChooseUs = () => {
    if (!settings) return;
    if (confirm('Reset Why Choose Us section to default pillars and content?')) {
      setSettings({
        ...settings,
        whyChooseUs: DEFAULT_WHY_CHOOSE_US_SETTINGS,
      });
      toast.success('Reset Why Choose Us to default.');
    }
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
  const handleToggleSection = (field: keyof SectionVisibilitySettings) => {
    if (!settings) return;
    const currentSections: SectionVisibilitySettings = settings.sections || {
      showWhyChooseUs: true,
      showGallery: false,
      showRecognition: false,
      showFirmOverview: false,
      showArticles: false,
    };
    const updated = {
      ...currentSections,
      [field]: !currentSections[field],
    };
    setSettings({
      ...settings,
      sections: updated,
    });
    toast.info(`Updated section: ${field} is now ${updated[field] ? 'Visible on homepage' : 'Hidden from homepage'}. Click Save to publish.`);
  };

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
      <div className="p-8 text-center text-[#2B2D33]/60 text-xs">
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

      <div className="p-3 sm:p-5 lg:p-6 xl:p-8 w-full max-w-[99%] xl:max-w-[97%] 2xl:max-w-[1820px] mx-auto space-y-6">
        {savedSuccess && (
          <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center rounded-2xl animate-in fade-in shadow-xs">
            ✓ All Website Content and Changes Published Live Successfully!
          </div>
        )}

        {/* Tab Selector with Left/Right Buttons and Clean Layout */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#4B2A7B] font-semibold px-1 pb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4B2A7B] animate-pulse" />
              Website Settings Category:
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#2B2D33]/60">
              <span>Scroll tabs</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#4B2A7B]" />
            </div>
          </div>

          <div className="relative flex items-center group">
            {/* Desktop Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollTabs('left')}
              className="absolute -left-3 z-10 p-2 rounded-xl bg-white/95 hover:bg-[#4B2A7B] text-[#4B2A7B] hover:text-white border border-[#E5DFD3] hover:border-[#4B2A7B] shadow-md backdrop-blur-md transition-all active:scale-95 hidden md:flex items-center justify-center cursor-pointer"
              title="Scroll Tabs Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Container with Hidden Browser Scrollbar */}
            <div
              ref={tabsRef}
              onScroll={checkTabsScroll}
              className="flex items-center gap-2 p-2 bg-white border border-[#E5DFD3] rounded-2xl w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth shadow-xs"
            >
              {[
                { id: 'sections' as const, label: 'Homepage Sections', icon: Layers },
                { id: 'whychooseus' as const, label: 'Why Choose Us', icon: CheckCircle2 },
                { id: 'experience' as const, label: `Past Work Experience (${settings?.careerHistory?.length || 10})`, icon: Briefcase },
                { id: 'about' as const, label: 'About Principal Lawyer', icon: User },
                { id: 'hero' as const, label: 'Hero & Headlines', icon: Building2 },
                { id: 'gallery' as const, label: `Portrait Gallery (${settings?.gallery?.items?.length || 5})`, icon: Camera },
                { id: 'recognition' as const, label: 'Recognition & Accolades', icon: Award },
                { id: 'heroes' as const, label: 'Hero Backgrounds (7 Pages)', icon: ImageIcon },
                { id: 'firm' as const, label: 'Firm Profile & Contacts', icon: Scale },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-btn-${tab.id}`}
                    type="button"
                    onClick={() => handleSelectTab(tab.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#4B2A7B] hover:bg-[#3A1F60] text-white shadow-xs'
                        : 'text-[#2B2D33]/70 hover:text-[#2B2D33] hover:bg-[#FAF8F2] border border-transparent hover:border-[#E5DFD3]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollTabs('right')}
              className="absolute -right-3 z-10 p-2 rounded-xl bg-white/95 hover:bg-[#4B2A7B] text-[#4B2A7B] hover:text-white border border-[#E5DFD3] hover:border-[#4B2A7B] shadow-md backdrop-blur-md transition-all active:scale-95 hidden md:flex items-center justify-center cursor-pointer"
              title="Scroll Tabs Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 0: HOMEPAGE SECTIONS CONTROL */}
          {activeTab === 'sections' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5DFD3] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Homepage Layout Simplification</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                    Homepage Section Controls
                  </h3>
                  <p className="text-xs text-[#2B2D33]/70 mt-1">
                    Control which sections appear on the homepage. Core sections (Hero, About, Practice Areas, Testimonials, Contact) remain active by default. Supplementary sections are hidden by default and toggleable below.
                  </p>
                </div>
              </div>

              {/* Core Active Sections Callout */}
              <div className="p-4 bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl">
                <span className="text-[11px] font-bold text-[#4B2A7B] uppercase tracking-wider block mb-2">
                  Active Core Sections (Permanent on Homepage)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold text-[#2B2D33]">
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-[#E5DFD3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>1. Hero</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-[#E5DFD3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>2. About</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-[#E5DFD3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>3. Practice Areas</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-[#E5DFD3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>4. Testimonials</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2.5 bg-white rounded-lg border border-[#E5DFD3]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B2A7B]" />
                    <span>5. Contact</span>
                  </div>
                </div>
              </div>

              {/* Toggleable Sections List */}
              <div className="space-y-4 pt-2">
                <h4 className="font-serif text-sm font-bold text-[#2B2D33]">
                  Toggleable Supplementary Sections (Hidden by Default)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 0. Why Choose Us Section */}
                  <div className="p-5 rounded-2xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B]/40 transition-colors shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-bold text-[#2B2D33]">
                          Why Choose Us (6 Strategic Pillars)
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.sections?.showWhyChooseUs !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAF8F2] text-[#2B2D33]/60 border border-[#E5DFD3]'
                        }`}>
                          {settings.sections?.showWhyChooseUs !== false ? 'Visible on Homepage (Active)' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D33]/70 leading-relaxed mb-4">
                        6 high-impact pillars demonstrating trial advocacy, corporate in-house depth, zero junior delegation, transparent fees, and to-the-point strategy.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => handleToggleSection('showWhyChooseUs')}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          settings.sections?.showWhyChooseUs !== false
                            ? 'bg-[#4B2A7B] text-white hover:bg-[#3A1F60]'
                            : 'bg-[#FAF8F2] border border-[#E5DFD3] text-[#2B2D33] hover:border-[#4B2A7B]'
                        }`}
                      >
                        <span>{settings.sections?.showWhyChooseUs !== false ? 'Hide from Homepage' : 'Enable on Homepage'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectTab('whychooseus')}
                        className="w-full py-2 px-3 rounded-lg text-[11px] font-semibold text-[#4B2A7B] bg-[#FAF8F2] hover:bg-[#FAF8F2]/80 border border-[#E5DFD3] transition-all cursor-pointer text-center"
                      >
                        Edit Why Choose Us Content →
                      </button>
                    </div>
                  </div>

                  {/* 1. Portraits Gallery */}
                  <div className="p-5 rounded-2xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B]/40 transition-colors shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-bold text-[#2B2D33]">
                          Portraits & Leadership Gallery
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.sections?.showGallery ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAF8F2] text-[#2B2D33]/60 border border-[#E5DFD3]'
                        }`}>
                          {settings.sections?.showGallery ? 'Visible on Homepage' : 'Hidden (Default)'}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D33]/70 leading-relaxed mb-4">
                        Interactive 5-photo showcase highlighting Principal Counsel Low Wah Chin across court dress and chambers milestones.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSection('showGallery')}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        settings.sections?.showGallery
                          ? 'bg-[#4B2A7B] text-white hover:bg-[#3A1F60]'
                          : 'bg-[#FAF8F2] border border-[#E5DFD3] text-[#2B2D33] hover:border-[#4B2A7B]'
                      }`}
                    >
                      <span>{settings.sections?.showGallery ? 'Hide from Homepage' : 'Enable on Homepage'}</span>
                    </button>
                  </div>

                  {/* 2. Best Law Firms Feature */}
                  <div className="p-5 rounded-2xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B]/40 transition-colors shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-bold text-[#2B2D33]">
                          &ldquo;Best Law Firms&rdquo; Feature
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.sections?.showRecognition ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAF8F2] text-[#2B2D33]/60 border border-[#E5DFD3]'
                        }`}>
                          {settings.sections?.showRecognition ? 'Visible on Homepage' : 'Hidden (Default)'}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D33]/70 leading-relaxed mb-4">
                        Trusted Malaysia editorial feature highlighting the firm’s top 10 ranking and accreditation stats.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSection('showRecognition')}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        settings.sections?.showRecognition
                          ? 'bg-[#4B2A7B] text-white hover:bg-[#3A1F60]'
                          : 'bg-[#FAF8F2] border border-[#E5DFD3] text-[#2B2D33] hover:border-[#4B2A7B]'
                      }`}
                    >
                      <span>{settings.sections?.showRecognition ? 'Hide from Homepage' : 'Enable on Homepage'}</span>
                    </button>
                  </div>

                  {/* 3. Firm Overview & Quick Facts */}
                  <div className="p-5 rounded-2xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B]/40 transition-colors shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-bold text-[#2B2D33]">
                          Firm Overview & Quick Facts
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.sections?.showFirmOverview ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAF8F2] text-[#2B2D33]/60 border border-[#E5DFD3]'
                        }`}>
                          {settings.sections?.showFirmOverview ? 'Visible on Homepage' : 'Hidden (Default)'}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D33]/70 leading-relaxed mb-4">
                        Strategic overview highlighting firm foundation, Colony @ KLCC location map, and regulatory practice background.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSection('showFirmOverview')}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        settings.sections?.showFirmOverview
                          ? 'bg-[#4B2A7B] text-white hover:bg-[#3A1F60]'
                          : 'bg-[#FAF8F2] border border-[#E5DFD3] text-[#2B2D33] hover:border-[#4B2A7B]'
                      }`}
                    >
                      <span>{settings.sections?.showFirmOverview ? 'Hide from Homepage' : 'Enable on Homepage'}</span>
                    </button>
                  </div>

                  {/* 4. Latest Legal Articles */}
                  <div className="p-5 rounded-2xl border border-[#E5DFD3] bg-white hover:border-[#4B2A7B]/40 transition-colors shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-serif text-sm font-bold text-[#2B2D33]">
                          Latest Legal Insights & Articles
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          settings.sections?.showArticles ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAF8F2] text-[#2B2D33]/60 border border-[#E5DFD3]'
                        }`}>
                          {settings.sections?.showArticles ? 'Visible on Homepage' : 'Hidden (Default)'}
                        </span>
                      </div>
                      <p className="text-xs text-[#2B2D33]/70 leading-relaxed mb-4">
                        Highlights the 3 latest legal insights, conveyancing breakdowns, and litigation guides directly on the homepage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleSection('showArticles')}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        settings.sections?.showArticles
                          ? 'bg-[#4B2A7B] text-white hover:bg-[#3A1F60]'
                          : 'bg-[#FAF8F2] border border-[#E5DFD3] text-[#2B2D33] hover:border-[#4B2A7B]'
                      }`}
                    >
                      <span>{settings.sections?.showArticles ? 'Hide from Homepage' : 'Enable on Homepage'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WHY CHOOSE US (6 STRATEGIC PILLARS) */}
          {activeTab === 'whychooseus' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5DFD3] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Homepage Decision & Conversion Engine</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                    Why Choose Us (6 Strategic Pillars)
                  </h3>
                  <p className="text-xs text-[#2B2D33]/70 mt-1">
                    Manage the headlines, motto ribbon, consultation CTAs, and the 6 high-impact pillars that demonstrate why clients and corporations choose Messrs. Low Wah Chin & Co.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetWhyChooseUs}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F2] hover:bg-[#FAF8F2]/80 text-[#2B2D33] border border-[#E5DFD3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddWhyChooseUsItem}
                    className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Strategic Pillar</span>
                  </button>
                </div>
              </div>

              {/* Section Header & Banner Controls */}
              <div className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-6 space-y-4">
                <span className="text-xs font-bold text-[#4B2A7B] uppercase tracking-wider block border-b border-[#E5DFD3] pb-2">
                  Section Header, Motto & Consultation Action Labels
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Section Badge Label
                    </label>
                    <input
                      type="text"
                      value={settings?.whyChooseUs?.badge || ''}
                      onChange={(e) => handleWhyChooseUsHeaderChange('badge', e.target.value)}
                      placeholder="e.g. Why Choose Low Wah Chin & Co."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Section Heading Title
                    </label>
                    <input
                      type="text"
                      value={settings?.whyChooseUs?.title || ''}
                      onChange={(e) => handleWhyChooseUsHeaderChange('title', e.target.value)}
                      placeholder="e.g. Commanding Advocacy, Uncompromising Integrity & Direct Counsel"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-[#2B2D33]/80 mb-1">
                    Section Subtitle / Narrative Intro
                  </label>
                  <textarea
                    rows={2}
                    value={settings?.whyChooseUs?.subtitle || ''}
                    onChange={(e) => handleWhyChooseUsHeaderChange('subtitle', e.target.value)}
                    placeholder="e.g. Why corporate leaders, business owners, and private individuals entrust their critical legal..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Featured Motto Quote Ribbon
                    </label>
                    <input
                      type="text"
                      value={settings?.whyChooseUs?.quote || ''}
                      onChange={(e) => handleWhyChooseUsHeaderChange('quote', e.target.value)}
                      placeholder="e.g. “Passion & Duty, Integrity & Care — To the Point.”"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={settings?.whyChooseUs?.ctaText || ''}
                      onChange={(e) => handleWhyChooseUsHeaderChange('ctaText', e.target.value)}
                      placeholder="e.g. Schedule Consultation"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      WhatsApp Button Label
                    </label>
                    <input
                      type="text"
                      value={settings?.whyChooseUs?.whatsappText || ''}
                      onChange={(e) => handleWhyChooseUsHeaderChange('whatsappText', e.target.value)}
                      placeholder="e.g. Direct WhatsApp Inquiry"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-[#2B2D33]/80 mb-1">
                    Bottom Trust Banner Note (Footer of section)
                  </label>
                  <input
                    type="text"
                    value={settings?.whyChooseUs?.footerNote || ''}
                    onChange={(e) => handleWhyChooseUsHeaderChange('footerNote', e.target.value)}
                    placeholder="e.g. Practising since 11 November 2011 • Kuala Lumpur Chambers at Colony @ KLCC, Vipod Residences."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                  />
                </div>
              </div>

              {/* Pillars Cards List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#2B2D33] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#4B2A7B]" />
                    <span>Strategic Pillars ({settings?.whyChooseUs?.items?.length || 0})</span>
                  </h4>
                  <span className="text-xs text-[#2B2D33]/60">
                    Reorder, edit titles, select icons, or modify descriptions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(settings?.whyChooseUs?.items || DEFAULT_WHY_CHOOSE_US_SETTINGS.items).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-5 rounded-2xl bg-white border border-[#E5DFD3] hover:border-[#4B2A7B]/40 transition-colors shadow-xs space-y-4 relative"
                    >
                      <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] font-mono text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-serif text-sm font-bold text-[#2B2D33] truncate max-w-[200px]">
                            {item.title || `Pillar #${idx + 1}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveWhyChooseUsItem(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded-lg hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveWhyChooseUsItem(idx, 'down')}
                            disabled={idx === (settings?.whyChooseUs?.items?.length || DEFAULT_WHY_CHOOSE_US_SETTINGS.items.length) - 1}
                            className="p-1 rounded-lg hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteWhyChooseUsItem(idx)}
                            className="p-1 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 cursor-pointer transition-colors ml-1"
                            title="Delete Pillar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Pillar Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleWhyChooseUsItemChange(idx, 'title', e.target.value)}
                              placeholder="e.g. Lincoln’s Inn Barrister & High Court Advocacy"
                              className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Highlight Badge / Pill
                            </label>
                            <input
                              type="text"
                              value={item.highlight || ''}
                              onChange={(e) => handleWhyChooseUsItemChange(idx, 'highlight', e.target.value)}
                              placeholder="e.g. 100% Partner-Led"
                              className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-[#2B2D33]/80 mb-1">
                            Icon Selection
                          </label>
                          <select
                            value={item.icon || 'Scale'}
                            onChange={(e) => handleWhyChooseUsItemChange(idx, 'icon', e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] font-medium focus:outline-none focus:border-[#4B2A7B]"
                          >
                            <option value="Scale">⚖️ Scale (Advocacy & Courtroom Trial)</option>
                            <option value="Building2">🏢 Building2 (Corporate & Commercial In-House)</option>
                            <option value="UserCheck">👤 UserCheck (Direct Principal Attention)</option>
                            <option value="Compass">🧭 Compass (Strategic & Pragmatic Advice)</option>
                            <option value="Banknote">💵 Banknote (Transparent & Predictable Fees)</option>
                            <option value="Award">🏆 Award (Honors, Commendations & Rankings)</option>
                            <option value="ShieldCheck">🛡️ ShieldCheck (Protection, Integrity & Ethics)</option>
                            <option value="CheckCircle2">✅ CheckCircle2 (Verified & Proven Outcome)</option>
                            <option value="Target">🎯 Target (Direct Objective & Results)</option>
                            <option value="Briefcase">💼 Briefcase (Commercial Law & Business)</option>
                            <option value="Lock">🔒 Lock (Privilege & Absolute Confidentiality)</option>
                            <option value="Landmark">🏛️ Landmark (Malaysian Bar & Institutional Pedigree)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-[#2B2D33]/80 mb-1">
                            Description Narrative
                          </label>
                          <textarea
                            rows={3}
                            value={item.description}
                            onChange={(e) => handleWhyChooseUsItemChange(idx, 'description', e.target.value)}
                            placeholder="Describe this strategic advantage in 2–3 sentences..."
                            className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] leading-relaxed focus:outline-none focus:border-[#4B2A7B]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PAST WORK EXPERIENCE (FULL TIMELINE & HOMEPAGE HIGHLIGHTS) */}
          {activeTab === 'experience' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5DFD3] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Career Pedigree & Practice History Master Control</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                    Past Work Experience & Institutional Pedigree
                  </h3>
                  <p className="text-xs text-[#2B2D33]/70 mt-1">
                    Fully manage and edit your past law firm positions, corporate in-house counsel appointments, key matters, and homepage highlight badges. All changes save directly to your database and update both the Homepage and <code className="text-[#4B2A7B] font-mono">/our-team</code> immediately.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetCareerHistory}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F2] hover:bg-[#FAF8F2]/80 text-[#2B2D33] border border-[#E5DFD3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Chambers History</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCareer(!isAddingCareer);
                      setEditingCareerIdx(null);
                    }}
                    className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingCareer ? 'Close Form' : 'Add New Career Role'}</span>
                  </button>
                </div>
              </div>

              {/* 1. HOMEPAGE QUICK HIGHLIGHTS */}
              <div className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E5DFD3] pb-3">
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-[#2B2D33] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4B2A7B]" />
                      <span>1. Homepage Quick Pedigree Highlights</span>
                    </h4>
                    <p className="text-xs text-[#2B2D33]/70 mt-0.5">
                      These bullet highlights appear directly below Statutory Bar Admissions in the Principal Counsel section on the homepage and about page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="self-start sm:self-auto px-3 py-1.5 bg-white hover:bg-white/80 text-[#4B2A7B] border border-[#E5DFD3] rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Highlight Point</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(settings?.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || []).map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#E5DFD3] shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        #{hIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => handleHighlightChange(hIdx, e.target.value)}
                        placeholder="e.g. Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong"
                        className="flex-1 px-3 py-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                      />
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveHighlight(hIdx, 'up')}
                          disabled={hIdx === 0}
                          className="p-1.5 rounded hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveHighlight(hIdx, 'down')}
                          disabled={hIdx === (settings?.aboutPrincipal?.pastExperienceHighlights?.length || 3) - 1}
                          className="p-1.5 rounded hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteHighlight(hIdx)}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700 cursor-pointer"
                          title="Delete Point"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. DETAILED LAW FIRM & CORPORATE CAREER TRAJECTORY (/our-team) */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E5DFD3] pb-3">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#2B2D33] flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#4B2A7B]" />
                      <span>2. Detailed Law Firm & Corporate Career History</span>
                    </h4>
                    <p className="text-xs text-[#2B2D33]/70 mt-0.5">
                      All historical positions, firms, dates, responsibilities, and notable legal matters displayed on <code className="text-[#4B2A7B] font-mono">/our-team</code> (Practice History & Institutional Trajectory).
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#4B2A7B] bg-[#FAF8F2] px-3 py-1 rounded-full border border-[#E5DFD3] self-start sm:self-auto">
                    {settings?.careerHistory?.length || DEFAULT_CAREER_HISTORY.length} Positions Active
                  </span>
                </div>

                {/* ADD NEW POSITION FORM */}
                {isAddingCareer && (
                  <div className="p-6 rounded-2xl bg-[#FAF8F2] border-2 border-[#4B2A7B] shadow-md space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-[#E5DFD3] pb-3">
                      <span className="font-serif text-sm font-bold text-[#4B2A7B] flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span>Add New Career Role / Institution</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsAddingCareer(false)}
                        className="text-xs text-[#2B2D33]/60 hover:text-[#2B2D33] p-1 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#2B2D33]/80 mb-1">
                          Firm / Organization Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newCareerForm.firm}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, firm: e.target.value })}
                          placeholder="e.g. Messrs. Shook Lin & Bok"
                          className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#2B2D33]/80 mb-1">
                          Role / Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newCareerForm.role}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, role: e.target.value })}
                          placeholder="e.g. Legal Associate / Partner"
                          className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#2B2D33]/80 mb-1">
                          Period / Tenure *
                        </label>
                        <input
                          type="text"
                          required
                          value={newCareerForm.period}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, period: e.target.value })}
                          placeholder="e.g. November 2011 – May 2012"
                          className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#2B2D33]/80 mb-1">
                          Department / Practice Group
                        </label>
                        <input
                          type="text"
                          value={newCareerForm.department || ''}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, department: e.target.value })}
                          placeholder="e.g. General & Civil Litigation Department"
                          className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#2B2D33]/80 mb-1">
                          Supervised By / Principal Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={newCareerForm.supervisor || newCareerForm.principal || ''}
                          onChange={(e) => setNewCareerForm({ ...newCareerForm, supervisor: e.target.value })}
                          placeholder="e.g. Supervised by Senior Partner / Head of Legal"
                          className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                      </div>
                    </div>

                    {/* Sub-inputs for Responsibilities */}
                    <div className="pt-2 border-t border-[#E5DFD3] text-xs space-y-2">
                      <label className="block font-bold text-[#2B2D33]/80">
                        Key Responsibilities (Bullet points)
                      </label>
                      {newCareerForm.keyResponsibilities && newCareerForm.keyResponsibilities.length > 0 && (
                        <ul className="space-y-1.5 mb-2">
                          {newCareerForm.keyResponsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-center justify-between p-2 bg-white rounded border border-[#E5DFD3]">
                              <span>• {resp}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(newCareerForm.keyResponsibilities || [])];
                                  updated.splice(rIdx, 1);
                                  setNewCareerForm({ ...newCareerForm, keyResponsibilities: updated });
                                }}
                                className="text-rose-500 hover:text-rose-700 p-0.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempResp}
                          onChange={(e) => setTempResp(e.target.value)}
                          placeholder="e.g. Conducted High Court interlocutory hearings and summary judgments..."
                          className="flex-1 px-3 py-1.5 bg-white border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (tempResp.trim()) {
                              setNewCareerForm({
                                ...newCareerForm,
                                keyResponsibilities: [...(newCareerForm.keyResponsibilities || []), tempResp.trim()],
                              });
                              setTempResp('');
                            }
                          }}
                          className="px-3 py-1.5 bg-[#FAF8F2] hover:bg-white text-[#4B2A7B] border border-[#E5DFD3] rounded-lg font-bold text-xs"
                        >
                          Add Point
                        </button>
                      </div>
                    </div>

                    {/* Sub-inputs for Notable Matters */}
                    <div className="pt-2 border-t border-[#E5DFD3] text-xs space-y-2">
                      <label className="block font-bold text-[#2B2D33]/80">
                        Notable Matters & Experience Handled (Optional)
                      </label>
                      {newCareerForm.notableMatters && newCareerForm.notableMatters.length > 0 && (
                        <ul className="space-y-1.5 mb-2">
                          {newCareerForm.notableMatters.map((matter, mIdx) => (
                            <li key={mIdx} className="flex items-center justify-between p-2 bg-white rounded border border-[#E5DFD3]">
                              <span>• {matter}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(newCareerForm.notableMatters || [])];
                                  updated.splice(mIdx, 1);
                                  setNewCareerForm({ ...newCareerForm, notableMatters: updated });
                                }}
                                className="text-rose-500 hover:text-rose-700 p-0.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempMatter}
                          onChange={(e) => setTempMatter(e.target.value)}
                          placeholder="e.g. Drafted Share Sale Agreement for private company at RM6.8M..."
                          className="flex-1 px-3 py-1.5 bg-white border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (tempMatter.trim()) {
                              setNewCareerForm({
                                ...newCareerForm,
                                notableMatters: [...(newCareerForm.notableMatters || []), tempMatter.trim()],
                              });
                              setTempMatter('');
                            }
                          }}
                          className="px-3 py-1.5 bg-[#FAF8F2] hover:bg-white text-[#4B2A7B] border border-[#E5DFD3] rounded-lg font-bold text-xs"
                        >
                          Add Matter
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5DFD3]">
                      <button
                        type="button"
                        onClick={() => setIsAddingCareer(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E5DFD3] text-[#2B2D33] hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveNewCareer}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-[#4B2A7B] hover:bg-[#3A1F60] text-white flex items-center gap-1.5 shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Position to Career History</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* EXISTING POSITIONS LIST */}
                <div className="space-y-4">
                  {(settings?.careerHistory || DEFAULT_CAREER_HISTORY).map((item, idx) => {
                    const isEditing = editingCareerIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all ${
                          isEditing
                            ? 'bg-white border-[#4B2A7B] shadow-md p-6'
                            : 'bg-[#FAF8F2] border-[#E5DFD3] hover:border-[#4B2A7B]/40 p-5'
                        }`}
                      >
                        {/* Header bar of position */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-3 border-b border-[#E5DFD3]">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-base font-bold text-[#2B2D33]">
                                {item.firm}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-[#4B2A7B] bg-white px-2 py-0.5 rounded border border-[#E5DFD3]">
                                {item.period}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-[#4B2A7B] mt-0.5">
                              {item.role} {item.department && `• ${item.department}`}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 self-end sm:self-auto">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCareerIdx(isEditing ? null : idx);
                                setIsAddingCareer(false);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                isEditing
                                  ? 'bg-[#4B2A7B] text-white'
                                  : 'bg-white hover:bg-[#4B2A7B] hover:text-white text-[#2B2D33] border border-[#E5DFD3]'
                              }`}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isEditing ? 'Done' : 'Edit'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveCareerItem(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveCareerItem(idx, 'down')}
                              disabled={idx === (settings?.careerHistory?.length || DEFAULT_CAREER_HISTORY.length) - 1}
                              className="p-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCareerItem(idx)}
                              className="p-1.5 rounded-lg bg-white border border-[#E5DFD3] text-rose-500 hover:bg-rose-50 hover:text-rose-700 cursor-pointer ml-1"
                              title="Delete Position"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Collapsed quick summary */}
                        {!isEditing && (
                          <div className="pt-3 text-xs text-[#2B2D33]/70 space-y-1.5">
                            {(item.principal || item.supervisor) && (
                              <p className="italic">
                                {item.principal ? `Principal: ${item.principal}` : `Supervised by: ${item.supervisor}`}
                              </p>
                            )}
                            <div className="flex items-center gap-3 font-medium text-[11px] text-[#4B2A7B] pt-1">
                              <span>✓ {item.keyResponsibilities?.length || 0} Key Responsibilities</span>
                              <span>•</span>
                              <span>✓ {item.notableMatters?.length || 0} Matters Handled</span>
                            </div>
                          </div>
                        )}

                        {/* Expanded Full Editor Form */}
                        {isEditing && (
                          <div className="pt-4 space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-bold text-[#2B2D33]/80 mb-1">
                                  Firm / Organization
                                </label>
                                <input
                                  type="text"
                                  value={item.firm}
                                  onChange={(e) => handleCareerFieldChange(idx, 'firm', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-[#2B2D33]/80 mb-1">
                                  Role / Title
                                </label>
                                <input
                                  type="text"
                                  value={item.role}
                                  onChange={(e) => handleCareerFieldChange(idx, 'role', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-[#2B2D33]/80 mb-1">
                                  Period / Dates
                                </label>
                                <input
                                  type="text"
                                  value={item.period}
                                  onChange={(e) => handleCareerFieldChange(idx, 'period', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                              </div>

                              <div>
                                <label className="block font-bold text-[#2B2D33]/80 mb-1">
                                  Department / Practice Group
                                </label>
                                <input
                                  type="text"
                                  value={item.department || ''}
                                  onChange={(e) => handleCareerFieldChange(idx, 'department', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-bold text-[#2B2D33]/80 mb-1">
                                  Principal / Supervisor Name
                                </label>
                                <input
                                  type="text"
                                  value={item.supervisor || item.principal || ''}
                                  onChange={(e) => handleCareerFieldChange(idx, item.principal ? 'principal' : 'supervisor', e.target.value)}
                                  className="w-full px-3 py-2 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                              </div>
                            </div>

                            {/* Responsibilities Editor */}
                            <div className="pt-3 border-t border-[#E5DFD3] space-y-2">
                              <label className="block font-bold text-[#2B2D33]/80">
                                Key Responsibilities ({item.keyResponsibilities?.length || 0})
                              </label>
                              <div className="space-y-1.5">
                                {(item.keyResponsibilities || []).map((resp, rIdx) => (
                                  <div key={rIdx} className="flex items-center gap-2 p-2 bg-[#FAF8F2] rounded border border-[#E5DFD3]">
                                    <span className="text-[#4B2A7B] font-bold">•</span>
                                    <input
                                      type="text"
                                      value={resp}
                                      onChange={(e) => {
                                        const updatedResps = [...(item.keyResponsibilities || [])];
                                        updatedResps[rIdx] = e.target.value;
                                        handleCareerFieldChange(idx, 'keyResponsibilities', updatedResps);
                                      }}
                                      className="flex-1 bg-transparent border-0 text-xs text-[#2B2D33] focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCareerResp(idx, rIdx)}
                                      className="text-rose-500 hover:text-rose-700 p-1"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 pt-1">
                                <input
                                  type="text"
                                  value={editTempResp}
                                  onChange={(e) => setEditTempResp(e.target.value)}
                                  placeholder="Add another responsibility bullet point..."
                                  className="flex-1 px-3 py-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddCareerResp(idx, editTempResp)}
                                  className="px-3 py-1.5 bg-white text-[#4B2A7B] border border-[#E5DFD3] rounded-lg font-bold text-xs hover:bg-[#FAF8F2]"
                                >
                                  Add Point
                                </button>
                              </div>
                            </div>

                            {/* Notable Matters Editor */}
                            <div className="pt-3 border-t border-[#E5DFD3] space-y-2">
                              <label className="block font-bold text-[#2B2D33]/80">
                                Key Matters & Cases Handled ({item.notableMatters?.length || 0})
                              </label>
                              <div className="space-y-1.5">
                                {(item.notableMatters || []).map((matter, mIdx) => (
                                  <div key={mIdx} className="flex items-center gap-2 p-2 bg-[#FAF8F2] rounded border border-[#E5DFD3]">
                                    <span className="text-[#4B2A7B] font-bold">•</span>
                                    <input
                                      type="text"
                                      value={matter}
                                      onChange={(e) => {
                                        const updatedMatters = [...(item.notableMatters || [])];
                                        updatedMatters[mIdx] = e.target.value;
                                        handleCareerFieldChange(idx, 'notableMatters', updatedMatters);
                                      }}
                                      className="flex-1 bg-transparent border-0 text-xs text-[#2B2D33] focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCareerMatter(idx, mIdx)}
                                      className="text-rose-500 hover:text-rose-700 p-1"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 pt-1">
                                <input
                                  type="text"
                                  value={editTempMatter}
                                  onChange={(e) => setEditTempMatter(e.target.value)}
                                  placeholder="Add another key matter or brief handled..."
                                  className="flex-1 px-3 py-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddCareerMatter(idx, editTempMatter)}
                                  className="px-3 py-1.5 bg-white text-[#4B2A7B] border border-[#E5DFD3] rounded-lg font-bold text-xs hover:bg-[#FAF8F2]"
                                >
                                  Add Matter
                                </button>
                              </div>
                            </div>

                            <div className="pt-3 flex justify-end">
                              <button
                                type="button"
                                onClick={() => setEditingCareerIdx(null)}
                                className="px-4 py-2 bg-[#4B2A7B] text-white rounded-xl text-xs font-bold hover:bg-[#3A1F60] transition-colors shadow-xs"
                              >
                                Done Editing Role
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: PORTRAIT GALLERY & LEADERSHIP */}
          {activeTab === 'gallery' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5DFD3] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Live Website Portrait Showcase</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                    Portraits & Chambers Leadership Gallery
                  </h3>
                  <p className="text-xs text-[#2B2D33]/70 mt-1">
                    Upload new photos directly with Cloudinary, or select from presets. Manage titles, badges, and descriptions shown in the public interactive gallery.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetGalleryDefaults}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FAF8F2] hover:bg-[#FAF8F2]/80 text-[#2B2D33] border border-[#E5DFD3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddGalleryCard}
                    className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Photo Card</span>
                  </button>
                </div>
              </div>

              {/* Section Header Text Inputs */}
              <div className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-5 space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#2B2D33] border-b border-[#E5DFD3] pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Gallery Section Title & Badges</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Section Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionBadge || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionBadge', e.target.value)}
                      placeholder="e.g. Advocate & Solicitor • Lincoln’s Inn Barrister"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Main Section Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionTitle || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionTitle', e.target.value)}
                      placeholder="e.g. Portraits & Chambers Leadership Gallery"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.gallery?.sectionSubtitle || ''}
                      onChange={(e) => handleGalleryHeaderChange('sectionSubtitle', e.target.value)}
                      placeholder="e.g. Principal Counsel Low Wah Chin (Ava Rachel) 劉華晶"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Portrait Cards List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4B2A7B]">
                    Gallery Cards ({settings.gallery.items.length})
                  </span>
                  <span className="text-[11px] text-[#2B2D33]/60">
                    Upload new photos, use 1-click photo selectors, or use arrow buttons to reorder
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {settings.gallery.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-5 shadow-xs space-y-4 hover:border-[#4B2A7B]/40 transition-all"
                    >
                      {/* Card Header & Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DFD3] pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#4B2A7B] text-white text-xs font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-serif text-base font-bold text-[#2B2D33]">
                            {item.title || `Portrait Card #${idx + 1}`}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-[#4B2A7B] bg-white px-2 py-0.5 rounded border border-[#E5DFD3]">
                            {item.badge || 'Badge'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveGalleryCard(idx, 'up')}
                            className="p-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33]/70 hover:text-[#2B2D33] disabled:opacity-30 transition-colors shadow-xs"
                            title="Move Card Up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === settings.gallery.items.length - 1}
                            onClick={() => handleMoveGalleryCard(idx, 'down')}
                            className="p-1.5 rounded-lg bg-white border border-[#E5DFD3] text-[#2B2D33]/70 hover:text-[#2B2D33] disabled:opacity-30 transition-colors shadow-xs"
                            title="Move Card Down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryCard(idx)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors ml-2 shadow-xs"
                            title="Delete Card"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Thumbnail Preview & Upload Controls (4 cols) */}
                        <div className="md:col-span-4 lg:col-span-4 space-y-3">
                          <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border-2 border-[#E5DFD3] bg-[#3A1F60] group">
                            <Image
                              src={item.src || '/lawyer-portrait-1.jpg'}
                              alt={item.alt || item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 250px"
                              className="object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/95 border border-[#E5DFD3] text-[9px] font-bold uppercase text-[#4B2A7B]">
                              {item.badge}
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-white/95 border border-[#E5DFD3] rounded text-[10px] text-[#2B2D33] text-center truncate">
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
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2A7B] block">
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
                                      ? 'bg-[#4B2A7B] text-white font-bold shadow-xs'
                                      : 'bg-white text-[#2B2D33]/70 hover:text-[#2B2D33] border border-[#E5DFD3] hover:border-[#4B2A7B]/40'
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
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Photo URL (Auto-filled on upload)
                            </label>
                            <input
                              type="text"
                              required
                              value={item.src}
                              onChange={(e) => handleGalleryItemChange(idx, 'src', e.target.value)}
                              placeholder="e.g. https://res.cloudinary.com/... or /lawyer-hero.jpg"
                              className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] font-mono placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Card Title
                            </label>
                            <input
                              type="text"
                              required
                              value={item.title}
                              onChange={(e) => handleGalleryItemChange(idx, 'title', e.target.value)}
                              placeholder="e.g. Courtroom Trial Advocate"
                              className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Card Badge (Pill Label)
                            </label>
                            <input
                              type="text"
                              required
                              value={item.badge}
                              onChange={(e) => handleGalleryItemChange(idx, 'badge', e.target.value)}
                              placeholder="e.g. Senior Trial Counsel"
                              className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Card Subtitle
                            </label>
                            <input
                              type="text"
                              required
                              value={item.subtitle}
                              onChange={(e) => handleGalleryItemChange(idx, 'subtitle', e.target.value)}
                              placeholder="e.g. Appellate & High Court of Malaya Representation"
                              className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block font-bold text-[#2B2D33]/80 mb-1">
                              Lightbox Modal Full Description
                            </label>
                            <textarea
                              rows={3}
                              value={item.description || ''}
                              onChange={(e) => handleGalleryItemChange(idx, 'description', e.target.value)}
                              placeholder="Detailed credentials narrative displayed in the expanded full-screen lightbox..."
                              className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
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
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="border-b border-[#E5DFD3] pb-4">
                <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Homepage Hero Header Content</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                  Hero Headline, Tagline & Lawyer Portrait
                </h3>
                <p className="text-xs text-[#2B2D33]/70 mt-1">
                  Modify the central firm titles, motto quote, bar badge, and upload or choose the prominent lawyer portrait displayed on the top of the homepage.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Live Portrait Card Preview, Upload & Selector (5 cols) */}
                <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-[#2B2D33] flex items-center gap-2 border-b border-[#E5DFD3] pb-2">
                    <Camera className="w-4 h-4 text-[#4B2A7B]" />
                    <span>Hero Lawyer Portrait Preview</span>
                  </h4>

                  <div className="relative h-80 w-full rounded-xl overflow-hidden border-2 border-[#E5DFD3] bg-[#3A1F60]">
                    <Image
                      src={settings.heroContent?.heroLawyerPhoto || '/hero_image.jpeg'}
                      alt="Hero Lawyer Portrait Preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover object-[center_15%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B2D33]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 p-2 bg-white/95 border border-[#E5DFD3] rounded-lg text-center shadow-xs">
                      <p className="font-serif text-xs font-bold text-[#2B2D33]">
                        {settings.heroContent?.heroLawyerName || 'Low Wah Chin'}
                        {settings.heroContent?.heroLawyerChinese && (
                          <span className="text-[#4B2A7B] ml-1">({settings.heroContent.heroLawyerChinese})</span>
                        )}
                      </p>
                      <p className="text-[10px] text-[#4B2A7B] font-medium">
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

                  <div className="space-y-1.5 pt-1 border-t border-[#E5DFD3]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2A7B] block">
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
                              ? 'bg-[#4B2A7B] text-white font-bold shadow-xs'
                              : 'bg-white text-[#2B2D33]/75 hover:text-[#2B2D33] border border-[#E5DFD3] hover:border-[#4B2A7B]/40'
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
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Firm Title (Main Headline)
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.firmName || ''}
                      onChange={(e) => handleHeroContentChange('firmName', e.target.value)}
                      placeholder="e.g. Messrs. Low Wah Chin & Co."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Firm Subtitle
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.firmSubtitle || ''}
                      onChange={(e) => handleHeroContentChange('firmSubtitle', e.target.value)}
                      placeholder="e.g. Advocates & Solicitors"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Official Motto / Quote
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.motto || ''}
                      onChange={(e) => handleHeroContentChange('motto', e.target.value)}
                      placeholder="e.g. “Passion & Duty, Integrity & Care — To the Point.”"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Established Pill Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.heroContent?.establishedBadge || ''}
                      onChange={(e) => handleHeroContentChange('establishedBadge', e.target.value)}
                      placeholder="e.g. Advocates & Solicitors • High Court of Malaya"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5DFD3]">
                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerName || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerName', e.target.value)}
                        placeholder="e.g. Low Wah Chin (Ava Rachel)"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Chinese Name
                      </label>
                      <input
                        type="text"
                        value={settings.heroContent?.heroLawyerChinese || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerChinese', e.target.value)}
                        placeholder="e.g. 劉華晶"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Professional Title
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerTitle || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerTitle', e.target.value)}
                        placeholder="e.g. Managing Partner & Principal Legal Practitioner"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Subtitle / Credentials
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.heroContent?.heroLawyerSub || ''}
                        onChange={(e) => handleHeroContentChange('heroLawyerSub', e.target.value)}
                        placeholder="e.g. Lincoln’s Inn Barrister (London) • Malayan Bar (2011)"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E5DFD3]">
                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Hero Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={settings.heroContent?.ctaButtonText || ''}
                        onChange={(e) => handleHeroContentChange('ctaButtonText', e.target.value)}
                        placeholder="e.g. Schedule Consultation"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Hero WhatsApp Button Text
                      </label>
                      <input
                        type="text"
                        value={settings.heroContent?.whatsappButtonText || ''}
                        onChange={(e) => handleHeroContentChange('whatsappButtonText', e.target.value)}
                        placeholder="e.g. Inquire on WhatsApp"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT PRINCIPAL LAWYER */}
          {activeTab === 'about' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="border-b border-[#E5DFD3] pb-4">
                <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                  <User className="w-4 h-4" />
                  <span>About Principal Counsel Section</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                  Principal Lawyer Bio, Quotes & Experience
                </h3>
                <p className="text-xs text-[#2B2D33]/70 mt-1">
                  Upload portrait or select preset, customize the narrative bio, quote ribbon, benchmark law practice experience, and core practice areas.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Photo, Upload & Quick Picker (4 cols) */}
                <div className="lg:col-span-4 bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-[#2B2D33] flex items-center gap-2 border-b border-[#E5DFD3] pb-2">
                    <Camera className="w-4 h-4 text-[#4B2A7B]" />
                    <span>About Section Portrait</span>
                  </h4>

                  <div className="relative h-72 w-full rounded-xl overflow-hidden border-2 border-[#E5DFD3] bg-[#3A1F60]">
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

                  <div className="space-y-1.5 pt-1 border-t border-[#E5DFD3]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2A7B] block">
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
                              ? 'bg-[#4B2A7B] text-white font-bold shadow-xs'
                              : 'bg-white text-[#2B2D33]/75 hover:text-[#2B2D33] border border-[#E5DFD3] hover:border-[#4B2A7B]/40'
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
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Section Tag Label
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.sectionTag || ''}
                        onChange={(e) => handleAboutChange('sectionTag', e.target.value)}
                        placeholder="e.g. Principal Counsel"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Section Main Title
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.sectionTitle || ''}
                        onChange={(e) => handleAboutChange('sectionTitle', e.target.value)}
                        placeholder="e.g. About"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={settings.aboutPrincipal?.lawyerName || ''}
                        onChange={(e) => handleAboutChange('lawyerName', e.target.value)}
                        placeholder="e.g. Low Wah Chin (Ava Rachel)"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2B2D33]/80 mb-1">
                        Lawyer Chinese Name
                      </label>
                      <input
                        type="text"
                        value={settings.aboutPrincipal?.lawyerChinese || ''}
                        onChange={(e) => handleAboutChange('lawyerChinese', e.target.value)}
                        placeholder="e.g. 劉華晶"
                        className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Featured Quote / Practice Motto
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.aboutPrincipal?.quote || ''}
                      onChange={(e) => handleAboutChange('quote', e.target.value)}
                      placeholder="e.g. “I am an Advocate & Solicitor Malaysia. Practising since 11 November 2011.”"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Bio Narrative (Paragraph 1 - Benchmark Practices & Founding)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.aboutPrincipal?.bioParagraph1 || ''}
                      onChange={(e) => handleAboutChange('bioParagraph1', e.target.value)}
                      placeholder="Founded by senior advocate Low Wah Chin (Ava Rachel)..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Bio Narrative (Paragraph 2 - Corporate In-House Counsel & Risk)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.aboutPrincipal?.bioParagraph2 || ''}
                      onChange={(e) => handleAboutChange('bioParagraph2', e.target.value)}
                      placeholder="In addition to private trial practice, Ms. Low served 1 year at KNM Group Berhad as In-House Legal Counsel..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Core Practice Areas List (Summary)
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.aboutPrincipal?.corePractices || ''}
                      onChange={(e) => handleAboutChange('corePractices', e.target.value)}
                      placeholder="e.g. Laws of Contract · Commercial Disputes · Tort & Negligence · Family & Divorce..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  {/* Past Work Experience & Institutional Pedigree */}
                  <div className="pt-4 border-t border-[#E5DFD3]">
                    <div className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider">
                          <Briefcase className="w-4 h-4 text-[#4B2A7B]" />
                          <span>Past Work Experience Highlights (Homepage & About)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectTab('experience')}
                          className="px-3 py-1.5 rounded-lg bg-[#4B2A7B] text-white hover:bg-[#3A1F60] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                        >
                          <span>Manage Full Career History →</span>
                        </button>
                      </div>

                      <p className="text-xs text-[#2B2D33]/70">
                        Edit the highlight points displayed directly under your Statutory Bar Admissions. You can add new highlights, edit text, or reorder them.
                      </p>

                      <div className="space-y-2.5">
                        {(settings?.aboutPrincipal?.pastExperienceHighlights || DEFAULT_FIRM_SETTINGS.aboutPrincipal.pastExperienceHighlights || []).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#E5DFD3] shadow-xs">
                            <span className="w-5 h-5 rounded-full bg-[#FAF8F2] border border-[#E5DFD3] text-[#4B2A7B] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                              #{hIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => handleHighlightChange(hIdx, e.target.value)}
                              placeholder="e.g. Benchmark Practice: Shook Lin & Bok • Azim, Tunku Farik & Wong"
                              className="flex-1 px-2.5 py-1.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                            />
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveHighlight(hIdx, 'up')}
                                disabled={hIdx === 0}
                                className="p-1 rounded hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveHighlight(hIdx, 'down')}
                                disabled={hIdx === (settings?.aboutPrincipal?.pastExperienceHighlights?.length || 3) - 1}
                                className="p-1 rounded hover:bg-[#FAF8F2] text-[#2B2D33]/60 hover:text-[#4B2A7B] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteHighlight(hIdx)}
                                className="p-1 rounded hover:bg-rose-50 text-rose-500 hover:text-rose-700 cursor-pointer"
                                title="Delete Point"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handleAddHighlight}
                          className="w-full py-2 bg-white hover:bg-white/80 text-[#4B2A7B] border border-dashed border-[#4B2A7B]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Experience Highlight Point</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RECOGNITION & PRESS ACCOLADES */}
          {activeTab === 'recognition' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="border-b border-[#E5DFD3] pb-4">
                <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Trusted Malaysia & Press Recognition</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2D33]">
                  Accolades, Editorial Commendations & Stats
                </h3>
                <p className="text-xs text-[#2B2D33]/70 mt-1">
                  Manage the editorial recommendation text, star rating, quotes, and the 3 key credential metrics shown on the home page.
                </p>
              </div>

              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Badge Label
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.badgeLabel || ''}
                      onChange={(e) => handleRecognitionChange('badgeLabel', e.target.value)}
                      placeholder="e.g. Official Editorial Selection"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Rating Text
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.ratingText || ''}
                      onChange={(e) => handleRecognitionChange('ratingText', e.target.value)}
                      placeholder="e.g. 5.0 Star Commendation"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Main Section Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.recognition?.title || ''}
                      onChange={(e) => handleRecognitionChange('title', e.target.value)}
                      placeholder="e.g. Best Law Firms in Kuala Lumpur"
                      className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2B2D33]/80 mb-1">
                    Recognition Subheading Quote Ribbon
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.recognition?.quote || ''}
                    onChange={(e) => handleRecognitionChange('quote', e.target.value)}
                    placeholder="e.g. “Thank You Trusted Malaysia. We are honored to be recommended on your site.”"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Editorial Review (Paragraph 1)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.recognition?.paragraph1 || ''}
                      onChange={(e) => handleRecognitionChange('paragraph1', e.target.value)}
                      placeholder="Messrs. Low Wah Chin & Co. Advocates & Solicitors is a firm that provides high-quality legal services..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1">
                      Editorial Review (Paragraph 2)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={settings.recognition?.paragraph2 || ''}
                      onChange={(e) => handleRecognitionChange('paragraph2', e.target.value)}
                      placeholder="They are highly commended to be professional and thorough in every case..."
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5DFD3] rounded-xl text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B]"
                    />
                  </div>
                </div>

                {/* 3 Metric Stat Blocks */}
                <div className="pt-4 border-t border-[#E5DFD3] space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#2B2D33] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4B2A7B]" />
                    <span>3 Key Statistical Badges</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <div className="p-3.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#4B2A7B] block">Stat #1</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat1Value || ''}
                        onChange={(e) => handleRecognitionChange('stat1Value', e.target.value)}
                        placeholder="e.g. 100%"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33] font-bold text-sm focus:outline-none focus:border-[#4B2A7B]"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat1Label || ''}
                        onChange={(e) => handleRecognitionChange('stat1Label', e.target.value)}
                        placeholder="e.g. Bar Certified"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33]/80 text-xs focus:outline-none focus:border-[#4B2A7B]"
                      />
                    </div>

                    {/* Stat 2 */}
                    <div className="p-3.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#4B2A7B] block">Stat #2</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat2Value || ''}
                        onChange={(e) => handleRecognitionChange('stat2Value', e.target.value)}
                        placeholder="e.g. Top 10"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33] font-bold text-sm focus:outline-none focus:border-[#4B2A7B]"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat2Label || ''}
                        onChange={(e) => handleRecognitionChange('stat2Label', e.target.value)}
                        placeholder="e.g. KL Law Firms"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33]/80 text-xs focus:outline-none focus:border-[#4B2A7B]"
                      />
                    </div>

                    {/* Stat 3 */}
                    <div className="p-3.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl space-y-2">
                      <span className="text-[10px] font-bold uppercase text-[#4B2A7B] block">Stat #3</span>
                      <input
                        type="text"
                        value={settings.recognition?.stat3Value || ''}
                        onChange={(e) => handleRecognitionChange('stat3Value', e.target.value)}
                        placeholder="e.g. 2011"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33] font-bold text-sm focus:outline-none focus:border-[#4B2A7B]"
                      />
                      <input
                        type="text"
                        value={settings.recognition?.stat3Label || ''}
                        onChange={(e) => handleRecognitionChange('stat3Label', e.target.value)}
                        placeholder="e.g. Practising Since 11 Nov"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E5DFD3] rounded text-[#2B2D33]/80 text-xs focus:outline-none focus:border-[#4B2A7B]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HERO SECTION IMAGES */}
          {activeTab === 'heroes' && (
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
              <div className="border-b border-[#E5DFD3] pb-4">
                <div className="flex items-center gap-2 text-[#4B2A7B] text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Fully Visible Hero Backgrounds</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2B2D33]">
                  Hero Section Images Across Every Page
                </h3>
                <p className="text-xs text-[#2B2D33]/70 mt-1">
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
                      className="bg-[#FAF8F2] border border-[#E5DFD3] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-[#4B2A7B]/40 transition-all shadow-xs"
                    >
                      <div>
                        {/* Section Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-serif text-sm font-bold text-[#2B2D33]">
                              {sec.label}
                            </h4>
                            <span className="text-[10px] text-[#4B2A7B] font-mono">
                              Route: {sec.pageRoute}
                            </span>
                          </div>
                          <a
                            href={sec.pageRoute}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white text-[#4B2A7B] hover:bg-[#4B2A7B] hover:text-white border border-[#E5DFD3] transition-colors shadow-xs"
                            title="Preview Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <p className="text-[11px] text-[#2B2D33]/60 mb-3">
                          {sec.description}
                        </p>

                        {/* Live Image Preview Thumbnail */}
                        <div className="relative h-36 w-full rounded-xl overflow-hidden border border-[#E5DFD3] bg-[#FAF8F2] mb-3 group">
                          <Image
                            src={currentUrl}
                            alt={sec.label}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2D33]/60 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                            <span className="bg-white/90 text-[#2B2D33] px-2 py-0.5 rounded border border-[#E5DFD3] truncate max-w-[200px]">
                              Preview: Active Banner
                            </span>
                            <span className="text-white font-bold bg-[#4B2A7B]/90 px-1.5 py-0.5 rounded text-[9px]">100% Visible</span>
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
                          <label className="block text-[11px] font-bold text-[#2B2D33]/80 mb-1">
                            Background Image URL
                          </label>
                          <input
                            type="url"
                            required
                            value={currentUrl}
                            onChange={(e) => handleHeroImageChange(sec.key, e.target.value)}
                            placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                            className="w-full px-3 py-2 bg-white border border-[#E5DFD3] rounded-lg text-xs text-[#2B2D33] placeholder:text-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B]"
                          />
                        </div>
                      </div>

                      {/* Quick Presets Picker */}
                      <div className="pt-2 border-t border-[#E5DFD3]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B2A7B] block mb-1.5">
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
                                  ? 'bg-[#4B2A7B] text-white font-bold shadow-xs'
                                  : 'bg-white text-[#2B2D33]/70 hover:text-[#2B2D33] border border-[#E5DFD3] hover:border-[#4B2A7B]/40'
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
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              {/* Section 1: Firm Legal Identity */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-[#2B2D33] border-b border-[#E5DFD3] pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Firm Legal Identity</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Primary Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.companyName}
                      onChange={(e) =>
                        setSettings({ ...settings, companyName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Firm Qualification Title
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.qualificationTitle}
                      onChange={(e) =>
                        setSettings({ ...settings, qualificationTitle: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B2D33]/80 mb-1.5">
                    Malaysian Bar Council Membership
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.barCouncilNumber}
                    onChange={(e) =>
                      setSettings({ ...settings, barCouncilNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-xs text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                  />
                </div>
              </div>

              {/* Section 2: Contact Numbers & Email */}
              <div className="space-y-4 pt-4 border-t border-[#E5DFD3]">
                <h3 className="font-serif text-base font-bold text-[#2B2D33] border-b border-[#E5DFD3] pb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Contact Channels</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Primary Phone / WhatsApp Line
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) =>
                        setSettings({ ...settings, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={settings.email}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Office Address & Operating Hours */}
              <div className="space-y-4 pt-4 border-t border-[#E5DFD3]">
                <h3 className="font-serif text-base font-bold text-[#2B2D33] border-b border-[#E5DFD3] pb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#4B2A7B]" />
                  <span>Chambers Location & Hours</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Full Head Office Address
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={settings.streetAddress}
                      onChange={(e) =>
                        setSettings({ ...settings, streetAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2D33]/80 mb-1.5">
                      Operating Hours Declaration
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.operatingHours}
                      onChange={(e) =>
                        setSettings({ ...settings, operatingHours: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-[#2B2D33] focus:outline-none focus:border-[#4B2A7B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sticky Save Bar */}
          <div className="p-4 bg-white/95 border-2 border-[#4B2A7B]/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl sticky bottom-4 z-20 backdrop-blur-md">
            <div className="text-xs text-[#2B2D33]/80 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4B2A7B] shrink-0" />
              <span>All updates publish instantly across the live website upon saving.</span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-[#4B2A7B] hover:bg-[#3A1F60] text-white w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer transition-colors"
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
