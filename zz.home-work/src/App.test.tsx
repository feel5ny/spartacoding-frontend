import { describe, test } from "vitest"

describe('Todo Input의 글자 수는 100자 미만이어야 한다', () => {
  const isTodoValid = (text: string) => text.length < 100;

  test('99자 일 때 테스트 해보기', () => {
    expect(isTodoValid("1".repeat(99))).toEqual(true)
  });

  test('100자 일 때 테스트 해보기', () => {
    expect(isTodoValid("1".repeat(100))).toEqual(false)
  });

  test('테스트 데이터 입력', () => {
    expect(isTodoValid("TEST TODO LIST")).toEqual(true);
  });

});
