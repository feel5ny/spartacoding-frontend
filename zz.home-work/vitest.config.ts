import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // 전역 테스트 환경 활성화
    environment: 'jsdom', // DOM 환경에서 테스트 실행
    setupFiles: './src/setupTests.ts', // 테스트 환경 설정 파일
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'], // 테스트 파일 확장자 지정
  },
});
