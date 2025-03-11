import { renderHook } from '@testing-library/react';
import { useTodoForm } from '../use-todo-form';
import { act } from 'react';

describe('useTodoForm 테스트', () => {
  it('할일 텍스트 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
    // GIVEN
    const { result } = renderHook(() => useTodoForm());

    // WHEN
    act(() => {
      result.current.updateTodo('할일 1');
    });

    // THEN
    expect(result.current.todo).toBe('할일 1');
  });
  it('할일 데드라인 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
    // GIVEN
    const { result } = renderHook(() => useTodoForm());

    // WHEN
    act(() => {
      result.current.updateDeadline('2025-03-10');
    });

    // THEN
    expect(result.current.deadline).toBe('2025-03-10');
  });
  it('할일을 초기화하면, 상태값은 모두 초기값으로 변경된다.', () => {
    // GIVEN
    const { result } = renderHook(() => useTodoForm());

    // WHEN
    act(() => {
      result.current.updateTodo('할일 1');
      result.current.updateDeadline('2025-03-10');
      result.current.initForm();
    });

    // THEN
    expect(result.current.todo).toBe('');
    expect(result.current.deadline).toBe('');
  });
});
