export const validateEmailPattern = (email: string) => {
    const regexr =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regexr.test(email);
  };
  
  /**
   * @description Minimum eight characters, at least one letter, one number and one special character
   */
  export const validatePasswordPattern = (password: string) => {
    const regexr =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    return regexr.test(password);
  };
  