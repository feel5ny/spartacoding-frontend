import { fireEvent, render } from '@testing-library/react';
import { TodoForm } from '../todo-form';
import { vi } from 'vitest';
import { act } from 'react';

describe('Todo Form 컴포넌트 테스트', () => {
  // GIVEN

  let todoInput: HTMLElement;
  let deadlineInput: HTMLElement;
  let addTodoButton: HTMLElement;

  beforeEach(() => {
    renderTodoForm();
  });

  const renderTodoForm = () => {
    const rederResult = render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    todoInput = rederResult.getByTestId('todo-input');
    deadlineInput = rederResult.getByTestId('deadline-input');
    addTodoButton = rederResult.getByTestId('add-todo-button');

    return rederResult;
  };

  it('Todo Form 컴포넌트가 렌더링 되어야 한다.', () => {
    // THEN
    expect(todoInput).toBeInTheDocument();
    expect(deadlineInput).toBeInTheDocument();
    expect(addTodoButton).toBeInTheDocument();
  });

  it('Todo Deadline을 입력하면 Add버튼이 활성화 된다.', () => {
    // WHEN
    fireEvent.change(todoInput, { target: { value: '할일 1' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-03-10' } });

    // THEN
    expect(addTodoButton).toBeEnabled();
  });

  it('할일 추가 시 Input 필드가 초기화 되어야 한다.', () => {
    // WHEN
    fireEvent.change(todoInput, { target: { value: '할일 1' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-03-10' } });

    act(() => {
      fireEvent.click(addTodoButton);
    });

    // THEN
    expect(todoInput).toHaveValue('');
    expect(deadlineInput).toHaveValue('');
  });
});

// describe('useTodoForm 테스트', () => {
//   it('할일 텍스트 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {});
//   it('할일 데드라인 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {});
//   it('할일을 초기화하면, 상태값은 모두 초기값으로 변경된다.', () => {});
// });
