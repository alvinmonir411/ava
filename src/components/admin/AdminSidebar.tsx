'use client';

import React from 'react';
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
  ShieldAlert,
} from 'lucide-react';
import { logoutAdminAction } from '@/actions/adminAuth';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Consultation Leads', icon: Inbox },
  { href: '/admin/practices', label: 'Practice Areas', icon: Scale },
  { href: '/admin/articles', label: 'Articles & Insights', icon: FileText },
  { href: '/admin/testimonials', label: 'Client Reviews', icon: Star },
  { href: '/admin/settings', label: 'Firm Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return null;
  }

  return (
    <aside className="w-64 bg-[#0A1529] text-white border-r border-[#B8935A]/30 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#B8935A]/25">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#CFA76F] to-[#967440] p-0.5 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0F1F3D] rounded-[7px] flex items-center justify-center text-[#CFA76F]">
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
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
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
              <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-[#0F1F3D]' : 'text-white/40'}`} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Action */}
      <div className="p-4 border-t border-[#B8935A]/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-[#0F1F3D] transition-colors"
        >
          <Globe className="w-4 h-4 text-[#CFA76F]" />
          <span>View Live Website</span>
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
