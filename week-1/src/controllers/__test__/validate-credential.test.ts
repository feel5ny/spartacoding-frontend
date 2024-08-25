/**
 * 테스트 코드 작성방법
 * * 1) 유저스토리 작성하기
 * * 2) 테스트코드 작성하기 -> 실패
 * * 3) 실제 함수 구현하기 -> 성공
 * * 4) 테스트코드 수정하기 -> 실패
 * * 5) 리팩토링하기 -> 성공
 * !4번,5번 반복
 */

import { validateCredential } from '../validate-credential';

/**
 * @userStory
 * * 유저는 이메일과 비밀먼호를 필수로 입력해야 회원가입할 수 있다.
 */

// validateCredentials
describe('validate credential', () => {
  // 성공 case
  it('이메일과 비밀번호가 조건에 충족한다면, 모두 유효하다고 반환해야한다.', () => {
    // Given
    const email = 'sparta@abc.com';
    const password = '1234abcd!@#';

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      isValidEmail: true,
      isValidPassword: true,
      isValidAll: true,
    });
  });

  // 실패 case
  it('이메일이 존재하지 않으면, 이메일이 유효하지 않다고 반환해야한다.', () => {
    // Given
    const email = '';
    const password = '1234abcd!@#';

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      isValidEmail: false,
      isValidPassword: true,
      isValidAll: false,
    });
  });
  it('이메일 포맷이 맞지 않으면, 이메일이 유효하지 않다고 반환해야한다.', () => {
    // Given
    const email = 'spartaabc.com';
    const password = '1234abcd!@#';

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      isValidEmail: false,
      isValidPassword: true,
      isValidAll: false,
    });
  });
  it('비밀번호가 존재하지 않으면, 비밀번호가 유효하지 않다고 반환해야한다.', () => {
    // Given
    const email = 'sparta@abc.com';
    const password = '';
    const restResult = {
      isValidEmail: true,
    };

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      ...restResult,
      isValidPassword: false,
      isValidAll: false,
    });
  });
  it('비밀번호가 포맷이 맞지 않으면, 비밀번호가 유효하지 않다고 반환해야한다.', () => {
    // Given
    const email = 'sparta@abc.com';
    const password = '1234';
    const restResult = {
      isValidEmail: true,
    };

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      ...restResult,
      isValidPassword: false,
      isValidAll: false,
    });
  });
  it('이메일과 비밀번호가 모두 포맷이 맞지 않으면, 모두 유효하지 않다고 반환해야한다.', () => {
    // Given
    const email = 'sparta@abc.com';
    const password = '1234';
    const restResult = {
      isValidEmail: true,
    };

    // When
    const result = validateCredential(email, password);

    // Then
    expect(result).toEqual({
      ...restResult,
      isValidPassword: false,
      isValidAll: false,
    });
  });
});
