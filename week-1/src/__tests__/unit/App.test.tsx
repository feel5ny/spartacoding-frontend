import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { validateResult } from '../../utils/utils';

// 단위 테스트
describe('validateInput', () => {
  it('할 일이 있고 마감일이 오늘 이후인 경우', () => {
    const task = 'test';
    const deadline = '2025-12-31';
    const result = validateResult(task, deadline);

    expect(result).toEqual(true);
  });

  it('할 일이 없는 경우', () => {
    const task = '';
    const deadline = '2025-12-31';
    const result = validateResult(task, deadline);

    expect(result).toEqual(false);
  });

  it('마감일이 오늘 이전인 경우', () => {
    const task = 'test';
    const deadline = '2021-12-31';
    const result = validateResult(task, deadline);

    expect(result).toEqual(false);
  });
});
