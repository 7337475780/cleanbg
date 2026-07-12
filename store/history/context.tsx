'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { historyReducer, initialHistoryState, HistoryState } from './reducer';
import { historyService } from '@/lib/services/history.service';

interface HistoryContextType extends HistoryState {
  fetchHistory: (page: number) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(historyReducer, initialHistoryState);

  const fetchHistory = useCallback(async (page: number) => {
    dispatch({ type: 'FETCH_START' });
    const response = await historyService.getHistory(page, state.pageSize);
    if (response.success && response.data) {
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { 
          items: response.data.items, 
          totalCount: response.data.totalCount, 
          page: response.data.page 
        } 
      });
    } else {
      dispatch({ type: 'FETCH_FAILURE', payload: response.error?.message || 'Failed to fetch history' });
    }
  }, [state.pageSize]);

  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);

  const deleteItem = async (id: string) => {
    const response = await historyService.deleteItem(id);
    if (response.success) {
      dispatch({ type: 'DELETE_ITEM', payload: id });
    }
    // In a real app we might want to show a toast error if it fails
  };

  return (
    <HistoryContext.Provider value={{ ...state, fetchHistory, deleteItem }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
