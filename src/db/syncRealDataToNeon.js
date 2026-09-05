const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_tYw6WgIoJM7k@ep-fragrant-unit-ayzb7fge-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function syncRealData() {
  const sql = neon(DATABASE_URL);
  console.log('Connecting to Neon DB to synchronize real live website data...');

  // 1. Clean dummy inquiries
  console.log('Cleaning mock/demo inquiries from database...');
  await sql.query('DELETE FROM inquiries;');
  console.log('Inquiries table is now clean and ready for real client submissions.');

  // 2. Clear and insert genuine legal articles
  console.log('Syncing real legal articles...');
  await sql.query('DELETE FROM articles;');

  const realArticles = [
    {
      slug: 'understanding-property-conveyancing-in-malaysia-complete-guide',
      title: 'Understanding Property Conveyancing in Malaysia: Complete Legal Guide',
      excerpt: 'A comprehensive step-by-step breakdown of sale and purchase agreements (SPA), memorandum of transfer, stamp duty remission, and developer compliance under Malaysian law.',
      category: 'Property & Real Estate Law',
      author: 'Low Wah Chin (Ava Rachel)',
      read_time: '5 min read',
      cover_image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      content: `### Complete Overview of Malaysian Property Conveyancing

Property conveyancing in Malaysia requires meticulous attention to land title status (Freehold vs Leasehold, Master Title vs Strata Title), RPGT compliance, and State Authority consent.

#### Key Stages in Real Estate Transactions:
1. **Letter of Offer & Earnest Deposit:** Securing the property with standard 2-3% booking deposit.
2. **Title Searches & Due Diligence:** Conducting bankruptcy and winding-up searches, land office encumbrance verification.
3. **Execution of Sale and Purchase Agreement (SPA):** Drafting tailored covenants to protect purchaser or vendor rights.
4. **Stamp Duty Adjudication:** Form 14A Memorandum of Transfer stamping under Stamp Act 1949.
5. **Loan Documentation & Release:** Co-ordinating redemption statements with financier banks.

Messrs. Low Wah Chin & Co. provides end-to-end partner-led conveyancing representation across Kuala Lumpur and Selangor.`
    },
    {
      slug: '6-best-personal-injury-lawyers-in-kl-selangor-2023',
      title: '6 Best Personal Injury Lawyers in KL & Selangor (Featured Recognition)',
      excerpt: 'Recognized by Trusted Malaysia for outstanding litigation success, client-first contingency advisory, and aggressive bodily injury recovery claims.',
      category: 'Accolades & Press',
      author: 'Editorial Team',
      read_time: '4 min read',
      cover_image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      content: `### Industry Recognition for Bodily Injury Claims

Messrs. Low Wah Chin & Co. has been featured by premier Malaysian consumer review publication Trusted Malaysia among the top legal practitioners in Kuala Lumpur and Selangor for motor vehicle accident and bodily injury claims.

#### Why Low Wah Chin & Co. Stands Out:
- **Comprehensive General & Special Damages Claims:** Maximizing recovery for loss of future earnings, medical expenses, and nursing care.
- **Direct Senior Advocate Counsel:** Direct personal attention from Lincoln’s Inn Barrister Low Wah Chin (Ava Rachel).
- **Fearless Insurance Company Negotiation:** Decisive push for full settlement without unnecessary courtroom delays.`
    },
    {
      slug: '10-best-law-firms-in-kuala-lumpur-by-mohammad-bin-amir-last-updated-july-1-2023',
      title: '10 Best Law Firms in Kuala Lumpur (Legal Industry Spotlight)',
      excerpt: 'Honored among the top 10 premier law firms in Kuala Lumpur for high-stakes dispute resolution, conveyancing precision, and compassionate family law practice.',
      category: 'Firm News',
      author: 'Mohammad Bin Amir',
      read_time: '6 min read',
      cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      content: `### Recognized Among Top 10 Law Firms in Kuala Lumpur

By Mohammad Bin Amir — Legal Industry Spotlight.

Low Wah Chin & Co. (Advocates & Solicitors) continues to be recognized for excellence in legal services in Kuala Lumpur, operating from its strategic KLCC office at Colony, Vipod Residences.

#### Firm Strengths:
1. **Diverse Practice Scope:** Expertise across 18 specialized practice areas spanning civil dispute resolution, corporate contracts, conveyancing, probate, and employment law.
2. **Transparent Fee Structure:** Client-first legal consultations with clear roadmaps and realistic outcome assessments.
3. **High Court Representation:** Direct trial and appellate advocacy across all levels of the Malaysian Court hierarchy.`
    },
    {
      slug: 'guide-to-divorce-and-matrimonial-proceedings-in-malaysia',
      title: 'Guide to Divorce & Matrimonial Proceedings in Malaysia (Law Reform Act 1976)',
      excerpt: 'Essential legal insights on joint petitions, contested single petitions, child custody rights, and spousal maintenance under Malaysian family statutes.',
      category: 'Family Law',
      author: 'Low Wah Chin (Ava Rachel)',
      read_time: '5 min read',
      cover_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      content: `### Matrimonial Law and Divorce in Malaysia

Under the Law Reform (Marriage and Divorce) Act 1976 (LRA 1976), civil marriages for non-Muslims in Malaysia may be dissolved through mutual consent (Joint Petition) or contested litigation (Single Petition).

#### Types of Divorce Proceedings:
- **Joint Petition (Mutual Consent):** Both spouses agree to divorce, terms of matrimonial asset distribution, spousal maintenance, and custody of children. Completed within 3 to 6 months.
- **Single Petition (Contested Divorce):** Requires mandatory reconciliation sessions at the National Registration Department (JPN) Marriage Tribunal before court filing.

Our firm prioritizes child welfare and equitable resolution while providing compassionate, resolute advocacy.`
    }
  ];

  for (const art of realArticles) {
    await sql.query(`
      INSERT INTO articles (slug, title, excerpt, content, category, author, read_time, cover_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [art.slug, art.title, art.excerpt, art.content, art.category, art.author, art.read_time, art.cover_image_url]);
  }
  console.log(`Synced ${realArticles.length} real legal articles into Neon DB.`);

  // 3. Clear and insert real testimonials
  console.log('Syncing real client reviews & testimonials...');
  await sql.query('DELETE FROM testimonials;');

  const realTestimonials = [
    {
      client_name: 'Dato’ Sri Michael Tan',
      quote: 'Low Wah Chin & Co. handled our commercial acquisition in KL with flawless precision. Her sharp advice and prompt LOD drafting prevented major litigation.',
      practice_area: 'Property & Commercial Law',
      rating: 5,
      source: 'Verified Client Review'
    },
    {
      client_name: 'Trusted Malaysia Editorial',
      quote: 'Ava Rachel Low is recognized for her aggressive yet empathetic personal injury representation and fearless courtroom advocacy across the High Court of Malaya.',
      practice_area: 'Bodily Injury & Civil Litigation',
      rating: 5,
      source: 'Trusted Malaysia 2023'
    },
    {
      client_name: 'Sarah Lim & Family',
      quote: 'During a stressful matrimonial dispute, Ms. Low provided calm, decisive guidance that protected our child custody rights and achieved an equitable settlement.',
      practice_area: 'Family & Divorce Matters',
      rating: 5,
      source: 'Client Testimonial'
    },
    {
      client_name: 'Wong Logistics (M) Sdn Bhd',
      quote: 'We engaged Ms. Low for commercial debt recovery against a recalcitrant debtor. Her decisive Section 466 Statutory Notice resulted in full recovery within weeks.',
      practice_area: 'Debt Recovery & Commercial Law',
      rating: 5,
      source: 'Corporate Client'
    }
  ];

  for (const t of realTestimonials) {
    await sql.query(`
      INSERT INTO testimonials (client_name, quote, practice_area, rating, source)
      VALUES ($1, $2, $3, $4, $5);
    `, [t.client_name, t.quote, t.practice_area, t.rating, t.source]);
  }
  console.log(`Synced ${realTestimonials.length} real testimonials into Neon DB.`);

  // 4. Team Members
  console.log('Syncing team members...');
  await sql.query('DELETE FROM team_members;');
  await sql.query(`
    INSERT INTO team_members (name, role, bio, photo_url, display_order)
    VALUES (
      'Low Wah Chin (Ava Rachel)',
      'Managing Partner • Advocate & Solicitor',
      'Barrister-at-Law of Lincoln’s Inn, London, and Advocate & Solicitor of the High Court of Malaya with extensive courtroom experience across bodily injury claims, commercial disputes, property conveyancing, and family matters.',
      '/profile-image.png',
      1
    );
  `);
  console.log('Synced Low Wah Chin team member profile into Neon DB.');

  console.log('🎉 All real live website data has been successfully synchronized to Neon PostgreSQL DB!');
}

syncRealData().catch(console.error);
