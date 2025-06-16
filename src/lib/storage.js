// src/lib/storage.js - Fixed version with better error handling
import { DatabaseService } from './database';

export const STORAGE_KEYS = {
  NEWS: 'aac_news',
  EVENTS: 'aac_events',
  PROJECTS: 'aac_projects',
  PUBLICATIONS: 'aac_publications',
  PATENTS: 'aac_patents',
  BOOKS: 'aac_books',
  ALUMNI: 'aac_alumni',
  STARTUPS: 'aac_startups',
  CORE_COMMITTEE: 'aac_core_committee'
};

export class StorageManager {
  // Check if we're in a browser environment
  static isBrowser() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Use database in production/server, localStorage in development
  static useDatabase() {
    return !this.isBrowser() || process.env.NODE_ENV === 'production';
  }

  // Get data with proper error handling
  static async get(key) {
    try {
      console.log(`StorageManager.get: Getting data for key: ${key}`);
      
      if (this.useDatabase()) {
        console.log(`StorageManager.get: Using database for key: ${key}`);
        const data = await DatabaseService.get(key);
        console.log(`StorageManager.get: Database returned:`, data);
        return Array.isArray(data) ? data : [];
      } else {
        console.log(`StorageManager.get: Using localStorage for key: ${key}`);
        const stored = localStorage.getItem(key);
        const data = stored ? JSON.parse(stored) : [];
        console.log(`StorageManager.get: localStorage returned:`, data);
        return Array.isArray(data) ? data : [];
      }
    } catch (error) {
      console.error(`StorageManager.get: Error getting data for key ${key}:`, error);
      return [];
    }
  }

  // Set data with proper error handling
  static async set(key, data) {
    try {
      console.log(`StorageManager.set: Setting data for key: ${key}`, data);
      
      const arrayData = Array.isArray(data) ? data : [];
      
      if (this.useDatabase()) {
        console.log(`StorageManager.set: Using database for key: ${key}`);
        const success = await DatabaseService.set(key, arrayData);
        console.log(`StorageManager.set: Database result:`, success);
        return success;
      } else {
        console.log(`StorageManager.set: Using localStorage for key: ${key}`);
        localStorage.setItem(key, JSON.stringify(arrayData));
        console.log(`StorageManager.set: localStorage updated successfully`);
        return true;
      }
    } catch (error) {
      console.error(`StorageManager.set: Error setting data for key ${key}:`, error);
      return false;
    }
  }

