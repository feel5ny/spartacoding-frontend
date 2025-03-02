import { describe, it, expect,vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoList } from './components/todo-list';
import { TodoForm } from './components/todo-form';
import { Todo } from './types/todo';
import { useState } from 'react';

// 상태 관리를 포함하는 wrapper 컴포넌트
const TodoListWrapper = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);
  return <TodoList todos={todos} setTodos={setTodos} />;
};

const TodoFormWrapper = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);
  return <TodoForm todos={todos} setTodos={setTodos} />;
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
    
    const initialTodo: Todo[] = [
      {
        id: 1,
        text: 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeeffffffffffgggggggggghhhhhhhhhhjjjjjjjjjjkkkkkkkkkk1234234123',
        completed: false,
        deadline: '2025-01-01'
      }
    ];

    // When
    //mock데이터 입력, 버튼 클릭
    render(<TodoFormWrapper initialTodos={initialTodo} />);
    const AddBtn = screen.getByTestId('Btn_AddTodo');

    fireEvent.click(AddBtn);
    // Then
    //버튼 클릭여부 확인
    expect(AddBtn).toBeDisabled();
    
     });
    it('할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.',()=>{
      // Given

        const date = new Date(2024, 11, 1)// 오늘 날짜 임의 값
        const initialTodo: Todo[]= [];
        vi.useFakeTimers()
        vi.setSystemTime(date)

        //When
        render(<TodoFormWrapper initialTodos={initialTodo} />);

        const todoInputContainer = screen.getByTestId('Txt_Todo');
        const todoInput = todoInputContainer.querySelector('input');
        
        const deadlineInputContainer = screen.getByTestId('DeadLine_Todo');
        const deadlineInput = deadlineInputContainer.querySelector('input');
        
        const addButton = screen.getByTestId('Btn_AddTodo');
  
        // 입력 필드가 존재하는지 확인
        expect(todoInput).not.toBeNull();
        expect(deadlineInput).not.toBeNull();

        // 과거 날짜 입력
        fireEvent.change(todoInput!, {target: {value: '테스트 할일'}});
        fireEvent.change(deadlineInput!, {target: {value: '2024-10-01'}});

        // Then
        expect(addButton).toBeDisabled();
    })
  
});
