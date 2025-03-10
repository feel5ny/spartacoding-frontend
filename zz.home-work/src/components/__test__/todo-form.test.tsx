/**
 *
 * !todo form
 * * 데이터 입력 후 버튼 클릭시 -> todo list에 아이템이 추가돼야 한다.
 * * 투두 입력값을 초기화할 수 있어야 한다.
 *
 */

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('TodoApp 통합 테스트', () => {
  // 성공
  it('유저가 투두 입력 필드에 텍스트를 입력하고 추가 버튼을 클릭하면, 리스트에 해당 투두가 추가된다.', () => {
    // Given
    const todo = '공부하기';
    const deadline = '2000-01-23';

    // When
    const { getByTestId, queryByText } = render(<App />);
    const todoContentInput = getByTestId('todo-content-input');
    const todoDateInput = getByTestId('todo-date-input');
    const addButton = getByTestId('add-todo-button');

    // todo form
    // form 이메일 작성된 것 처럼
    fireEvent.change(todoContentInput, { target: { value: todo } });
    fireEvent.change(todoDateInput, { target: { value: deadline } });
    fireEvent.click(addButton);

    // Then
    expect(queryByText('운동하기')).toBeInTheDocument();
    expect(queryByText('Deadline: 2021-01-22')).toBeInTheDocument();
  });

  // 예외
  it('유저가 투두 또는 데드라인 중 필요한 데이터를 모두 제공하지 않으면, 투두는 추가되지 않는다.', () => {
    // Given
    const todo = '운동하기';

    // When
    const { getByTestId, queryByText } = render(<App />);
    const todoContentInput = getByTestId('todo-content-input');
    const addButton = getByTestId('add-todo-button');

    // todo form
    fireEvent.change(todoContentInput, { target: { value: todo } });
    fireEvent.click(addButton);

    // Then
    expect(queryByText('운동하기')).not.toBeInTheDocument();
    expect(todoContentInput).toHaveValue('운동하기');
  });
});
