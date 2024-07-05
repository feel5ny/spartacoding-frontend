import { useState } from 'react';
import { validationCredential } from '../controllers/validate-credential';

export type ReturnType = {
  emailErrorText: string;
  passwordErrorText: string;
  validateCredential: (
    email: string,
    password: string
  ) => { isValidEmail: boolean; isValidPassword: boolean };
  init: () => void;
};

export const EMAIL_ERROR_TEXT = '이메일 양식이 아닙니다.';
export const useValidateCredential = (): ReturnType => {
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleValidateCredential = (
    email: string,
    password: string
  ): { isValidEmail: boolean; isValidPassword: boolean } => {
    const { isValidEmail, isValidPassword } = validationCredential(
      email,
      password
    );
    if (isValidEmail && isValidPassword) initState();
    if (!isValidEmail) setEmailErrorText(EMAIL_ERROR_TEXT);
    if (!isValidPassword) setPasswordErrorText('비밀번호 양식이 아닙니다.');

    return { isValidEmail, isValidPassword };
  };

  const initState = () => {
    setEmailErrorText('');
    setPasswordErrorText('');
  };

  return {
    emailErrorText,
    passwordErrorText,
    validateCredential: handleValidateCredential,
    init: () => {
      setEmailErrorText('');
      setPasswordErrorText('');
    },
  };
};
