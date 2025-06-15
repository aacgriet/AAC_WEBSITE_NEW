// src/pages/api/data/[...params].js - Complete API implementation
import { DatabaseService } from '@/lib/database';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { params } = req.query;
  
  // Validate params
  if (!params || params.length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid API endpoint' 
    });
  }

  const [action, key, id] = params;

  try {
    switch (action) {
      case 'get':
        if (id) {
          // Get single item
          const item = await DatabaseService.getById(key, id);
          return res.status(200).json({ 
            success: true, 
            data: item 
          });
        } else {
          // Get all items
          const items = await DatabaseService.get(key);
          return res.status(200).json({ 
            success: true, 
            data: items 
          });
        }

      case 'add':
        if (req.method !== 'POST') {
          return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
          });
        }
        
        const newItem = await DatabaseService.add(key, req.body);
        if (newItem) {
          return res.status(201).json({ 
            success: true, 
            data: newItem 
          });
        } else {
          return res.status(400).json({ 
            success: false, 
            error: 'Failed to create item' 
          });
        }

      case 'update':
        if (req.method !== 'PUT') {
          return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
          });
        }
        
        if (!id) {
          return res.status(400).json({ 
            success: false, 
            error: 'ID is required for update' 
          });
        }
        
        const updatedItem = await DatabaseService.update(key, id, req.body);
        if (updatedItem) {
          return res.status(200).json({ 
            success: true, 
            data: updatedItem 
          });
        } else {
          return res.status(404).json({ 
            success: false, 
            error: 'Item not found or update failed' 
          });
        }

      case 'delete':
        if (req.method !== 'DELETE') {
          return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
          });
        }
        
        if (!id) {
          return res.status(400).json({ 
            success: false, 
            error: 'ID is required for delete' 
          });
        }
        
        const deleteSuccess = await DatabaseService.delete(key, id);
        if (deleteSuccess) {
          return res.status(200).json({ 
            success: true, 
            data: null 
          });
        } else {
          return res.status(404).json({ 
            success: false, 
            error: 'Item not found or delete failed' 
          });
        }

      case 'import':
        if (req.method !== 'POST') {
          return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
          });
        }
        
        if (key === 'all') {
          // Import all data
          const imported = await DatabaseService.importData(req.body);
          return res.status(200).json({ 
            success: true, 
            data: { imported } 
          });
        } else {
          // Import specific collection
          const success = await DatabaseService.set(key, req.body);
          return res.status(200).json({ 
            success: true, 
            data: success 
          });
        }

      case 'export':
        if (key === 'all') {
          // Export all data
          const exportData = await DatabaseService.exportData();
          return res.status(200).json({ 
            success: true, 
            data: exportData 
          });
        } else {
          // Export specific collection
          const items = await DatabaseService.get(key);
          return res.status(200).json({ 
            success: true, 
            data: items 
          });
        }

      case 'stats':
        if (key === 'all') {
          const stats = await DatabaseService.getStorageStats();
          return res.status(200).json({ 
            success: true, 
            data: stats 
          });
        } else {
          const items = await DatabaseService.get(key);
          return res.status(200).json({ 
            success: true, 
            data: { 
              count: items.length,
              key: key 
            } 
          });
        }

      default:
        return res.status(400).json({ 
          success: false, 
          error: `Unknown action: ${action}` 
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Internal server error' 
    });
  }
}