import { renderHook, act, cleanup } from '@testing-library/react';
import { useTodoForm } from '../use-todo-form';

// 순서
// 1. 유저스토리 작성
// 1. 테스트케이스 작성 (성공, 실패)
// 2. 실제 컴포넌트 구현
// 3. 리팩토링 -> 테스트 실패
// 4. 테스트케이스 수정 -> 테스트 성공

describe('useTodoForm 테스트', () => {
    afterEach(() => {
        cleanup();
    });
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

        act(() => {
            result.current.updateTodo('할 일');
            result.current.updateDeadline('2025-12-31');
        });
        act(() => {
            result.current.initForm();
        });

        expect(result.current.todo).toBe('');
        expect(result.current.deadline).toBe('');
    });
});
