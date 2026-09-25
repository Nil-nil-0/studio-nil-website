// Visual review — full-page screenshots of the real, rendered production build.
//
//   npm run visual-review
//
// 1. `vite build` (production) → /dist
// 2. `vite preview` serves /dist; waits until the server really answers
// 3. Chromium (Playwright) opens the page, waits for fonts, images and motion
// 4. Saves visual-review/desktop.png (1440×900) and visual-review/mobile.png (390×844)
//
// Env (all optional):
//   VISUAL_REVIEW_URL   capture this URL instead of building + serving locally
//   VISUAL_REVIEW_SKIP_BUILD=1   reuse the existing /dist
//   PLAYWRIGHT_CHROMIUM_EXECUTABLE   use a specific Chromium binary
//
// This file only observes the site. It never changes markup, styles or behaviour.
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'visual-review');
const VITE_BIN = resolve(ROOT, 'node_modules/vite/bin/vite.js');

// Same base the GitHub Pages deploy uses, for build and preview alike.
const BASE = process.env.BASE_PATH || '/studio-nil-website/';
const HOST = '127.0.0.1';
const PORT = Number(process.env.VISUAL_REVIEW_PORT || 4173);

const VIEWPORTS = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
];

const log = (...a) => console.log('[visual-review]', ...a);
const warn = (...a) => console.warn('[visual-review] warning:', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function run(args, env) {
  return new Promise((ok, fail) => {
    const p = spawn(process.execPath, [VITE_BIN, ...args], { cwd: ROOT, stdio: 'inherit', env });
    p.on('exit', (code) => (code === 0 ? ok() : fail(new Error(`vite ${args[0]} exited with ${code}`))));
  });
}

function startPreview(env) {
  const p = spawn(process.execPath, [VITE_BIN, 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    cwd: ROOT, stdio: ['ignore', 'inherit', 'inherit'], env,
  });
  return p;
}

// Poll until the server returns 200 for the page (not just an open port).
async function waitForServer(url, timeoutMs = 60_000) {
  const until = Date.now() + timeoutMs;
  while (Date.now() < until) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (res.ok && (await res.text()).includes('<div id="app">')) return;
    } catch { /* not up yet */ }
    await sleep(500);
  }
  throw new Error(`server did not become available at ${url} within ${timeoutMs / 1000}s`);
}

// Let the page settle: fonts, intro choreography, in-view reveals, lazy images, transitions.
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);

  // Intro sequence finishes by adding .intro-done on <html>.
  await page.waitForFunction(() => document.documentElement.classList.contains('intro-done'), null, { timeout: 15_000 })
    .catch(() => warn('intro did not signal completion; continuing'));

  // Walk the page so IntersectionObserver reveals and lazy images fire, then return to top.
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.round(window.innerHeight * 0.5));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await pause(120);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await pause(400);
    window.scrollTo(0, 0);
  });

  // Every image finished (loaded or failed) — never hang on a slow remote image.
  const images = await page.evaluate(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => {
      img.addEventListener('load', r, { once: true });
      img.addEventListener('error', r, { once: true });
      setTimeout(r, 20_000);
    }))));
    return { total: imgs.length, broken: imgs.filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src) };
  });
  if (images.broken.length) warn(`${images.broken.length}/${images.total} image(s) did not load:\n  ${images.broken.join('\n  ')}`);

  await page.evaluate(() => document.fonts.ready);

  // Finite CSS animations/transitions done (infinite loops such as a marquee are ignored).
  await page.waitForFunction(() => document.getAnimations().every((a) =>
    a.playState !== 'running' || a.effect?.getComputedTiming().iterations === Infinity), null, { timeout: 15_000 })
    .catch(() => warn('some animations were still running; continuing'));

  // Scroll-linked motion eases toward rest over a few frames.
  await page.waitForTimeout(1500);
}

async function capture(url) {
  await mkdir(OUT_DIR, { recursive: true });
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;
  const browser = await chromium.launch({ executablePath });
  try {
    for (const { name, ...options } of VIEWPORTS) {
      const context = await browser.newContext(options);
      const page = await context.newPage();
      page.on('pageerror', (e) => warn(`[${name}] page error: ${e.message}`));
      log(`${name}: ${options.viewport.width}×${options.viewport.height} → ${url}`);
      const res = await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
      if (!res || !res.ok()) throw new Error(`page responded ${res?.status()} for ${url}`);
      await page.waitForSelector('#app main', { state: 'attached', timeout: 15_000 });
      await settle(page);
      const path = resolve(OUT_DIR, `${name}.png`);
      await page.screenshot({ path, fullPage: true, animations: 'disabled' });
      log(`saved ${path.replace(ROOT + '/', '')}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  if (process.env.VISUAL_REVIEW_URL) return capture(process.env.VISUAL_REVIEW_URL);

  const env = { ...process.env, BASE_PATH: BASE };
  if (!process.env.VISUAL_REVIEW_SKIP_BUILD) {
    log('building (production)…');
    await run(['build'], env);
  }
  const url = `http://${HOST}:${PORT}${BASE}`;
  log('starting vite preview…');
  const server = startPreview(env);
  const stop = () => { if (server.exitCode === null) server.kill('SIGTERM'); };
  process.on('exit', stop);
  try {
    await Promise.race([
      waitForServer(url),
      new Promise((_, fail) => server.on('exit', (c) => fail(new Error(`vite preview exited early (${c})`)))),
    ]);
    log(`server ready at ${url}`);
    await capture(url);
  } finally {
    stop();
  }
}

main().then(() => process.exit(0)).catch((err) => {
  console.error('[visual-review] failed:', err.message);
  process.exit(1);
});
