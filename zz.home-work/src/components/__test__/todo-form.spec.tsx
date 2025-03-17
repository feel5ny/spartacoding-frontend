import { act, fireEvent, render, screen } from '@testing-library/react';
import { TodoForm } from '../todo-form';
import { vi } from 'vitest';
import { subDays } from 'date-fns';

/**
 * !입력 테스트
 * * 할일을 입력할 때 100자 이상 작성하면 입력할 수 없다.
 * * 할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.
 */

describe('TodoForm 테스트', () => {
  beforeEach(() => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);
  });

  it('할일을 입력할 때 100자 이상 작성하면 입력할 수 없다.', () => {
    // Given
    const todo = 'a'.repeat(101);
    const deadline = new Date().toISOString();

    const todoInput = screen.getByTestId('todo-input');
    const deadlineInput = screen.getByTestId('deadline-input');
    const addButton = screen.getByRole('button', { name: 'Add Todo' });

    // When
    act(() => {
      fireEvent.change(todoInput, { target: { value: todo } });
      fireEvent.change(deadlineInput, { target: { value: deadline } });
    });

    // Then
    expect(addButton).toBeDisabled();
  });

  it('할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.', () => {
    // Given
    const todo = 'a'.repeat(10);
    const deadline = subDays(new Date(), 1).toISOString();

    const todoInput = screen.getByTestId('todo-input');
    const deadlineInput = screen.getByTestId('deadline-input');
    const addButton = screen.getByRole('button', { name: 'Add Todo' });

    // When
    act(() => {
      fireEvent.change(todoInput, { target: { value: todo } });
      fireEvent.change(deadlineInput, { target: { value: deadline } });
    });

    // Then
    expect(addButton).toBeDisabled();
  });
});
