import { test, expect } from '@playwright/test';

test.describe('Todo List E2E Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('할 일을 추가하면 목록에 표시된다.', async ({ page }) => {
    // When: 사용자가 할 일과 마감일을 입력 후 추가 버튼 클릭
    await page.fill(
      '[placeholder="예: 운동하기, 공부하기"]',
      'Playwright 테스트 작성'
    );
    await page.fill('[id="deadline"]', '2025-12-31');
    await page.click('text=➕ 추가하기');

    // Then
    await expect(page.locator('ul')).toContainText('Playwright 테스트 작성');
  });

  test('할 일을 완료하면 취소선이 적용된다.', async ({ page }) => {
    // Given: 새 할 일을 추가
    await page.fill('[placeholder="예: 운동하기, 공부하기"]', '완료 테스트');
    await page.fill('[id="deadline"]', '2025-12-31');
    await page.click('text=➕ 추가하기');

    // When
    await page.click('input[type="checkbox"]');

    // Then
    const completedTask = page.locator('span.line-through');
    await expect(completedTask).toContainText('완료 테스트');
  });

  test('할 일을 입력하지 않으면 경고 메시지가 출력된다.', async ({ page }) => {
    // When
    await page.click('text=➕ 추가하기');

    // Then
    await expect(
      page.locator('text=⚠️ 입력된 할 일이 없거나 마감일이 오늘 이전입니다.')
    ).toBeVisible();
  });

  test('마감일이 오늘보다 이전이면 경고 메시지가 출력된다.', async ({
    page,
  }) => {
    // When
    await page.fill(
      '[placeholder="예: 운동하기, 공부하기"]',
      '과거 날짜 테스트'
    );
    await page.fill('[id="deadline"]', '2023-01-01');
    await page.click('text=➕ 추가하기');

    // Then
    await expect(
      page.locator('text=⚠️ 입력된 할 일이 없거나 마감일이 오늘 이전입니다.')
    ).toBeVisible();
  });
});
