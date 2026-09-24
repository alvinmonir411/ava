'use client';

import React, { useActionState } from 'react';
import { loginAdminAction } from '@/actions/adminAuth';
import { Scale, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, { success: false });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF8F2] p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4B2A7B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-[#E5DFD3] rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#4B2A7B] p-0.5 mx-auto mb-4 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#3A1F60] rounded-[14px] flex items-center justify-center text-white">
              <Scale className="w-7 h-7" />
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2D33] tracking-tight">
            Messrs. Low Wah Chin & Co.
          </h1>
          <p className="text-[11px] font-sans tracking-widest text-[#4B2A7B] uppercase font-semibold mt-1">
            Advocates & Solicitors • Secure Admin Portal
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="p-3.5 mb-6 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-medium text-center animate-in fade-in duration-200">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2D33] mb-2">
              Admin Security Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4B2A7B]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F2] border border-[#E5DFD3] rounded-xl text-sm text-[#2B2D33] placeholder-[#2B2D33]/40 focus:outline-none focus:border-[#4B2A7B] focus:ring-1 focus:ring-[#4B2A7B] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#4B2A7B] hover:bg-[#3A1F60] text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
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
        <div className="mt-8 pt-6 border-t border-[#E5DFD3] text-center">
          <Link
            href="/"
            className="text-xs text-[#4B2A7B] hover:underline font-medium"
          >
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}

