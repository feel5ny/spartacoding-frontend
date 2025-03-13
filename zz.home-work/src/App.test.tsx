/**
 * todo-app
 * @userStory
 * * 유저는 할 일을 추가하고, 완료 상태를 변경하고, 삭제할 수 있다.
 *
 * * 0) 초기 렌더시 투두 리스트는 비어 있다.
 * * 1) 유저가 투두 입력 필드에 텍스트를 입력하고 데드라인을 선택한 뒤 추가 버튼을 클릭하면, 리스트에 해당 투두가 추가된다.
 * * 1-1) 유저가 투두 또는 데드라인 중 필요한 데이터를 모두 제공하지 않으면, 투두는 추가되지 않는다.
 * * 2) 유저가 투두를 추가한 후, 입력 필드는 초기화된다.
 * * 3) 유저가 투두의 완료 버튼을 클릭하면, 해당 투두의 상태가 토글된다 (완료 → 미완료, 미완료 → 완료).
 * * 4) 유저가 투두의 삭제 버튼을 클릭하면, 해당 투두가 리스트에서 제거된다.
 *
 * !순서
 * * 1) 최소한의 테스트케이스 작성 -> 실패
 * * 2) 실제 컴포넌트 구현 -> 성공
 * * 3) 리팩토링 -> 실패
 * * 4) 테스트케이스 수정 -> 성공
 *
 * !todo form
 * * 투두 데이터를 관리해야 한다.
 * * 투두 입력값을 업데이트할 수 있어야 한다.
 * * 투두 입력값을 초기화할 수 있어야 한다.
 *
 * !todo list
 * * 투두 리스트 데이터를 관리해야 한다.
 * * 투두를 추가할 수 있어야 한다.
 * * 투두의 완료 상태를 변경할 수 있어야 한다.
 * * 투두를 삭제할 수 있어야 한다.
 */

