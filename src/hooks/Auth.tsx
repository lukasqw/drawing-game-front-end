import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  score: number;
}

interface AuthState {
  user: User;
}

interface SingInCredentials {
  name: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Draw:user');

    if(user) return { user: JSON.parse(user) };

    return {} as AuthState;
  });

  const signIn = useCallback(async (newUser) => {
    const response = await api.post("/users", newUser);

    const user = response.data;

    localStorage.setItem('@Draw:user', JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@Draw:user');

    await api.delete(`/users/${data.user.id}`);

    setData({} as AuthState);
  }, [data]);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
