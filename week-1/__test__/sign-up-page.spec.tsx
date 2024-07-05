import { test, expect } from '@playwright/test';

test.describe('회원가입 페이지 접근 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // Given
    await page.goto('http://localhost:5173');
  });

  // Then
  test('"회원가입" 타이틀이 노출된다.', async ({ page }) => {
    await expect(page.getByText('회원가입')).toBeVisible();
  });
  test('이메일 form이 노출된다.', async ({ page }) => {
    await expect(page.getByTestId('email')).toBeVisible();
  });
  test('비밀번호 form이 노출된다.', async ({ page }) => {
    await expect(page.getByTestId('password')).toBeVisible();
  });
});

test.describe('이메일을 입력 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // Given
    await page.goto('http://localhost:5173');
  });

  test('이메일 형식에 맞으면, 제출버튼 클릭시 에러메시지가 노출되지 않는다.', async ({
    page,
  }) => {
    // When
    await page.getByTestId('email').fill('nayoung.kim@rainist.com');
    await page.getByTestId('submit-button').click();

    // Then
    await expect(page.getByText('이메일 형식이 아닙니다.')).not.toBeVisible();
  });
  test('이메일 형식에 맞지 않으면, 제출버튼 클릭시 에러메시지가 노출된다.', async ({
    page,
  }) => {
    // When
    await page.getByTestId('email').fill('nayoung.kim');
    await page.getByTestId('submit-button').click();

    // Then
    await expect(page.getByText('이메일 형식이 아닙니다.')).toBeVisible();
  });
});

test.describe('이메일과 비밀번호 형식에 모두 맞을 경우, 제출 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // Given
    await page.goto('http://localhost:5173');
  });

  test('제출버튼 클릭시, 로더가 노출된다.', async ({ page }) => {
    await page.getByTestId('email').fill('nayoung.kim@rainist.com');
    await page.getByTestId('password').fill('1234asdf!@#');
    await page.getByTestId('submit-button').click();
    // Then
    await expect(page.getByTestId('loader')).toBeVisible();
  });

  test('제출 후 api 통신이 성공하면, 로더는 비노출되고, 완료 컴포넌트가 노출된다.', async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes('https://mkyztftbppnxpyjpkrgk.supabase.co')
    );
    // When
    await page.getByTestId('email').fill('nayoung.kim@rainist.com');
    await page.getByTestId('password').fill('1234asdf!@#');
    await page.getByTestId('submit-button').click();
    const response = await responsePromise;
    // Then
    expect(response.ok()).toBeTruthy();

    await expect(page.getByTestId('loader')).not.toBeVisible();
    await expect(page.getByText('완료!👍')).toBeVisible();
  });
});
