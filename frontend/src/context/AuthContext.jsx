import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem('sams_user');
       if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (data) => {
    const response = await api.post('/auth/login', data);
    setUser(response.data.user);
    window.localStorage.setItem('sams_user', JSON.stringify(response.data.user));
    return response.data;
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('sams_user');
    window.location.href = '/login';
  };

  const register = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
