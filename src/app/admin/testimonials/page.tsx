'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  getAdminTestimonialsAction,
  saveTestimonialAction,
  deleteTestimonialAction,
} from '@/actions/testimonialActions';
import { Testimonial } from '@/types';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import { Star, Plus, Edit, Trash2, Save, X, Quote, AlertTriangle } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAdminTestimonialsAction().then(setTestimonials);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    startTransition(async () => {
      const res = await saveTestimonialAction(editingTestimonial);
      if (res.success && res.testimonial) {
        setTestimonials((prev) => {
          const exists = prev.some((t) => t.id === res.testimonial!.id);
          if (exists) {
            return prev.map((t) => (t.id === res.testimonial!.id ? res.testimonial! : t));
          }
          return [res.testimonial!, ...prev];
        });
        toast.success(`Saved client review for ${res.testimonial.client_name}`);
        setEditingTestimonial(null);
      }
    });
  };

  const confirmDelete = () => {
    if (!testimonialToDelete) return;
    const id = testimonialToDelete.id;
    const name = testimonialToDelete.client_name;

    startTransition(async () => {
      await deleteTestimonialAction(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setTestimonialToDelete(null);
      toast.success(`Deleted testimonial from ${name}`);
    });
  };

  const openNew = () => {
    setEditingTestimonial({
      client_name: '',
      title: 'Verified Client',
      location: 'Kuala Lumpur',
      practice_area: 'Property & Conveyancing Law',
      quote: '',
      rating: 5,
      source: 'Verified Client Review',
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Client Reviews & Testimonials Manager"
        subtitle="Manage client feedback, ratings, and press accolades displayed across the website."
        action={
          <button
            onClick={openNew}
            className="btn-brass px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#0A1529] rounded-2xl border border-[#B8935A]/30 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#B8935A]/60 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#CFA76F] bg-[#B8935A]/15 px-2.5 py-0.5 rounded-full border border-[#B8935A]/30">
                    {t.source}
                  </span>
                </div>

                <p className="text-xs text-white/80 leading-relaxed italic line-clamp-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#B8935A]/20 flex items-center justify-between">
                <div>
                  <strong className="text-sm font-bold text-white block">
                    {t.client_name}
                  </strong>
                  <span className="text-[11px] text-[#CFA76F] block">
                    {t.title} • {t.location}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingTestimonial({ ...t })}
                    className="p-1.5 rounded-lg bg-[#1B2F57] text-[#CFA76F] hover:bg-[#B8935A] hover:text-[#0F1F3D] transition-colors"
                    title="Edit Review"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTestimonialToDelete(t)}
                    className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSave}
            className="w-full max-w-xl bg-[#0A1529] border-2 border-[#B8935A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between border-b border-[#B8935A]/25 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#CFA76F] block">
                  {editingTestimonial.id ? 'Edit Client Review' : 'Add New Review'}
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">
                  {editingTestimonial.client_name || 'New Client Review'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-[#0F1F3D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white/80 mb-1">Client Name / Publication</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.client_name || ''}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, client_name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white/80 mb-1">Title / Role</label>
                  <input
                    type="text"
                    value={editingTestimonial.title || ''}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-white/80 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTestimonial.location || ''}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, location: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-white/80 mb-1">Star Rating (1–5)</label>
                  <select
                    value={editingTestimonial.rating || 5}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-white/80 mb-1">Practice Area</label>
                <input
                  type="text"
                  value={editingTestimonial.practice_area || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, practice_area: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>

              <div>
                <label className="block font-bold text-white/80 mb-1">Testimonial Quote</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B8935A]/25">
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="px-4 py-2 rounded-xl bg-[#1B2F57] text-white text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="btn-brass px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? 'Saving...' : 'Save Review'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {testimonialToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0A1529] border-2 border-rose-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Delete Client Review
                </h3>
                <p className="text-xs text-white/60">
                  This action permanently removes the review from your website and Neon database.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F1F3D] border border-white/10 text-xs space-y-1">
              <p className="text-white font-bold">{testimonialToDelete.client_name}</p>
              <p className="text-[#CFA76F]">{testimonialToDelete.practice_area}</p>
              <p className="text-white/60 italic line-clamp-2">&ldquo;{testimonialToDelete.quote}&rdquo;</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTestimonialToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#1B2F57] text-white text-xs font-semibold hover:bg-[#1B2F57]/80"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isPending ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
