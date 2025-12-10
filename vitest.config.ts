/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['packages/tree-table/src/**/*.{ts,tsx}'],
      exclude: [
        'packages/tree-table/src/**/*.stories.{ts,tsx}',
        'packages/tree-table/src/**/*.test.{ts,tsx}',
        'packages/tree-table/src/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@kfb/tree-table': resolve(__dirname, 'packages/tree-table/src'),
    },
  },
});
