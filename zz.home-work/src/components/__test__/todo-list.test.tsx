/**
 *  * !todo list
 * * 투두의 완료 상태를 변경할 수 있어야 한다.
 * * 투두를 삭제할 수 있어야 한다.
 */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('TodoApp 통합 테스트', () => {
  // 성공
  it('유저가 투두의 완료 버튼을 클릭하면, 해당 투두의 상태가 토글된다', async () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';

    const secondTodo = '빨래하기';
    const secondDeadline = '2021-01-23';

    // When
    const { getByTestId, getAllByTestId } = render(<App />);
    const todoInput = getByTestId('todo-content-input');
    const deadlineInput = getByTestId('todo-date-input');
    const addButton = getByTestId('add-todo-button');

    fireEvent.change(todoInput, { target: { value: todo } });
    fireEvent.change(deadlineInput, { target: { value: deadline } });
    fireEvent.click(addButton);
    await waitFor(() => {
      const todoItems = getAllByTestId('todo-item');
      expect(todoItems.length).toBe(1);
    });

    fireEvent.change(todoInput, { target: { value: secondTodo } });
    fireEvent.change(deadlineInput, { target: { value: secondDeadline } });
    fireEvent.click(addButton);
    await waitFor(() => {
      const todoItems = getAllByTestId('todo-item');
      expect(todoItems.length).toBe(2);
    });

    // 토글 버튼 클릭
    const toggleButtons = getAllByTestId('complete-button').map((item) =>
      item.querySelector('input[type="checkbox"]')
    ) as Element[];

    fireEvent.click(toggleButtons[0]);

    // Then
    await waitFor(() => {
      const todoTexts = getAllByTestId('todo-text');
      expect(toggleButtons[0]).toBeChecked();
      expect(toggleButtons[1]).not.toBeChecked();

      expect(todoTexts[0]).toHaveStyle('text-decoration: line-through');
      expect(todoTexts[1]).toHaveStyle('text-decoration: none');
    });
  });

  // 성공
  it('유저가 투두의 삭제 버튼을 클릭하면, 해당 투두가 리스트에서 제거된다.', async () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';
    const secondTodo = '빨래하기';
    const secondDeadline = '2021-01-23';

    // When
    // 투두 추가
    const { getByTestId, getAllByTestId, queryByText } = render(<App />);
    const todoInput = getByTestId('todo-input');
    const deadlineInput = getByTestId('deadline-input');
    const addButton = getByTestId('add-todo-button');

    fireEvent.change(todoInput, { target: { value: todo } });
    fireEvent.change(deadlineInput, { target: { value: deadline } });
    fireEvent.click(addButton);

    fireEvent.change(todoInput, { target: { value: secondTodo } });
    fireEvent.change(deadlineInput, { target: { value: secondDeadline } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const todoItems = getAllByTestId('todo-item');
      expect(todoItems.length).toBe(2);
    });

    // 삭제 버튼
    const deleteButtons = getAllByTestId('delete-btn');

    // 첫번째 투두 체크박스 클릭
    fireEvent.click(deleteButtons[0]);

    // Then
    await waitFor(() => {
      const todoItems = getAllByTestId('todo-item');
      expect(todoItems.length).toBe(1);
      expect(queryByText('운동하기')).not.toBeInTheDocument();
      expect(queryByText('Deadline: 2021-01-22')).not.toBeInTheDocument();
      expect(queryByText('빨래하기')).toBeInTheDocument();
      expect(queryByText('Deadline: 2021-01-23')).toBeInTheDocument();
    });
  });
});
