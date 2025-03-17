import { renderHook } from '@testing-library/react';
import { subDays } from 'date-fns';
import { useTodoForm } from '../use-todo-form';
describe('useTodoForm 테스트', () => {
  it('validateCredential - 할일을 입력할 때 100자 이상 작성하면 입력할 수 없고, 마감일이 오늘 이전이면 실패하는 함수 테스트', () => {
    // Given
    const todo = 'a'.repeat(101);
    const deadline = subDays(new Date(), 1).toISOString();

    const { result } = renderHook(useTodoForm);

    // When
    const isValid = result.current.validateCredential({
      todo,
      deadline,
    });

    // Then
    expect(isValid).toBe(false);
  });
});
