import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoInput from '../../components/TodoInput';

/**
 * @userStory
 *
 * 1. 할 일을 입력한다.
 * 2. 마감일을 입력한다.
 * 3. 문제가 없다면 할 일 목록에 추가하고, 문제가 있다면 경고 텍스트를 노출한다.
 *
 */

// 통합 테스트
describe('Todo List Integration Test', () => {
  // 성공 케이스
  it('문제가 없다면 할 일 목록에 등록된다.', () => {
    // Given
    const sampleTodos: {
      id: number;
      text: string;
      deadline: string;
      completed: boolean;
    }[] = [];

    const addTodo = (task: string, deadline: string) => {
      sampleTodos.push({
        id: Date.now(),
        text: task,
        deadline,
        completed: false,
      });
    };

    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <TodoInput onAddTodo={addTodo} />
    );

    const taskInput = getByPlaceholderText('예: 운동하기, 공부하기');
    const deadlineInput = getByLabelText('마감일');
    const addButton = getByText('➕ 추가하기');

    // When
    fireEvent.change(taskInput, { target: { value: '테스트 할 일' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-12-31' } });
    fireEvent.click(addButton);

    // Then
    expect(sampleTodos.length).toBe(1);
    expect(sampleTodos[0].text).toBe('테스트 할 일');
    expect(sampleTodos[0].deadline).toBe('2025-12-31');
    expect(sampleTodos[0].completed).toBe(false);
  });

  // 실패 케이스 1: 할 일 입력이 비어 있을 때
  it('할 일 입력이 비어 있으면 경고 메시지를 출력한다.', () => {
    // Given
    const { getByText } = render(<TodoInput onAddTodo={() => {}} />);
    const addButton = getByText('➕ 추가하기');

    // When (입력 없이 추가 버튼 클릭)
    fireEvent.click(addButton);

    // Then
    expect(
      screen.getByText('⚠️ 입력된 할 일이 없거나 마감일이 오늘 이전입니다.')
    ).toBeInTheDocument();
  });

  // 실패 케이스 2: 마감일이 오늘보다 이전일 때
  it('마감일이 오늘보다 이전이면 경고 메시지를 출력한다.', () => {
    // Given
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <TodoInput onAddTodo={() => {}} />
    );

    const taskInput = getByPlaceholderText('예: 운동하기, 공부하기');
    const deadlineInput = getByLabelText('마감일');
    const addButton = getByText('➕ 추가하기');

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().split('T')[0];

    // When (과거 날짜 입력 후 추가 버튼 클릭)
    fireEvent.change(taskInput, { target: { value: '과거 할 일' } });
    fireEvent.change(deadlineInput, { target: { value: pastDateString } });
    fireEvent.click(addButton);

    // Then (경고 메시지 확인)
    expect(
      screen.getByText('⚠️ 입력된 할 일이 없거나 마감일이 오늘 이전입니다.')
    ).toBeInTheDocument();
  });
});
