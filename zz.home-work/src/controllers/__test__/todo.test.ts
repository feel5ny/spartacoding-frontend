/**
 * 테스트 코드 작성방법
 * * 1) 유저스토리 작성하기
 * * 2) 테스트코드 작성하기 -> 실패
 * * 3) 실제 함수 구현하기 -> 성공
 * * 4) 테스트코드 수정하기 -> 실패
 * * 5) 리팩토링하기 -> 성공
 * !4번,5번 반복
 */

import { updateTodoToggle, deleteTodo } from "../todo";
import {Todo} from '../../types/todo'



describe('todo controller', () => {
  // Given
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      { id: 1, text: '빨래하기', completed: false, deadline: '2025-01-23' },
      { id: 2, text: '운동하기', completed: false, deadline: '2025-01-23' },
      { id: 3, text: '공부하기', completed: true, deadline: '2025-01-23' },
    ];
  });
  /**
   * @userStory
   * * 유저가 토글 버튼을 누르면, 해당 투두에 underline 이 쳐진다.
   */
  describe('update toggle', () => {
    // 성공 case
    it('지정된 투두의 completed 속성이 반전된 배열을 반환', () => {
      // When
      const updatedTodos = updateTodoToggle(todos, 2);
      // Then
      expect(updatedTodos[1].completed).toEqual(!todos[1].completed)
      expect(updatedTodos[0]).toEqual(todos[0])
      expect(updatedTodos[2]).toEqual(todos[2])
    });

    // 실패 case
    it('id가 일치하지 않다면, 원래 todo를 반환', () => {
      // When
      const updatedTodos = updateTodoToggle(todos, 999);
      // Then
      expect(updatedTodos).toEqual(todos);
    });
  });

  /**
   * @userStory
   * * 투두 삭제 버튼을 누르면, 해당 투두는 리스트에서 제외된다.
   */
  describe('delete toggle', () => {
    // 성공 case
    it('지정된 투두가 제외된 배열을 반환', () => {
      // When
      const updatedTodos = deleteTodo(todos, 2);
      // Then
      expect(updatedTodos).toHaveLength(todos.length - 1)
      expect(updatedTodos.find(item => item.id === 2)).toBeUndefined()
    });

    it('기존의 배열을 변경해선 안됨', () => {
      // When
      const originalTodos = [...todos];
      deleteTodo(todos, 2);
      // Then
      expect(todos).toEqual(originalTodos);
    });

    // 실패 case
    it('id가 일치하지 않다면, 원래 todo를 반환', () => {
      // When
      const updatedTodos = deleteTodo(todos, 999);
      // Then
      expect(updatedTodos).toEqual(todos);
    });
  });
});