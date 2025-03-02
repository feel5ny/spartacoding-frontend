import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TodoList } from './components/todo-list';
import { Todo } from './types/todo';
import { useState } from 'react';

// 상태 관리를 포함하는 wrapper 컴포넌트
const TodoListWrapper = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);
  return <TodoList todos={todos} setTodos={setTodos} />;
};

describe('TodoList 테스트', () => {
  it('비활성화된 체크박스를 클릭하면 취소선이 그어진다.', async () => {
    // GIVEN
    const initialTodos: Todo[] = [
      {
        id: 1,
        text: '테스트 할일',
        completed: false,
        deadline: '2025-01-01'
      }
    ];
    render(<TodoListWrapper initialTodos={initialTodos} />);
    
    // Material UI Checkbox의 경우, 실제 input 엘리먼트를 대상으로 이벤트를 발생시킵니다.
    const checkboxContainer = screen.getByTestId('todo-checkbox-1');
    const checkboxInput = checkboxContainer.querySelector('input') || checkboxContainer;
    const todoText = screen.getByTestId('todo-text-1');
    
    // WHEN
    fireEvent.click(checkboxInput);
    
    // THEN: 상태 업데이트가 일어나면서 텍스트에 취소선이 적용됨
      expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  it('비활성화된 체크박스를 클릭하면 체크박스가 활성화된다.', async () => {
    // GIVEN
    const initialTodos: Todo[] = [
      {
        id: 1,
        text: '테스트 할일',
        completed: false,
        deadline: '2025-01-01'
      }
    ];
    render(<TodoListWrapper initialTodos={initialTodos} />);
    
    const checkboxContainer = screen.getByTestId('todo-checkbox-1');
    const checkboxInput = checkboxContainer.querySelector('input') || checkboxContainer;
    
    // WHEN
    fireEvent.click(checkboxInput);
    
    // THEN: 내부 input 엘리먼트가 체크 상태가 되어야 함
      expect(checkboxInput).toBeChecked();
  });

  it('활성화된 체크박스를 클릭하면 텍스트 스타일의 취소선이 해제된다.', async () => {
    // GIVEN
    const initialTodos: Todo[] = [
      {
        id: 1,
        text: '테스트 할일',
        completed: true,
        deadline: '2025-01-01'
      }
    ];
    render(<TodoListWrapper initialTodos={initialTodos} />);
    
    const checkboxContainer = screen.getByTestId('todo-checkbox-1');
    const checkboxInput = checkboxContainer.querySelector('input') || checkboxContainer;
    const todoText = screen.getByTestId('todo-text-1');
    
    // WHEN
    fireEvent.click(checkboxInput);
    
    // THEN: 상태 업데이트 후 취소선 스타일이 제거됨
      expect(todoText).toHaveStyle('text-decoration: none');
  });

  it('활성화된 체크박스를 클릭하면 체크박스가 비활성화된다.', async () => {
    // GIVEN
    const initialTodos: Todo[] = [
      {
        id: 1,
        text: '테스트 할일',
        completed: true,
        deadline: '2025-01-01'
      }
    ];
    render(<TodoListWrapper initialTodos={initialTodos} />);
    
    const checkboxContainer = screen.getByTestId('todo-checkbox-1');
    const checkboxInput = checkboxContainer.querySelector('input') || checkboxContainer;
    
    // WHEN
    fireEvent.click(checkboxInput);
    
    // THEN: 체크박스가 체크 해제되어야 함
      expect(checkboxInput).not.toBeChecked();
  });

  it('할일을 입력할 때 100자 이상 작성하면 입력할 수 없다.', ()=>{ 

    // Given 
    //할일 폼 선택, mock데이터 셋팅
    
    

    // When
    //mock데이터 입력, 버튼 클릭
    
    // Then
    //버튼 클릭여부 확인
    
     })
  
});
