'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');

// Load .env (simple parser, no extra dependency)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const site = require('./src/data/site');
const programs = require('./src/data/programs');
const gallery = require('./src/data/gallery');
const videos = require('./src/data/videos');
const { sendContact, verifyMail } = require('./src/mailer');

const { LANGUAGES, LANGS, DEFAULT_LANG } = require('./src/languages');
const imageSizes = require('./src/data/image-sizes.json');
const locales = {};
const dataDict = {}; // English text -> translation, for kr/jp/cn content in src/data
for (const l of LANGS) {
  locales[l] = require(`./src/locales/${l}.json`);
  const dictPath = path.join(__dirname, 'src/locales', `data.${l}.json`);
  dataDict[l] = fs.existsSync(dictPath) ? require(dictPath) : {};
}

// Content Security Policy: only our own scripts, Google Fonts, Google Analytics and YouTube embeds/thumbnails
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'sha256-Du+OJKJSbdUgz5nrHeWWINvez6XKDDU/tyj/5c2uvwo=' https://www.googletagmanager.com",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://i.ytimg.com https://*.google-analytics.com https://*.googletagmanager.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Official domain is next.edu.vn: send www and old/preview hosts there (avoids duplicate pages in Google)
const OFFICIAL = 'https://next.edu.vn';
app.use((req, res, next) => {
  const h = req.hostname || '';
  if (h === 'www.next.edu.vn' || h.endsWith('.onrender.com') || h.endsWith('.hostingersite.com')) {
    return res.redirect(301, `${OFFICIAL}${req.originalUrl}`);
  }
  next();
});
app.use(compression());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', req.secure ? `${CSP}; upgrade-insecure-requests` : CSP);
  if (req.secure) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  })
);
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

/**
 * Pick a localized value from a { en, vi, ... } object.
 * Order: value[lang] -> data.<lang>.json dictionary (keyed by the English text) -> English.
 */
function L(lang) {
  const dict = dataDict[lang] || {};
  const fromDict = (en) => (typeof en === 'string' && dict[en] ? dict[en] : en);
  return function tr(value) {
    if (value == null) return '';
    if (typeof value === 'object' && !Array.isArray(value) && value.en !== undefined) {
      if (value[lang] !== undefined) return value[lang];
      const en = value[DEFAULT_LANG];
      return Array.isArray(en) ? en.map(fromDict) : fromDict(en);
    }
    return value;
  };
}

/** Translate a dotted key from the locale JSON. */
function T(lang) {
  return function t(key) {
    const get = (obj) => key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    const v = get(locales[lang]);
    return v !== undefined ? v : get(locales[DEFAULT_LANG]) ?? key;
  };
}

