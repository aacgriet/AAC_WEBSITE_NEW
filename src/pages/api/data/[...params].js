// src/pages/api/data/[...params].js
import { DatabaseService } from '@/lib/database';

export default async function handler(req, res) {
  const { params } = req.query;
  const [action, key, id] = params || [];

  try {
    switch (action) {
      case 'get':
        if (id) {
          // Get specific item by ID
          const item = await DatabaseService.getById(key, id);
          return res.status(200).json({ success: true, data: item });
        } else {
          // Get all items for key
          const items = await DatabaseService.get(key);
          return res.status(200).json({ success: true, data: items });
        }

      case 'add':
        if (req.method !== 'POST') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        const newItem = await DatabaseService.add(key, req.body);
        return res.status(200).json({ success: true, data: newItem });

      case 'update':
        if (req.method !== 'PUT') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        const updatedItem = await DatabaseService.update(key, id, req.body);
        return res.status(200).json({ success: true, data: updatedItem });

      case 'delete':
        if (req.method !== 'DELETE') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        const deleteSuccess = await DatabaseService.delete(key, id);
        return res.status(200).json({ success: true, data: deleteSuccess });

      case 'import':
        if (req.method !== 'POST') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        
        if (key === 'all') {
          // Import all data
          const imported = await DatabaseService.importData(req.body);
          return res.status(200).json({ success: true, data: { imported } });
        } else {
          // Import specific key data
          const success = await DatabaseService.set(key, req.body);
          return res.status(200).json({ success: true, data: success });
        }

      case 'export':
        if (key === 'all') {
          const exportData = await DatabaseService.exportData();
          return res.status(200).json({ success: true, data: exportData });
        } else {
          const keyData = await DatabaseService.get(key);
          return res.status(200).json({ success: true, data: { [key]: keyData } });
        }

      case 'stats':
        if (key === 'all') {
          const stats = await DatabaseService.getStorageStats();
          return res.status(200).json({ success: true, data: stats });
        }
        break;

      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}