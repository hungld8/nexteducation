'use strict';
// Lists every English text in src/data (+ L({ en: '...' }) in views) that the
// kr/jp/cn dictionaries (src/locales/data.<lang>.json) should translate.
// Usage: node scripts/i18n-strings.js [lang]  -> prints missing strings for that lang
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const data = [require('../src/data/site'), require('../src/data/programs'), require('../src/data/gallery')];
const out = new Set();
(function walk(v) {
  if (Array.isArray(v)) return v.forEach(walk);
  if (v && typeof v === 'object') {
    if (v.en !== undefined && v.vi !== undefined) {
      (Array.isArray(v.en) ? v.en : [v.en]).forEach((s) => out.add(s));
      return;
    }
    Object.values(v).forEach(walk);
  }
})(data);
const viewsDir = path.join(root, 'views');
for (const dir of ['pages', 'partials']) {
  for (const f of fs.readdirSync(path.join(viewsDir, dir))) {
    const src = fs.readFileSync(path.join(viewsDir, dir, f), 'utf8');
    for (const m of src.matchAll(/L\(\{ en: '([^']*)'/g)) out.add(m[1]);
  }
}
const lang = process.argv[2];
const dict = lang ? JSON.parse(fs.readFileSync(path.join(root, 'src/locales', `data.${lang}.json`), 'utf8')) : {};
const list = [...out].filter((s) => !dict[s]);
if (lang) console.log(`${list.length} missing for ${lang}`);

list.forEach((s, i) => console.log(`${i + 1}\t${s}`));
