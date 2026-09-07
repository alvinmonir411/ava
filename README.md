# ⚖️ Messrs. Low Wah Chin & Co. (LWCCO) — Advocates & Solicitors

[![Live Production](https://img.shields.io/badge/Live%20Production-lowwahchin--co.vercel.app-gold?style=for-the-badge&logo=vercel)](https://lowwahchin-co.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4%20Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/Database-Neon%20Serverless%20Postgres-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google Rating](https://img.shields.io/badge/Google%20Rating-5.0%20%E2%98%85%20(34%2B%20Reviews)-4285F4?style=for-the-badge&logo=google)](https://share.google/4f6BOdPxefdpTafG3)
[![Bar Council](https://img.shields.io/badge/Bar%20Council-BC%2FL%2F2019-navy?style=for-the-badge)](https://www.malaysianbar.org.my/)

> **Messrs. Low Wah Chin & Co. (Advocates & Solicitors)** is an elite legal practice headquartered at **Colony @ KLCC, Vipod Residences, Kuala Lumpur**. Led by **Ava Rachel Low** (*Barrister-at-Law, Lincoln's Inn, London • Advocate & Solicitor of the High Court of Malaya*), the firm delivers partner-led legal counsel across conveyancing, corporate law, matrimonial matters, medical negligence, bodily injury claims, and high-stakes dispute resolution.

---

## 🌐 Live Deployment & Important Links

| Portal / Resource | URL / Access | Description |
|---|---|---|
| **Official Live Website** | [https://lowwahchin-co.vercel.app](https://lowwahchin-co.vercel.app) | Public-facing luxury web application & consultation booking |
| **Admin Back-Office CRM** | [https://lowwahchin-co.vercel.app/admin](https://lowwahchin-co.vercel.app/admin) | Full management portal (`Passcode: lwcco2026` or `admin123`) |
| **Google Maps & Verified Reviews** | [LWCCO on Google Maps](https://share.google/4f6BOdPxefdpTafG3) | 5.0-star rating across 34+ verified client reviews |
| **Direct WhatsApp Consultation** | [+60 17-548 3157](https://wa.me/60175483157) | Direct encrypted counsel inquiry line |
| **GitHub Repository** | [alvinmonir411/ava](https://github.com/alvinmonir411/ava.git) | Source code repository |

---

## 🏛️ Practice Disciplines & Service Architecture

The platform features dedicated, SEO-optimized individual practice pages with structured legal breakdowns, statutory benchmarks, FAQs, and tailored booking funnels across **27+ legal disciplines**:

### 🌟 Core Practice Disciplines (Primary Focus)
1. **Legal Advice & General Consultation** (`/practices/legal-advice-consultation`)
2. **Property & Conveyancing Law** (`/practices/property-conveyancing`)
3. **Family & Divorce Law** (`/practices/family-divorce`)
4. **Dispute Resolution, Accident & Bodily Injury Claims** (`/practices/dispute-resolution-claims`)
5. **Will Writing & Estate Distribution** (`/practices/will-estate-distribution`)
6. **Company Matters, Commercial Agreements & Litigation** (`/practices/company-matters-agreements`)

### 📜 Specialized Litigation & Advisory Disciplines
7. **Bodily Injury Claims** (`/practices/bodily-injury-claims`)
8. **Medical Negligence Claims** (`/practices/medical-negligence-claims`)
9. **Letter Writing & Letters of Demand (LODs)** (`/practices/letter-writing-lods`)
10. **Employment & Labour Claims** (`/practices/employment-labour-claims`)
11. **Defamation Claims & Justification** (`/practices/defamation-claims`)
12. **Will Writing & Probate Advice** (`/practices/will-writing-probate-advice`)
13. **Tenancy Agreement Disputes** (`/practices/tenancy-disputes`)
14. **Business Negotiations & Commercial Deals** (`/practices/business-negotiations-deals`)
15. **Small Claims Assistance** (`/practices/small-claims-assistance`)
16. **Professional Negligence Claims** (`/practices/professional-negligence-claims`)
17. **Contractor Negligence Claims** (`/practices/contractor-negligence-claims`)
18. **Debt Recovery & Winding Up** (`/practices/debt-recovery-winding-up`)
19. **Contract Drafting & Commercial Advisory** (`/practices/contract-drafting-commercial-advisory`)
20. **Contractual Dispute Claims** (`/practices/contractual-dispute-claims`)
21. *...plus full dynamic routing support via `/practices/[slug]` for any custom practices registered via Admin.*

---

## 🚀 Key Platform Features

### 1. 💼 Full Admin Management Portal & CRM (`/admin`)
* **Consultation Leads CRM (`/admin/inquiries`)**:
  * Real-time sync with Neon PostgreSQL for incoming booking requests.
  * Multi-status workflow tracking: `New Lead`, `In Review`, `Scheduled`, `Contacted`, `Completed`.
  * One-click direct WhatsApp chat launch with prefilled client context and issue summary.
  * Client detail inspection modal and one-click **CSV Data Export** for legal billing records.
* **Legal Articles CMS (`/admin/articles`)**: Complete rich-text publishing, editing, draft staging, and previewing of legal insights and landmark case analyses.
* **Client Reviews & Accolades Manager (`/admin/testimonials`)**: Manage featured client reviews, star ratings, and media features.
* **Practice Area CMS (`/admin/practices`)**: Dynamically update service scope checklists, statutory guides, FAQs, hero imagery, and descriptions.
* **Firm Profile & Settings (`/admin/settings`)**: Configure Malaysian Bar Council registration number, phone numbers, email, and KLCC chambers coordinates.

### 2. ⭐ Google Verified Reviews & Recognition Engine
* **Interactive Category Filtering**: Filter verified reviews across *Visa & Immigration, Wills & Estate Distribution, Accident & Injury, Commercial & Letter Writing, Fraud & Legal Advice, and Bilingual / Chinese Counsel*.
* **Real 5.0-Star Client Feedback**: Built with direct integration to firm Google Business profile (`https://share.google/4f6BOdPxefdpTafG3`).
* **Official Recognition & Landmark Case Showcases**: Dedicated sections showcasing High Court / Court of Appeal precedents and professional accolades.

### 3. ⚡ Smart Consultation Engine & Auto-Preselection
* **Context-Aware Preselection**: When clients browse any practice page (e.g. `/practices/property-conveyancing`), the consultation form automatically preselects the exact practice area.
* **URL Parameter Routing**: Supports `?practice=...` and `?service=...` across all links (e.g., `/contact?practice=family-divorce`).
* **Sleek Toast System with Sonner**: Zero intrusive native browser popup alerts (`window.alert` / `window.confirm` removed) — replaced with luxury dark-navy/gold confirmation modals and instant toast notifications.

### 4. 🔍 Enterprise SEO & Performance Architecture
* **JSON-LD Structured Data**: Embedded `LegalService` schema with address, geo-coordinates, telephone, email, and partner profile for rich snippet visibility.
* **Dynamic Sitemap & Robots.txt**: Auto-generated XML sitemap covering all 50+ prerendered static and dynamic routes.
* **Sub-Second Load Times**: Next.js 16 Turbopack build, responsive `next/image` optimization, and modern preconnected Google Fonts (`Cinzel`, `Playfair Display`, `Inter`).

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [Next.js 16.3.4 (App Router)](https://nextjs.org/) | Next-generation React framework with Turbopack |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing and type safety across DB & UI |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Custom Luxury Traditional Law Firm Palette (Deep Navy, Warm Gold, Ivory) |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) | Cloud-native serverless Postgres pooler on AWS US-East-2 |
| **ORM & Schema** | [Drizzle ORM](https://orm.drizzle.team/) | Type-safe SQL ORM and schema migration suite |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) | Premium vector icons and smooth notifications |
| **Email Notifications**| [Nodemailer](https://nodemailer.com/) | Automated intake notifications via Gmail SMTP |
| **Deployment** | [Vercel Edge Platform](https://vercel.com/) | Global edge delivery and continuous integration |

---

## 📂 Project Directory Structure

```text
client/
├── src/
│   ├── actions/                  # Next.js Server Actions (Mutations & Queries)
│   │   ├── adminAuth.ts          # Admin session authentication & security
│   │   ├── articleActions.ts     # Legal publication CRUD operations
│   │   ├── inquiryActions.ts     # Consultation leads CRM server actions
│   │   ├── practiceActions.ts    # Practice area content management
│   │   ├── settingsActions.ts    # Firm profile & chambers settings
│   │   ├── submitInquiry.ts      # Public booking submission & email notification
│   │   └── testimonialActions.ts # Client review actions
│   ├── app/                      # Next.js App Router (50+ routes)
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
│   │   ├── layout/               # Header, TopUtilityBar, SiteFooter
│   │   ├── sections/             # PracticeAreasDark, GoogleReviewsSection, Hero, AboutPrincipal
│   │   └── showcase/             # RepresentativeMatters landmark showcase
│   ├── data/                     # Static dataset & Google Reviews repository
│   │   └── googleReviews.ts      # 34+ verified Google Reviews dataset & metadata
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
├── package.json                  # Dependencies & scripts
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## ⚡ Getting Started & Local Development

### 1. Prerequisites
* **Node.js**: Version 18.18.0 or higher (Node 20+ recommended)
* **npm**, **pnpm**, or **yarn**

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
Create a `.env.local` file in the project root (or duplicate `.env.example`):
```bash
cp .env.example .env.local
```

Populate the required keys:
```env
# Neon PostgreSQL Connection String
DATABASE_URL="postgresql://neondb_owner:npg_tYw6WgIoJM7k@ep-fragrant-unit-ayzb7fge-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Admin Portal Passcode
ADMIN_PASSWORD=lwcco2026
ADMIN_PIN=lwcco2026

# Canonical Base URL
NEXT_PUBLIC_APP_URL=https://lowwahchin-co.vercel.app
NEXT_PUBLIC_SITE_URL=https://lowwahchin-co.vercel.app

# Optional Gmail SMTP (for email intake notifications)
GMAIL_USER=lwclegal5@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build and Test Production Output
```bash
npm run build
npm run start
```

---

## 🔐 Admin Portal Credentials & Access

To access the firm's back-office management console:
1. Navigate to: `https://lowwahchin-co.vercel.app/admin`
2. Enter passcode: `lwcco2026` *(or `admin123`)*
3. Manage incoming consultation leads, view client intake details, launch direct WhatsApp discussions, publish articles, and update practice offerings.

---

## 🚀 Continuous Deployment to Vercel

The application is deployed on Vercel with automatic continuous integration:

1. **Commit and Push to GitHub `main`:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin main
   ```
2. **Deploy via Vercel CLI (Optional):**
   ```bash
   npx vercel --prod --yes
   ```
3. Ensure the environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_PIN`) are configured under **Vercel Dashboard → Project Settings → Environment Variables**.

---

## ⚖️ Legal & Chambers Information

* **Firm Name:** Messrs. Low Wah Chin & Co. (Advocates & Solicitors)
* **Bar Council Registration:** No. BC/L/2019
* **Principal Counsel:** Ava Rachel Low (*Advocate & Solicitor, High Court of Malaya • Barrister-at-Law, Lincoln’s Inn, London*)
* **Chambers Address:** Level 1, Colony @ KLCC, Vipod Residences, 6 Jalan Kia Peng, 50450 Kuala Lumpur, Malaysia
* **Telephone / WhatsApp:** +60 17-548 3157
* **Official Email:** `lwclegal5@gmail.com`
* **Google Reviews:** [https://share.google/4f6BOdPxefdpTafG3](https://share.google/4f6BOdPxefdpTafG3)

---

© 2026 Messrs. Low Wah Chin & Co. Advocates & Solicitors. All rights reserved.  
*Protected under strict Malaysian Legal Professional Privilege.*
