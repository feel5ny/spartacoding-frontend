import { describe, test } from "vitest"
import { render, fireEvent } from "@testing-library/react";
import App from "./App.tsx";

describe('Todo Input의 글자 수는 100자 미만이어야 한다', () => {
  const isTodoValid = (text: string) => text.length < 100;

  test('99자 일 때 테스트 해보기', () => {
    expect(isTodoValid("1".repeat(99))).toEqual(true)
  });

  test('100자 일 때 테스트 해보기', () => {
    expect(isTodoValid("1".repeat(100))).toEqual(false)
  });

  test('테스트 데이터 입력', () => {
    expect(isTodoValid("TEST TODO LIST")).toEqual(true);
  });
});

describe("fire event test ", () => {

    const todoVal = "테스트 코드 작성하기";
    const dateVal = "2025-03-05";

  test("Todo Field 값만 입력되었을 때, 버튼이 비활성화 (날짜값도 포함되어야 함)", () => {
    const { getByTestId } = render(<App />);
    const todoInputValue = getByTestId("todo");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputValue, {target: {value: todoVal}})
    expect(todoButton).toBeDisabled()
  })

  test("모든 값이 입력되었을 때 버튼 활성화", () => {
    const { getByTestId } = render(<App />);
    const todoInputValue = getByTestId("todo");
    const dateInputValue = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputValue, {target: {value: todoVal}})
    fireEvent.change(dateInputValue, {target: {value: dateVal}})
    expect(todoButton).toBeEnabled()
  })
})

