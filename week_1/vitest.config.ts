import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.spec.tsx', '**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
  },
});
