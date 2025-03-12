import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e', // 테스트 디렉토리 지정
  timeout: 30000, // 각 테스트에 대한 타임아웃 (기본 30초)
  expect: {
    timeout: 5000, // `expect` 함수의 타임아웃
  },
  reporter: 'html', // 테스트 리포트 형식 (html 리포트 가능)
  use: {
    headless: false, // true면 UI 없이 실행 (headless 모드), false면 UI 브라우저 실행됨
    viewport: { width: 1280, height: 720 }, // 브라우저 크기 설정
    actionTimeout: 5000, // 액션 타임아웃
    trace: 'on-first-retry', // 실패 시 실행 추적 저장
  },
});
