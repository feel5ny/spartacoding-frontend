import { validationEmail, validationPassword } from '../utils/validation';

export const validationCredential = (email: string, password: string) => {
  const isValidEmail = validationEmail(email);
  const isValidPassword = validationPassword(password);

  return {
    isValidAll: isValidEmail && isValidPassword,
    isValidEmail,
    isValidPassword,
  };
};
