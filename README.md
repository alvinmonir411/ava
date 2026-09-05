# ⚖️ Messrs. Low Wah Chin & Co. (LWCCO) — Advocates & Solicitors

[![Live Production](https://img.shields.io/badge/Live%20Production-lowwahchin--co.vercel.app-gold?style=for-the-badge&logo=vercel)](https://lowwahchin-co.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4%20Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-Neon%20Serverless%20Postgres-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Bar Council](https://img.shields.io/badge/Bar%20Council-BC%2FL%2F2019-navy?style=for-the-badge)](https://www.malaysianbar.org.my/)

> **Messrs. Low Wah Chin & Co. (Advocates & Solicitors)** is an elite legal practice headquartered at **Colony @ KLCC, Vipod Residences, Kuala Lumpur**. Led by **Ava Rachel Low** (Barrister-at-Law, Lincoln's Inn, London • Advocate & Solicitor of the High Court of Malaya), the firm delivers partner-led legal counsel across conveyancing, corporate law, matrimonial matters, medical negligence, and high-stakes dispute resolution.

---

## 🌐 Live Website & Admin Portal

- **Official Website:** [https://lowwahchin-co.vercel.app](https://lowwahchin-co.vercel.app)
- **Admin Management Portal:** [https://lowwahchin-co.vercel.app/admin](https://lowwahchin-co.vercel.app/admin)
  - **Default Access Passcode:** `lwcco2026` or `admin123`
- **GitHub Repository:** [https://github.com/alvinmonir411/ava.git](https://github.com/alvinmonir411/ava.git)

---

## 🏛️ Practice Disciplines & Service Architecture

The platform provides dedicated, SEO-optimized individual service pages with structured legal breakdowns, fee roadmaps, FAQs, and tailored booking funnels across **18 legal disciplines**:

### 🌟 Core Practice Disciplines (Navigation Priority)
1. **Legal Advice & General Consultation** (`/practices/legal-advice-consultation`)
2. **Property & Conveyancing Law** (`/practices/property-conveyancing`)
3. **Family & Divorce Law** (`/practices/family-divorce`)
4. **Dispute Resolution, Accident & Bodily Injury Claims** (`/practices/dispute-resolution-claims`)
5. **Will Writing & Estate Distribution** (`/practices/will-estate-distribution`)
6. **Company Matters, Commercial Agreements & Litigation** (`/practices/company-matters-agreements`)

### 📜 Specialized Service Offerings & Scope (Secondary Focus)
7. **Bodily Injury Claims** (`/practices/bodily-injury-claims`)
8. **Medical Negligence Claims** (`/practices/medical-negligence-claims`)
9. **Letter Writing & LODs (Letters of Demand)** (`/practices/letter-writing-lods`)
10. **Employment & Labour Claims** (`/practices/employment-labour-claims`)
11. **Defamation Claims & Justification** (`/practices/defamation-claims`)
12. **Will Writing & Probate Advice** (`/practices/will-writing-probate-advice`)
13. **Tenancy Agreement Disputes** (`/practices/tenancy-disputes`)
14. **Business Negotiations & Commercial Deals** (`/practices/business-negotiations-deals`)
15. **Small Claims Assistance** (`/practices/small-claims-assistance`)
16. **Professional Negligence Claims** (`/practices/professional-negligence-claims`)
17. **Contractor Negligence Claims** (`/practices/contractor-negligence-claims`)
18. **Debt Recovery & Winding Up** (`/practices/debt-recovery-winding-up`)

---

## 🚀 Key Features

### 1. 💼 Full Admin Management Portal & CRM (`/admin`)
- **Consultation Leads CRM (`/admin/inquiries`)**:
  - Live real-time incoming booking inquiries directly synced to Neon PostgreSQL.
  - Multi-status workflow (`New Lead`, `In Review`, `Scheduled`, `Contacted`, `Completed`).
  - One-click direct WhatsApp chat launch with prefilled client context.
  - Client detail view modal and one-click **CSV Data Export** for firm records.
- **Legal Articles CMS (`/admin/articles`)**: Full rich-text publishing, editing, and previewing of legal insights and press releases.
- **Client Reviews & Accolades Manager (`/admin/testimonials`)**: Manage featured client reviews, star ratings, and media features.
- **Practice Area Scope CMS (`/admin/practices`)**: Update service scope checklists, FAQs, hero imagery, and descriptions.
- **Firm Profile & Settings (`/admin/settings`)**: Configure Malaysian Bar Council registration number, phone numbers, email, and KLCC chambers coordinates.

### 2. ⚡ Smart Consultation Engine & Auto-Preselection
- **Context-Aware Preselection**: When clients browse any practice page (e.g. `/practices/property-conveyancing`), the booking form automatically preselects the exact practice area.
- **URL Parameter Routing**: Supports `?practice=...` and `?service=...` across all links (e.g., `/contact?practice=family-divorce`).
- **Interactive UI with Sonner**: Zero native browser popup dialogs (`window.alert` / `window.confirm` removed) — replaced with sleek luxury dark-navy/gold confirmation modals and instant toast notifications.

### 3. 🔍 Enterprise SEO & Performance
- **JSON-LD Structured Data**: Full `LegalService` schema embedding address, geo-coordinates, telephone, email, and partner profile.
- **Dynamic Sitemap & Robots.txt**: Auto-generated XML sitemap covering all 41 routes.
- **Core Web Vitals Optimized**: Next.js 16 Turbopack build, responsive next/image optimization, preconnected fonts, and sub-second load times.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16.3.4 (App Router & Turbopack)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with Custom Luxury Navy/Brass Palette |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) (AWS US-East-2) |
| **ORM & Schema** | [Drizzle ORM](https://orm.drizzle.team/) & `@neondb/serverless` |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Sonner Toast System](https://sonner.emilkowal.ski/) |
| **Email Notifications**| [Nodemailer](https://nodemailer.com/) (Gmail SMTP Integration) |
| **Deployment** | [Vercel Edge Network](https://vercel.com/) |

---

## 📂 Project Directory Structure

```text
client/
├── src/
│   ├── actions/                  # Server Actions (Mutations & Queries)
│   │   ├── adminAuth.ts          # Admin authentication & session management
│   │   ├── articleActions.ts     # Article CRUD operations
│   │   ├── inquiryActions.ts     # Consultation leads CRM server actions
│   │   ├── practiceActions.ts    # Practice area content management
│   │   ├── settingsActions.ts    # Firm profile & coordinates settings
│   │   ├── submitInquiry.ts      # Public booking submission & email notification
│   │   └── testimonialActions.ts # Client review actions
│   ├── app/                      # Next.js App Router (41 static/dynamic routes)
│   │   ├── (public pages)        # /, /about, /our-team, /contact, /faq, /practices
│   │   ├── admin/                # Secure Admin Portal (/admin, /admin/inquiries, etc.)
│   │   ├── articles/             # Legal blog & articles dynamic route ([slug])
│   │   ├── practices/            # Practice areas dynamic route ([slug])
│   │   ├── layout.tsx            # Global layout with luxury theme & Sonner Toaster
│   │   ├── sitemap.ts            # Dynamic XML sitemap generator
│   │   └── robots.ts             # Robots.txt generator
│   ├── components/               # Modular UI Component Library
│   │   ├── admin/                # Admin navigation, sidebar, header components
│   │   ├── cards/                # PracticeCard, ArticleCard, TestimonialCard
│   │   ├── common/               # WhatsAppButton, SectionHeading, Badges
│   │   ├── forms/                # ConsultationForm with auto-detection & Sonner toasts
│   │   └── layout/               # Header (desktop/mobile nav) & Footer
│   ├── db/                       # Neon PostgreSQL Connection & Drizzle Schemas
│   │   ├── index.ts              # Neon serverless pooler connection
│   │   ├── schema.ts             # Inquiries, Articles, Testimonials tables
│   │   └── seedData.ts           # Initial real data seed repository
│   ├── lib/                      # Utilities & Metadata Helpers
│   │   ├── auth.ts               # Cookie-based secure session verification
│   │   └── metadata.ts           # SEO open graph, Twitter & schema generators
│   └── types/                    # TypeScript interfaces & type definitions
├── .env.example                  # Environment variable reference
├── drizzle.config.ts             # Drizzle ORM configuration
├── next.config.ts                # Next.js configuration
└── tailwind.config.ts            # Custom luxury palette configuration
```

---

## ⚡ Getting Started & Local Development

### 1. Prerequisites
- **Node.js**: Version 18.18.0 or higher (Node 20+ recommended)
- **npm** or **pnpm** or **yarn**

### 2. Clone the Repository
```bash
git clone https://github.com/alvinmonir411/ava.git
cd ava
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Neon PostgreSQL Connection String
DATABASE_URL="postgresql://neondb_owner:npg_tYw6WgIoJM7k@ep-fragrant-unit-ayzb7fge-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Admin Portal Passcode
ADMIN_PASSWORD=lwcco2026
ADMIN_PIN=lwcco2026

# Canonical Base URL
NEXT_PUBLIC_APP_URL=https://lowwahchin-co.vercel.app
NEXT_PUBLIC_SITE_URL=https://lowwahchin-co.vercel.app

# Optional Gmail SMTP (for email notifications)
GMAIL_USER=lwclegal5@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## 🔐 Admin Portal Credentials & Access

To access the back-office management console:
1. Navigate to: `https://lowwahchin-co.vercel.app/admin`
2. Enter passcode: `lwcco2026` (or `admin123`)
3. Access the full suite of CRM tools, consultation records, article management, and firm settings.

---

## 🚀 Deployment to Vercel

The application is configured for zero-configuration continuous deployment with Vercel:

1. **Push commits to GitHub `main` branch:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
2. **Deploy directly via Vercel CLI (Optional):**
   ```bash
   npx vercel --prod --yes
   ```
3. Ensure the environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_PIN`) are configured under **Vercel Project Settings → Environment Variables**.

---

## ⚖️ Legal & Chambers Information

- **Firm Name:** Messrs. Low Wah Chin & Co. (Advocates & Solicitors)
- **Bar Council Registration:** No. BC/L/2019
- **Principal Counsel:** Ava Rachel Low (Advocate & Solicitor, High Court of Malaya • Barrister-at-Law, Lincoln’s Inn, London)
- **Chambers Address:** Colony @ KLCC, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur, Malaysia
- **Telephone / WhatsApp:** +60 17-548 3157
- **Official Email:** `lwclegal5@gmail.com`

---

© 2026 Messrs. Low Wah Chin & Co. Advocates & Solicitors. All rights reserved.
Protected under strict Malaysian Legal Professional Privilege.
