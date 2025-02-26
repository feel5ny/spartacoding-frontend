import { describe, it, expect } from 'vitest';
import { deleteTodo } from '../todo';
import { Todo } from '../../types/todo';
/**
 * @userStory
 * 유저는 할일과 날짜를 필수로 입력해야 TODO리스트를 등록 할 수 있다.
 * 할일은 체크박스와 해야할 일 텍스트, 데드라인 날짜를 입력받을 수 있다.
 * 체크박스를 클릭하면 해야할 일 텍스트에 취소선이 그어진다.
 * 데드라인 날짜를 입력받을 때, 오늘 날짜 이후로만 입력받을 수 있다.
 */

describe('Todo 추가 기능', () => {
  it('할 일과 날짜가 입력되면, 새로운 할 일을 추가한다.', () => {});
  it('할 일 또는 날짜가 비어 있으면, false를 반환시켜 등록을 막는다.', () => {});
});

describe('Todo 체크 기능', () => {
  it('등록된 할 일을 클릭하면 checked 표시가 활성화된다.', () => {});
  it('checked 된 할 일을 다시 클릭하면 checked가 해제된다.', () => {});
});

describe('Todo 삭제 기능', () => {
  let todoList: Todo[];

  beforeEach(() => {
    // 테스트 실행 전 초기 데이터 설정
    todoList = [
      {
        id: 1,
        text: '프로그래밍 공부하기',
        completed: false,
        deadline: '2025-02-26',
      },
      { id: 2, text: 'TDD 강의 듣기', completed: true, deadline: '2025-02-26' },
    ];
  });

  it('투두리스트와 삭제할 id를 전달받아 리스트에서 제거한다.', () => {
    const expected: Todo[] = [
      { id: 2, text: 'TDD 강의 듣기', completed: true, deadline: '2025-02-26' },
    ];

    expect(deleteTodo(todoList, 1)).toEqual(expected);
  });

  it('존재하지 않는 id를 삭제하려고 하면 기존 리스트를 그대로 반환해야 한다.', () => {
    expect(deleteTodo(todoList, 99)).toEqual(todoList);
  });

  it('다른 id가 제거되면 실패해야 한다.', () => {
    const wrongExpected: Todo[] = [
      {
        id: 1,
        text: '프로그래밍 공부하기',
        completed: false,
        deadline: '2025-02-26',
      },
    ];

    expect(deleteTodo(todoList, 1)).not.toEqual(wrongExpected);
  });
});
