import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

interface IWrapperRouteProps {
  type: 'private' | 'auth';
}

const WrapperRoute: React.FC<IWrapperRouteProps> = ({ type }) => {
  const { user } = useAuth();

  let Layout = AuthLayout;

  if (type === 'private') Layout = DefaultLayout;

  if (user && type === 'auth') {
    return <Navigate to="/dashboard" />;
  }

  return (type === 'private') === !!user || type === 'auth' ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={type === 'private' ? '/' : '/dashboard'} />
  );
};

export default WrapperRoute;
