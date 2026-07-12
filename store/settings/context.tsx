'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { settingsReducer, initialSettingsState, SettingsState } from './reducer';
import { settingsService } from '@/lib/services/settings.service';
import { Settings } from '@/types/settings';

interface SettingsContextType extends SettingsState {
  updateSettings: (updates: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, initialSettingsState);

  useEffect(() => {
    const initSettings = async () => {
      dispatch({ type: 'FETCH_START' });
      const response = await settingsService.getSettings();
      if (response.success && response.data) {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } else {
        dispatch({ type: 'FETCH_FAILURE', payload: response.error?.message || 'Failed to load settings' });
      }
    };
    
    initSettings();
  }, []);

  const updateSettings = async (updates: Partial<Settings>) => {
    if (!state.settings) return;
    
    const previousSettings = state.settings;
    dispatch({ type: 'UPDATE_OPTIMISTIC', payload: updates });

    const response = await settingsService.updateSettings(updates);
    
    if (response.success && response.data) {
      dispatch({ type: 'UPDATE_SUCCESS', payload: response.data });
    } else {
      dispatch({ 
        type: 'UPDATE_FAILURE', 
        payload: { 
          error: response.error?.message || 'Failed to update settings',
          revertTo: previousSettings
        } 
      });
    }
  };

  return (
    <SettingsContext.Provider value={{ ...state, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
