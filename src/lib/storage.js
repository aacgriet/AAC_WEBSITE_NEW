// src/lib/storage.js - Fixed version
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

export class StorageManager {
  static get(key) {
    if (typeof window === 'undefined') {
      console.log(`StorageManager.get: Window is undefined for key ${key}`);
      return [];
    }
    
    try {
      const data = localStorage.getItem(key);
      const result = data ? JSON.parse(data) : [];
      console.log(`StorageManager.get: Retrieved ${result.length} items for key ${key}`);
      return result;
    } catch (error) {
      console.error(`StorageManager.get: Error reading from localStorage for key ${key}:`, error);
      return [];
    }
  }

  static set(key, data) {
    if (typeof window === 'undefined') {
      console.log(`StorageManager.set: Window is undefined for key ${key}`);
      return false;
    }
    
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
      console.log(`StorageManager.set: Saved ${data.length} items for key ${key}`);
      
      // Verify the data was saved correctly
      const verification = localStorage.getItem(key);
      if (verification === jsonData) {
        console.log(`StorageManager.set: Data verification successful for key ${key}`);
        return true;
      } else {
        console.error(`StorageManager.set: Data verification failed for key ${key}`);
        return false;
      }
    } catch (error) {
      console.error(`StorageManager.set: Error writing to localStorage for key ${key}:`, error);
      return false;
    }
  }

  static add(key, item) {
    console.log(`StorageManager.add: Adding item to key ${key}:`, item);
    
    const items = this.get(key);
    const newItem = {
      ...item,
      id: item.id || this.generateId(),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log(`StorageManager.add: Generated new item:`, newItem);
    
    const updatedItems = [...items, newItem];
    const success = this.set(key, updatedItems);
    
    if (success) {
      console.log(`StorageManager.add: Successfully added item to ${key}`);
      return newItem;
    } else {
      console.error(`StorageManager.add: Failed to add item to ${key}`);
      return null;
    }
  }

  static update(key, id, updates) {
    console.log(`StorageManager.update: Updating item ${id} in key ${key}:`, updates);
    
    const items = this.get(key);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      console.error(`StorageManager.update: Item with id ${id} not found in ${key}`);
      return null;
    }
    
    const updatedItem = {
      ...items[index],
      ...updates,
      id: items[index].id, // Preserve original ID
      createdAt: items[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };
    
    console.log(`StorageManager.update: Updated item:`, updatedItem);
    
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    
    const success = this.set(key, updatedItems);
    
    if (success) {
      console.log(`StorageManager.update: Successfully updated item ${id} in ${key}`);
      return updatedItem;
    } else {
      console.error(`StorageManager.update: Failed to update item ${id} in ${key}`);
      return null;
    }
  }

  static delete(key, id) {
    console.log(`StorageManager.delete: Deleting item ${id} from key ${key}`);
    
    const items = this.get(key);
    const initialLength = items.length;
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === initialLength) {
      console.error(`StorageManager.delete: Item with id ${id} not found in ${key}`);
      return false;
    }
    
    const success = this.set(key, filteredItems);
    
    if (success) {
      console.log(`StorageManager.delete: Successfully deleted item ${id} from ${key}`);
      return true;
    } else {
      console.error(`StorageManager.delete: Failed to delete item ${id} from ${key}`);
      return false;
    }
  }

  static getById(key, id) {
    console.log(`StorageManager.getById: Getting item ${id} from key ${key}`);
    
    const items = this.get(key);
    const item = items.find(item => item.id === id) || null;
    
    console.log(`StorageManager.getById: Found item:`, item);
    return item;
  }

  static generateId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    const id = `${timestamp}_${randomStr}`;
    console.log(`StorageManager.generateId: Generated ID: ${id}`);
    return id;
  }

  static exportData() {
    console.log('StorageManager.exportData: Exporting all data');
    
    const data = {};
    let totalItems = 0;
    
    Object.values(STORAGE_KEYS).forEach(key => {
      const items = this.get(key);
      data[key] = items;
      totalItems += items.length;
      console.log(`StorageManager.exportData: Exported ${items.length} items for ${key}`);
    });
    
    console.log(`StorageManager.exportData: Total exported items: ${totalItems}`);
    return data;
  }

  static importData(data) {
    console.log('StorageManager.importData: Importing data:', data);
    
    let totalImported = 0;
    
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        const success = this.set(key, value);
        if (success) {
          totalImported += value.length;
          console.log(`StorageManager.importData: Imported ${value.length} items for ${key}`);
        } else {
          console.error(`StorageManager.importData: Failed to import data for ${key}`);
        }
      } else {
        console.warn(`StorageManager.importData: Skipping unknown key: ${key}`);
      }
    });
    
    console.log(`StorageManager.importData: Total imported items: ${totalImported}`);
    return totalImported;
  }

  static clearAll() {
    console.log('StorageManager.clearAll: Clearing all data');
    
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        console.log(`StorageManager.clearAll: Cleared ${key}`);
      }
    });
  }

  // Utility method to check if localStorage is available
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

  // Method to get storage statistics
  static getStorageStats() {
    if (!this.isStorageAvailable()) {
      return { available: false };
    }

    const stats = {
      available: true,
      keys: {},
      totalItems: 0,
      storageSize: 0
    };

    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const data = this.get(key);
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
}