import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('TodoApp 통합 테스트', () => {
  it('초기 렌더링 시, 투두 리스트가 비어 있어야 한다.', () => {
    const {queryAllByTestId} = render(<App />);

    const todoItems = queryAllByTestId(/^todo-item-/);
    expect(todoItems.length).toBe(0);
  });

  // 성공
  it('유저가 투두 입력 필드에 텍스트를 입력하고 추가 버튼을 클릭하면, 리스트에 해당 투두가 추가된다.', () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';

    // When
    const { getByTestId, queryByText } = render(<App />)
    const todoInput = getByTestId('todo-input')
    const deadlineInput = getByTestId('deadline-input')
    const addButton = getByTestId('add-todo-button');

    // todo form
    // form 이메일 작성된 것 처럼
    fireEvent.change(todoInput, { target: { value: todo } })
    fireEvent.change(deadlineInput, { target: { value: deadline } })
    fireEvent.click(addButton)

    // Then
    expect(queryByText('운동하기')).toBeInTheDocument()
    expect(queryByText('Deadline: 2021-01-22')).toBeInTheDocument()
  });

  // 예외
  it('유저가 투두 또는 데드라인 중 필요한 데이터를 모두 제공하지 않으면, 투두는 추가되지 않는다.', () => {
    // Given
    const todo = '운동하기';

    // When
    const { getByTestId, queryByText } = render(<App />)
    const todoInput = getByTestId('todo-input')
    const addButton = getByTestId('add-todo-button');

    // todo form
    // form 이메일 작성된 것 처럼
    fireEvent.change(todoInput, { target: { value: todo } })
    fireEvent.click(addButton)

    // Then
    expect(queryByText('운동하기')).not.toBeInTheDocument()
    expect(todoInput).toHaveValue('운동하기')
  });

  // 성공
  it('유저가 투두를 추가한 후, 입력 필드는 초기화된다.', () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';

    // When
    const { getByTestId } = render(<App />)
    const todoInput = getByTestId('todo-input')
    const deadlineInput = getByTestId('deadline-input')
    const addButton = getByTestId('add-todo-button');

    // todo form
    // form 이메일 작성된 것 처럼
    fireEvent.change(todoInput, { target: { value: todo } })
    fireEvent.change(deadlineInput, { target: { value: deadline } })
    fireEvent.click(addButton)

    // Then
    expect(todoInput).toHaveValue('')
    expect(deadlineInput).toHaveValue('')
  });
  
  // 성공
  it('유저가 투두의 완료 버튼을 클릭하면, 해당 투두의 상태가 토글된다', async () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';
    const secondTodo = '빨래하기';
    const secondDeadline = '2021-01-23';

    // When
    // 투두 추가
    const { getByTestId, getAllByTestId } = render(<App />)
    const todoInput = getByTestId('todo-input')
    const deadlineInput = getByTestId('deadline-input')
    const addButton = getByTestId('add-todo-button');
    
    fireEvent.change(todoInput, { target: { value: todo } })
    fireEvent.change(deadlineInput, { target: { value: deadline } })
    fireEvent.click(addButton)
    await waitFor(() => {
      const todoItems = getAllByTestId(/^todo-item-/);
      expect(todoItems.length).toBe(1);
    })
    
    fireEvent.change(todoInput, { target: { value: secondTodo } })
    fireEvent.change(deadlineInput, { target: { value: secondDeadline } })
    fireEvent.click(addButton)
    await waitFor(() => {
      const todoItems = getAllByTestId(/^todo-item-/);
      expect(todoItems.length).toBe(2);
    })

    // 토글 버튼
    const toggleButtons = getAllByTestId(/^toggle-btn-/).map(item => item.querySelector('input[type="checkbox"]')) as Element[]

    // 첫번째 투두 체크박스 클릭
    fireEvent.click(toggleButtons[0]);

    // Then
    await waitFor(() => {
      const todoTexts = getAllByTestId(/^todo-text-/)
      expect(toggleButtons[0]).toBeChecked()
      expect(toggleButtons[1]).not.toBeChecked()

      expect(todoTexts[0]).toHaveStyle('text-decoration: line-through')
      expect(todoTexts[1]).toHaveStyle('text-decoration: none')
    });

    // 첫번째 투두 체크박스 재클릭
    fireEvent.click(toggleButtons[0]);

    // Then
    await waitFor(() => {
      const todoTexts = getAllByTestId(/^todo-text-/)
      expect(toggleButtons[0]).not.toBeChecked()
      expect(toggleButtons[1]).not.toBeChecked()

      expect(todoTexts[0]).toHaveStyle('text-decoration: none')
      expect(todoTexts[1]).toHaveStyle('text-decoration: none')
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
    const { getByTestId, getAllByTestId, queryByText } = render(<App />)
    const todoInput = getByTestId('todo-input')
    const deadlineInput = getByTestId('deadline-input')
    const addButton = getByTestId('add-todo-button');
    
    fireEvent.change(todoInput, { target: { value: todo } })
    fireEvent.change(deadlineInput, { target: { value: deadline } })
    fireEvent.click(addButton)
    
    fireEvent.change(todoInput, { target: { value: secondTodo } })
    fireEvent.change(deadlineInput, { target: { value: secondDeadline } })
    fireEvent.click(addButton)
    
    await waitFor(() => {
      const todoItems = getAllByTestId(/^todo-item-/);
      expect(todoItems.length).toBe(2);
    })

    // 삭제 버튼
    const deleteButtons = getAllByTestId(/^delete-btn-/)

    // 첫번째 투두 체크박스 클릭
    fireEvent.click(deleteButtons[0]);

    // Then
    await waitFor(() => {
      const todoItems = getAllByTestId(/^todo-item-/);
      expect(todoItems.length).toBe(1);
      expect(queryByText('운동하기')).not.toBeInTheDocument()
      expect(queryByText('Deadline: 2021-01-22')).not.toBeInTheDocument()
      expect(queryByText('빨래하기')).toBeInTheDocument()
      expect(queryByText('Deadline: 2021-01-23')).toBeInTheDocument()
    });
  });
});