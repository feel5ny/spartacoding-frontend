import { useState } from 'react';
import { validateCredential } from '../controllers/validate-credential';

export const EMAIL_ERROR_TEXT = '이메일 양식이 아닙니다.';
export const PASSWORD_ERROR_TEXT = '비밀번호 양식이 아닙니다.';

export const useValidateCredential = () => {
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleValidateCredential = (email: string, password: string) => {
    const { isValidEmail, isValidPassword } = validateCredential(
      email,
      password
    );
    if (!isValidEmail) {
      setEmailErrorText(EMAIL_ERROR_TEXT);
    }
    if (!isValidPassword) {
      setPasswordErrorText('비밀번호 양식이 아닙니다.');
    }
  };

  return {
    emailErrorText,
    passwordErrorText,
    validateCredential: handleValidateCredential,
  };
};
