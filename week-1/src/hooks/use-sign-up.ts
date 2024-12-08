import { useRef, useState } from 'react';
import { validationEmail, validationPassword } from '../utils/validation';
import { useSignUpApi } from './use-sign-up-api';

export const ERROR_MSG = {
  required: '이메일과 비밀번호는 필수값입니다.',
  email: '이메일 형식이 아닙니다.',
  password: '최소 8자리, 문자,숫자,특수문자 조합이여야합니다.',
};

export type SignUpReturnType = {
  errorText: {
    errorEmailText: string | null;
    errorPasswordText: string | null;
  };
  currentValue?: {
    email: React.MutableRefObject<string>;
    password: React.MutableRefObject<string>;
  };
  initFormState: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isPending: boolean;
  isSuccess: boolean;
};

export const useSignUp = (): SignUpReturnType => {
  const email = useRef('');
  const password = useRef('');
  const { mutate, isPending, isSuccess, reset } = useSignUpApi({
    onSuccess: () => {
      initFormState();
      initFormData();
    },
    onError: () => {
      alert('error');
    },
  });

  const [errorEmailText, setErrorEmailText] = useState<string | null>(null);
  const [errorPasswordText, setErrorPasswordText] = useState<string | null>(
    null
  );

  const handleSubmit = async () => {
    if (!email.current && !password.current) {
      setErrorEmailText(ERROR_MSG.required);
      setErrorPasswordText(ERROR_MSG.required);
      return;
    }
    if (!validationEmail(email.current)) {
      setErrorEmailText(ERROR_MSG.email);
      return;
    }
    if (!validationPassword(password.current)) {
      setErrorPasswordText(ERROR_MSG.password);
      return;
    }

    mutate({ email: email.current, password: password.current });
  };

  const initFormState = () => {
    setErrorEmailText('');
    setErrorPasswordText('');
  };

  const initFormData = () => {
    email.current = '';
    password.current = '';
  };

  return {
    errorText: {
      errorEmailText,
      errorPasswordText,
    },
    currentValue: {
      email,
      password,
    },
    initFormState,
    onSubmit: handleSubmit,
    isPending,
    isSuccess,
    onReset: reset,
  };
};
