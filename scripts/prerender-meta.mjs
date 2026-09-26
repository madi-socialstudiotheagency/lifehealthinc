// Runs after `vite build`. The site is a single-page app, so without this every
// URL serves the same generic <head> until JavaScript runs. Search engines,
// link previews and AI crawlers that do not run JS would see one title for the
// whole site. This writes a copy of index.html per route with that route's own
// title, description, canonical and social tags (from public/seo.js), and
// rebuilds sitemap.xml with lastmod dates. Netlify serves an existing file
// before applying the SPA fallback, so /health-quote gets its own head.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://www.lifehealthinc.org';
const BRAND = 'LifeHealthInc';

const seoSrc = readFileSync('public/seo.js', 'utf8');
const start = seoSrc.indexOf('var META = {');
const end = seoSrc.indexOf('\n  };', start);
if (start < 0 || end < 0) throw new Error('prerender-meta: could not find META in public/seo.js');
const META = new Function('SITE', 'BRAND', 'PHONE', 'OG_IMAGE', seoSrc.slice(start, end + 5).replace('var META =', 'return'))(SITE, BRAND, '(954) 543-0853', SITE + '/assets/img/og-lifehealthinc.png');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf8');

function withMeta(html, path, m) {
  const CANON = { '/matthew-anderson': '/brokers/matthew-anderson', '/justin-brabant': '/brokers/justin-brabant', '/schedulerchat': '/book', '/get-quote': '/quote', '/quotepage': '/quote', '/privacy-policy': '/privacy' };
  const url = SITE + (path === '/' ? '/' : (CANON[path] || path));
  const set = (re, tag) => (re.test(html) ? html.replace(re, tag) : html.replace('</head>', tag + '\n  </head>'));
  html = set(/<title>[^<]*<\/title>/, `<title>${esc(m.t)}</title>`);
  html = set(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(m.d || '')}" />`);
  html = set(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = set(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(m.t)}" />`);
  html = set(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(m.d || '')}" />`);
  html = set(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = set(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large'}" />`);
  return html;
}

// Home page: rewrite dist/index.html in place.
writeFileSync(join(DIST, 'index.html'), withMeta(baseHtml, '/', META['/']));

const ALIASES = new Set(['/get-quote', '/quotepage', '/privacy-policy', '/matthew-anderson', '/justin-brabant', '/schedulerchat']);
let count = 0;
for (const [path, m] of Object.entries(META)) {
  if (path === '/' || ALIASES.has(path) || !m.t) continue;
  // <route>.html (not <route>/index.html): Netlify's pretty URLs then serve /route
  // directly, with no redirect to /route/ that would disagree with the canonical.
  const file = join(DIST, path.replace(/^\//, '') + '.html');
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, withMeta(baseHtml, path, m));
  count++;
}

// Sitemap: every indexable route in META plus whatever the existing sitemap lists.
const today = new Date().toISOString().slice(0, 10);
const locs = new Set();
const smPath = join(DIST, 'sitemap.xml');
if (existsSync(smPath)) {
  for (const mm of readFileSync(smPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) locs.add(mm[1].replace(/\/$/, '') || SITE);
}
for (const [path, m] of Object.entries(META)) {
  if (m.noindex || ALIASES.has(path) || !m.t) continue;
  locs.add(path === '/' ? SITE : SITE + path);
}
const urls = [...locs].sort().map((u) => {
  const isHome = u === SITE;
  return `  <url><loc>${isHome ? SITE + '/' : u}</loc><lastmod>${today}</lastmod><changefreq>${isHome ? 'weekly' : 'monthly'}</changefreq><priority>${isHome ? '1.0' : '0.7'}</priority></url>`;
});
writeFileSync(smPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);

console.log(`prerender-meta: wrote ${count} route heads and a ${urls.length}-URL sitemap`);
