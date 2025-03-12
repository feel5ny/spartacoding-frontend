import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/__tests__/*.test.tsx',
      '**/__tests__/**/*.test.tsx',
      '**/__tests__/**/*.spec.tsx',
    ],
    exclude: [...configDefaults.exclude, '**/node_modules/**', '**/dist/**'],
    setupFiles: './src/setupTests.ts',
});
