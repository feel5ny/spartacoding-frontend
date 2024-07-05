import { validationEmail, validationPassword } from '../validation';

describe('validationEmail은 이메일 형식이여야, true를 반환한다.', () => {
  test.each([
    // invalid cases
    ['', false],
    ['aaa', false],
    ['123', false],
    ['aaa123', false],
    ['aaa123.com', false],
    ['aaa123@', false],
    ['aaa123@bbb', false],
    ['aaa123@bbb,com', false],
    ['aaa123@bbb,c', false],
    ['aaa123@bbb.c', false],
    // valid cases
    ['aaa@123.com', true],
    ['aaa123@bbb.ca', true],
    ['aaa@bbb.com', true],
  ])(
    '이메일이 형식이 %s이면 %s를 반환한다.',
    (email: string, expected: boolean) => {
      expect(validationEmail(email)).toBe(expected);
    }
  );
});

describe('validationPassword은 최소 8자, 글자/숫자/특수문자가 각 하나 이상으로 조합된 형태여야 true를 반환한다.', () => {
  test.each([
    // invalid cases
    ['', false],
    ['aaa', false],
    ['123', false],
    ['aaa123', false],
    ['aaa123.', false],
    ['aaa123@', false],
    // valid cases
    ['aaa123@aaa', true],
  ])(
    '비밀번호 형식이 %s이면 %s를 반환한다.',
    (password: string, expected: boolean) => {
      expect(validationPassword(password)).toBe(expected);
    }
  );
});
