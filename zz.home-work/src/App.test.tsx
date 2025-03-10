/**
 * 1. 유저 스토리 작성
 * 2. 테스트 코드 작성 (성공케이스, 실패케이스)
 * 3. 실제 함수 구현
 * 4. 테스트코드 수정
 * 5. 리팩토링
 */

import { render,fireEvent } from '@testing-library/react';
import App from './App';

describe("유저는 해야할 일, 날짜를 입력할 수 있다.", () => {
  it("해야할 일과 날짜를 모두 입력하면, 등록 버튼이 활성화된다.", () => {
    // Given
    const todo = "운동";
    const date = "2025-01-01";

    // When
    const {getByTestId} = render(<App />);
    const todoField = getByTestId("todo");
    const dateField = getByTestId("date");
    const addBtn = getByTestId("addBtn")

    fireEvent.change(todoField, {target: {value: todo}})
    fireEvent.change(dateField, {target: {value: date}})

    // Then
     expect(addBtn).toBeEnabled()
  })

  it ("해야할 일을 입력하지 않으면, 등록 버튼이 활성화되지 않는다.", () => {
    // Given
    const todo = "";
    const date = "2025-01-01";

    // When
    const {getByTestId} = render(<App />);
    const todoField = getByTestId("todo");
    const dateField = getByTestId("date");
    const addBtn = getByTestId("addBtn")

    fireEvent.change(todoField, {target: {value: todo}})
    fireEvent.change(dateField, {target: {value: date}})

    // Then
    expect(addBtn).toBeDisabled()
  })

  it ("날짜를 입력하지 않으면, 등록 버튼이 활성화되지 않는다.", () => {
    // Given
    const todo = "운동";
    const date = "";

    // When
    const {getByTestId} = render(<App />);
    const todoField = getByTestId("todo");
    const dateField = getByTestId("date");
    const addBtn = getByTestId("addBtn")

    fireEvent.change(todoField, {target: {value: todo}})
    fireEvent.change(dateField, {target: {value: date}})

    // Then
    expect(addBtn).toBeDisabled()
  })
})