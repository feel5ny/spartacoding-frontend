import { useState } from 'react';
import { validateCredential } from '../controllers/validate-credential';

export const EMAIL_ERROR_TEXT = '이메일 양식이 아닙니다.';
export const useValidateCredential = () => {
  const [emailErrorText, setEmailErrorText] = useState('');

  const handleValidateCredential = (email: string, password: string) => {
    const { isValidEmail } = validateCredential(email, password);
    if (!isValidEmail) {
      setEmailErrorText(EMAIL_ERROR_TEXT);
    }
  };

  return {
    emailErrorText,
    passwordErrorText: '',
    validateCredential: handleValidateCredential,
  };
};
