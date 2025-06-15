// Create src/pages/api/data/[...params].js
// This will handle all database operations through API endpoints

import { DatabaseService } from '@/lib/database';

export default async function handler(req, res) {
  const { params } = req.query;
  const [operation, key, id] = params;

  try {
    switch (operation) {
      case 'get':
        if (id) {
          // Get single item by ID
          const item = await DatabaseService.getById(key, id);
          return res.status(200).json({ success: true, data: item });
        } else {
          // Get all items
          const data = await DatabaseService.get(key);
          return res.status(200).json({ success: true, data });
        }

      case 'add':
        if (req.method !== 'POST') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        const newItem = await DatabaseService.add(key, req.body);
        return res.status(201).json({ success: true, data: newItem });

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
        const success = await DatabaseService.delete(key, id);
        return res.status(200).json({ success, data: null });

      case 'export':
        const exportData = await DatabaseService.exportData();
        return res.status(200).json({ success: true, data: exportData });

      case 'import':
        if (req.method !== 'POST') {
          return res.status(405).json({ success: false, error: 'Method not allowed' });
        }
        const importCount = await DatabaseService.importData(req.body);
        return res.status(200).json({ success: true, data: { imported: importCount } });

      case 'stats':
        const stats = await DatabaseService.getStorageStats();
        return res.status(200).json({ success: true, data: stats });

      default:
        return res.status(400).json({ success: false, error: 'Invalid operation' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}