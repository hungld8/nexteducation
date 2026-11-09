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
const { sendContact } = require('./src/mailer');

const LANGS = ['en', 'vi'];
const DEFAULT_LANG = 'en';
const locales = {
  en: require('./src/locales/en.json'),
  vi: require('./src/locales/vi.json'),
};

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  })
);
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

/** Pick a localized value: accepts {en, vi} objects, arrays, or plain strings. */
function L(lang) {
  return function tr(value) {
    if (value == null) return '';
    if (typeof value === 'object' && !Array.isArray(value) && (value.en !== undefined || value.vi !== undefined)) {
      return value[lang] !== undefined ? value[lang] : value[DEFAULT_LANG];
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
  res.locals.lang = lang;
  res.locals.otherLang = lang === 'en' ? 'vi' : 'en';
  res.locals.t = T(lang);
  res.locals.L = L(lang);
  res.locals.site = site;
  res.locals.programs = programs;
  res.locals.path = rest;
  res.locals.url = (p = '/') => `/${lang}${p === '/' ? '' : p}`;
  res.locals.switchUrl = `/${res.locals.otherLang}${rest === '/' ? '' : rest}`;
  res.locals.canonical = `${baseUrl(req)}/${lang}${rest === '/' ? '' : rest}`;
  res.locals.alternates = LANGS.map((l) => ({ lang: l, href: `${baseUrl(req)}/${l}${rest === '/' ? '' : rest}` }));
  res.locals.year = new Date().getFullYear();
  next();
}

// Root: redirect by browser language
app.get('/', (req, res) => {
  const pref = req.acceptsLanguages('vi', 'en');
  res.redirect(302, `/${pref === 'vi' ? 'vi' : DEFAULT_LANG}`);
});

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => res.render('pages/home', { page: 'home', gallery }));
router.get('/about', (req, res) => res.render('pages/about', { page: 'about' }));
router.get('/programs', (req, res) => res.render('pages/programs', { page: 'programs' }));
router.get('/programs/:slug', (req, res, next) => {
  const program = programs.find((p) => p.slug === req.params.slug);
  if (!program) return next();
  res.render('pages/program', { page: 'programs', program });
});
router.get('/gallery', (req, res) => res.render('pages/gallery', { page: 'gallery', gallery }));
router.get('/contact', (req, res) =>
  res.render('pages/contact', { page: 'contact', sent: req.query.sent === '1', error: req.query.error === '1', selected: req.query.program || '' })
);

router.post('/contact', async (req, res) => {
  const lang = res.locals.lang;
  const wantsJson = (req.get('accept') || '').includes('application/json');
  const clean = (v, max = 500) => String(v || '').trim().slice(0, max);
  const data = {
    name: clean(req.body.name, 120),
    email: clean(req.body.email, 160),
    phone: clean(req.body.phone, 40),
    organization: clean(req.body.organization, 160),
    country: clean(req.body.country, 80),
    program: clean(req.body.program, 120),
    participants: clean(req.body.participants, 20),
    message: clean(req.body.message, 3000),
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

app.use('/:lang(en|vi)', withLang, router);

// SEO helpers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl(req)}/sitemap.xml\n`);
});
app.get('/sitemap.xml', (req, res) => {
  const paths = ['', '/about', '/programs', ...programs.map((p) => `/programs/${p.slug}`), '/gallery', '/contact'];
  const b = baseUrl(req);
  const urls = paths
    .map(
      (p) => `  <url><loc>${b}/en${p}</loc>${LANGS.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${b}/${l}${p}"/>`).join('')}</url>`
    )
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Next Education website running on http://localhost:${PORT}`));
