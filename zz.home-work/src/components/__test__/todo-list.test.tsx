import { cleanup } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../todo-list';
import { vi } from 'vitest';

describe('TodoList 테스트', () => {
    afterEach(() => {
        cleanup();
    });

    const mockTodos = [
        { id: 1, text: '테스트 할일 1', completed: false, deadline: '2025-12-31' },
        { id: 2, text: '테스트 할일 2', completed: true, deadline: '2025-12-30' },
    ];

    let setTodosMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        setTodosMock = vi.fn();
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

    it('활성화된 체크박스를 클릭하면 텍스트 스타일이 취소선이 비활성화된다.', () => {
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

