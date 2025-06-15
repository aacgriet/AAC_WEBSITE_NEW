// src/hooks/useLocalStorage.js - Updated to work with async database operations
import { useState, useEffect, useCallback } from 'react';
import { StorageManager } from '@/lib/storage';

export function useLocalStorage(key, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        console.log(`useLocalStorage: Loading data for key: ${key}`);
        setLoading(true);
        const storedData = await StorageManager.get(key);
        console.log(`useLocalStorage: Loaded data:`, storedData);
        
        if (isMounted) {
          setData(storedData);
          setError(null);
        }
      } catch (err) {
        console.error(`useLocalStorage: Error loading data for key ${key}:`, err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [key]);

  const addItem = useCallback(async (item) => {
    try {
      console.log(`useLocalStorage: Adding item to ${key}:`, item);
      setError(null);
      
      const newItem = await StorageManager.add(key, item);
      console.log(`useLocalStorage: Item added successfully:`, newItem);
      
      if (newItem) {
        // Update local state immediately for better UX
        setData(prevData => {
          const updatedData = [...prevData, newItem];
          console.log(`useLocalStorage: Updated data:`, updatedData);
          return updatedData;
        });
      }
      
      return newItem;
    } catch (err) {
      console.error(`useLocalStorage: Error adding item to ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key]);

  const updateItem = useCallback(async (id, updates) => {
    try {
      console.log(`useLocalStorage: Updating item ${id} in ${key}:`, updates);
      setError(null);
      
      const updatedItem = await StorageManager.update(key, id, updates);
      console.log(`useLocalStorage: Item updated successfully:`, updatedItem);
      
      if (updatedItem) {
        // Update local state immediately for better UX
        setData(prevData => {
          const updatedData = prevData.map(item => 
            (item.id === id || item._id === id) ? updatedItem : item
          );
          console.log(`useLocalStorage: Updated data:`, updatedData);
          return updatedData;
        });
      }
      
      return updatedItem;
    } catch (err) {
      console.error(`useLocalStorage: Error updating item ${id} in ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key]);

  const deleteItem = useCallback(async (id) => {
    try {
      console.log(`useLocalStorage: Deleting item ${id} from ${key}`);
      setError(null);
      
      const success = await StorageManager.delete(key, id);
      console.log(`useLocalStorage: Delete success:`, success);
      
      if (success) {
        // Update local state immediately for better UX
        setData(prevData => {
          const updatedData = prevData.filter(item => item.id !== id && item._id !== id);
          console.log(`useLocalStorage: Updated data after delete:`, updatedData);
          return updatedData;
        });
      }
      
      return success;
    } catch (err) {
      console.error(`useLocalStorage: Error deleting item ${id} from ${key}:`, err);
      setError(err);
      return false;
    }
  }, [key]);

  const getItemById = useCallback((id) => {
    const item = data.find(item => (item.id === id || item._id === id)) || null;
    console.log(`useLocalStorage: Getting item ${id} from ${key}:`, item);
    return item;
  }, [data, key]);

  const refresh = useCallback(async () => {
    try {
      console.log(`useLocalStorage: Refreshing data for ${key}`);
      setLoading(true);
      setError(null);
      
      const storedData = await StorageManager.get(key);
      console.log(`useLocalStorage: Refreshed data:`, storedData);
      setData(storedData);
    } catch (err) {
      console.error(`useLocalStorage: Error refreshing data for ${key}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  // Clear any existing errors when data changes successfully
  useEffect(() => {
    if (data && data.length >= 0) {
      setError(null);
    }
  }, [data]);

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    refresh
  };
}

export function useLocalStorageItem(key, id) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadItem = async () => {
      try {
        console.log(`useLocalStorageItem: Loading item ${id} from ${key}`);
        setLoading(true);
        const storedItem = await StorageManager.getById(key, id);
        console.log(`useLocalStorageItem: Loaded item:`, storedItem);
        
        if (isMounted) {
          setItem(storedItem);
          setError(null);
        }
      } catch (err) {
        console.error(`useLocalStorageItem: Error loading item ${id} from ${key}:`, err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [key, id]);

  const updateItem = useCallback(async (updates) => {
    try {
      console.log(`useLocalStorageItem: Updating item ${id} in ${key}:`, updates);
      setError(null);
      
      const updatedItem = await StorageManager.update(key, id, updates);
      console.log(`useLocalStorageItem: Item updated successfully:`, updatedItem);
      
      if (updatedItem) {
        setItem(updatedItem);
      }
      
      return updatedItem;
    } catch (err) {
      console.error(`useLocalStorageItem: Error updating item ${id} in ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key, id]);

  const deleteItem = useCallback(async () => {
    try {
      console.log(`useLocalStorageItem: Deleting item ${id} from ${key}`);
      setError(null);
      
      const success = await StorageManager.delete(key, id);
      console.log(`useLocalStorageItem: Delete success:`, success);
      
      if (success) {
        setItem(null);
      }
      
      return success;
    } catch (err) {
      console.error(`useLocalStorageItem: Error deleting item ${id} from ${key}:`, err);
      setError(err);
      return false;
    }
  }, [key, id]);

  return {
    item,
    loading,
    error,
    updateItem,
    deleteItem
  };
}