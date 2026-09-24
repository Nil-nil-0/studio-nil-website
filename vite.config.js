import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → standard static build in /dist (for deploy)
// `npm run build:single` → one self-contained HTML in /preview (double-click to open, no server)
//
// GitHub Pages serves this repository at /studio-nil-website/, so production
// builds use that base. `npm run dev` stays at '/'. BASE_PATH can override it.
const PAGES_BASE = '/studio-nil-website/';

export default defineConfig(({ command, mode }) =>
  mode === 'single'
    ? { plugins: [viteSingleFile()], build: { outDir: 'preview', emptyOutDir: true } }
    : { base: process.env.BASE_PATH || (command === 'build' ? PAGES_BASE : '/') }
);
