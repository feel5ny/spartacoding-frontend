import { TextField } from '@mui/material';
import { SignUpReturnType } from '../hooks/use-sign-up';
import { SubmitButton } from './submit-button';

export const SignUpForm = ({
  errorText,
  onSubmit,
  initFormState,
  currentValue,
}: Omit<SignUpReturnType, 'isPending' | 'isSuccess' | 'onReset'>) => {
  return (
    <>
      <TextField
        id="email"
        label="이메일"
        type="email"
        inputProps={{
          'data-testid': 'email',
        }}
        fullWidth
        variant="outlined"
        margin="normal"
        //
        error={Boolean(errorText.errorEmailText)}
        helperText={errorText.errorEmailText ?? ''}
        onChange={(event) => {
          if (errorText.errorEmailText) initFormState();
          if (!currentValue) return;
          currentValue.email.current = event.target.value;
        }}
      />
      <TextField
        id="password"
        label="비밀번호"
        type="password"
        inputProps={{
          'data-testid': 'password',
        }}
        //
        fullWidth
        variant="outlined"
        //
        error={Boolean(errorText.errorPasswordText)}
        helperText={errorText.errorPasswordText ?? ''}
        onChange={(event) => {
          if (errorText.errorPasswordText) initFormState();
          if (!currentValue) return;
          currentValue.password.current = event.target.value;
        }}
        onKeyDown={({ key }) => key === 'Enter' && onSubmit()}
      />

      <SubmitButton
        data-testid="submit-button"
        variant="contained"
        size="large"
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={onSubmit}
      >
        제출
      </SubmitButton>
    </>
  );
};
