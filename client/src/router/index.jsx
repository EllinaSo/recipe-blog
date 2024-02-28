import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Layout from '../components/Layout';

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
      },
    ],
  },
]);
