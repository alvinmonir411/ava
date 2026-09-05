const https = require('https');

function measure(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    https.get(url, (res) => {
      let bytes = 0;
      res.on('data', (chunk) => bytes += chunk.length);
      res.on('end', () => {
        const duration = Date.now() - start;
        resolve({ url, status: res.statusCode, bytes, durationMs: duration });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function run() {
  console.log('Testing page load speeds on https://lowwahchin-co.vercel.app...\n');
  const urls = [
    'https://lowwahchin-co.vercel.app/',
    'https://lowwahchin-co.vercel.app/about',
    'https://lowwahchin-co.vercel.app/practices',
    'https://lowwahchin-co.vercel.app/practices/legal-advice-consultation',
    'https://lowwahchin-co.vercel.app/articles',
    'https://lowwahchin-co.vercel.app/our-team',
    'https://lowwahchin-co.vercel.app/contact',
    'https://lowwahchin-co.vercel.app/admin/login'
  ];

  for (const u of urls) {
    const r = await measure(u);
    console.log(`[Status ${r.status}] ${r.url.padEnd(68)} : ${r.durationMs}ms (${(r.bytes / 1024).toFixed(1)} KB)`);
  }
}

run();
