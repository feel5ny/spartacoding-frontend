import { useState } from 'react';
import { useValidateCredential } from '../hooks/use-validate-credential';
import {
  Button,
  Card,
  FormHelperTextProps,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email || !password;

  const {
    emailErrorMessage,
    passwordErrorMessage,
    validateCredential,
    initErrorMessage,
  } = useValidateCredential();

  return (
    <main
      style={{
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <section>
        <Card sx={{ padding: 3, width: 300 }}>
          <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
            회원가입
          </Typography>
          <TextField
            label="이메일"
            type="email"
            inputProps={{
              'data-testid': 'email',
            }}
            onChange={(event) => {
              if (emailErrorMessage) initErrorMessage('email');
              setEmail(event.target.value);
            }}
            FormHelperTextProps={
              {
                'data-testid': 'email-helper-text',
              } as FormHelperTextProps
            }
            helperText={emailErrorMessage}
            error={Boolean(emailErrorMessage)}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <TextField
            label="패스워드"
            type="password"
            inputProps={{
              'data-testid': 'password',
            }}
            FormHelperTextProps={
              {
                'data-testid': 'password-helper-text',
              } as FormHelperTextProps
            }
            onChange={(event) => {
              if (passwordErrorMessage) initErrorMessage('password');
              setPassword(event.target.value);
            }}
            helperText={passwordErrorMessage}
            error={Boolean(passwordErrorMessage)}
            fullWidth
            style={{ marginBottom: 8 }}
          />
          <Button
            type="submit"
            data-testid="submit-button"
            disabled={disabled}
            onClick={() => {
              const { isValid } = validateCredential({ email, password });
              if (!isValid) return;
            }}
            variant="contained"
            fullWidth
            size="large"
          >
            제출
          </Button>
        </Card>
        <Typography variant="caption" mb={2} sx={{ color: grey[600] }}>
          SpartaCoding Frontend - week2
        </Typography>
      </section>
    </main>
  );
};
