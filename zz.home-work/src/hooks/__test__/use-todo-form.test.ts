/**
 * 테스트 코드 작성방법
 * * 1) 유저스토리 작성하기
 * * 2) 테스트코드 작성하기 -> 실패
 * * 3) 실제 함수 구현하기 -> 성공
 * * 4) 테스트코드 수정하기 -> 실패
 * * 5) 리팩토링하기 -> 성공
 * !4번,5번 반복
 */

import { act, renderHook } from '@testing-library/react';
import { useTodoForm } from '../use-todo-form';

// useTodoForm -> todo 폼의 필드를 관리하는 hook
describe('useTodoForm', () => {
  // 성공
  it('todo와 deadline의 초깃값은 빈 문자열이다', () => {
    // Given
    const initialTodo = '';
    const initialDeadline = '';
    const expectedResult = {
      todo: initialTodo,
      deadline: initialDeadline
    }

    // When
    const { result } = renderHook(useTodoForm);

    // Then
    expect(result.current.todo).toBe(expectedResult.todo);
    expect(result.current.deadline).toBe(expectedResult.deadline);
  });

  it('todo와 deadline의 업데이트시 상태에 반영이 된다.', () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';
    const expectedResult = {
      todo,
      deadline
    }

    // When
    const { result } = renderHook(useTodoForm);
    act(()=>{
      result.current.updateTodo('운동하기')
      result.current.updateDeadline('2021-01-22')
    })
    // Then
    expect(result.current.todo).toBe(expectedResult.todo);
    expect(result.current.deadline).toBe(expectedResult.deadline);
  });

  it('투두를 입력한 뒤에는 투두폼이 초기화된다.', () => {
    // Given
    const todo = '운동하기';
    const deadline = '2021-01-22';
    const initialTodo = '';
    const initialDeadline = '';
    const expectedResult = {
      todo,
      deadline,
      initialTodo,
      initialDeadline
    }

    // When
    const { result } = renderHook(useTodoForm);
    act(()=>{
      result.current.updateTodo('운동하기')
      result.current.updateDeadline('2021-01-22')
    })
    act(()=>{
    result.current.initForm()
    })

    // Then
    expect(result.current.todo).toBe(expectedResult.initialTodo);
    expect(result.current.deadline).toBe(expectedResult.initialDeadline);
  });
});