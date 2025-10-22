// src/lib/database.js - Fixed Database service with proper error handling
import { PrismaClient } from '@prisma/client';

// Global prisma instance to prevent connection issues in development
const globalForPrisma = globalThis;

// Initialize Prisma with proper configuration for Vercel
const prismaConfig = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
};

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database service that mirrors the StorageManager interface
export class DatabaseService {
  // Model mapping for different content types
  static MODEL_MAP = {
    'aac_news': 'news',
    'aac_achievements': 'achievements',
    'aac_projects': 'project',
    'aac_events': 'event',
    'aac_publications': 'publication',
    'aac_patents': 'patent',
    'aac_books': 'book',
    'aac_alumni': 'alumni',
    'aac_startups': 'startup',
    'aac_core_committee': 'coreCommittee'
  };

  // Get model instance with error handling
  static getModel(key) {
    const modelName = this.MODEL_MAP[key];
    if (!modelName) {
      throw new Error(`Unknown storage key: ${key}`);
    }
    
    if (!prisma[modelName]) {
      throw new Error(`Model ${modelName} not found in Prisma client`);
    }
    
    return prisma[modelName];
  }

  // Transform data for database storage with proper type handling
  static transformForDB(key, data) {
    const modelName = this.MODEL_MAP[key];
    
    // Common fields for all models
    const baseTransform = {
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
    };
    
    switch (modelName) {
      case 'news':
        return {
          ...baseTransform,
          id: data.id || data._id || this.generateId(),
          title: data.title || '',
          slug: typeof data.slug === 'object' ? data.slug?.current : data.slug,
          content: data.content || null,
          rawBody: data._rawBody || data.rawBody || null,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          categories: data.categories || null,
          status: data.status || 'published',
          sanityId: data._id || null,
          sanityRev: data._rev || null,
          sanityType: data._type || 'News',
          mainImageUrl: data.mainImage?.asset?.url || data.mainImageUrl || null,
          mainImageAltText: data.mainImage?.asset?.altText || data.mainImageAltText || null,
          links: data.links || []
        };
        case 'achievements':
        return {
          ...baseTransform,
          id: data.id || data._id || this.generateId(),
          title: data.title || '',
          slug: typeof data.slug === 'object' ? data.slug?.current : data.slug,
          content: data.content || null,
          rawBody: data._rawBody || data.rawBody || null,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          categories: data.categories || null,
          status: data.status || 'published',
          sanityId: data._id || null,
          sanityRev: data._rev || null,
          sanityType: data._type || 'Achievements',
          mainImageUrl: data.mainImage?.asset?.url || data.mainImageUrl || null,
          mainImageAltText: data.mainImage?.asset?.altText || data.mainImageAltText || null,
          links: data.links || []
        };

      case 'project':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          title: data.title || '',
          slug: data.slug || this.slugify(data.title),
          description: data.description || null,
          content: data.body || data.content || null,
          rawBody: data._rawBody || data.rawBody || null,
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          author: data.author || null,
          categories: data.categories || null,
          status: data.status || 'published',
          names: Array.isArray(data.names) ? data.names : [],
          mainImageUrl: data.mainImage?.asset?.url || data.mainImage?.url || null,
          mainImageAltText: data.mainImage?.asset?.altText || data.mainImage?.altText || null
        };

      case 'event':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          title: data.event || data.title || '',
          slug: data.slug || null,
          description: data.description || null,
          detailedDescription: data.detailedDescription || null,
          date: data.date || null,
          actualDate: data.actualDate ? new Date(data.actualDate) : null,
          location: data.location || 'GRIET Campus, Hyderabad',
          organizer: data.organizer || 'Advanced Academic Center',
          status: data.status || 'completed',
          mainImageUrl: data.img || data.mainImageUrl || null,
          images: Array.isArray(data.images) ? data.images : [],
          ctaText: data.cta?.text || data.ctaText || null,
          ctaLink: data.cta?.link || data.ctaLink || null,
          path: data.path || null
        };

