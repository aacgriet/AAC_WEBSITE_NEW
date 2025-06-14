// src/hooks/useLocalStorage.js - Fixed version
import { useState, useEffect, useCallback } from 'react';
import { StorageManager } from '@/lib/storage';

export function useLocalStorage(key, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      console.log(`Loading data for key: ${key}`);
      const storedData = StorageManager.get(key);
      console.log(`Loaded data:`, storedData);
      setData(storedData);
      setLoading(false);
    } catch (err) {
      console.error(`Error loading data for key ${key}:`, err);
      setError(err);
      setLoading(false);
    }
  }, [key]);

  const addItem = useCallback((item) => {
    try {
      console.log(`Adding item to ${key}:`, item);
      const newItem = StorageManager.add(key, item);
      console.log(`Item added successfully:`, newItem);
      
      // Update local state immediately
      setData(prevData => {
        const updatedData = [...prevData, newItem];
        console.log(`Updated data:`, updatedData);
        return updatedData;
      });
      
      return newItem;
    } catch (err) {
      console.error(`Error adding item to ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key]);

  const updateItem = useCallback((id, updates) => {
    try {
      console.log(`Updating item ${id} in ${key}:`, updates);
      const updatedItem = StorageManager.update(key, id, updates);
      console.log(`Item updated successfully:`, updatedItem);
      
      if (updatedItem) {
        // Update local state immediately
        setData(prevData => {
          const updatedData = prevData.map(item => item.id === id ? updatedItem : item);
          console.log(`Updated data:`, updatedData);
          return updatedData;
        });
      }
      return updatedItem;
    } catch (err) {
      console.error(`Error updating item ${id} in ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key]);

  const deleteItem = useCallback((id) => {
    try {
      console.log(`Deleting item ${id} from ${key}`);
      const success = StorageManager.delete(key, id);
      console.log(`Delete success:`, success);
      
      if (success) {
        // Update local state immediately
        setData(prevData => {
          const updatedData = prevData.filter(item => item.id !== id);
          console.log(`Updated data after delete:`, updatedData);
          return updatedData;
        });
      }
      return success;
    } catch (err) {
      console.error(`Error deleting item ${id} from ${key}:`, err);
      setError(err);
      return false;
    }
  }, [key]);

  const getItemById = useCallback((id) => {
    const item = data.find(item => item.id === id) || null;
    console.log(`Getting item ${id} from ${key}:`, item);
    return item;
  }, [data, key]);

  const refresh = useCallback(() => {
    try {
      console.log(`Refreshing data for ${key}`);
      const storedData = StorageManager.get(key);
      console.log(`Refreshed data:`, storedData);
      setData(storedData);
      setError(null);
    } catch (err) {
      console.error(`Error refreshing data for ${key}:`, err);
      setError(err);
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
    try {
      console.log(`Loading item ${id} from ${key}`);
      const storedItem = StorageManager.getById(key, id);
      console.log(`Loaded item:`, storedItem);
      setItem(storedItem);
      setLoading(false);
    } catch (err) {
      console.error(`Error loading item ${id} from ${key}:`, err);
      setError(err);
      setLoading(false);
    }
  }, [key, id]);

  const updateItem = useCallback((updates) => {
    try {
      console.log(`Updating item ${id} in ${key}:`, updates);
      const updatedItem = StorageManager.update(key, id, updates);
      console.log(`Item updated successfully:`, updatedItem);
      setItem(updatedItem);
      return updatedItem;
    } catch (err) {
      console.error(`Error updating item ${id} in ${key}:`, err);
      setError(err);
      return null;
    }
  }, [key, id]);

  const deleteItem = useCallback(() => {
    try {
      console.log(`Deleting item ${id} from ${key}`);
      const success = StorageManager.delete(key, id);
      console.log(`Delete success:`, success);
      if (success) {
        setItem(null);
      }
      return success;
    } catch (err) {
      console.error(`Error deleting item ${id} from ${key}:`, err);
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