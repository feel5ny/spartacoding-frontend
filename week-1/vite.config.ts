import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // ✅ React 컴포넌트 테스트용 설정
    include: ['**/__tests__/**/*.test.tsx', '**/__tests__/**/*.spec.tsx'], // ✅ 테스트 파일 경로 포함
    exclude: [...configDefaults.exclude, '**/node_modules/**', '**/dist/**'],
    setupFiles: './src/setupTests.ts', // ✅ 테스트 실행 전 실행할 파일 설정
  },
});