      case 'publication':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          title: data.title || '',
          abstract: data.abstract || '',
          publication: data.publication || '',
          category: data.category || 'Other',
          year: parseInt(data.year) || new Date().getFullYear(),
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
          authors: Array.isArray(data.authors) ? data.authors : [],
          image: data.image || null,
          downloadUrl: data.downloadUrl || null,
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          type: data.type || 'Journal Paper'
        };

      case 'patent':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          title: data.title || '',
          shortTitle: data.shortTitle || '',
          description: data.description || '',
          applicationNumber: data.applicationNumber || '',
          patentOffice: data.patentOffice || 'India',
          date: new Date(data.date || new Date()),
          status: data.status || 'Published Online',
          category: data.category || 'Other',
          color: data.color || 'purple',
          inventors: Array.isArray(data.inventors) ? data.inventors : [],
          image: data.image || null
        };

      case 'book':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          title: data.title || '',
          description: data.description || '',
          category: data.category || 'Other',
          year: parseInt(data.year) || new Date().getFullYear(),
          cover: data.cover || null,
          color: data.color || 'blue',
          status: data.status || 'published',
          authors: Array.isArray(data.authors) ? data.authors : []
        };

      case 'alumni':
        return {
          ...baseTransform,
          id: data.id || data.Id || this.generateId(),
          name: data.Name || data.name || '',
          designation: data.Designation || data.designation || null,
          company: data.Company || data.company || null,
          image: data.Image || data.image || null,
          graduationYear: parseInt(data.graduationYear) || null,
          department: data.department || null,
          status: data.status || 'active',
          email: data.email || null,
          linkedin: data.linkedin || null,
          currentLocation: data.currentLocation || null,
          achievements: data.achievements || null,
          bio: data.bio || null,
          legacyId: data.Id || data.legacyId || null
        };

      case 'startup':
        return {
          ...baseTransform,
          id: data.id || this.generateId(),
          name: data.name || '',
          description: data.description || '',
          mission: data.mission || '',
          category: data.category || 'Technology',
          color: data.color || 'blue',
          status: data.status || 'Active',
          establishedDate: new Date(data.establishedDate || new Date()),
          website: data.website || null,
          logo: data.logo || null,
          image: data.image || null,
          founders: Array.isArray(data.founders) ? data.founders : [],
          appScreenshots: Array.isArray(data.appScreenshots) ? data.appScreenshots : []
        };

      case 'coreCommittee':
        return {
          ...baseTransform,
          id: data.id || data.Id || this.generateId(),
          name: data.Name || data.name || '',
          designation: data.Designation || data.designation || '',
          image: data.Image || data.image || null,
          year: parseInt(data.year) || 2024,
          department: data.department || null,
          status: data.status || 'active',
          legacyId: data.Id || data.legacyId || null
        };

      default:
        return { ...data, ...baseTransform };
    }
  }

  // Transform data from database for frontend with proper null handling
  static transformFromDB(key, data) {
    if (!data) return null;
    
    const modelName = this.MODEL_MAP[key];
    
    // Common fields
    const baseTransform = {
      createdAt: data.createdAt?.toISOString(),
      updatedAt: data.updatedAt?.toISOString()
    };
    
    switch (modelName) {
      case 'news':
        return {
          ...baseTransform,
          id: data.id,
          _id: data.sanityId || data.id,
          title: data.title,
          slug: { current: data.slug },
          content: data.content,
          _rawBody: data.rawBody,
          publishedAt: data.publishedAt?.toISOString(),
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
          links: data.links || []
        };
        case 'achievements':
        return {
          ...baseTransform,
          id: data.id,
          _id: data.sanityId || data.id,
          title: data.title,
          slug: { current: data.slug },
          content: data.content,
          _rawBody: data.rawBody,
          publishedAt: data.publishedAt?.toISOString(),
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
          links: data.links || []
        };

      case 'project':
        return {
          ...baseTransform,
          id: data.id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          body: data.content,
          _rawBody: data.rawBody,
          publishedAt: data.publishedAt?.toISOString(),
          author: data.author,
          categories: data.categories,
          status: data.status,
          names: data.names || [],
          mainImage: data.mainImageUrl ? {
            asset: {
              url: data.mainImageUrl,
              altText: data.mainImageAltText
            }
          } : null
        };

      case 'event':
        return {
          ...baseTransform,
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
          path: data.path
        };

      case 'publication':
        return {
          ...baseTransform,
          id: data.id,
          title: data.title,
          abstract: data.abstract,
          publication: data.publication,
          category: data.category,
          year: data.year,
          publishedAt: data.publishedAt?.toISOString(),
          authors: data.authors || [],
          image: data.image,
          downloadUrl: data.downloadUrl,
          keywords: data.keywords || [],
          type: data.type
        };

      case 'patent':
        return {
          ...baseTransform,
          id: data.id,
          title: data.title,
          shortTitle: data.shortTitle,
          description: data.description,
          applicationNumber: data.applicationNumber,
          patentOffice: data.patentOffice,
          date: data.date?.toISOString(),
          status: data.status,
          category: data.category,
          color: data.color,
          inventors: data.inventors || [],
          image: data.image
        };

      case 'book':
        return {
          ...baseTransform,
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          year: data.year,
          cover: data.cover,
          color: data.color,
          status: data.status,
          authors: data.authors || []
        };

      case 'alumni':
        return {
          ...baseTransform,
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
          bio: data.bio
        };

      case 'startup':
        return {
          ...baseTransform,
          id: data.id,
          name: data.name,
          description: data.description,
          mission: data.mission,
          category: data.category,
          color: data.color,
          status: data.status,
          establishedDate: data.establishedDate?.toISOString(),
          website: data.website,
          logo: data.logo,
          image: data.image,
          founders: data.founders || [],
          appScreenshots: data.appScreenshots || []
        };

      case 'coreCommittee':
        return {
          ...baseTransform,
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
          status: data.status
        };

      default:
        return {
          ...data,
          ...baseTransform
        };
    }
  }

  // Get all items with error handling
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
      
      // Delete all existing records in a transaction
      await prisma.$transaction(async (tx) => {
        await tx[this.MODEL_MAP[key]].deleteMany();
        
        if (Array.isArray(data) && data.length > 0) {
          const transformedData = data.map(item => this.transformForDB(key, item));
          
          // Insert records one by one to handle unique constraint issues
          for (const item of transformedData) {
            try {
              await tx[this.MODEL_MAP[key]].create({ data: item });
            } catch (itemError) {
              console.warn(`Failed to insert item ${item.id}:`, itemError.message);
            }
          }
        }
      });
      
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
        id: item.id || this.generateId()
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
        id: id // Preserve the ID
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

  // Generate slug from title
  static slugify(text) {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
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
      if (this.MODEL_MAP[key] && Array.isArray(value)) {
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

  // Health check
  static async healthCheck() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', database: 'connected' };
    } catch (error) {
      console.error('Database health check failed:', error);
      return { status: 'unhealthy', error: error.message };
    }
  }
}