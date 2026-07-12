import { Settings } from '@/types/settings';

export interface SettingsState {
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
}

export const initialSettingsState: SettingsState = {
  settings: null,
  isLoading: true,
  error: null,
};

export type SettingsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Settings }
  | { type: 'FETCH_FAILURE'; payload: string }
  | { type: 'UPDATE_OPTIMISTIC'; payload: Partial<Settings> }
  | { type: 'UPDATE_SUCCESS'; payload: Settings }
  | { type: 'UPDATE_FAILURE'; payload: { error: string, revertTo: Settings } };

export function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, settings: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'UPDATE_OPTIMISTIC':
      if (!state.settings) return state;
      // Note: This simplistic merge only works perfectly for shallow updates
      // A deep merge utility would be better for nested settings
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'UPDATE_SUCCESS':
      return { ...state, settings: action.payload, error: null };
    case 'UPDATE_FAILURE':
      return { ...state, settings: action.payload.revertTo, error: action.payload.error };
    default:
      return state;
  }
}
