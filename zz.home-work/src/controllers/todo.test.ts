import { expect } from 'vitest';
import { deleteTodo, updateToggle } from './todo';
import { Todo } from '../types/todo';

describe('Todo Controller', () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      text: '할 일',
      deadline: '2025-03-10',
      completed: false,
    },
    {
      id: 2,
      text: '할 일2',
      deadline: '2025-03-11',
      completed: true,
    },
  ];
  it('할 일의 완료 상태를 토글할 수 있다', () => {
    // Given
    const todoId = 1;

    // When
    const updatedTodos = updateToggle(mockTodos, todoId);

    // Then
    expect(updatedTodos[0].completed).toBe(true);
    expect(updatedTodos[1].completed).toBe(true);
  });

  it('할 일을 삭제할 수 있다.', () => {
    // Given
    const todoId = 1;

    // When
    const updatedTodos = deleteTodo(mockTodos, todoId);

    // Then
    expect(updatedTodos).toHaveLength(1);
    expect(updatedTodos[0].id).toBe(2);
  });

  it('목록에 없는 ID를 삭제하면 기존 목록이 변경되지 않아야 한다.', () => {
    // Given
    const todoId = 3;

    // When
    const updatedTodos = deleteTodo(mockTodos, todoId);

    // Then
    expect(updatedTodos).toHaveLength(2);
  });
});
