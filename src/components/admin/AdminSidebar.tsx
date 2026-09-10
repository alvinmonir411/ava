'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Scale,
  FileText,
  Star,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { logoutAdminAction } from '@/actions/adminAuth';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Consultation Leads', icon: Inbox },
  { href: '/admin/practices', label: 'Practice Areas CMS', icon: Scale },
  { href: '/admin/articles', label: 'Articles & Insights', icon: FileText },
  { href: '/admin/testimonials', label: 'Client Reviews', icon: Star },
  { href: '/admin/settings', label: 'Website Content & Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return null;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0A1529] text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#B8935A]/25 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CFA76F] to-[#967440] p-0.5 flex items-center justify-center shrink-0 shadow-md">
            <div className="w-full h-full bg-[#0F1F3D] rounded-[9px] flex items-center justify-center text-[#CFA76F]">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="font-serif text-sm font-bold text-white tracking-tight leading-tight block">
              Low Wah Chin & Co.
            </h1>
            <span className="text-[10px] tracking-widest text-[#CFA76F] font-semibold uppercase block mt-0.5">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Mobile Close Button (only visible on mobile drawer) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-[#1B2F57] transition-colors"
          title="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#CFA76F]/80">
          Main Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#B8935A] to-[#967440] text-[#0F1F3D] shadow-md font-bold'
                  : 'text-white/80 hover:bg-[#0F1F3D] hover:text-[#CFA76F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F1F3D]' : 'text-[#CFA76F]'}`} />
                <span>{item.label}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-[#0F1F3D]' : 'text-white/40'}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Action */}
      <div className="p-4 border-t border-[#B8935A]/20 space-y-2 bg-[#070E1C]/60">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-[#0F1F3D] transition-colors border border-transparent hover:border-[#B8935A]/25"
        >
          <Globe className="w-4 h-4 text-[#CFA76F]" />
          <span>View Live Public Website</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/50 transition-colors cursor-pointer border border-transparent hover:border-rose-500/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. MOBILE TOP NAVIGATION BAR (Visible ONLY on < lg screens) */}
      <div className="lg:hidden w-full bg-[#0A1529] border-b border-[#B8935A]/30 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-[#0F1F3D] border border-[#B8935A]/30 text-[#CFA76F] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#B8935A]/20 border border-[#B8935A]/40 flex items-center justify-center text-[#CFA76F]">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xs font-bold text-white leading-tight block">
                Low Wah Chin & Co.
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#CFA76F] font-bold block">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-[#0F1F3D] border border-[#B8935A]/30 text-[#CFA76F] hover:text-white text-xs font-medium flex items-center gap-1.5"
            title="Preview Live Site"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden xs:inline text-[11px]">Site</span>
          </Link>
        </div>
      </div>

      {/* 2. MOBILE OFF-CANVAS DRAWER WITH BACKDROP (Visible when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Drawer Container */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250 border-r border-[#B8935A]/40">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* 3. DESKTOP PERMANENT SIDEBAR (Visible ONLY on >= lg screens) */}
      <aside className="hidden lg:flex w-64 bg-[#0A1529] text-white border-r border-[#B8935A]/30 flex-col shrink-0 min-h-screen sticky top-0 h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
