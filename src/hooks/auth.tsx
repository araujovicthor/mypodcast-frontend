import React, { useState, createContext, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  loading: boolean;
  setLoading(data: boolean): void;
  signIn(credential: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@mypodcast:token');
    const user = localStorage.getItem('@mypodcast:user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      const response = await api.post<{ token: string; user: IUser }>(
        'sessions',
        {
          email,
          password,
        },
      );

      setLoading(false);

      if (response?.data?.token && response?.data?.user) {
      const { token, user } = response.data;

      
      localStorage.setItem('@mypodcast:token', token);
      localStorage.setItem('@mypodcast:user', JSON.stringify(user));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setData({ token, user });

      navigate('/dashboard');
      }
    },
    [navigate],
  );

  const updateUser = useCallback(
    async (user: IUser) => {
      localStorage.setItem('@mypodcast:user', JSON.stringify(user));

      setData({ token: data.token, user });
    },
    [data.token],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@mypodcast:token');
    localStorage.removeItem('@mypodcast:user');

    navigate('/');

    setData({} as IAuthState);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        setLoading,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
