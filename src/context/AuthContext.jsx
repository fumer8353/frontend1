import { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const subscribe = async () => {
    try {
      const response = await api.post('/subscription/subscribe');
      const { user: updatedUser } = response.data;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Subscription failed'
      };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/subscription/status');
      const updatedUser = { ...user, isSubscribed: response.data.isSubscribed };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return {
        success: true,
        message: response.data?.message,
        resetToken: response.data?.resetToken
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unable to request password reset'
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return {
        success: true,
        message: response.data?.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Unable to reset password'
      };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    subscribe,
    refreshUser,
    requestPasswordReset,
    resetPassword,
    loading,
    isAdmin: user?.role === 'admin',
    isSubscribed: user?.isSubscribed || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

