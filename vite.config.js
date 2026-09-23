import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`        → standard static build in /dist (for deploy)
// `npm run build:single` → one self-contained HTML in /preview (double-click to open, no server)
export default defineConfig(({ mode }) =>
  mode === 'single'
    ? { plugins: [viteSingleFile()], build: { outDir: 'preview', emptyOutDir: true } }
    : {}
);
