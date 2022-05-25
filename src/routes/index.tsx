import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Channels from '../pages/Channels';
import Channel from '../pages/Channel';
import Follow from '../pages/Follow';

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
        <Route path="/canais" element={<Channels />} />
        <Route path="/canais/:id" element={<Channel />} />
        <Route path="/favoritos" element={<Follow />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
