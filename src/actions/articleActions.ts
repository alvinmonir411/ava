'use server';

import { db } from '@/db';
import { articles } from '@/db/schema';
import { ARTICLES_DATA } from '@/db/seedData';
import { Article } from '@/types';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

let runtimeArticles: Article[] = [...ARTICLES_DATA];

export async function getAdminArticlesAction(): Promise<Article[]> {
  if (db) {
    try {
      const rows = await db.select().from(articles).orderBy(desc(articles.published_at));
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          content: r.content,
          category: r.category,
          author: r.author,
          author_role: 'Advocate & Solicitor, High Court of Malaya',
          read_time: r.read_time,
          published_at: r.published_at.toISOString(),
          cover_image_url: r.cover_image_url || undefined,
        }));
      }
    } catch (e) {
      console.warn('DB read failed for articles, falling back to local memory:', e);
    }
  }
  return runtimeArticles;
}

export async function saveArticleAction(articleData: Partial<Article>): Promise<{ success: boolean; article?: Article }> {
  if (db) {
    try {
      if (articleData.id && typeof articleData.id === 'number') {
        // Update in DB
        await db
          .update(articles)
          .set({
            title: articleData.title,
            slug: articleData.slug,
            excerpt: articleData.excerpt,
            content: articleData.content,
            category: articleData.category,
            author: articleData.author,
            read_time: articleData.read_time,
            cover_image_url: articleData.cover_image_url,
          })
          .where(eq(articles.id, articleData.id));

        revalidatePath('/articles');
        if (articleData.slug) revalidatePath(`/articles/${articleData.slug}`);
        revalidatePath('/admin/articles');
        return { success: true, article: articleData as Article };
      } else {
        // Insert in DB
        const inserted = await db
          .insert(articles)
          .values({
            slug: articleData.slug || `article-${Date.now()}`,
            title: articleData.title || 'Untitled Legal Insight',
            excerpt: articleData.excerpt || '',
            content: articleData.content || '',
            category: articleData.category || 'Legal Advisory',
            author: articleData.author || 'Low Wah Chin (Ava Rachel)',
            read_time: articleData.read_time || '4 min read',
            cover_image_url: articleData.cover_image_url,
          })
          .returning();

        if (inserted && inserted[0]) {
          const r = inserted[0];
          const newArt: Article = {
            id: r.id,
            slug: r.slug,
            title: r.title,
            excerpt: r.excerpt,
            content: r.content,
            category: r.category,
            author: r.author,
            author_role: 'Advocate & Solicitor',
            read_time: r.read_time,
            published_at: r.published_at.toISOString(),
            cover_image_url: r.cover_image_url || undefined,
          };
          revalidatePath('/articles');
          revalidatePath('/admin/articles');
          return { success: true, article: newArt };
        }
      }
    } catch (e) {
      console.error('DB save failed for article:', e);
    }
  }

  // In-memory fallback
  if (articleData.id) {
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
    content: articleData.content || '',
  };

  runtimeArticles.unshift(newArticle);
  revalidatePath('/articles');
  revalidatePath('/admin/articles');
  return { success: true, article: newArticle };
}

export async function deleteArticleAction(id: string | number): Promise<{ success: boolean }> {
  if (db && typeof id === 'number') {
    try {
      await db.delete(articles).where(eq(articles.id, id));
    } catch (e) {
      console.error('DB delete failed for article:', e);
    }
  }
  runtimeArticles = runtimeArticles.filter((a) => String(a.id) !== String(id));
  revalidatePath('/articles');
  revalidatePath('/admin/articles');
  return { success: true };
}
