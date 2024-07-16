import { useState } from 'react';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabled = !email || !password;

  return (
    <>
      <input
        type="email"
        data-testid="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        data-testid="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit" data-testid="submit-button" disabled={disabled}>
        제출
      </button>
    </>
  );
};
