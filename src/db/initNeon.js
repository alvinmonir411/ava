const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_tYw6WgIoJM7k@ep-fragrant-unit-ayzb7fge-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function initDB() {
  const sql = neon(DATABASE_URL);
  console.log('Connecting to Neon DB...');
  
  const version = await sql.query('SELECT version()');
  console.log('PostgreSQL version result:', version);

  // 1. Create Inquiries Table
  console.log('Creating inquiries table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      practice_area VARCHAR(150) NOT NULL,
      preferred_date VARCHAR(100),
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'new' NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
    );
  `);

  // 2. Create Articles Table
  console.log('Creating articles table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      author VARCHAR(150) DEFAULT 'Low Wah Chin (Ava Rachel)' NOT NULL,
      read_time VARCHAR(50) DEFAULT '3 min read' NOT NULL,
      published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
      cover_image_url TEXT
    );
  `);

  // 3. Create Team Members Table
  console.log('Creating team_members table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS team_members (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL,
      bio TEXT NOT NULL,
      photo_url TEXT,
      display_order INTEGER DEFAULT 0 NOT NULL
    );
  `);

  // 4. Create Testimonials Table
  console.log('Creating testimonials table...');
  await sql.query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      client_name VARCHAR(255) NOT NULL,
      quote TEXT NOT NULL,
      practice_area VARCHAR(150) NOT NULL,
      rating INTEGER DEFAULT 5 NOT NULL,
      source VARCHAR(150) DEFAULT 'Trusted Malaysia' NOT NULL,
      published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
    );
  `);

  // Check Inquiries
  const existingInquiries = await sql.query('SELECT count(*) as count FROM inquiries');
  const inqCount = existingInquiries[0]?.count || existingInquiries.rows?.[0]?.count || 0;
  console.log('Inquiries count:', inqCount);

  if (parseInt(inqCount) === 0) {
    console.log('Seeding initial consultation inquiries...');
    await sql.query(`
      INSERT INTO inquiries (name, email, phone, practice_area, preferred_date, message, status)
      VALUES 
      ('Dato’ Sri Michael Tan', 'michael.tan@tancorp.com.my', '+60 12-334 8899', 'Property & Conveyancing Law', 'Next Tuesday (Morning)', 'We are acquiring a commercial building in Jalan Ampang worth RM12.5M. Need Low Wah Chin & Co. to review the SPA, conduct land title searches, and advise on stamp duty adjudication.', 'new'),
      ('Dr. Nurul Izzati', 'nurul.izzati@healthnet.my', '+60 17-889 2211', 'Medical Negligence Claims', 'This Friday (2:00 PM)', 'Seeking legal representation regarding surgical error during orthopedic procedure at private hospital in Subang. Have hospital discharge summary and expert report ready for review.', 'in_review'),
      ('Kelvin Wong & Partners', 'kelvin@wonglogistics.com', '+60 19-445 6789', 'Debt Recovery & Winding Up', 'Urgent — ASAP', 'Defaulting debtor company owes RM185,000 for freight forwarding services. We need a formal 21-Day Statutory Notice under Section 466 of Companies Act 2016 served immediately.', 'scheduled'),
      ('Puan Siti Rahmah', 'siti.rahmah88@gmail.com', '+60 16-554 1122', 'Family & Divorce Matters', 'Next Monday', 'Inquiring about fast-track Joint Petition mutual consent divorce and matrimonial property division advice. Both parties agree on general terms.', 'contacted'),
      ('Encik Ahmad Farhan', 'farhan.ahmad@gmail.com', '+60 13-778 9900', 'Bodily Injury Claims', 'Flexible', 'Involved in a serious motorcycle accident along MEX Highway caused by negligent commercial lorry. Suffered compound fracture. Need advice on general and special damages claim.', 'new');
    `);
    console.log('Seeded initial inquiries successfully.');
  }

  // Check Articles
  const existingArticles = await sql.query('SELECT count(*) as count FROM articles');
  const artCount = existingArticles[0]?.count || existingArticles.rows?.[0]?.count || 0;
  console.log('Articles count:', artCount);

  if (parseInt(artCount) === 0) {
    console.log('Seeding initial legal articles...');
    await sql.query(`
      INSERT INTO articles (slug, title, excerpt, content, category, author, read_time, cover_image_url)
      VALUES
      ('understanding-property-conveyancing-in-malaysia-complete-guide', 'Understanding Property Conveyancing in Malaysia: Complete Legal Guide', 'A comprehensive step-by-step breakdown of sale and purchase agreements (SPA), memorandum of transfer, stamp duty remission, and developer compliance under Malaysian law.', '### Key Steps in Malaysian Property Conveyancing\n\nWhen purchasing residential or commercial real estate in Malaysia...', 'Property & Real Estate Law', 'Low Wah Chin (Ava Rachel)', '5 min read', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'),
      ('6-best-personal-injury-lawyers-in-kl-selangor-2023', '6 Best Personal Injury Lawyers in KL & Selangor (Featured Recognition)', 'Recognized by Trusted Malaysia for outstanding litigation success, client-first contingency advisory, and aggressive bodily injury recovery claims.', '### Recognized for Personal Injury & Bodily Injury Claims\n\nMessrs. Low Wah Chin & Co. has been officially featured among the top personal injury law practices...', 'Accolades & Press', 'Editorial Team', '4 min read', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'),
      ('10-best-law-firms-in-kuala-lumpur-by-mohammad-bin-amir-last-updated-july-1-2023', '10 Best Law Firms in Kuala Lumpur (Legal Industry Spotlight)', 'Honored among the top 10 premier law firms in Kuala Lumpur for high-stakes dispute resolution, conveyancing precision, and compassionate family law practice.', '### Top Legal Advisory in Kuala Lumpur\n\nLow Wah Chin & Co. stands out among Kuala Lumpur boutique law firms for direct partner-led counsel...', 'Firm News', 'Mohammad Bin Amir', '6 min read', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'),
      ('guide-to-divorce-and-matrimonial-proceedings-in-malaysia', 'Guide to Divorce & Matrimonial Proceedings in Malaysia (Law Reform Act 1976)', 'Essential legal insights on joint petitions, contested single petitions, child custody rights, and spousal maintenance under Malaysian family statutes.', '### Non-Muslim Divorce Proceedings in Malaysia\n\nUnder the Law Reform (Marriage and Divorce) Act 1976...', 'Family Law', 'Low Wah Chin (Ava Rachel)', '5 min read', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80');
    `);
    console.log('Seeded articles successfully.');
  }

  // Check Testimonials
  const existingTestimonials = await sql.query('SELECT count(*) as count FROM testimonials');
  const testCount = existingTestimonials[0]?.count || existingTestimonials.rows?.[0]?.count || 0;
  console.log('Testimonials count:', testCount);

  if (parseInt(testCount) === 0) {
    console.log('Seeding initial client reviews...');
    await sql.query(`
      INSERT INTO testimonials (client_name, quote, practice_area, rating, source)
      VALUES
      ('Dato’ Sri Michael Tan', 'Low Wah Chin & Co. handled our commercial acquisition in KL with flawless precision. Her sharp advice and prompt LOD drafting prevented major litigation.', 'Property & Commercial Law', 5, 'Verified Client Review'),
      ('Trusted Malaysia Editorial', 'Ava Rachel Low is recognized for her aggressive yet empathetic personal injury representation and fearless courtroom advocacy across the High Court of Malaya.', 'Bodily Injury & Civil Litigation', 5, 'Trusted Malaysia 2023'),
      ('Sarah Lim & Family', 'During a stressful matrimonial dispute, Ms. Low provided calm, decisive guidance that protected our child custody rights and achieved an equitable settlement.', 'Family & Divorce Matters', 5, 'Client Testimonial');
    `);
    console.log('Seeded testimonials successfully.');
  }

  console.log('✅ Neon DB initialization and schema migration completed successfully!');
}

initDB().catch(console.error);
