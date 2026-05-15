export const getPasswordRules = (password = '') => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

export const isPasswordValid = (password) => {
  return Object.values(getPasswordRules(password)).every(Boolean);
};
