export const LINKS = [
  {
    path: '/',
    title: 'Home',
  },
  // {
  //   path: '/recipes',
  //   title: 'Recipes',
  // },
];

export const DASHBOARD_LINKS = [
  // {
  //   path: '/dashboard',
  //   title: 'Dashboard',
  // },
  {
    path: '/dashboard/profile',
    title: 'Profile',
    adminPage: false,
  },
  {
    path: '/dashboard/recipes',
    title: 'Recipes',
    adminPage: true,
  },
];

export const SIGN_IN = {
  text: 'Sign in',
  path: '/auth',
};
