import { cleanup, fireEvent, render } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';

const 할일입력 = () => {
  const AppRenderResult = render(<App />);
  const { getByTestId } = AppRenderResult;

  const todoTextInput = getByTestId('todo-form-text');
  fireEvent.change(todoTextInput, { target: { value: '할일 텍스트 문구' } });

  const todoDeadlineInput = getByTestId('todo-form-deadline');
  fireEvent.change(todoDeadlineInput, {
    target: { value: format(new Date(), 'yyyy-MM-dd') },
  });

  const todoFormButton = getByTestId('todo-form-button');
  fireEvent.click(todoFormButton);
  return AppRenderResult;
};
describe('TodoList 테스트', () => {
  afterEach(() => {
    cleanup();
  });

  it('비활성화된 체크박스를 클릭하면 취소선이 그어진다.', () => {
    // -------- Given --------
    // ? 입력된 데이터가 있어야하므로, 테스트 환경을 위해서 todo를 하나 입력합니다.
    const { getByTestId } = 할일입력();

    // -------- When --------
    // !목록의 item을 쿼리해야하므로 정규표현식으로 컴포넌트를 쿼리합니다.
    const todoItemCheckbox = getByTestId(/todo-item-checkbox/);
    const todoItemText = getByTestId(/todo-item-text/);

    // 비활성화된 체크박스를 클릭하면
    fireEvent.click(todoItemCheckbox);
    // 취소선이 그어진다.
    expect(todoItemText.style.textDecoration).toBe('line-through');
  });

  it('비활성화된 체크박스를 클릭하면 체크박스가 활성화된다.', () => {
    // -------- Given --------
    const { getByTestId } = 할일입력();

    // -------- When --------
    const todoItemCheckbox = getByTestId(/todo-item-checkbox/);

    // 비활성화된 체크박스를 클릭하면
    fireEvent.click(todoItemCheckbox);
    expect(todoItemCheckbox).toBeChecked();
  });

  it('활성화된 체크박스를 클릭하면 텍스트 스타일이 취소선이 비활성화된다.', () => {});

  it('활성화된 체크박스를 클릭하면 체크박스가 비활성화된다.', () => {});
});
