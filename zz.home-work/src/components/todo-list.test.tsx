import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from '../types/todo';
import { TodoList } from './todo-list';
import { vi } from 'vitest';

describe('TodoList', () => {
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

  it('할 일 목록이 정상적으로 렌더링 되는지 확인한다.', () => {
    // Given
    render(<TodoList todos={mockTodos} setTodos={vi.fn()} />);

    // Then
    expect(screen.getByText('할 일')).toBeInTheDocument();
    expect(screen.getByText('할 일2')).toBeInTheDocument();
    expect(screen.getByText('Deadline: 2025-03-10')).toBeInTheDocument();
    expect(screen.getByText('Deadline: 2025-03-11')).toBeInTheDocument();
  });

  it('할일 완료 토글 기능이 정상적으로 동작하는지 확인한다.', () => {
    // Given
    const setTodoMock = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodoMock} />);

    const firstCheckbox = screen.getAllByRole('checkbox')[0];

    // When
    fireEvent.click(firstCheckbox);

    // Then
    expect(setTodoMock).toHaveBeenCalledTimes(1);
  });

  it('할일 삭제 버튼이 정상적으로 동작하는지 확인한다.', () => {
    // Given
    const setTodoMock = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodoMock} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

    //When
    fireEvent.click(deleteButtons[0]);

    //Then
    expect(setTodoMock).toHaveBeenCalledTimes(1);
  });

  it('완료된 할 일에 취소선이 적용되는지 확인한다.', () => {
    // Given
    render(<TodoList todos={mockTodos} setTodos={vi.fn()} />);
    const todos = screen.getAllByTestId(/todo-id-/);

    // Then
    expect(todos[1]).toHaveStyle('text-decoration: line-through');
  });

  it('완료되지 않은 할 일에 취소선이 적용되지 않는지 확인한다.', () => {
    // Given
    render(<TodoList todos={mockTodos} setTodos={vi.fn()} />);
    const todos = screen.getAllByTestId(/todo-id-/);

    // Then
    expect(todos[0]).not.toHaveStyle('text-decoration: line-through');
  });
});
