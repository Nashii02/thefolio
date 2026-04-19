// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: if a token exists in localStorage, fetch the user's data
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token')) // Invalid token
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login: authenticate user and save token to localStorage
  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  // Logout: clear token and user from state
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook: use this instead of useContext(AuthContext) directly
export const useAuth = () => useContext(AuthContext);