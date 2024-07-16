/**
 * 유효성 검사
 * * 트리거링 시점 -> data넘겨서 -> 내부에서 유효한지를 확인
 * * 데이터를 받을 수 있는 api 제공필요
 *
 * validateEmail
 * * 1. 데이터를 받고
 * * 2. 데이러를 유효성 검사를 하고
 * * 3. 에러메세지를 업데이트
 */

import { useState } from 'react';
import { validateEmailPattern, validatePasswordPattern } from '../utils/validate-format';

export const useValidateCredential = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateCredential = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (email && !validateEmailPattern(email)) {
      setEmailErrorMessage(ERROR_EMAIL_MSG);
    }
    if (password && !validatePasswordPattern(password)) {
      setPasswordErrorMessage(ERROR_PASSWORD_MSG);
    }
  };

  return {
    emailErrorMessage,
    passwordErrorMessage,
    validateCredential,
  };
};

export const ERROR_EMAIL_MSG = '이메일 형식이 아닙니다.';
export const ERROR_PASSWORD_MSG =
  '비밀번호는 특수문자,숫자,문자가 포함된 8자리 이상이여야합니다.';
