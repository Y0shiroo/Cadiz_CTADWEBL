import './App.css';

import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import DashLayout from './components/DashLayout';

import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';
import WelcomePage from './pages/WelcomePage';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/articles',
        element: <ArticleListPage />
      },
      {
        path: '/articles/individual',
        element: <ArticlePage />
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <RegistrationPage />,
      },
    ],
  },
{
  path: '/dashboard',
  element: <DashLayout />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '',
      element: <DashboardPage />,
    },
    {
      path: 'articles',
      element: <DashArticleListPage />,
    },
    {
      path: 'users',
      element: <UsersPage />,
    },
    {
      path: 'reports',
      element: <ReportsPage />,
    },
  ],
} 
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;