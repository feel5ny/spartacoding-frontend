import { fireEvent, render } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';

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
});
