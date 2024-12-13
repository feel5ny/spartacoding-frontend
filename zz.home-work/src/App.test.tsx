import { fireEvent, render } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';
import { vi } from 'vitest';

const 할일입력 = ({ text, date }: { text: string; date: string }) => {
  const AppRenderResult = render(<App />);
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
    const maxLimitText = new Array(200).fill('a').join(' ');

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
    const date = new Date(2024, 12, 1);

    vi.useFakeTimers();
    vi.setSystemTime(date);

    const mockDeadline = new Date(2024, 11, 1);

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
});
