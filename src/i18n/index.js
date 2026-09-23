// Minimal i18n: no library. Components render with t(key) and tag nodes with
// data-i18n="key" so a language switch updates text in place (no re-render,
// no replayed intro). Attributes use data-i18n-attr="attr:key;attr:key".
import en from './en.js';
import pt from './pt.js';

const dictionaries = { en, pt };
export const LANGS = ['pt', 'en'];
export const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'snb-lang';

let current = DEFAULT_LANG;
const listeners = new Set();

function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), dict);
}

export function t(key, lang = current) {
  const value = resolve(dictionaries[lang], key);
  if (value === undefined) {
    console.warn(`[i18n] missing "${key}" for "${lang}"`);
    return resolve(dictionaries[DEFAULT_LANG], key) ?? key;
  }
  return value;
}

export function getLang() { return current; }

function readStoredLang() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export function initLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  const stored = readStoredLang();
  const candidate = fromUrl || stored || DEFAULT_LANG;
  current = dictionaries[candidate] ? candidate : DEFAULT_LANG;
  document.documentElement.lang = current === 'pt' ? 'pt-BR' : 'en';
  return current;
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));
}

export function setLang(lang) {
  if (!dictionaries[lang] || lang === current) return;
  current = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
  applyTranslations();
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
