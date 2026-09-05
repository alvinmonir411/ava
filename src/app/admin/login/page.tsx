'use client';

import React, { useActionState } from 'react';
import { loginAdminAction } from '@/actions/adminAuth';
import { Scale, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, { success: false });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070D18] p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B8935A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0A1529] border-2 border-[#B8935A]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CFA76F] to-[#967440] p-0.5 mx-auto mb-4 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-[#0F1F3D] rounded-[14px] flex items-center justify-center text-[#CFA76F]">
              <Scale className="w-7 h-7" />
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            Low Wah Chin & Co.
          </h1>
          <p className="text-[11px] font-sans tracking-widest text-[#CFA76F] uppercase font-semibold mt-1">
            Advocates & Solicitors • Management Portal
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="p-3.5 mb-6 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-medium text-center animate-in fade-in duration-200">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
              Admin Access Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#CFA76F]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password (default: lwcco2026 or admin123)"
                className="w-full pl-10 pr-4 py-3 bg-[#0F1F3D] border border-[#B8935A]/40 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#CFA76F] focus:ring-1 focus:ring-[#CFA76F] transition-all"
              />
            </div>
            <p className="text-[11px] text-white/50 mt-2">
              Default password: <code className="text-[#CFA76F] font-bold">lwcco2026</code> or <code className="text-[#CFA76F] font-bold">admin123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-brass w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {isPending ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#B8935A]/20 text-center">
          <Link
            href="/"
            className="text-xs text-[#CFA76F] hover:underline font-medium"
          >
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
