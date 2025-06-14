// src/lib/storage.js
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
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return [];
    }
  }

  static set(key, data) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
      return false;
    }
  }

  static add(key, item) {
    const items = this.get(key);
    const newItem = {
      ...item,
      id: item.id || this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    this.set(key, items);
    return newItem;
  }

  static update(key, id, updates) {
    const items = this.get(key);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.set(key, items);
    return items[index];
  }

  static delete(key, id) {
    const items = this.get(key);
    const filteredItems = items.filter(item => item.id !== id);
    this.set(key, filteredItems);
    return filteredItems.length < items.length;
  }

  static getById(key, id) {
    const items = this.get(key);
    return items.find(item => item.id === id) || null;
  }

  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static exportData() {
    const data = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      data[key] = this.get(key);
    });
    return data;
  }

  static importData(data) {
    Object.entries(data).forEach(([key, value]) => {
      if (Object.values(STORAGE_KEYS).includes(key)) {
        this.set(key, value);
      }
    });
  }

  static clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    });
  }
}