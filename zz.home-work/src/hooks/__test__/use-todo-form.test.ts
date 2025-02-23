/**
 * @userStory
 * 유저는 투두 리스트 텍스트와 날짜를 필수로 기입해야 투두 리스트 항목을 만들 수 있다.
 * 
 */
import { renderHook, act } from '@testing-library/react';
import { useTodoForm } from '../use-todo-form';

describe('useTodoForm 테스트',()=>{
    it('투두 텍스트를 업데이트 하면, 상태값이 업데이트 한 데이터로 변경된다.',()=>{
        // GIVEN
        const { result } = renderHook(() => useTodoForm());
        // hook을 테스트 코드에서 활용하기 위해 renderHook 함수 사용
        const newTodo = '투두 테스트';
        
        // WHEN
        act(() => {
            result.current.updateTodo(newTodo);
        }); // 비동기적으로 상태 업데이트 되므로, act 함수로 감싸기. 
        
        // THEN
        expect(result.current.todo).toBe(newTodo);
        // hook의 반환 값은 result.current를 통해 접근 
    })

    it('투두 마감일을 업데이트 하면, 상태값이 업데이트 한 데이터로 변경된다.',()=>{
        // GIVEN
        const { result } = renderHook(() => useTodoForm());
        const newDeadline = '2025-01-01';
        
        // WHEN
        act(() => {
            result.current.updateDeadline(newDeadline);
        });
        
        // THEN
        expect(result.current.deadline).toBe(newDeadline);
    })

    it('할 일을 초기화하면, 상태 값은 모두 초기 값으로 변경된다.',()=>{
        // GIVEN
        const { result } = renderHook(() => useTodoForm());
        const newTodo = '투두 테스트';
        const newDeadline = '2025-01-01';
        
        // WHEN
        act(() => {
            result.current.updateTodo(newTodo);
            result.current.updateDeadline(newDeadline);
            result.current.initForm();
        });
        
        // THEN
        expect(result.current.todo).toBe('');
        expect(result.current.deadline).toBe('');
    })
})