  // Add item with better error handling and success confirmation
  static async add(key, item) {
    try {
      console.log(`StorageManager.add: Adding item to key: ${key}`, item);
      
      if (this.useDatabase()) {
        console.log(`StorageManager.add: Using database for key: ${key}`);
        const result = await DatabaseService.add(key, item);
        console.log(`StorageManager.add: Database result:`, result);
        return result;
      } else {
        console.log(`StorageManager.add: Using localStorage for key: ${key}`);
        const currentData = await this.get(key);
        const newItem = {
          ...item,
          id: item.id || this.generateId(),
          createdAt: item.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const updatedData = [...currentData, newItem];
        const success = await this.set(key, updatedData);
        
        if (success) {
          console.log(`StorageManager.add: localStorage add successful:`, newItem);
          return newItem;
        } else {
          console.error(`StorageManager.add: localStorage add failed`);
          return null;
        }
      }
    } catch (error) {
      console.error(`StorageManager.add: Error adding item to key ${key}:`, error);
      return null;
    }
  }

  // Update item with better error handling
  static async update(key, id, updates) {
    try {
      console.log(`StorageManager.update: Updating item ${id} in key: ${key}`, updates);
      
      if (this.useDatabase()) {
        console.log(`StorageManager.update: Using database for key: ${key}`);
        const result = await DatabaseService.update(key, id, updates);
        console.log(`StorageManager.update: Database result:`, result);
        return result;
      } else {
        console.log(`StorageManager.update: Using localStorage for key: ${key}`);
        const currentData = await this.get(key);
        const itemIndex = currentData.findIndex(item => item.id === id || item._id === id);
        
        if (itemIndex === -1) {
          console.error(`StorageManager.update: Item ${id} not found in key ${key}`);
          return null;
        }
        
        const updatedItem = {
          ...currentData[itemIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        const updatedData = [...currentData];
        updatedData[itemIndex] = updatedItem;
        
        const success = await this.set(key, updatedData);
        
        if (success) {
          console.log(`StorageManager.update: localStorage update successful:`, updatedItem);
          return updatedItem;
        } else {
          console.error(`StorageManager.update: localStorage update failed`);
          return null;
        }
      }
    } catch (error) {
      console.error(`StorageManager.update: Error updating item ${id} in key ${key}:`, error);
      return null;
    }
  }

  // Delete item with better error handling and confirmation
  static async delete(key, id) {
    try {
      console.log(`StorageManager.delete: Deleting item ${id} from key: ${key}`);
      
      if (this.useDatabase()) {
        console.log(`StorageManager.delete: Using database for key: ${key}`);
        const success = await DatabaseService.delete(key, id);
        console.log(`StorageManager.delete: Database result:`, success);
        return success;
      } else {
        console.log(`StorageManager.delete: Using localStorage for key: ${key}`);
        const currentData = await this.get(key);
        const itemExists = currentData.some(item => item.id === id || item._id === id);
        
        if (!itemExists) {
          console.warn(`StorageManager.delete: Item ${id} not found in key ${key}`);
          return false;
        }
        
        const updatedData = currentData.filter(item => item.id !== id && item._id !== id);
        const success = await this.set(key, updatedData);
        
        console.log(`StorageManager.delete: localStorage delete result:`, success);
        return success;
      }
    } catch (error) {
      console.error(`StorageManager.delete: Error deleting item ${id} from key ${key}:`, error);
      return false;
    }
  }

  // Get item by ID with better error handling
  static async getById(key, id) {
    try {
      console.log(`StorageManager.getById: Getting item ${id} from key: ${key}`);
      
      if (this.useDatabase()) {
        console.log(`StorageManager.getById: Using database for key: ${key}`);
        const result = await DatabaseService.getById(key, id);
        console.log(`StorageManager.getById: Database result:`, result);
        return result;
      } else {
        console.log(`StorageManager.getById: Using localStorage for key: ${key}`);
        const currentData = await this.get(key);
        const item = currentData.find(item => item.id === id || item._id === id) || null;
        console.log(`StorageManager.getById: localStorage result:`, item);
        return item;
      }
    } catch (error) {
      console.error(`StorageManager.getById: Error getting item ${id} from key ${key}:`, error);
      return null;
    }
  }

  // Generate ID
  static generateId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `${timestamp}_${randomStr}`;
  }

  // Export data
  static async exportData() {
    const data = {};
    
    for (const [name, key] of Object.entries(STORAGE_KEYS)) {
      try {
        data[key] = await this.get(key);
      } catch (error) {
        console.error(`Export error for ${key}:`, error);
        data[key] = [];
      }
    }
    
    return data;
  }

  // Import data
  static async importData(data) {
    let totalImported = 0;
    
    for (const [key, value] of Object.entries(data)) {
      if (Object.values(STORAGE_KEYS).includes(key) && Array.isArray(value)) {
        try {
          await this.set(key, value);
          totalImported += value.length;
        } catch (error) {
          console.error(`Import error for ${key}:`, error);
        }
      }
    }
    
    return totalImported;
  }

  // Clear all data
  static async clearAll() {
    if (this.useDatabase()) {
      await DatabaseService.clearAll();
    } else {
      for (const key of Object.values(STORAGE_KEYS)) {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error(`Clear error for ${key}:`, error);
        }
      }
    }
  }

  // Get storage statistics
  static async getStorageStats() {
    try {
      if (this.useDatabase()) {
        return await DatabaseService.getStorageStats();
      } else {
        const stats = {
          available: this.isBrowser(),
          keys: {},
          totalItems: 0
        };

        for (const [name, key] of Object.entries(STORAGE_KEYS)) {
          try {
            const data = await this.get(key);
            stats.keys[name] = {
              key: key,
              count: data.length,
              lastUpdated: data.length > 0 ? Math.max(...data.map(item => 
                new Date(item.updatedAt || item.createdAt || 0).getTime()
              )) : null
            };
            stats.totalItems += data.length;
          } catch (error) {
            console.error(`Stats error for ${key}:`, error);
            stats.keys[name] = {
              key: key,
              count: 0,
              lastUpdated: null
            };
          }
        }

        return stats;
      }
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return {
        available: false,
        keys: {},
        totalItems: 0,
        error: error.message
      };
    }
  }
}