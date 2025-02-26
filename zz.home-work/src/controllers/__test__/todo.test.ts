import { describe, it } from 'vitest';
/**
 * @userStory
 * * 유저는 할일과 날짜를 필수로 입력해야 TODO리스트를 등록 할 수 있다.
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
  it('삭제 버튼을 누르면 해당 할 일이 리스트에서 제거된다.', () => {});
});
