import { fireEvent, render } from '@testing-library/react';
import { TodoForm } from './components/todo-form';
import { vi } from 'vitest';
import { format } from 'date-fns';
import { Todo } from './types/todo';

const 할일입력 = ({ text, date }: { text: string; date: string }) => {
  const todos: Todo[] = [];
  const setTodos = vi.fn();

  const AppRenderResult = render(<TodoForm todos={todos} setTodos={setTodos} />);
  const { getByTestId } = AppRenderResult;

  const todoTextInput = getByTestId('todo-form-text');
  fireEvent.change(todoTextInput, { target: { value: text } });

  const todoDeadlineInput = getByTestId('todo-form-deadline');
  fireEvent.change(todoDeadlineInput, {
    target: { value: date },
  });

  return AppRenderResult;
};

describe('TodoList 테스트', () => {
  test('할일을 입력할 때 100자 이상 작성하면 버튼을 클릭할 수 없다.', () => {
    // -------- Given --------
    // const maxLimitText = new Array(200).fill('a').join(' ');
    const maxLimitText = 'a'.repeat(101); // 101자로 변경

    // -------- When --------
    // 100자 이상 작성하면
    const { getByTestId } = 할일입력({
      text: maxLimitText,
      date: format(new Date(), 'yyyy-MM-dd'),
    });

    // -------- Then --------
    // 버튼을 클릭할 수 없다.
    const todoFormButton = getByTestId('todo-form-button');
    // ? 버튼의 disabled여부로 버튼 활성화 여부를 확인한다.
    expect(todoFormButton).toBeDisabled();
  });

  test('할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.', () => {
    // -------- Given --------
    // ! 테스트환경을 오늘날짜를 고정합니다.
    const date = new Date(2024, 11, 1); // 2024년 12월 1일
    vi.useFakeTimers();
    vi.setSystemTime(date);

    const mockDeadline = new Date(2024, 10, 30); // 2024년 11월 30일

    // -------- When --------
    // 데드라인 날짜가 오늘 날짜 미만이면
    const { getByTestId } = 할일입력({
      text: '테스트 데이터',
      date: format(mockDeadline, 'yyyy-MM-dd'),
    });

    // -------- Then --------
    // 버튼을 클릭할 수 없다.
    const todoFormButton = getByTestId('todo-form-button');
    // ? 버튼의 disabled여부로 버튼 활성화 여부를 확인한다.
    expect(todoFormButton).toBeDisabled();
  });

  test('올바른 할일과 데드라인을 입력하면 버튼이 활성화된다.', () => {
    // -------- Given --------
    const today = new Date();
    const validDeadline = new Date();
    validDeadline.setDate(today.getDate() + 1); // 내일 날짜

    // -------- When --------
    const { getByTestId } = 할일입력({
      text: '올바른 할일',
      date: format(validDeadline, 'yyyy-MM-dd'),
    });

    // -------- Then --------
    const todoFormButton = getByTestId('todo-form-button');
    expect(todoFormButton).not.toBeDisabled();
  });
});