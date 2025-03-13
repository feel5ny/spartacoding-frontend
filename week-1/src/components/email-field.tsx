/**
 * !email form
 * 이메일 데이터를 관리해야한다.
 * 이메일 validation을 관리해야한다.
 */

import { TextField } from '@mui/material';
import { useRef } from 'react';
import { useValidateCredential } from '../hooks/use-validate-credential';

const TEMP = 'asdf!@#123';

export const EmailField = () => {
  const emailValue = useRef<string>();
  const { emailErrorText, validateCredential } = useValidateCredential();

  return (
    <TextField
      id="email"
      inputProps={{
        'data-testid': 'email',
      }}
      label="이메일"
      placeholder="이메일을 입력해주세요"
      fullWidth
      // error props
      error={Boolean(emailErrorText)}
      helperText={emailErrorText}
      //
      onChange={({ target }) => {
        const email = target.value;
        validateCredential(email, TEMP);
        emailValue.current = email;
      }}
    />
  );
};
