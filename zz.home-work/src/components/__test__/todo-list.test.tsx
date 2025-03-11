/**
 * @userStory
 * * TODO 체크박스를 클릭하면 체크박스가 활성화되고, 텍스트 스타일이 취소선이 그어진다.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { TodoList } from '../todo-list';
import { updateToggle } from '../../controllers/todo';

// updateToggle 모킹
vi.mock('../../controllers/todo', () => ({
  updateToggle: vi.fn((todos, id) => {
    return todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }),
  deleteTodo: vi.fn((todos, id) => todos.filter((todo) => todo.id !== id)),
}));

const mockTodos = [
  { id: 1, text: '할일 1', completed: false, deadline: '2025-03-10' },
  { id: 2, text: '할일 2', completed: true, deadline: '2025-03-11' },
];

describe('Todo List 컴포넌트 테스트', () => {
  it('Todo List 컴포넌트가 렌더링 되어야 한다.', () => {
    // GIVEN
    const setTodos = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    const todoList = screen.getByTestId('todo-list');

    // THEN
    expect(todoList).toBeInTheDocument();
    expect(todoList.children.length).toBe(2);
  });

  it('비활성화된 체크박스를 클릭하면 취소선이 그어진다.', async () => {
    // GIVEN
    const setTodos = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    const checkbox = screen.getByTestId('todo-item-checkbox-1');
    const text = screen.getByTestId('todo-item-text-1');

    // WHEN
    fireEvent.click(checkbox);

    // THEN
    expect(updateToggle).toHaveBeenCalledWith(mockTodos, 1);
  });

  it('비활성화된 체크박스를 클릭하면 체크박스가 활성화된다.', () => {
    // GIVEN
    const setTodos = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);
    const checkbox = screen.getByTestId('todo-item-checkbox-1');

    // WHEN
    fireEvent.click(checkbox);
    const updatedTodos = updateToggle(mockTodos, 1);

    // THEN
    expect(setTodos).toHaveBeenCalledTimes(1);
    expect(updatedTodos[0].completed).toBe(true);
  });

  it('활성화된 체크박스를 클릭하면 텍스트 스타일이 취소선이 비활성화된다.', () => {
    // GIVEN
    const setTodos = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    const checkbox = screen.getByTestId('todo-item-checkbox-2');

    // WHEN
    fireEvent.click(checkbox);

    // THEN
    expect(setTodos).toHaveBeenCalledTimes(1);
    expect(updateToggle).toHaveBeenCalledWith(mockTodos, 2);
  });

  it('활성화된 체크박스를 클릭하면 체크박스가 비활성화된다.', () => {
    // GIVEN
    const setTodos = vi.fn();
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    const checkbox = screen.getByTestId('todo-item-checkbox-2');

    // WHEN
    fireEvent.click(checkbox);
    const updatedTodos = updateToggle(mockTodos, 2);

    // THEN
    expect(setTodos).toHaveBeenCalledTimes(1);
    expect(updatedTodos[1].completed).toBe(false);
  });
});
