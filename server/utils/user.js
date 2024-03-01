export const validatePasswordLength = (password) =>
  password.length < 8 ? 'Password must be 8 characters or longer' : false;

export const validateUsernameLength = (username) =>
  (username.length < 8 || username.length > 20) ? 'Username must be between 7 and 20 characters' : false;

export const validateUsernameSpace = (username) =>
  (username.includes(' ')) ? 'Username cannot contain spaces' : false;

export const validateUsernameCase = (username) =>
  (username !== username.toLowerCase()) ? 'Username must be lowercase' : false;

export const validateUsernameSymbols = (username) =>
  (!username.match(/^[a-zA-Z0-9]+$/)) ? 'Username can only contain letters and numbers' : false;
