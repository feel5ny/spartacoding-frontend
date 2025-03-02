import { render, screen, fireEvent } from '@testing-library/react';
import { TodoForm } from '../todo-form';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TodoForm', () => {
  let mockSetTodos: ReturnType<typeof vi.fn>;
  let todoInput: HTMLElement;
  let dateInput: HTMLElement;
  let addButton: HTMLElement;

  beforeEach(() => {
    mockSetTodos = vi.fn();
    render(<TodoForm todos={[]} setTodos={mockSetTodos} />);

    todoInput = screen.getByLabelText('New Todo');
    dateInput = screen.getByLabelText('Deadline');
    addButton = screen.getByRole('button', { name: 'Add Todo' });

    vi.clearAllMocks();
  });

  it('초기 상태에서는 추가 버튼이 비활성화된다', () => {
    expect(addButton).toBeDisabled();
  });

  it('할 일과 날짜를 입력하면 추가 버튼이 활성화된다', () => {
    fireEvent.change(todoInput, { target: { value: '새로운 할 일' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

    expect(addButton).toBeEnabled();
  });

  it('할 일을 추가하면 입력 필드가 초기화된다', () => {
    fireEvent.change(todoInput, { target: { value: '새로운 할 일' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
    fireEvent.click(addButton);

    expect(todoInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });

  it('할 일이 추가되면 setTodos가 호출되고 올바른 값이 전달된다', () => {
    fireEvent.change(todoInput, { target: { value: '새로운 할 일' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
    fireEvent.click(addButton);

    expect(mockSetTodos).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          text: '새로운 할 일',
          deadline: '2024-12-31',
          completed: false,
        }),
      ])
    );
  });

  it('할 일을 입력하지 않으면 setTodos가 호출되지 않는다', () => {
    fireEvent.click(addButton);
    expect(mockSetTodos).not.toHaveBeenCalled();
  });
});
