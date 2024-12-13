import { useTodoForm } from './use-todo-form';
import { renderHook, act } from '@testing-library/react';

describe('useTodoForm 테스트', () => {
  it('할일 텍스트 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateTodo('테스트코드 공부하기');
    });

    expect(result.current.todo).toBe('테스트코드 공부하기');
  });
  it('할일 데드라인 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateDeadline('2024-12-31');
    });

    expect(result.current.deadline).toBe('2024-12-31');
  });
  it('할일을 초기화하면, 상태값은 모두 초기값으로 변경된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateTodo('할 일');
      result.current.updateDeadline('2024-12-31');
    });

    act(() => {
      result.current.initForm();
    });

    expect(result.current.todo).toBe('');
    expect(result.current.deadline).toBe('');
  });
});
