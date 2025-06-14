// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';
import { StorageManager } from '@/lib/storage';

export function useLocalStorage(key, initialValue = []) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedData = StorageManager.get(key);
      setData(storedData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [key]);

  const addItem = (item) => {
    try {
      const newItem = StorageManager.add(key, item);
      setData(prevData => [...prevData, newItem]);
      return newItem;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const updateItem = (id, updates) => {
    try {
      const updatedItem = StorageManager.update(key, id, updates);
      if (updatedItem) {
        setData(prevData => 
          prevData.map(item => item.id === id ? updatedItem : item)
        );
      }
      return updatedItem;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const deleteItem = (id) => {
    try {
      const success = StorageManager.delete(key, id);
      if (success) {
        setData(prevData => prevData.filter(item => item.id !== id));
      }
      return success;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getItemById = (id) => {
    return data.find(item => item.id === id) || null;
  };

  const refresh = () => {
    try {
      const storedData = StorageManager.get(key);
      setData(storedData);
    } catch (err) {
      setError(err);
    }
  };

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
      const storedItem = StorageManager.getById(key, id);
      setItem(storedItem);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [key, id]);

  const updateItem = (updates) => {
    try {
      const updatedItem = StorageManager.update(key, id, updates);
      setItem(updatedItem);
      return updatedItem;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const deleteItem = () => {
    try {
      const success = StorageManager.delete(key, id);
      if (success) {
        setItem(null);
      }
      return success;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  return {
    item,
    loading,
    error,
    updateItem,
    deleteItem
  };
}