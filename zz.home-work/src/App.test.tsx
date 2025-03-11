import { fireEvent, render } from "@testing-library/react";
import App from "./App.tsx";

describe('할일을 입력할 때 100자 이상 작성하면 입력할 수 없다. / 입력된 날짜가 이전 날짜일 때 입력할 수 없다', () => {
  test('99자 일 때 버튼은 활성화된다.', () => {
    const { getByTestId } = render(<App />);
    const todoInputText = getByTestId("todo");
    const todoInputDate = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputText, { target: { value: "a".repeat(99) } });
    fireEvent.change(todoInputDate, { target: { value: "2025-12-31" } });

    expect(todoButton).not.toBeDisabled(); // 99자 일 때 버튼 활성화
  });

  test('100자 일 때 버튼은 활성화된다.', () => {
    const { getByTestId } = render(<App />);
    const todoInputText = getByTestId("todo");
    const todoInputDate = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputText, { target: { value: "b".repeat(100) } });
    fireEvent.change(todoInputDate, { target: { value: "2025-12-31" } });

    expect(todoButton).not.toBeDisabled(); // 100자 일 때 버튼 활성화
  });

  test('101자 일 때 버튼은 비활성화된다.', () => {
    const { getByTestId } = render(<App />);
    const todoInputText = getByTestId("todo");
    const todoInputDate = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputText, { target: { value: "c".repeat(101) } });
    fireEvent.change(todoInputDate, { target: { value: "2025-12-31" } });

    expect(todoButton).toBeDisabled(); // 101자일 때 버튼 비활성화
  });

  test('입력된 날짜가 오늘 이전이면 버튼 비활성화', () => {
    const { getByTestId } = render(<App />);
    const todoInputText = getByTestId("todo");
    const todoInputDate = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputText, { target: { value: "TODO TEXT" } });
    fireEvent.change(todoInputDate, { target: { value: "2024-01-01" } }); // 과거 날짜

    expect(todoButton).toBeDisabled(); // 과거 날짜면 비활성화
  });

  test('입력된 날짜가 오늘 이전이면 버튼은 활성화', () => {
    const { getByTestId } = render(<App />);
    const todoInputText = getByTestId("todo");
    const todoInputDate = getByTestId("date");
    const todoButton = getByTestId("button");

    fireEvent.change(todoInputText, { target: { value: "TODO TEXT" } });
    fireEvent.change(todoInputDate, { target: { value: "2026-01-01" } }); // 미래 날짜

    expect(todoButton).not.toBeDisabled(); // 현재 날짜면 활성화
  });

});

