import { renderHook, act } from '@testing-library/react';
import { useTodoForm } from './use-todo-form';

describe('useTodoForm', () => {
  it('초기 상태는 빈 문자열이어야 한다', () => {
    // Given
    const { result } = renderHook(() => useTodoForm());

    expect(result.current.todo).toBe('');
    expect(result.current.deadline).toBe('');
  });

  it('updateTodo를 호출하면 todo 값이 변경되어야 한다', () => {
    // Given
    const { result } = renderHook(() => useTodoForm());
    const newTodo = '할 일 추가하기';

    // When
    act(() => {
      result.current.updateTodo(newTodo);
    });

    // Then
    expect(result.current.todo).toBe(newTodo);
  });

  it('updateTodo를 호출할 때 입력값이 100자 이상 작성되면 입력할 수 없다.', () => {
    // Given
    const { result } = renderHook(() => useTodoForm());
    const newTodo = 'a'.repeat(101);

    // When
    act(() => {
      result.current.updateTodo(newTodo);
    });

    // Then
    expect(result.current.todo).toBe('');

    // When
    act(() => {
      result.current.updateTodo('a'.repeat(100));
    });

    // Then
    expect(result.current.todo).toBe('a'.repeat(100));
  });

  it('updateDeadline을 호출하면 deadline 값이 변경되어야 한다', () => {
    // Given
    const { result } = renderHook(() => useTodoForm());
    const newDeadline = '2025-03-10';

    // When
    act(() => {
      result.current.updateDeadline(newDeadline);
    });

    // Then
    expect(result.current.deadline).toBe(newDeadline);
  });

  it('initForm을 호출하면 todo와 deadline이 초기화되어야 한다', () => {
    // Given
    const { result } = renderHook(() => useTodoForm());

    // When
    act(() => {
      result.current.updateTodo('테스트 작성');
      result.current.updateDeadline('2025-03-10');
    });

    expect(result.current.todo).toBe('테스트 작성');
    expect(result.current.deadline).toBe('2025-03-10');

    // When
    act(() => {
      result.current.initForm();
    });

    // Then
    expect(result.current.todo).toBe('');
    expect(result.current.deadline).toBe('');
  });
});
