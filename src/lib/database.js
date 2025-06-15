// src/lib/database.js - Database service to replace localStorage
import { PrismaClient } from '@prisma/client';

// Global prisma instance to prevent connection issues in development
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database service that mirrors the StorageManager interface
export class DatabaseService {
  // Model mapping for different content types
  static MODEL_MAP = {
    'aac_news': 'news',
    'aac_projects': 'project',
    'aac_events': 'event',
    'aac_publications': 'publication',
    'aac_patents': 'patent',
    'aac_books': 'book',
    'aac_alumni': 'alumni',
    'aac_startups': 'startup',
    'aac_core_committee': 'coreCommittee'
  };

  // Get model instance
  static getModel(key) {
    const modelName = this.MODEL_MAP[key];
    if (!modelName) {
      throw new Error(`Unknown storage key: ${key}`);
    }
    return prisma[modelName];
  }

  // Transform data for database storage
  static transformForDB(key, data) {
    const modelName = this.MODEL_MAP[key];
    
    switch (modelName) {
      case 'news':
        return {
          id: data.id || data._id,
          title: data.title,
          slug: typeof data.slug === 'object' ? data.slug.current : data.slug,
          content: data.content,
          rawBody: data._rawBody,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          categories: data.categories,
          status: data.status || 'published',
          sanityId: data._id,
          sanityRev: data._rev,
          sanityType: data._type,
          mainImageUrl: data.mainImage?.asset?.url,
          mainImageAltText: data.mainImage?.asset?.altText,
          links: data.links || []
        };

      case 'project':
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          content: data.body,
          rawBody: data._rawBody,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          author: data.author,
          categories: data.categories,
          status: data.status || 'published',
          names: data.names || [],
          mainImageUrl: data.mainImage?.asset?.url || data.mainImage?.url,
          mainImageAltText: data.mainImage?.asset?.altText || data.mainImage?.altText
        };

      case 'event':
        return {
          id: data.id,
          title: data.event || data.title,
          slug: data.slug,
          description: data.description,
          detailedDescription: data.detailedDescription,
          date: data.date,
          actualDate: data.actualDate ? new Date(data.actualDate) : null,
          location: data.location,
          organizer: data.organizer,
          status: data.status || 'completed',
          mainImageUrl: data.img,
          images: data.images || [],
          ctaText: data.cta?.text,
          ctaLink: data.cta?.link,
          path: data.path
        };

      case 'publication':
        return {
          id: data.id,
          title: data.title,
          abstract: data.abstract,
          publication: data.publication,
          category: data.category,
          year: data.year,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          authors: data.authors || [],
          image: data.image,
          downloadUrl: data.downloadUrl,
          keywords: data.keywords || [],
          type: data.type
        };

      case 'patent':
        return {
          id: data.id,
          title: data.title,
          shortTitle: data.shortTitle,
          description: data.description,
          applicationNumber: data.applicationNumber,
          patentOffice: data.patentOffice,
          date: new Date(data.date),
          status: data.status,
          category: data.category,
          color: data.color,
          inventors: data.inventors || [],
          image: data.image
        };

      case 'book':
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          year: data.year,
          cover: data.cover,
          color: data.color,
          status: data.status || 'published',
          authors: data.authors || []
        };

      case 'alumni':
        return {
          id: data.id,
          name: data.Name || data.name,
          designation: data.Designation || data.designation,
          company: data.Company || data.company,
          image: data.Image || data.image,
          graduationYear: data.graduationYear,
          department: data.department,
          status: data.status || 'active',
          email: data.email,
          linkedin: data.linkedin,
          currentLocation: data.currentLocation,
          achievements: data.achievements,
          bio: data.bio,
          legacyId: data.Id
        };

