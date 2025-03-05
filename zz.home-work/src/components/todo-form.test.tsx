import { fireEvent, render, screen } from '@testing-library/react';
import { TodoForm } from './todo-form';
import { describe, it, expect, vi } from 'vitest';

describe('TodoForm', () => {
  it('입력 필드와 버튼이 정상적으로 렌더링 되는지 확인한다.', () => {
    // Given
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    // When
    // Then
    expect(screen.getByLabelText(/New Todo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Todo/i })
    ).toBeInTheDocument();
  });

  it('사용자가 입력 필드에 텍스트를 입력하면 상태가 변경되는지 확인한다.', () => {
    // Given
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const todoInput = screen.getByLabelText(/New Todo/i) as HTMLInputElement;
    const deadlineInput = screen.getByLabelText(
      /Deadline/i
    ) as HTMLInputElement;

    // When
    fireEvent.change(todoInput, { target: { value: '할 일' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-03-10' } });

    // Then
    expect(todoInput.value).toBe('할 일');
    expect(deadlineInput.value).toBe('2025-03-10');
  });

  it('버튼 클릭시 setTodos가 호출되고 입력값이 초기화되어야 한다.', () => {
    // Given
    const setTodoMock = vi.fn();
    render(<TodoForm todos={[]} setTodos={setTodoMock} />);

    const todoInput = screen.getByLabelText(/New Todo/i) as HTMLInputElement;
    const deadlineInput = screen.getByLabelText(
      /Deadline/i
    ) as HTMLInputElement;
    const addButton = screen.getByRole('button', {
      name: /Add Todo/i,
    });

    fireEvent.change(todoInput, { target: { value: '할 일' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-03-10' } });

    // When
    fireEvent.click(addButton);

    // Then
    expect(setTodoMock).toHaveBeenCalledTimes(1);
    expect(setTodoMock).toHaveBeenCalledWith([
      {
        id: expect.any(Number),
        text: '할 일',
        completed: false,
        deadline: '2025-03-10',
      },
    ]);
    expect(todoInput.value).toBe('');
    expect(deadlineInput.value).toBe('');
  });

  it('할 일 또는 마감일이 비어있으면 버튼이 비활성화 되어야 한다.', () => {
    // Given
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const addButton = screen.getByRole('button', { name: /Add Todo/i });
    // When
    // Then
    expect(addButton).toBeDisabled();
  });

  it('입력 후에도 한쪽 값이 비어 있으면 버튼이 비활성화 상태를 유지해야 한다.', () => {
    // Given
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const todoInput = screen.getByLabelText(/New Todo/i) as HTMLInputElement;
    const deadlineInput = screen.getByLabelText(
      /Deadline/i
    ) as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    // When
    fireEvent.change(todoInput, { target: { value: '할 일' } });

    // Then
    expect(addButton).toBeDisabled();

    // When
    fireEvent.change(todoInput, { target: { value: '' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-03-10' } });

    // Then
    expect(addButton).toBeDisabled();
  });
});
