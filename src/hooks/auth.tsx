import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { isTokenExpired } from '../components/utils';


interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [data, setData] = useState<AuthState>({} as AuthState)

  useEffect(() => {
    const loadStoragedData = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user && !isTokenExpired(token)) {
        setData({ token: token, user: JSON.parse(user) });
      }
    }
    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ cpf, password }: SignInCredentials) => {
    const response = await api.post('login', {
      cpf,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    setData({ token, user });
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
