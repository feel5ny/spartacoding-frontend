import { validationEmail, validationPassword } from '../utils/validation';

export const validateCredential = (email: string, password: string) => {
  const isValidEmail = validationEmail(email);
  const isValidPassword = validationPassword(password);

  return {
    isValidEmail,
    isValidPassword,
    isValidAll: isValidEmail && isValidPassword,
  };
};
