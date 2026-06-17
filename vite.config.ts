/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

module.exports = defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/vitest-setup.ts'],
  },
  resolve: {
    // Keep RHF context shared in Vitest: force ee-ads-rhf to ESM and dedupe
    // react-hook-form so controls and FormProvider use the same module instance
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@@', replacement: path.resolve(__dirname) },
      {
        find: '@amsterdam/ee-ads-rhf',
        replacement: path.resolve(
          __dirname,
          'node_modules/@amsterdam/ee-ads-rhf/dist/index.esm.js'
        ),
      },
    ],
    dedupe: ['react-hook-form'],
  },
});
