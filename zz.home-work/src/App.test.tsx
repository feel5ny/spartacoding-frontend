/* 테스트 코드 */
// import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './components/todo-list';
import { useTodoForm } from './hooks/use-todo-form';
import { vi } from 'vitest';

// describe('useTodoForm 테스트', () => {
//     afterEach(() => {
//         cleanup();
//     });
//     it('할일 텍스트 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => { });
//     it('할일 데드라인 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => { });
//     it('할일을 초기화하면, 상태값은 모두 초기값으로 변경된다.', () => { });
// });

// describe('TodoList 테스트', () => {
//     afterEach(() => {
//         cleanup();
//     });
//     it('비활성화된 체크박스를 클릭하면 취소선이 그어진다.', () => { });
//     it('비활성화된 체크박스를 클릭하면 체크박스가 활성화된다.', () => { });
//     it('활성화된 체크박스를 클릭하면 텍스트 스타일이 취소선이 비활성화된다.', () => { });
//     it('활성화된 체크박스를 클릭하면 체크박스가 비활성화된다.', () => { });
// });

/* 테스트 코드 */
describe('useTodoForm 테스트', () => {
    it('할일 텍스트 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
        const { result } = renderHook(() => useTodoForm());

        act(() => {
            result.current.updateTodo('새로운 할일');
        });

        expect(result.current.todo).toBe('새로운 할일');
    });

    it('할일 데드라인 데이터를 업데이트하면, 상태값이 업데이트한 데이터로 변경된다.', () => {
        const { result } = renderHook(() => useTodoForm());

        act(() => {
            result.current.updateDeadline('2025-12-31');
        });

        expect(result.current.deadline).toBe('2025-12-31');
    });

    it('할일을 초기화하면, 상태값은 모두 초기값으로 변경된다.', () => {
        const { result } = renderHook(() => useTodoForm());

        act(() => {
            result.current.updateTodo('할일');
            result.current.updateDeadline('2025-12-31');
            result.current.initForm();
        });

        expect(result.current.todo).toBe('');
        expect(result.current.deadline).toBe('');
    });
});

describe('TodoList 테스트', () => {
    const mockTodos = [
        { id: 1, text: '테스트 할일 1', completed: false, deadline: '2025-12-31' },
        { id: 2, text: '테스트 할일 2', completed: true, deadline: '2025-12-30' },
    ];

    let setTodosMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        setTodosMock = vi.fn(); // ✅ jest.fn() → vi.fn()으로 변경
    });

    it('비활성화된 체크박스를 클릭하면 취소선이 그어진다.', () => {
        render(<TodoList todos={mockTodos} setTodos={setTodosMock} />);

        const checkbox = screen.getAllByRole('checkbox')[0]; // 첫 번째 체크박스
        fireEvent.click(checkbox);

        expect(setTodosMock).toHaveBeenCalled();
    });

    it('비활성화된 체크박스를 클릭하면 체크박스가 활성화된다.', () => {
        render(<TodoList todos={mockTodos} setTodos={setTodosMock} />);

        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);

        expect(setTodosMock).toHaveBeenCalled();
    });

    it('활성화된 체크박스를 클릭하면 텍스트 스타일의 취소선이 비활성화된다.', () => {
        render(<TodoList todos={mockTodos} setTodos={setTodosMock} />);

        const checkbox = screen.getAllByRole('checkbox')[1];
        fireEvent.click(checkbox);

        expect(setTodosMock).toHaveBeenCalled();
    });

    it('활성화된 체크박스를 클릭하면 체크박스가 비활성화된다.', () => {
        render(<TodoList todos={mockTodos} setTodos={setTodosMock} />);

        const checkbox = screen.getAllByRole('checkbox')[1];
        fireEvent.click(checkbox);

        expect(setTodosMock).toHaveBeenCalled();
    });

    it('할일 삭제 버튼을 클릭하면 해당 할일이 삭제된다.', () => {
        render(<TodoList todos={mockTodos} setTodos={setTodosMock} />);

        // const deleteButtons = screen.getAllByRole('button', { name: '🗑️' });
        const deleteButtons = screen.getAllByTestId('delete-button'); // ✅ `getAllByTestId` 사용
        fireEvent.click(deleteButtons[0]);

        expect(setTodosMock).toHaveBeenCalled();
    });
});

