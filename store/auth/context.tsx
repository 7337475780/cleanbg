'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authReducer, initialState, AuthState } from './reducer';
import { authService } from '@/lib/services/auth.service';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response.success) {
          dispatch({ type: 'SET_USER', payload: response.data || null });
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
      } catch (error) {
        dispatch({ type: 'SET_USER', payload: null });
      }
    };
    
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    const response = await authService.login(email, password);
    if (response.success && response.data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: response.error?.message || 'Login failed' });
    }
  };

  const signup = async (email: string, password: string, name: string) => {
     dispatch({ type: 'LOGIN_START' });
     const response = await authService.signup(email, password, name);
     if (response.success && response.data) {
       dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
     } else {
       dispatch({ type: 'LOGIN_FAILURE', payload: response.error?.message || 'Signup failed' });
     }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
