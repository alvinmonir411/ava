'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  getAdminArticlesAction,
  saveArticleAction,
  deleteArticleAction,
} from '@/actions/articleActions';
import { Article } from '@/types';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Calendar,
  Save,
  X,
  Clock,
  User,
} from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getAdminArticlesAction().then(setArticles);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    startTransition(async () => {
      const res = await saveArticleAction(editingArticle);
      if (res.success && res.article) {
        setArticles((prev) => {
          const exists = prev.some((a) => a.id === res.article!.id);
          if (exists) {
            return prev.map((a) => (a.id === res.article!.id ? res.article! : a));
          }
          return [res.article!, ...prev];
        });
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
          setEditingArticle(null);
        }, 1200);
      }
    });
  };

  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const confirmDelete = () => {
    if (!articleToDelete) return;
    const id = articleToDelete.id;
    const title = articleToDelete.title;

    startTransition(async () => {
      await deleteArticleAction(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setArticleToDelete(null);
      toast.success(`Deleted article: "${title}"`);
    });
  };

  const openNewArticle = () => {
    setEditingArticle({
      title: '',
      slug: '',
      category: 'Legal Insight',
      author: 'Low Wah Chin (Ava Rachel)',
      author_role: 'Advocate & Solicitor, High Court of Malaya',
      read_time: '4 min read',
      excerpt: '',
      content: '',
      cover_image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Articles & Legal Insights CMS"
        subtitle="Write, edit, and publish legal commentaries, press releases, and guides."
        action={
          <button
            onClick={openNewArticle}
            className="btn-brass px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-[#0A1529] rounded-2xl border border-[#B8935A]/30 overflow-hidden shadow-lg hover:border-[#B8935A]/60 transition-all flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-44 w-full bg-[#0F1F3D]">
                <Image
                  src={article.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover brightness-90"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1529]/90 backdrop-blur-md border border-[#B8935A]/40 text-[10px] font-bold text-[#CFA76F]">
                  {article.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-white line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[#B8935A]/20 text-[11px] text-white/50">
                  <div className="flex items-center justify-between">
                    <span>{article.author}</span>
                    <span>{article.read_time}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditingArticle({ ...article })}
                        className="btn-brass px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setArticleToDelete(article)}
                        className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      className="text-xs text-white/70 hover:text-[#CFA76F] flex items-center gap-1 font-medium"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSave}
            className="w-full max-w-3xl bg-[#0A1529] border-2 border-[#B8935A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[92vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#B8935A]/25 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#CFA76F] block">
                  {editingArticle.id ? 'Edit Legal Article' : 'Write New Article'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {editingArticle.title || 'Untitled Article'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-[#0F1F3D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-bold text-center rounded-xl animate-in fade-in">
                ✓ Article Saved Successfully!
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Article Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter article title..."
                  value={editingArticle.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingArticle({
                      ...editingArticle,
                      title,
                      slug: editingArticle.id ? editingArticle.slug : autoSlug,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug || ''}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1.5">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category || ''}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Cover Photography URL
                </label>
                <input
                  type="url"
                  value={editingArticle.cover_image_url || ''}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, cover_image_url: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Summary Excerpt (Meta description preview)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt || ''}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, excerpt: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1.5">
                  Article Body (Supports Markdown)
                </label>
                <textarea
                  rows={8}
                  value={editingArticle.content || ''}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, content: e.target.value })
                  }
                  placeholder="### Heading\n\nWrite article text here..."
                  className="w-full px-3.5 py-2.5 bg-[#0F1F3D] border border-[#B8935A]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#CFA76F] font-mono"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B8935A]/25">
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="px-4 py-2.5 rounded-xl bg-[#1B2F57] text-white text-xs font-semibold hover:bg-[#1B2F57]/80"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="btn-brass px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? 'Publishing...' : 'Save & Publish Article'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0A1529] border-2 border-rose-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Delete Article
                </h3>
                <p className="text-xs text-white/60">
                  This action permanently removes the article from your website and Neon database.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F1F3D] border border-white/10 text-xs space-y-1">
              <p className="text-white font-bold">{articleToDelete.title}</p>
              <p className="text-[#CFA76F]">{articleToDelete.category} • {articleToDelete.author}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
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
