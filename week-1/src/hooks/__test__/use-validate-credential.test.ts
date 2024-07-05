import { act, renderHook } from '@testing-library/react';
import { useValidateCredential } from '../use-validate-credential';
// useValidateCredential -> 에러텍스트를 관리하는 hook
describe('useValidateCredential', () => {
  // 성공
  it('이메일과 비밀번호가 형식에 맞으면, 에러 텍스트를 반환하지 않는다.', () => {
    // Given
    const email = 'abc@naver.com';
    const password = 'abc1234!@#$';
    const expectedResult = {
      emailErrorText: '',
      passwordErrorText: '',
      validateCredential: () => null,
    };

    // When
    const { result } = renderHook(useValidateCredential);

    act(() => {
      result.current.validateCredential(email, password);
    });

    // Then
    expect(result.current.emailErrorText).toBe(expectedResult.emailErrorText);
  });
  // 실패
  it('이메일이 형식에 맞지 않으면, 이메일 에러 텍스트를 반환한다.', () => {});
  it('비밀번호가 형식에 맞지 않으면, 비밀번호 에러 텍스트를 반환한다.', () => {});
  it('이메일과 비밀번호가 형식에 맞지 않으면, 이메일과 비밀번호 에러 텍스트를 반환한다.', () => {});
});