      case 'startup':
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          mission: data.mission,
          category: data.category,
          color: data.color,
          status: data.status,
          establishedDate: new Date(data.establishedDate),
          website: data.website,
          logo: data.logo,
          image: data.image,
          founders: data.founders || [],
          appScreenshots: data.appScreenshots || []
        };

      case 'coreCommittee':
        return {
          id: data.id,
          name: data.Name || data.name,
          designation: data.Designation || data.designation,
          image: data.Image || data.image,
          year: data.year || 2024,
          department: data.department,
          status: data.status || 'active',
          legacyId: data.Id
        };

      default:
        return data;
    }
  }

  // Transform data from database for frontend
  static transformFromDB(key, data) {
    const modelName = this.MODEL_MAP[key];
    
    switch (modelName) {
      case 'news':
        return {
          id: data.id,
          _id: data.sanityId || data.id,
          title: data.title,
          slug: { current: data.slug },
          content: data.content,
          _rawBody: data.rawBody,
          publishedAt: data.publishedAt.toISOString(),
          categories: data.categories,
          status: data.status,
          _rev: data.sanityRev,
          _type: data.sanityType,
          mainImage: data.mainImageUrl ? {
            asset: {
              url: data.mainImageUrl,
              altText: data.mainImageAltText
            }
          } : null,
          links: data.links || [],
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'project':
        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          body: data.content,
          _rawBody: data.rawBody,
          publishedAt: data.publishedAt.toISOString(),
          author: data.author,
          categories: data.categories,
          status: data.status,
          names: data.names || [],
          mainImage: data.mainImageUrl ? {
            asset: {
              url: data.mainImageUrl,
              altText: data.mainImageAltText
            }
          } : null,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'event':
        return {
          id: data.id,
          event: data.title,
          title: data.title,
          slug: data.slug,
          description: data.description,
          detailedDescription: data.detailedDescription,
          date: data.date,
          actualDate: data.actualDate?.toISOString(),
          location: data.location,
          organizer: data.organizer,
          status: data.status,
          img: data.mainImageUrl,
          images: data.images || [],
          cta: {
            text: data.ctaText,
            link: data.ctaLink
          },
          path: data.path,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'publication':
        return {
          id: data.id,
          title: data.title,
          abstract: data.abstract,
          publication: data.publication,
          category: data.category,
          year: data.year,
          publishedAt: data.publishedAt.toISOString(),
          authors: data.authors || [],
          image: data.image,
          downloadUrl: data.downloadUrl,
          keywords: data.keywords || [],
          type: data.type,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'patent':
        return {
          id: data.id,
          title: data.title,
          shortTitle: data.shortTitle,
          description: data.description,
          applicationNumber: data.applicationNumber,
          patentOffice: data.patentOffice,
          date: data.date.toISOString(),
          status: data.status,
          category: data.category,
          color: data.color,
          inventors: data.inventors || [],
          image: data.image,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'book':
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          year: data.year,
          cover: data.cover,
          color: data.color,
          status: data.status,
          authors: data.authors || [],
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'alumni':
        return {
          id: data.id,
          Id: data.legacyId,
          Name: data.name,
          name: data.name,
          Designation: data.designation,
          designation: data.designation,
          Company: data.company,
          company: data.company,
          Image: data.image,
          image: data.image,
          graduationYear: data.graduationYear,
          department: data.department,
          status: data.status,
          email: data.email,
          linkedin: data.linkedin,
          currentLocation: data.currentLocation,
          achievements: data.achievements,
          bio: data.bio,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'startup':
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          mission: data.mission,
          category: data.category,
          color: data.color,
          status: data.status,
          establishedDate: data.establishedDate.toISOString(),
          website: data.website,
          logo: data.logo,
          image: data.image,
          founders: data.founders || [],
          appScreenshots: data.appScreenshots || [],
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      case 'coreCommittee':
        return {
          id: data.id,
          Id: data.legacyId,
          Name: data.name,
          name: data.name,
          Designation: data.designation,
          designation: data.designation,
          Image: data.image,
          image: data.image,
          year: data.year,
          department: data.department,
          status: data.status,
          createdAt: data.createdAt.toISOString(),
          updatedAt: data.updatedAt.toISOString()
        };

      default:
        return {
          ...data,
          createdAt: data.createdAt?.toISOString(),
          updatedAt: data.updatedAt?.toISOString()
        };
    }
  }

  // Get all items
  static async get(key) {
    try {
      const model = this.getModel(key);
      const data = await model.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      return data.map(item => this.transformFromDB(key, item));
    } catch (error) {
      console.error(`DatabaseService.get error for key ${key}:`, error);
      return [];
    }
  }

  // Set/replace all items (used for imports)
  static async set(key, data) {
    try {
      const model = this.getModel(key);
      
      // Delete all existing records
      await model.deleteMany();
      
      // Insert new records
      const transformedData = data.map(item => this.transformForDB(key, item));
      
      if (transformedData.length > 0) {
        await model.createMany({
          data: transformedData,
          skipDuplicates: true
        });
      }
      
      return true;
    } catch (error) {
      console.error(`DatabaseService.set error for key ${key}:`, error);
      return false;
    }
  }

  // Add new item
  static async add(key, item) {
    try {
      const model = this.getModel(key);
      const transformedItem = this.transformForDB(key, {
        ...item,
        id: item.id || this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const created = await model.create({
        data: transformedItem
      });

      return this.transformFromDB(key, created);
    } catch (error) {
      console.error(`DatabaseService.add error for key ${key}:`, error);
      return null;
    }
  }

  // Update item
  static async update(key, id, updates) {
    try {
      const model = this.getModel(key);
      const transformedUpdates = this.transformForDB(key, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      const updated = await model.update({
        where: { id },
        data: transformedUpdates
      });

      return this.transformFromDB(key, updated);
    } catch (error) {
      console.error(`DatabaseService.update error for key ${key}, id ${id}:`, error);
      return null;
    }
  }

  // Delete item
  static async delete(key, id) {
    try {
      const model = this.getModel(key);
      await model.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error(`DatabaseService.delete error for key ${key}, id ${id}:`, error);
      return false;
    }
  }

  // Get item by ID
  static async getById(key, id) {
    try {
      const model = this.getModel(key);
      const item = await model.findUnique({
        where: { id }
      });

      return item ? this.transformFromDB(key, item) : null;
    } catch (error) {
      console.error(`DatabaseService.getById error for key ${key}, id ${id}:`, error);
      return null;
    }
  }

  // Generate ID
  static generateId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `${timestamp}_${randomStr}`;
  }

  // Export all data
  static async exportData() {
    const data = {};
    
    for (const [storageKey, modelName] of Object.entries(this.MODEL_MAP)) {
      try {
        data[storageKey] = await this.get(storageKey);
      } catch (error) {
        console.error(`Export error for ${storageKey}:`, error);
        data[storageKey] = [];
      }
    }
    
    return data;
  }

  // Import data
  static async importData(data) {
    let totalImported = 0;
    
    for (const [key, value] of Object.entries(data)) {
      if (this.MODEL_MAP[key]) {
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
    for (const modelName of Object.values(this.MODEL_MAP)) {
      try {
        await prisma[modelName].deleteMany();
      } catch (error) {
        console.error(`Clear error for ${modelName}:`, error);
      }
    }
  }

  // Get storage statistics
  static async getStorageStats() {
    const stats = {
      available: true,
      keys: {},
      totalItems: 0
    };

    for (const [storageKey, modelName] of Object.entries(this.MODEL_MAP)) {
      try {
        const count = await prisma[modelName].count();
        const latest = await prisma[modelName].findFirst({
          orderBy: { updatedAt: 'desc' },
          select: { updatedAt: true }
        });

        stats.keys[storageKey.replace('aac_', '').toUpperCase()] = {
          key: storageKey,
          count: count,
          lastUpdated: latest?.updatedAt?.getTime() || null
        };
        
        stats.totalItems += count;
      } catch (error) {
        console.error(`Stats error for ${storageKey}:`, error);
        stats.keys[storageKey.replace('aac_', '').toUpperCase()] = {
          key: storageKey,
          count: 0,
          lastUpdated: null
        };
      }
    }

    return stats;
  }
}