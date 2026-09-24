const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function seedSettings() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is missing.');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  console.log('Connecting to Neon DB to seed site_settings...');

  // 1. Ensure table exists
  await sql.query(`
    CREATE TABLE IF NOT EXISTS "site_settings" (
      "key" text PRIMARY KEY NOT NULL,
      "value" jsonb NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    );
  `);
  console.log('Table site_settings ensured.');

  // 2. Read firmSettings.json
  const settingsPath = path.join(__dirname, '..', 'data', 'firmSettings.json');
  if (!fs.existsSync(settingsPath)) {
    console.error('firmSettings.json not found at:', settingsPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(settingsPath, 'utf-8');
  const parsed = JSON.parse(raw);
  console.log('Read firmSettings.json successfully. Keys:', Object.keys(parsed));

  // 3. Upsert into site_settings under key 'firm_settings'
  await sql.query(
    `
    INSERT INTO "site_settings" ("key", "value", "updated_at")
    VALUES ($1, $2::jsonb, NOW())
    ON CONFLICT ("key") DO UPDATE
    SET "value" = EXCLUDED."value",
        "updated_at" = NOW();
    `,
    ['firm_settings', JSON.stringify(parsed)]
  );

  console.log("Successfully seeded 'firm_settings' row in site_settings table.");

  // 4. Verify
  const rows = await sql.query(`SELECT "key", "updated_at", jsonb_pretty("value") AS val FROM "site_settings" WHERE "key" = 'firm_settings'`);
  console.log('Verified database record:', rows);
}

if (require.main === module) {
  seedSettings().catch((err) => {
    console.error('Failed to seed settings:', err);
    process.exit(1);
  });
}

module.exports = { seedSettings };
