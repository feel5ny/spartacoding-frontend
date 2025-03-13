/**
 * 테스트 코드 작성방법
 * * 1) 유저스토리 작성하기
 * * 2) 테스트코드 작성하기 -> 실패
 * * 3) 실제 함수 구현하기 -> 성공
 * * 4) 테스트코드 수정하기 -> 실패
 * * 5) 리팩토링하기 -> 성공
 * !4번,5번 반복
 */

import { validationCredential } from '../validate-credential';

/**
 * @userStory
 * * 유저는 이메일과 비밀번호를 필수로 입력해야 회원가입할 수 있다.
 */

// validationCredential -> 필수값인 이메일과 비밀번호를 형식에 맞게 데이터가 준비가 되었는지

describe('validationCredential', () => {
  // 성공 case
  it('이메일과 비밀번호가 형식에 맞을 경우, isValid이 true값을 포함한 객체를 반환한다.', () => {
    // GWT
    // Given
    const email = 'abc@naver.com';
    const password = 'abcd1234!@#$'; // 8자리 이상, 문자열1이상, 숫자1이상, 특수문자가 1개이상
    const expectedResult = {
      isValidAll: true,
      isValidEmail: true,
      isValidPassword: true,
    };

    // When
    const result = validationCredential(email, password);

    // Then
    expect(result).toEqual(expectedResult);
  });
  // 실패(예외) case
  it('이메일이 형식에 맞지 않을 경우, isValidAll이 false값을 포함한 객체를 반환한다.', () => {
    // GWT
    // Given
    const email = 'abcnaver.com';
    const password = 'abcd1234!@#$'; // 8자리 이상, 문자열1이상, 숫자1이상, 특수문자가 1개이상
    const expectedResult = {
      isValidAll: false,
      isValidEmail: false,
      isValidPassword: true,
    };

    // When
    const result = validationCredential(email, password);

    // Then
    expect(result).toEqual(expectedResult);
  });
  it('비밀번호가 형식에 맞지 않을 경우, isValid이 false값을 포함한 객체를 반환한다.', () => {});
  it('이메일과 비밀번호가 형식에 맞지 않을 경우, isValid이 false값을 포함한 객체를 반환한다.', () => {});
});
