'use server';

import { ARTICLES_DATA } from '@/db/seedData';
import { Article } from '@/types';
import { revalidatePath } from 'next/cache';

let runtimeArticles: Article[] = [...ARTICLES_DATA];

export async function getAdminArticlesAction(): Promise<Article[]> {
  return runtimeArticles;
}

export async function saveArticleAction(articleData: Partial<Article>): Promise<{ success: boolean; article?: Article }> {
  if (articleData.id) {
    // Edit
    const idx = runtimeArticles.findIndex((a) => a.id === articleData.id);
    if (idx !== -1) {
      runtimeArticles[idx] = {
        ...runtimeArticles[idx],
        ...articleData,
      } as Article;
      revalidatePath('/articles');
      revalidatePath(`/articles/${runtimeArticles[idx].slug}`);
      revalidatePath('/admin/articles');
      return { success: true, article: runtimeArticles[idx] };
    }
  }

  // Create New
  const numericIds = runtimeArticles.map((a) => Number(a.id)).filter((n) => !isNaN(n));
  const newId = (numericIds.length > 0 ? Math.max(...numericIds) : 0) + 1;
  const newArticle: Article = {
    id: newId,
    slug: articleData.slug || `article-${Date.now()}`,
    title: articleData.title || 'Untitled Legal Insight',
    excerpt: articleData.excerpt || '',
    category: articleData.category || 'Legal Advisory',
    author: articleData.author || 'Low Wah Chin (Ava Rachel)',
    author_role: articleData.author_role || 'Advocate & Solicitor',
    read_time: articleData.read_time || '4 min read',
    published_at: articleData.published_at || new Date().toISOString(),
    cover_image_url: articleData.cover_image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    tags: articleData.tags || ['Law Malaysia', 'Legal Update'],
    content: articleData.content || '',
  };

  runtimeArticles.unshift(newArticle);
  revalidatePath('/articles');
  revalidatePath('/admin/articles');
  return { success: true, article: newArticle };
}

export async function deleteArticleAction(id: string | number): Promise<{ success: boolean }> {
  runtimeArticles = runtimeArticles.filter((a) => String(a.id) !== String(id));
  revalidatePath('/articles');
  revalidatePath('/admin/articles');
  return { success: true };
}
