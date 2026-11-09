'use strict';

// Supported languages. `code` is the URL prefix (/en, /vi, /kr, /jp, /cn);
// `html`/`hreflang` are the standard language tags used for SEO and accessibility.
const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', html: 'en', hreflang: 'en', og: 'en_US', accept: ['en'] },
  { code: 'vi', label: 'Tiếng Việt', short: 'VI', html: 'vi', hreflang: 'vi', og: 'vi_VN', accept: ['vi'] },
  { code: 'kr', label: '한국어', short: 'KR', html: 'ko', hreflang: 'ko', og: 'ko_KR', accept: ['ko'], font: 'Noto+Sans+KR' },
  { code: 'jp', label: '日本語', short: 'JP', html: 'ja', hreflang: 'ja', og: 'ja_JP', accept: ['ja'], font: 'Noto+Sans+JP' },
  { code: 'cn', label: '简体中文', short: 'CN', html: 'zh-Hans', hreflang: 'zh-Hans', og: 'zh_CN', accept: ['zh', 'zh-CN', 'zh-Hans', 'zh-SG'], font: 'Noto+Sans+SC' },
];

module.exports = {
  LANGUAGES,
  LANGS: LANGUAGES.map((l) => l.code),
  DEFAULT_LANG: 'en',
};
