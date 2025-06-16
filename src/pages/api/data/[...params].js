// src/pages/api/data/[...params].js - Updated API handler for database operations
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Table name mapping to Prisma models
const TABLE_MODELS = {
  news: 'news',
  projects: 'project',
  events: 'event',
  publications: 'publication',
  patents: 'patent',
  books: 'book',
  alumni: 'alumni',
  startups: 'startup',
  corecommittee: 'coreCommittee'
};

// Helper function to get Prisma model
const getPrismaModel = (tableName) => {
  const modelName = TABLE_MODELS[tableName.toLowerCase()];
  if (!modelName) {
    throw new Error(`Unknown table: ${tableName}`);
  }
  return prisma[modelName];
};

// Helper function to transform data for database
const transformDataForDB = (tableName, data) => {
  const lowerTable = tableName.toLowerCase();
  
  switch (lowerTable) {
    case 'news':
      return {
        id: data._id || data.id,
        title: data.title,
        slug: data.slug?.current || data.slug,
        content: data._rawBody || data.body || data.content,
        rawBody: data._rawBody,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        categories: data.categories,
        status: data.status || 'draft',
        sanityId: data._id,
        sanityRev: data._rev,
        sanityType: data._type || 'News',
        mainImageUrl: data.mainImage?.asset?.url,
        mainImageAltText: data.mainImage?.asset?.altText,
        links: data.links ? JSON.stringify(data.links) : null,
      };
      
    case 'projects':
      return {
        id: data._id || data.id,
        title: data.title,
        slug: data.slug?.current || data.slug || data.title,
        description: data.slug?.current || data.description,
        content: data._rawBody || data.body || data.content,
        rawBody: data._rawBody,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        author: data.author,
        categories: data.categories,
        status: data.status || 'draft',
        names: data.names ? JSON.stringify(data.names) : null,
        mainImageUrl: data.mainImage?.asset?.url,
        mainImageAltText: data.mainImage?.asset?.altText || data.mainImage?.altText,
      };
      
    case 'events':
      return {
        id: data.id,
        title: data.event || data.title,
        slug: data.event || data.title,
        description: data.description,
        detailedDescription: data.detailedDescription,
        date: data.date,
        actualDate: data.actualDate ? new Date(data.actualDate) : null,
        location: data.location,
        organizer: data.organizer,
        status: data.status || 'upcoming',
        mainImageUrl: data.img || data.mainImage,
        images: data.images ? JSON.stringify(data.images) : null,
        ctaText: data.cta?.text,
        ctaLink: data.cta?.link,
        path: data.path,
      };
      
    case 'publications':
      return {
        id: data.id || `pub-${Date.now()}`,
        title: data.title,
        abstract: data.abstract,
        publication: data.publication,
        category: data.category,
        year: parseInt(data.year),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        authors: JSON.stringify(data.authors || []),
        image: data.image,
        downloadUrl: data.downloadUrl,
        keywords: data.keywords ? JSON.stringify(data.keywords) : null,
        type: data.type || 'Journal Paper',
      };
      
    case 'patents':
      return {
        id: data.id || `patent-${Date.now()}`,
        title: data.title,
        shortTitle: data.shortTitle,
        description: data.description,
        applicationNumber: data.applicationNumber,
        patentOffice: data.patentOffice,
        date: new Date(data.date),
        status: data.status || 'Published Online',
        category: data.category,
        color: data.color || 'purple',
        inventors: JSON.stringify(data.inventors || []),
        image: data.image,
      };
      
    case 'books':
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        year: parseInt(data.year),
        cover: data.cover,
        color: data.color || 'blue',
        status: data.status || 'published',
        authors: JSON.stringify(data.authors || []),
      };
      
    case 'alumni':
      return {
        id: data.Id || data.id,
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
        legacyId: data.Id || data.id,
      };
      
    case 'startups':
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        mission: data.mission,
        category: data.category,
        color: data.color || 'blue',
        status: data.status || 'Active',
        establishedDate: new Date(data.establishedDate),
        website: data.website,
        logo: data.logo,
        image: data.image,
        founders: JSON.stringify(data.founders || []),
        appScreenshots: JSON.stringify(data.appScreenshots || []),
      };
      
    default:
      return data;
  }
};

