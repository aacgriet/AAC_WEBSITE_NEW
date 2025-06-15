// src/lib/storage.js - Updated to use database instead of localStorage
import { DatabaseService } from './database';

export const STORAGE_KEYS = {
  NEWS: 'aac_news',
  PROJECTS: 'aac_projects',
  EVENTS: 'aac_events',
  PUBLICATIONS: 'aac_publications',
  PATENTS: 'aac_patents',
  BOOKS: 'aac_books',
  ALUMNI: 'aac_alumni',
  CORE_COMMITTEE: 'aac_core_committee',
  STARTUPS: 'aac_startups'
};

// Feature flag to toggle between localStorage and database
const USE_DATABASE = process.env.NEXT_PUBLIC_USE_DATABASE === 'true';

export class StorageManager {
  static async get(key) {
    console.log(`StorageManager.get: Getting data for key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const result = await DatabaseService.get(key);
        console.log(`StorageManager.get: Retrieved ${result.length} items from database for key ${key}`);
        return result;
      } catch (error) {
        console.error(`StorageManager.get: Database error for key ${key}:`, error);
        // Fallback to localStorage if database fails
        return this.getFromLocalStorage(key);
      }
    } else {
      return this.getFromLocalStorage(key);
    }
  }

  static async set(key, data) {
    console.log(`StorageManager.set: Setting data for key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const success = await DatabaseService.set(key, data);
        console.log(`StorageManager.set: Database operation ${success ? 'successful' : 'failed'} for key ${key}`);
        
        // Also update localStorage as backup
        this.setToLocalStorage(key, data);
        
        return success;
      } catch (error) {
        console.error(`StorageManager.set: Database error for key ${key}:`, error);
        // Fallback to localStorage
        return this.setToLocalStorage(key, data);
      }
    } else {
      return this.setToLocalStorage(key, data);
    }
  }

  static async add(key, item) {
    console.log(`StorageManager.add: Adding item to key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const result = await DatabaseService.add(key, item);
        console.log(`StorageManager.add: Database add ${result ? 'successful' : 'failed'} for key ${key}`);
        
        // Also update localStorage as backup
        if (result) {
          const localItems = this.getFromLocalStorage(key);
          this.setToLocalStorage(key, [...localItems, result]);
        }
        
        return result;
      } catch (error) {
        console.error(`StorageManager.add: Database error for key ${key}:`, error);
        // Fallback to localStorage
        return this.addToLocalStorage(key, item);
      }
    } else {
      return this.addToLocalStorage(key, item);
    }
  }

  static async update(key, id, updates) {
    console.log(`StorageManager.update: Updating item ${id} in key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const result = await DatabaseService.update(key, id, updates);
        console.log(`StorageManager.update: Database update ${result ? 'successful' : 'failed'} for key ${key}`);
        
        // Also update localStorage as backup
        if (result) {
          const localItems = this.getFromLocalStorage(key);
          const index = localItems.findIndex(item => (item.id === id || item._id === id));
          if (index !== -1) {
            localItems[index] = result;
            this.setToLocalStorage(key, localItems);
          }
        }
        
        return result;
      } catch (error) {
        console.error(`StorageManager.update: Database error for key ${key}:`, error);
        // Fallback to localStorage
        return this.updateInLocalStorage(key, id, updates);
      }
    } else {
      return this.updateInLocalStorage(key, id, updates);
    }
  }

  static async delete(key, id) {
    console.log(`StorageManager.delete: Deleting item ${id} from key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const success = await DatabaseService.delete(key, id);
        console.log(`StorageManager.delete: Database delete ${success ? 'successful' : 'failed'} for key ${key}`);
        
        // Also update localStorage as backup
        if (success) {
          const localItems = this.getFromLocalStorage(key);
          const filteredItems = localItems.filter(item => item.id !== id && item._id !== id);
          this.setToLocalStorage(key, filteredItems);
        }
        
        return success;
      } catch (error) {
        console.error(`StorageManager.delete: Database error for key ${key}:`, error);
        // Fallback to localStorage
        return this.deleteFromLocalStorage(key, id);
      }
    } else {
      return this.deleteFromLocalStorage(key, id);
    }
  }

  static async getById(key, id) {
    console.log(`StorageManager.getById: Getting item ${id} from key ${key}, using database: ${USE_DATABASE}`);
    
    if (USE_DATABASE) {
      try {
        const result = await DatabaseService.getById(key, id);
        console.log(`StorageManager.getById: Database getById ${result ? 'found' : 'not found'} for key ${key}`);
        return result;
      } catch (error) {
        console.error(`StorageManager.getById: Database error for key ${key}:`, error);
        // Fallback to localStorage
        return this.getByIdFromLocalStorage(key, id);
      }
    } else {
      return this.getByIdFromLocalStorage(key, id);
    }
  }

  static async exportData() {
    console.log('StorageManager.exportData: Exporting all data');
    
    if (USE_DATABASE) {
      try {
        return await DatabaseService.exportData();
      } catch (error) {
        console.error('StorageManager.exportData: Database error:', error);
        // Fallback to localStorage
        return this.exportFromLocalStorage();
      }
    } else {
      return this.exportFromLocalStorage();
    }
  }

  static async importData(data) {
    console.log('StorageManager.importData: Importing data');
    
    if (USE_DATABASE) {
      try {
        return await DatabaseService.importData(data);
      } catch (error) {
        console.error('StorageManager.importData: Database error:', error);
        // Fallback to localStorage
        return this.importToLocalStorage(data);
      }
    } else {
      return this.importToLocalStorage(data);
    }
  }

  static async clearAll() {
    console.log('StorageManager.clearAll: Clearing all data');
    
    if (USE_DATABASE) {
      try {
        await DatabaseService.clearAll();
      } catch (error) {
        console.error('StorageManager.clearAll: Database error:', error);
      }
    }
    
    // Always clear localStorage too
    this.clearLocalStorage();
  }

  static async getStorageStats() {
    if (USE_DATABASE) {
      try {
        return await DatabaseService.getStorageStats();
      } catch (error) {
        console.error('StorageManager.getStorageStats: Database error:', error);
        return this.getLocalStorageStats();
      }
    } else {
      return this.getLocalStorageStats();
    }
  }

  // Helper method to generate IDs
  static generateId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    const id = `${timestamp}_${randomStr}`;
    console.log(`StorageManager.generateId: Generated ID: ${id}`);
    return id;
  }

  // LocalStorage fallback methods
  static getFromLocalStorage(key) {
    if (typeof window === 'undefined') {
      console.log(`StorageManager.getFromLocalStorage: Window is undefined for key ${key}`);
      return [];
    }
    
    try {
      const data = localStorage.getItem(key);
      const result = data ? JSON.parse(data) : [];
      console.log(`StorageManager.getFromLocalStorage: Retrieved ${result.length} items for key ${key}`);
      return result;
    } catch (error) {
      console.error(`StorageManager.getFromLocalStorage: Error reading from localStorage for key ${key}:`, error);
      return [];
    }
  }

  static setToLocalStorage(key, data) {
    if (typeof window === 'undefined') {
      console.log(`StorageManager.setToLocalStorage: Window is undefined for key ${key}`);
      return false;
    }
    
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`StorageManager.setToLocalStorage: Saved ${data.length} items for key ${key}`);
      return true;
    } catch (error) {
      console.error(`StorageManager.setToLocalStorage: Error writing to localStorage for key ${key}:`, error);
      return false;
    }
  }

  static addToLocalStorage(key, item) {
    const items = this.getFromLocalStorage(key);
    const newItem = {
      ...item,
      id: item.id || this.generateId(),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedItems = [...items, newItem];
    const success = this.setToLocalStorage(key, updatedItems);
    
    return success ? newItem : null;
  }

  static updateInLocalStorage(key, id, updates) {
    const items = this.getFromLocalStorage(key);
    const index = items.findIndex(item => item.id === id || item._id === id);
    
    if (index === -1) {
      console.error(`StorageManager.updateInLocalStorage: Item with id ${id} not found in ${key}`);
      return null;
    }
    
    const updatedItem = {
      ...items[index],
      ...updates,
      id: items[index].id || items[index]._id,
      _id: items[index]._id || items[index].id,
      createdAt: items[index].createdAt || items[index]._createdAt,
      updatedAt: new Date().toISOString()
    };
    
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    
    const success = this.setToLocalStorage(key, updatedItems);
    return success ? updatedItem : null;
  }

  static deleteFromLocalStorage(key, id) {
    const items = this.getFromLocalStorage(key);
    const filteredItems = items.filter(item => item.id !== id && item._id !== id);
    
    return this.setToLocalStorage(key, filteredItems);
  }

  static getByIdFromLocalStorage(key, id) {
    const items = this.getFromLocalStorage(key);
    return items.find(item => item.id === id || item._id === id) || null;
  }

  static exportFromLocalStorage() {
    const data = {};
    let totalItems = 0;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      const items = this.getFromLocalStorage(key);
      data[key] = items;
      totalItems += items.length;
    });
    
    return data;
  }

  static importToLocalStorage(data) {
    let totalImported = 0;
    
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        const success = this.setToLocalStorage(key, value);
        if (success) {
          totalImported += value.length;
        }
      }
    });
    
    return totalImported;
  }

  static clearLocalStorage() {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    });
  }

  static getLocalStorageStats() {
    const stats = {
      available: this.isStorageAvailable(),
      keys: {},
      totalItems: 0,
      storageSize: 0
    };

    if (!stats.available) {
      return stats;
    }

    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const data = this.getFromLocalStorage(key);
      const jsonString = JSON.stringify(data);
      
      stats.keys[name] = {
        key: key,
        count: data.length,
        size: new Blob([jsonString]).size,
        lastUpdated: data.length > 0 ? 
          Math.max(...data.map(item => new Date(item.updatedAt || item.createdAt || 0).getTime())) : 
          null
      };
      
      stats.totalItems += data.length;
      stats.storageSize += stats.keys[name].size;
    });

    return stats;
  }

  static isStorageAvailable() {
    try {
      if (typeof window === 'undefined') return false;
      
      const test = '__storage_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}