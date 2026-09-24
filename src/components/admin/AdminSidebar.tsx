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
    <div className="flex flex-col h-full bg-[#FAF8F2] text-[#2B2D33]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E5DFD3] flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#4B2A7B] p-0.5 flex items-center justify-center shrink-0 shadow-xs">
            <div className="w-full h-full bg-[#3A1F60] rounded-[9px] flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className="font-serif text-sm font-bold text-[#2B2D33] tracking-tight leading-tight block">
              Low Wah Chin & Co.
            </h1>
            <span className="text-[10px] tracking-widest text-[#4B2A7B] font-semibold uppercase block mt-0.5">
              Admin Portal
            </span>
          </div>
        </Link>

        {/* Mobile Close Button (only visible on mobile drawer) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-2 rounded-xl text-[#2B2D33]/70 hover:text-[#4B2A7B] hover:bg-white transition-colors"
          title="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#2B2D33]/50">
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
                  ? 'bg-[#4B2A7B] text-white shadow-xs font-bold'
                  : 'text-[#2B2D33]/80 hover:bg-white hover:text-[#4B2A7B]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#4B2A7B]'}`} />
                <span>{item.label}</span>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : 'text-[#2B2D33]/40'}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Action */}
      <div className="p-4 border-t border-[#E5DFD3] space-y-2 bg-[#FAF8F2]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#2B2D33]/80 hover:text-[#4B2A7B] hover:bg-white transition-colors border border-transparent hover:border-[#E5DFD3]"
        >
          <Globe className="w-4 h-4 text-[#4B2A7B]" />
          <span>View Live Public Website</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer border border-transparent hover:border-rose-200"
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
      <div className="lg:hidden w-full bg-[#FAF8F2] border-b border-[#E5DFD3] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-white border border-[#E5DFD3] text-[#2B2D33] hover:text-[#4B2A7B] hover:bg-[#FAF8F2] transition-colors cursor-pointer shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#D8C7F0] flex items-center justify-center text-[#4B2A7B] shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-xs font-bold text-[#2B2D33] leading-tight block">
                Low Wah Chin & Co.
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#4B2A7B] font-bold block">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-white border border-[#E5DFD3] text-[#2B2D33] hover:text-[#4B2A7B] text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
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
            className="fixed inset-0 bg-[#2B2D33]/60 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Container */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250 border-r border-[#E5DFD3]">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* 3. DESKTOP PERMANENT SIDEBAR (Visible ONLY on >= lg screens) */}
      <aside className="hidden lg:flex w-64 bg-[#FAF8F2] text-[#2B2D33] border-r border-[#E5DFD3] flex-col shrink-0 min-h-screen sticky top-0 h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}