function baseUrl(req) {
  return (process.env.SITE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

// Shared locals for all /:lang routes
function withLang(req, res, next) {
  const { lang } = req.params;
  if (!LANGS.includes(lang)) return next('route');
  const rest = req.path.replace(new RegExp(`^/${lang}`), '') || '/';
  const suffix = rest === '/' ? '' : rest;
  res.locals.lang = lang;
  res.locals.langInfo = LANGUAGES.find((l) => l.code === lang);
  res.locals.languages = LANGUAGES.map((l) => ({ ...l, href: `/${l.code}${suffix}`, current: l.code === lang }));
  res.locals.t = T(lang);
  res.locals.L = L(lang);
  res.locals.site = site;
  res.locals.programs = programs;
  res.locals.imageSizes = imageSizes;
  res.locals.path = rest;
  res.locals.url = (p = '/') => `/${lang}${p === '/' ? '' : p}`;
  res.locals.canonical = `${baseUrl(req)}/${lang}${suffix}`;
  res.locals.alternates = LANGUAGES.map((l) => ({ lang: l.hreflang, href: `${baseUrl(req)}/${l.code}${suffix}` }));
  res.locals.baseUrl = baseUrl(req);
  res.locals.gaId = process.env.NODE_ENV === 'production' && /^G-[A-Z0-9]+$/.test(site.gaId) ? site.gaId : '';
  res.locals.year = new Date().getFullYear();
  next();
}

// Root: redirect by browser language
app.get('/', (req, res) => {
  const browserCodes = LANGUAGES.flatMap((l) => l.accept);
  const pref = req.acceptsLanguages(...browserCodes);
  const match = pref && LANGUAGES.find((l) => l.accept.includes(pref));
  res.set('Vary', 'Accept-Language');
  res.redirect(302, `/${match ? match.code : DEFAULT_LANG}`);
});

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => res.render('pages/home', { page: 'home', gallery }));
router.get('/about', (req, res) => res.render('pages/about', { page: 'about' }));
router.get('/programs', (req, res) => res.render('pages/programs', { page: 'programs' }));
router.get('/why-next', (req, res) => res.render('pages/why', { page: 'why' }));
router.get('/programs/:slug', (req, res, next) => {
  const program = programs.find((p) => p.slug === req.params.slug);
  if (!program) return next();
  res.render('pages/program', { page: 'programs', program });
});
router.get('/gallery', (req, res) => res.render('pages/gallery', { page: 'gallery', gallery, videos }));
router.get('/contact', (req, res) =>
  res.render('pages/contact', { page: 'contact', sent: req.query.sent === '1', error: req.query.error === '1', selected: req.query.program || '' })
);

// Simple in-memory rate limit: max 5 contact submissions per IP per 15 minutes
const contactHits = new Map();
function tooManyContacts(ip) {
  const now = Date.now();
  const recent = (contactHits.get(ip) || []).filter((t) => now - t < 15 * 60 * 1000);
  recent.push(now);
  contactHits.set(ip, recent);
  if (contactHits.size > 5000) contactHits.clear();
  return recent.length > 5;
}

router.post('/contact', async (req, res) => {
  const lang = res.locals.lang;
  const wantsJson = (req.get('accept') || '').includes('application/json');
  if (tooManyContacts(req.ip)) {
    return wantsJson ? res.status(429).json({ ok: false }) : res.redirect(`/${lang}/contact?error=1`);
  }
  // Strip control characters (incl. line breaks) from single-line fields
  const clean = (v, max = 500) => String(v || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
  const cleanText = (v, max) => String(v || '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '').trim().slice(0, max);
  const data = {
    name: clean(req.body.name, 120),
    email: clean(req.body.email, 160),
    phone: clean(req.body.phone, 40),
    organization: clean(req.body.organization, 160),
    country: clean(req.body.country, 80),
    program: clean(req.body.program, 120),
    participants: clean(req.body.participants, 20),
    message: cleanText(req.body.message, 3000),
    lang,
  };
  // Honeypot field for bots
  if (clean(req.body.website)) return wantsJson ? res.json({ ok: true }) : res.redirect(`/${lang}/contact?sent=1`);

  const errors = {};
  if (data.name.length < 2) errors.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = true;
  if (data.message.length < 5) errors.message = true;
  if (Object.keys(errors).length) {
    return wantsJson ? res.status(400).json({ ok: false, errors }) : res.redirect(`/${lang}/contact?error=1`);
  }

  try {
    await sendContact(data);
    return wantsJson ? res.json({ ok: true }) : res.redirect(`/${lang}/contact?sent=1`);
  } catch (err) {
    console.error('[contact] send failed:', err.message);
    return wantsJson ? res.status(500).json({ ok: false }) : res.redirect(`/${lang}/contact?error=1`);
  }
});

app.use(`/:lang(${LANGS.join('|')})`, withLang, router);

// SEO helpers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl(req)}/sitemap.xml\n`);
});
app.get('/sitemap.xml', (req, res) => {
  const paths = ['', '/about', '/programs', '/why-next', ...programs.map((p) => `/programs/${p.slug}`), '/gallery', '/contact'];
  const b = baseUrl(req);
  // One <url> per language version, each listing all alternates (+ x-default)
  const alts = (p) =>
    LANGUAGES.map((l) => `<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${b}/${l.code}${p}"/>`).join('') +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${b}/${DEFAULT_LANG}${p}"/>`;
  const urls = paths
    .flatMap((p) => LANGUAGES.map((l) => `  <url><loc>${b}/${l.code}${p}</loc>${alts(p)}</url>`))
    .join('\n');
  res
    .type('application/xml')
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>`);
});

// 404
app.use((req, res) => {
  const lang = LANGS.find((l) => req.path.startsWith(`/${l}`)) || DEFAULT_LANG;
  req.params.lang = lang;
  withLang(Object.assign(req, { params: { lang } }), res, () => {
    res.status(404).render('pages/404', { page: '404' });
  });
});

// Errors (e.g. malformed form data): never show technical details
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error('[error]', err.message);
  res.status(status).type('text/plain').send(status < 500 ? 'Bad request' : 'Something went wrong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NEXT website running on http://localhost:${PORT}`);
  verifyMail();
});
