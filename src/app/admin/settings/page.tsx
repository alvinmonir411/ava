'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  getAdminSettingsAction,
  updateAdminSettingsAction,
  FirmSettings,
} from '@/actions/settingsActions';
import AdminHeader from '@/components/admin/AdminHeader';
import { Settings, Save, ShieldCheck, MapPin, Phone, Mail, Clock, Scale } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<FirmSettings | null>(null);
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getAdminSettingsAction().then(setSettings);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    startTransition(async () => {
      const res = await updateAdminSettingsAction(settings);
      if (res.success) {
        setSettings(res.settings);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
      }
    });
  };

  if (!settings) {
    return (
      <div className="p-8 text-center text-white/50 text-xs">
        Loading firm configuration...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Firm Profile & Settings"
        subtitle="Configure primary contact information, Bar Council registration, and office coordinates."
      />

      <div className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
        {savedSuccess && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-2xl animate-in fade-in">
            ✓ Firm Profile & Coordinates Updated Successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-[#0A1529] border border-[#B8935A]/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
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

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#B8935A]/25 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="btn-brass px-8 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Updating Settings...' : 'Save Firm Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
