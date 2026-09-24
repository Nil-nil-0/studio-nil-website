import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → standard static build in /dist (for deploy)
// `npm run build:single` → one self-contained HTML in /preview (double-click to open, no server)
//
// BASE_PATH sets the public sub-path. GitHub Pages serves this repository at
// /studio-nil-website/, so the Pages workflow builds with BASE_PATH=/studio-nil-website/.
// Locally it stays '/'.
export default defineConfig(({ mode }) =>
  mode === 'single'
    ? { plugins: [viteSingleFile()], build: { outDir: 'preview', emptyOutDir: true } }
    : { base: process.env.BASE_PATH || '/' }
);
