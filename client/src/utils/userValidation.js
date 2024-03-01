export const passwordLength = {
  minLength: {
    value: 8,
    message: 'Password must be 8 characters or longer',
  },
};

export const usernameMinLength = {
  minLength: {
    value: 8,
    message: 'Username must be 8 characters or longer',
  },
};

export const usernameMaxLength = {
  maxLength: {
    value: 20,
    message: 'Username must be 20 characters or shorter',
  },
};

export const usernameValidation = (username) => {
  if (username.includes(' ')) {
    return 'Username cannot contain spaces';
  }
  if (username !== username.toLowerCase()) {
    return 'Username must be lowercase';
  }
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    return 'Username can only contain letters and numbers';
  }
  return true;
};

export const emailValidation = (email) => (email.match(/\S+@\S+\.\S+/) ? true : 'Email is invalid');
