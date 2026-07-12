import { HistoryItem } from '@/types/history';

export interface HistoryState {
  items: HistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
}

export const initialHistoryState: HistoryState = {
  items: [],
  totalCount: 0,
  page: 1,
  pageSize: 12,
  isLoading: true,
  error: null,
};

export type HistoryAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { items: HistoryItem[]; totalCount: number; page: number } }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'ADD_ITEM'; payload: HistoryItem };

export function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        items: action.payload.page === 1 ? action.payload.items : [...state.items, ...action.payload.items],
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        error: null 
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'DELETE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload),
        totalCount: state.totalCount - 1
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
        totalCount: state.totalCount + 1
      };
    default:
      return state;
  }
}
