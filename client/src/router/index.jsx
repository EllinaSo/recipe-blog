import { createBrowserRouter, redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NewRecipe from '../pages/NewRecipe';
import DashboardRecipes from '../pages/DashboardRecipes';
import DashboardLayout from '../components/DashboardLayout';
import Layout from '../components/Layout';
import { getUserFromStorage } from '../utils/auth';

export default createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'auth',
        Component: Auth,
        loader: () => (getUserFromStorage() ? redirect('/') : null),
      },
      {
        path: 'dashboard',
        Component: DashboardLayout,
        loader: () => (getUserFromStorage() ? null : redirect('/auth')),
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: 'profile',
            Component: Profile,
          },
          {
            path: 'recipes',
            Component: DashboardRecipes,
          },
        ],
      },
      {
        path: 'new-recipe',
        Component: NewRecipe,
        loader: () => (getUserFromStorage()?.isAdmin ? null : redirect('/')),
      },
    ],
  },
]);
