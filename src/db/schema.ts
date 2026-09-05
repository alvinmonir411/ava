import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  practice_area: varchar('practice_area', { length: 150 }).notNull(),
  preferred_date: varchar('preferred_date', { length: 100 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('new').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  author: varchar('author', { length: 150 }).default('Low Wah Chin (Ava Rachel)').notNull(),
  read_time: varchar('read_time', { length: 50 }).default('3 min read').notNull(),
  published_at: timestamp('published_at').defaultNow().notNull(),
  cover_image_url: text('cover_image_url'),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  bio: text('bio').notNull(),
  photo_url: text('photo_url'),
  display_order: integer('display_order').default(0).notNull(),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  client_name: varchar('client_name', { length: 255 }).notNull(),
  quote: text('quote').notNull(),
  practice_area: varchar('practice_area', { length: 150 }).notNull(),
  rating: integer('rating').default(5).notNull(),
  source: varchar('source', { length: 150 }).default('Trusted Malaysia').notNull(),
  published_at: timestamp('published_at').defaultNow().notNull(),
});
