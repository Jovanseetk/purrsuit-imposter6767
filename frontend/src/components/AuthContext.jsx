import { createContext, useContext, useState } from 'react';
import { isLoggedIn, loginWithGoogle, logout } from '../services/auth-service.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, loginWithGoogle, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);