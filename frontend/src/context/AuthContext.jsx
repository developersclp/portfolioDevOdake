import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('adminToken'));

  const login = async (username, password) => {
    try {
      const data = await adminLogin(username, password);
      // Because we use a fake token mechanism, access_token works.
      const token = data.access_token;
      setAuthToken(token);
      localStorage.setItem('adminToken', token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated: !!authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
