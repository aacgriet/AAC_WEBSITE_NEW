// src/hooks/useAppData.js - Unified hook to handle both database and localStorage
import { useDatabase } from './useDatabase';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

// Check if we should use database
const USE_DATABASE = process.env.NEXT_PUBLIC_USE_DATABASE === 'true';

// Map storage keys to database table names
const STORAGE_TO_TABLE_MAP = {
  [STORAGE_KEYS.NEWS]: 'news',
  [STORAGE_KEYS.PROJECTS]: 'projects',
  [STORAGE_KEYS.EVENTS]: 'events',
  [STORAGE_KEYS.PUBLICATIONS]: 'publications',
  [STORAGE_KEYS.PATENTS]: 'patents',
  [STORAGE_KEYS.BOOKS]: 'books',
  [STORAGE_KEYS.ALUMNI]: 'alumni',
  [STORAGE_KEYS.STARTUPS]: 'startups',
  [STORAGE_KEYS.CORE_COMMITTEE]: 'corecommittee'
};

export const useAppData = (storageKey) => {
  const tableName = STORAGE_TO_TABLE_MAP[storageKey];
  
  // Use database hook if enabled, otherwise use localStorage
  const databaseHook = useDatabase(tableName);
  const localStorageHook = useLocalStorage(storageKey);
  
  if (USE_DATABASE && tableName) {
    return {
      ...databaseHook,
      // Add some compatibility methods for localStorage API
      setData: (newData) => {
        // This would need to be implemented if you need to set all data at once
        console.warn('setData not implemented for database mode');
      }
    };
  }
  
  return {
    ...localStorageHook,
    // Add loading and error states for compatibility with database hook
    loading: false,
    error: null,
    refresh: () => {
      // Refresh localStorage data if needed
      console.log('Refresh called for localStorage');
    }
  };
};