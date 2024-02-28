export const setUserToStorage = (userData) => sessionStorage.setItem('profile', JSON.stringify(userData));

export const removeUserFromStorage = () => sessionStorage.removeItem('profile');

export const getUserFromStorage = () => JSON.parse(sessionStorage.getItem('profile'));