// Helper function to transform data from database
const transformDataFromDB = (tableName, data) => {
  const lowerTable = tableName.toLowerCase();
  
  // Parse JSON fields back to objects/arrays
  const parseJsonField = (field) => {
    if (!field) return null;
    try {
      return JSON.parse(field);
    } catch {
      return field;
    }
  };
  
  switch (lowerTable) {
    case 'news':
      return {
        ...data,
        _id: data.sanityId || data.id,
        _type: data.sanityType,
        _rev: data.sanityRev,
        slug: { current: data.slug },
        _rawBody: data.rawBody,
        mainImage: data.mainImageUrl ? {
          asset: {
            url: data.mainImageUrl,
            altText: data.mainImageAltText
          }
        } : null,
        links: parseJsonField(data.links),
      };
      
    case 'projects':
      return {
        ...data,
        _id: data.id,
        slug: { current: data.slug },
        _rawBody: data.rawBody,
        names: parseJsonField(data.names),
        mainImage: data.mainImageUrl ? {
          asset: {
            url: data.mainImageUrl,
            altText: data.mainImageAltText
          }
        } : null,
      };
      
    case 'events':
      return {
        ...data,
        event: data.title,
        img: data.mainImageUrl,
        images: parseJsonField(data.images),
        cta: data.ctaText ? {
          text: data.ctaText,
          link: data.ctaLink
        } : null,
      };
      
    case 'publications':
      return {
        ...data,
        authors: parseJsonField(data.authors),
        keywords: parseJsonField(data.keywords),
      };
      
    case 'patents':
      return {
        ...data,
        inventors: parseJsonField(data.inventors),
      };
      
    case 'books':
      return {
        ...data,
        authors: parseJsonField(data.authors),
      };
      
    case 'alumni':
      return {
        ...data,
        Id: data.id,
        Name: data.name,
        Designation: data.designation,
        Company: data.company,
        Image: data.image,
      };
      
    case 'startups':
      return {
        ...data,
        founders: parseJsonField(data.founders),
        appScreenshots: parseJsonField(data.appScreenshots),
      };
      
    default:
      return data;
  }
};

export default async function handler(req, res) {
  const { params } = req.query;
  const [tableName, id] = params;

  if (!tableName) {
    return res.status(400).json({ error: 'Table name is required' });
  }

  try {
    const model = getPrismaModel(tableName);

    switch (req.method) {
      case 'GET':
        if (id) {
          // Get single item
          const item = await model.findUnique({
            where: { id: id }
          });
          
          if (!item) {
            return res.status(404).json({ error: 'Item not found' });
          }
          
          const transformedItem = transformDataFromDB(tableName, item);
          return res.status(200).json({ data: transformedItem });
        } else {
          // Get all items
          const items = await model.findMany({
            orderBy: { createdAt: 'desc' }
          });
          
          const transformedItems = items.map(item => transformDataFromDB(tableName, item));
          return res.status(200).json({ data: transformedItems });
        }

      case 'POST':
        // Create new item
        const newData = transformDataForDB(tableName, req.body);
        const createdItem = await model.create({
          data: newData
        });
        
        const transformedCreated = transformDataFromDB(tableName, createdItem);
        return res.status(201).json({ data: transformedCreated });

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'ID is required for updates' });
        }
        
        // Update existing item
        const updateData = transformDataForDB(tableName, req.body);
        const updatedItem = await model.update({
          where: { id: id },
          data: {
            ...updateData,
            updatedAt: new Date()
          }
        });
        
        const transformedUpdated = transformDataFromDB(tableName, updatedItem);
        return res.status(200).json({ data: transformedUpdated });

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'ID is required for deletion' });
        }
        
        // Delete item
        await model.delete({
          where: { id: id }
        });
        
        return res.status(200).json({ message: 'Item deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error(`Database error for ${tableName}:`, error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Unique constraint violation' });
    }
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Record not found' });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await prisma.$disconnect();
  }
}