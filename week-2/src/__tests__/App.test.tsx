import { describe, it, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('할 일은 100자 안에, 마감일은 오늘 이전 날짜로 입력하여 새 할 일을 추가한다.', () => {
  it('할 일이 100자를 넘으면 추가 버튼 비활성화', () => {
    // Given
    const { getByTestId } = render(<App />);
    const inputText = getByTestId('task-input');
    const inputDate = getByTestId('task-date');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(inputText, { target: { value: 'a'.repeat(101) } });
    fireEvent.change(inputDate, { target: { value: '2026-03-31' } });

    // Then
    expect(submitButton).toBeDisabled();
  });

  it('마감일이 오늘 날짜 이전이면 추가 버튼 비활성화', () => {
    // Given
    const { getByTestId } = render(<App />);
    const inputText = getByTestId('task-input');
    const inputDate = getByTestId('task-date');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(inputText, { target: { value: 'test' } });
    fireEvent.change(inputDate, { target: { value: '2021-12-31' } });

    // Then
    expect(submitButton).toBeDisabled();
  });

  it('할 일과 마감일이 조건에 부합하면 버튼 활성화', () => {
    // Given
    const { getByTestId } = render(<App />);
    const inputText = getByTestId('task-input');
    const inputDate = getByTestId('task-date');
    const submitButton = getByTestId('submit-button');

    fireEvent.change(inputText, { target: { value: 'test' } });
    fireEvent.change(inputDate, { target: { value: '2026-12-31' } });

    // Then
    expect(submitButton).not.toBeDisabled();
  });
});
