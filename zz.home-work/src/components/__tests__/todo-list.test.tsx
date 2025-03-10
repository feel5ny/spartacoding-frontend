import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../todo-list';
import { describe, it, expect, vi } from 'vitest';
import { Todo } from '../../types/todo';

describe('TodoList', () => {
  const mockSetTodos = vi.fn();
  const mockTodos: Todo[] = [
    {
      id: 1,
      text: '리액트 공부하기',
      completed: false,
      deadline: '2024-12-31'
    },
    {
      id: 2,
      text: '테스트 코드 작성하기',
      completed: true,
      deadline: '2024-12-31'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('할 일 목록이 올바르게 렌더링된다', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
    
    expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
    expect(screen.getByText('테스트 코드 작성하기')).toBeInTheDocument();
  });

  it('체크박스를 클릭하면 완료 상태가 토글된다', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockSetTodos).toHaveBeenCalledWith([
      { ...mockTodos[0], completed: true },
      mockTodos[1]
    ]);
  });

  it('삭제 버튼을 클릭하면 할 일이 삭제된다', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
    
    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockSetTodos).toHaveBeenCalledWith([mockTodos[1]]);
  });

  it('완료된 할 일은 취소선이 표시된다', () => {
    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
    
    const completedTodoText = screen.getByText('테스트 코드 작성하기').closest('div');
    expect(completedTodoText).toHaveStyle('text-decoration: line-through');
  });

  it('할 일 목록이 비어 있어도 오류 없이 렌더링된다', () => {
    render(<TodoList todos={[]} setTodos={mockSetTodos} />);
    
    expect(screen.queryByText('리액트 공부하기')).not.toBeInTheDocument();
    expect(screen.queryByText('테스트 코드 작성하기')).not.toBeInTheDocument();
  });

});
