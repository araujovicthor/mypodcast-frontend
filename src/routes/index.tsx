import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';

import WrapperRoute from './WrapperRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<WrapperRoute type="auth" />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastrar" element={<SignUp />} />
      </Route>

      <Route element={<WrapperRoute type="private" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorias" element={<Categories />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
