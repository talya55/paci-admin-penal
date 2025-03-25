import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
      navigate('/navbar'); // Redirect to navbar if token exists
    } else {
      navigate('/login'); // Redirect to login if token is missing
    }
  }, []);

  const login = (data: any) => {
    localStorage.setItem('token', data.token);
    setUser(data);
    navigate('/navbar');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
