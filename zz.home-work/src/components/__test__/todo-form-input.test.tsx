/**
 * * 할일을 입력할 때 100자 이상 작성하면 입력할 수 없다.
 * * 할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.
 */

import { fireEvent, render } from '@testing-library/react';
import { format } from 'date-fns/format';
import App from '../../App';

describe('todo form 입력값 테스트', () => {
  it('할일을 입력할 때 100자 이상 작성하면 입력할 수 없다.', () => {
    // Given
    const input120Text = new Array(120).fill('a').join('');

    // When
    const { getByTestId } = render(<App />);

    const todoTextInput = getByTestId('todo-form-text');
    fireEvent.change(todoTextInput, {target: {value: input120Text}});
    // change(todoTextInput, { target: { value: input120Text } });

    const todoDeadlineInput = getByTestId('todo-form-deadline');
    fireEvent.change(todoDeadlineInput, {
      target: { value: format(new Date(), 'yyyy-MM-dd') },
    });

    // Then
    const todoFormButton = getByTestId('todo-submit-btn');
    // ? 버튼의 disabled여부로 버튼 활성화 여부를 확인한다.
    expect(todoFormButton).toBeDisabled();
  });

  it('할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.', () => {
    // Given
    // When
    // Then
  });
});
