import { act, renderHook } from '@testing-library/react';
import {
  ERROR_EMAIL_MSG,
  useValidateCredential,
} from '../use-validate-credential';

describe('use-validate-credential', () => {
  it('이메일이 유효하지 않으면,  "이메일 형식이 아닙니다." 에러 메세지를 반환한다.', () => {
    // Given
    const invalidEmail = 'asdf';

    // When
    const { result } = renderHook(useValidateCredential);

    act(() => {
      result.current.validateCredential({ email: invalidEmail, password: '' });
    });

    // Then
    expect(result.current.emailErrorMessage).toBe(ERROR_EMAIL_MSG);
  });
});
