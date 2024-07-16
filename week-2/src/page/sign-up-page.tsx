import { useState } from 'react';
import { useValidateCredential } from '../hooks/use-validate-credential';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email || !password;

  const { emailErrorMessage, validateCredential } = useValidateCredential();

  return (
    <>
      <input
        type="email"
        data-testid="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      {emailErrorMessage && (
        <p data-testid="helper-text">{emailErrorMessage}</p>
      )}
      <input
        type="password"
        data-testid="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        type="submit"
        data-testid="submit-button"
        disabled={disabled}
        onClick={() => {
          validateCredential({ email, password });
        }}
      >
        제출
      </button>
    </>
  );
};
