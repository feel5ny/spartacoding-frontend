import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useTodoValidation from '../hooks/useTodoValidation';

describe('useTodoValidation Hook Unit Test', () => {
  it('할 일이 100자를 넘거나 마감일이 오늘 이전이면 유효성 검사 실패', () => {
    // Given
    const task = 'a'.repeat(101); // 101자 초과
    const pastDeadline = new Date();
    pastDeadline.setDate(pastDeadline.getDate() - 1);
    const deadline = pastDeadline.toISOString().split('T')[0];

    const { result } = renderHook(() => useTodoValidation());
    const { validate } = result.current;

    // When
    const isValid = validate(task, deadline);

    // Then
    expect(isValid).toBe(false);
  });

  it('유효한 할 일과 마감일을 입력하면 유효성 검사 성공', () => {
    // Given
    const task = '할 일을 입력합니다.';
    const futureDeadline = new Date();
    futureDeadline.setDate(futureDeadline.getDate() + 1);
    const deadline = futureDeadline.toISOString().split('T')[0];

    const { result } = renderHook(() => useTodoValidation());
    const { validate } = result.current;

    // When
    const isValid = validate(task, deadline);

    // Then
    expect(isValid).toBe(true);
  });
});
