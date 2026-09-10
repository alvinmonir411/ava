'use client';

import React, { useActionState } from 'react';
import { loginAdminAction } from '@/actions/adminAuth';
import { Scale, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, { success: false });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0e0517] p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7e22ce]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#c6a052]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#120720] border-2 border-[#c6a052]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dcc280] to-[#9d7835] p-0.5 mx-auto mb-4 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-[#1e0d33] rounded-[14px] flex items-center justify-center text-[#dcc280]">
              <Scale className="w-7 h-7" />
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            Messrs. Low Wah Chin & Co.
          </h1>
          <p className="text-[11px] font-sans tracking-widest text-[#dcc280] uppercase font-semibold mt-1">
            Advocates & Solicitors • Secure Admin Portal
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
              Admin Security Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c6a052]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 bg-[#1e0d33] border border-[#c6a052]/40 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#dcc280] focus:ring-1 focus:ring-[#dcc280] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-brass w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#c6a052]/20 text-center">
          <Link
            href="/"
            className="text-xs text-[#dcc280] hover:underline font-medium"
          >
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}

