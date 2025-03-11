/**
 * @userStory
 * * TODO 삭제, 완료 처리를 할 수 있다.
 */

import { Todo } from '../../types/todo';
import { deleteTodo, updateToggle } from '../todo';

describe('TODO Controller 테스트', () => {
  // GIVEN
  const todos: Todo[] = [];

  beforeEach(() => {
    todos.push({
      id: 1,
      text: '할일 테스트 1',
      completed: false,
      deadline: '2025-03-09',
    });
    todos.push({
      id: 2,
      text: '할일 테스트 2',
      completed: false,
      deadline: '2025-03-09',
    });
  });

  describe('할 일 삭제', () => {
    // 성공 케이스
    it('할 일을 삭제 할 수 있다.', () => {
      // GIVEN
      const todoID = 1;
      const originTodos = [...todos];

      // WHEN
      const result = deleteTodo(todos, todoID);

      // THEN
      expect(result).toEqual(originTodos.filter((todo) => todo.id !== todoID));
    });

    // 실패 케이스
    it('할 일을 삭제되지 않으면, 기존 데이터가 변경되지 않는다.', () => {
      // GIVEN
      const todoID = 9999;
      const originTodos = [...todos];

      // WHEN
      const result = deleteTodo(todos, todoID);

      // THEN
      expect(result).toEqual(todos);
      expect(result).toHaveLength(originTodos.length);
    });
  });

  describe('할 일 완료 처리', () => {
    // 성공 케이스
    it('할 일을 완료 처리 할 수 있다.', () => {
      // GIVEN
      const todoID = 1;

      // WHEN
      const updatedTodos = updateToggle(todos, todoID);
      const isCompleted = updatedTodos.find(
        (todo) => todo.id === todoID
      )?.completed;

      // THEN
      expect(isCompleted).toBeTruthy();
    });

    // 실패 케이스
    it('할 일을 완료 처리되지 않으면, 기존 데이터가 변경되지 않는다.', () => {
      // GIVEN
      const todoID = 9999;

      // WHEN
      const updatedTodos = updateToggle(todos, todoID);
      const isCompleted = updatedTodos.find(
        (todo) => todo.id === todoID
      )?.completed;

      // THEN
      expect(isCompleted).toBeFalsy();
    });
  });
});
