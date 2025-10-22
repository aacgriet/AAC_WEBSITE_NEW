// src/hooks/useLocalStorage.js - Fixed version with better delete handling
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
        setError(null);
        
        const storedData = await StorageManager.get(key);
        console.log(`useLocalStorage: Loaded data:`, storedData);
        
        if (isMounted) {
          setData(storedData);
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
          console.log(`useLocalStorage: Updated data after add:`, updatedData);
          return updatedData;
        });
        return newItem;
      } else {
        throw new Error('Failed to add item');
      }
    } catch (err) {
      console.error(`useLocalStorage: Error adding item to ${key}:`, err);
      setError(err);
      throw err; // Re-throw to let the component handle it
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
          console.log(`useLocalStorage: Updated data after update:`, updatedData);
          return updatedData;
        });
        return updatedItem;
      } else {
        throw new Error('Failed to update item');
      }
    } catch (err) {
      console.error(`useLocalStorage: Error updating item ${id} in ${key}:`, err);
      setError(err);
      throw err; // Re-throw to let the component handle it
    }
  }, [key]);

  const deleteItem = useCallback(async (id) => {
    try {
      console.log(`useLocalStorage: Deleting item ${id} from ${key}`);
      setError(null);
      
      // Optimistically update UI first
      const originalData = data;
      setData(prevData => {
        const updatedData = prevData.filter(item => item.id !== id && item._id !== id);
        console.log(`useLocalStorage: Optimistically updated data after delete:`, updatedData);
        return updatedData;
      });
      
      // Attempt the actual delete
      const success = await StorageManager.delete(key, id);
      console.log(`useLocalStorage: Delete success:`, success);
      
      if (!success) {
        // Revert the optimistic update if the delete failed
        console.error(`useLocalStorage: Delete failed, reverting data`);
        setData(originalData);
        throw new Error('Failed to delete item');
      }
      
      return true;
    } catch (err) {
      console.error(`useLocalStorage: Error deleting item ${id} from ${key}:`, err);
      setError(err);
      
      // Revert optimistic update on error
      setData(data);
      throw err; // Re-throw to let the component handle it
    }
  }, [key, data]);

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
        setError(null);
        
        const storedItem = await StorageManager.getById(key, id);
        console.log(`useLocalStorageItem: Loaded item:`, storedItem);
        
        if (isMounted) {
          setItem(storedItem);
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
        return updatedItem;
      } else {
        throw new Error('Failed to update item');
      }
    } catch (err) {
      console.error(`useLocalStorageItem: Error updating item ${id} in ${key}:`, err);
      setError(err);
      throw err;
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
        return true;
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (err) {
      console.error(`useLocalStorageItem: Error deleting item ${id} from ${key}:`, err);
      setError(err);
      throw err;
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