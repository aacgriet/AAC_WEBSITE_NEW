// src/pages/admin/index.js - Completely Fixed Version
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { STORAGE_KEYS, StorageManager } from '@/lib/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ADMIN_SECTIONS = [
  { key: 'news', label: 'News', icon: '📰', storageKey: STORAGE_KEYS.NEWS },
  { key: 'projects', label: 'Projects', icon: '🚀', storageKey: STORAGE_KEYS.PROJECTS },
  { key: 'events', label: 'Events', icon: '📅', storageKey: STORAGE_KEYS.EVENTS },
  { key: 'publications', label: 'Publications', icon: '📄', storageKey: STORAGE_KEYS.PUBLICATIONS },
  { key: 'patents', label: 'Patents', icon: '⚖️', storageKey: STORAGE_KEYS.PATENTS },
  { key: 'books', label: 'Books', icon: '📚', storageKey: STORAGE_KEYS.BOOKS },
  { key: 'alumni', label: 'Alumni', icon: '🎓', storageKey: STORAGE_KEYS.ALUMNI },
  { key: 'committee', label: 'Core Committee', icon: '👥', storageKey: STORAGE_KEYS.CORE_COMMITTEE }
];

// Simple Migration Component
const SimpleMigrationComponent = () => {
  const [stats, setStats] = useState(null);
  const [migrating, setMigrating] = useState(false);

  const handleMigration = async () => {
    setMigrating(true);
    try {
      // Add sample data for testing
      const sampleData = {
        [STORAGE_KEYS.NEWS]: [
          {
            id: 'sample-news-1',
            title: 'Sample News Article',
            slug: 'This is a sample news article to test the system.',
            content: 'This is the detailed content of the sample news article.',
            publishedAt: new Date().toISOString(),
            categories: 'NOTICE',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        [STORAGE_KEYS.PATENTS]: [
          {
            id: 'sample-patent-1',
            title: 'Sample Patent for Testing',
            shortTitle: 'Test Patent',
            description: 'This is a sample patent entry for testing the system.',
            inventors: ['John Doe', 'Jane Smith'],
            patentOffice: 'India',
            applicationNumber: '123456789',
            date: '2024-01-01',
            status: 'Published Online',
            category: 'Technology',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]
      };

      Object.entries(sampleData).forEach(([key, data]) => {
        const existing = StorageManager.get(key);
        const combined = [...existing, ...data];
        StorageManager.set(key, combined);
      });

      setStats({ migrated: true, timestamp: new Date().toISOString() });
      alert('Sample data added successfully!');
      window.location.reload(); // Refresh to show new data
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed. Check console for details.');
    } finally {
      setMigrating(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      StorageManager.clearAll();
      alert('All data cleared successfully!');
      window.location.reload();
    }
  };

  useEffect(() => {
    const currentStats = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      const data = StorageManager.get(key);
      currentStats[key] = data.length;
    });
    setStats(currentStats);
  }, []);

  return (
    <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white">Data Migration Utility</h3>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={handleMigration}
          disabled={migrating}
          className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
        >
          {migrating ? 'Adding Sample Data...' : 'Add Sample Data'}
        </button>
        
        <button
          onClick={handleClearData}
          disabled={migrating}
          className="px-4 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 border border-red-700 ml-4"
        >
          Clear All Data
        </button>
      </div>

      {stats && (
        <div className="bg-[#0e1421] rounded-lg p-4 border border-gray-700">
          <h4 className="font-semibold mb-3 text-white">Current Data Stats:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(stats).map(([key, count]) => (
              <div key={key} className="text-gray-300">
                <span className="font-medium">{key}:</span> {typeof count === 'number' ? `${count} items` : count}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Patents Form Component
const PatentsForm = ({ patentId = null, onSuccess, onCancel }) => {
  const { data: patentsData, addItem, updateItem, getItemById, refresh } = useLocalStorage(STORAGE_KEYS.PATENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    description: '',
    inventors: '',
    patentOffice: 'India',
    applicationNumber: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Published Online',
    category: ''
  });

  useEffect(() => {
    if (patentId) {
      const existingPatent = getItemById(patentId);
      if (existingPatent) {
        setFormData({
          ...existingPatent,
          date: existingPatent.date ? 
            new Date(existingPatent.date).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          inventors: Array.isArray(existingPatent.inventors) ? existingPatent.inventors.join(', ') : existingPatent.inventors || ''
        });
      }
    }
  }, [patentId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting patent data:', formData);
      
      const patentItem = {
        ...formData,
        inventors: formData.inventors.split(',').map(inv => inv.trim()).filter(inv => inv),
        createdAt: patentId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      console.log('Processed patent item:', patentItem);
      
      let result;
      if (patentId) {
        result = updateItem(patentId, patentItem);
      } else {
        result = addItem(patentItem);
      }
      
      console.log('Save result:', result);
      
      if (result) {
        console.log('Patent saved successfully');
        // Force refresh the data
        refresh();
        onSuccess?.(result);
      } else {
        console.error('Failed to save patent');
        alert('Failed to save patent. Please try again.');
      }
    } catch (error) {
      console.error('Error saving patent:', error);
      alert('Error saving patent: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{patentId ? 'Edit Patent' : 'Add Patent'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Patent Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter patent title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Short Title</label>
          <input
            type="text"
            name="shortTitle"
            value={formData.shortTitle}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter short title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
            placeholder="Enter patent description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Inventors (comma separated)</label>
          <input
            type="text"
            name="inventors"
            value={formData.inventors}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="John Doe, Jane Smith, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Patent Office</label>
            <select
              name="patentOffice"
              value={formData.patentOffice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Europe">Europe</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Application Number</label>
            <input
              type="text"
              name="applicationNumber"
              value={formData.applicationNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="123456789"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Published Online">Published Online</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Technology, Healthcare, etc."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
          >
            {isSubmitting ? 'Saving...' : (patentId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// News Form Component
const NewsForm = ({ newsId = null, onSuccess, onCancel }) => {
  const { data: newsData, addItem, updateItem, getItemById, refresh } = useLocalStorage(STORAGE_KEYS.NEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0],
    categories: 'NOTICE',
    status: 'published'
  });

  useEffect(() => {
    if (newsId) {
      const existingNews = getItemById(newsId);
      if (existingNews) {
        setFormData({
          ...existingNews,
          publishedAt: existingNews.publishedAt ? 
            new Date(existingNews.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [newsId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newsItem = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        createdAt: newsId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (newsId) {
        result = updateItem(newsId, newsItem);
      } else {
        result = addItem(newsItem);
      }
      
      if (result) {
        refresh();
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error saving news: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{newsId ? 'Edit News' : 'Add News'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter news title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Summary/Slug</label>
          <textarea
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
            placeholder="Brief summary of the news"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={8}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
            placeholder="Enter the full news content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="NOTICE">NOTICE</option>
              <option value="ACHIEVEMENT">ACHIEVEMENT</option>
              <option value="EVENT">EVENT</option>
              <option value="RESEARCH">RESEARCH</option>
              <option value="UPDATE">UPDATE</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Published Date</label>
            <input
              type="date"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
          >
            {isSubmitting ? 'Saving...' : (newsId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Projects Form Component
const ProjectsForm = ({ projectId = null, onSuccess, onCancel }) => {
  const { data: projectsData, addItem, updateItem, getItemById, refresh } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0],
    author: '',
    categories: 'Web Development',
    status: 'published'
  });

  useEffect(() => {
    if (projectId) {
      const existingProject = getItemById(projectId);
      if (existingProject) {
        setFormData({
          ...existingProject,
          publishedAt: existingProject.publishedAt ? 
            new Date(existingProject.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [projectId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const projectItem = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        createdAt: projectId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (projectId) {
        result = updateItem(projectId, projectItem);
      } else {
        result = addItem(projectItem);
      }
      
      if (result) {
        refresh();
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{projectId ? 'Edit Project' : 'Add Project'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project URL Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="project-url-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
            placeholder="Brief project description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={8}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
            placeholder="Enter detailed project information, methodology, technologies used, etc..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Author/Lead *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Project lead name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="IoT">IoT</option>
              <option value="Robotics">Robotics</option>
              <option value="Data Science">Data Science</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Date</label>
          <input
            type="date"
            name="publishedAt"
            value={formData.publishedAt}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
          >
            {isSubmitting ? 'Saving...' : (projectId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('patents');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showMigration, setShowMigration] = useState(false);

  const currentSection = ADMIN_SECTIONS.find(s => s.key === activeSection);
  const { data, loading, deleteItem, refresh } = useLocalStorage(currentSection?.storageKey);

  // Debug logging
  useEffect(() => {
    console.log('Current section:', activeSection);
    console.log('Data for section:', data);
    console.log('Storage key:', currentSection?.storageKey);
  }, [activeSection, data, currentSection]);

  const handleAdd = () => {
    console.log('Adding new item for section:', activeSection);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    console.log('Editing item:', id);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', id);
      const success = deleteItem(id);
      if (success) {
        console.log('Item deleted successfully');
        refresh();
      } else {
        console.error('Failed to delete item');
      }
    }
  };

  const handleFormSuccess = (result) => {
    console.log('Form submitted successfully:', result);
    setShowForm(false);
    setEditingId(null);
    refresh();
    alert('Item saved successfully!');
  };

  const handleFormCancel = () => {
    console.log('Form cancelled');
    setShowForm(false);
    setEditingId(null);
  };

  const toggleImportExport = () => {
    setShowImportExport(!showImportExport);
    setShowMigration(false);
  };

  const toggleMigration = () => {
    setShowMigration(!showMigration);
    setShowImportExport(false);
  };

  const handleExport = () => {
    try {
      const exportData = StorageManager.exportData();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aac-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Check console for details.');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          StorageManager.importData(importData);
          refresh();
          alert('Data imported successfully!');
          window.location.reload();
        } catch (error) {
          console.error('Import failed:', error);
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'news':
        return (
          <NewsForm
            newsId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projectId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case 'patents':
        return (
          <PatentsForm
            patentId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      default:
        return (
          <div className="bg-[#1a2535] rounded-xl p-8 border border-gray-700">
            <p className="text-gray-300">Form for {activeSection} coming soon...</p>
            <button
              onClick={handleFormCancel}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        );
    }
  };

  const renderItemList = () => {
    if (loading) {
      return <div className="text-center py-8 text-gray-400">Loading...</div>;
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No {activeSection} yet</h3>
          <p className="text-gray-400 mb-6">Create your first {activeSection.slice(0, -1)} to get started.</p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
          >
            Add {activeSection.slice(0, -1)}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a2535] rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title || item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.categories && (
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                      {item.categories}
                    </span>
                  )}
                  {item.status && (
                    <span className={`px-2 py-1 text-xs rounded border ${
                      item.status === 'published' 
                        ? 'bg-green-900/50 text-green-300 border-green-700/50'
                        : 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50'
                    }`}>
                      {item.status}
                    </span>
                  )}
                  {item.date && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">{item.description}</p>
                )}
                {item.shortTitle && (
                  <p className="text-gray-400 text-sm">Short Title: {item.shortTitle}</p>
                )}
                {item.author && (
                  <p className="text-gray-400 text-sm">Author: {item.author}</p>
                )}
                {item.inventors && Array.isArray(item.inventors) && (
                  <p className="text-gray-400 text-sm">Inventors: {item.inventors.join(', ')}</p>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded hover:bg-blue-800/50 transition-colors border border-blue-700/50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-900/50 text-red-300 rounded hover:bg-red-800/50 transition-colors border border-red-700/50"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | AAC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#0e1421] py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            {/* Header with Fixed Button Layout */}
            <div className="bg-[#1a2535] rounded-xl p-6 mb-6 border border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
                    <p className="text-gray-400">Manage your AAC website content</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <button
                      onClick={toggleImportExport}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
                    >
                      {showImportExport ? '✖️ Close Import/Export' : '📁 Import/Export'}
                    </button>
                    <button
                      onClick={toggleMigration}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors text-center font-medium"
                    >
                      {showMigration ? '✖️ Close Migration' : '🔄 Data Migration'}
                    </button>
                  </div>
                </div>

                {/* Import/Export Section */}
                {showImportExport && (
                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">📁 Data Import/Export</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium mb-2">📤 Export Data</h4>
                        <p className="text-gray-400 text-sm mb-3">Download all content as JSON</p>
                        <button
                          onClick={handleExport}
                          className="w-full px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
                        >
                          Download Backup
                        </button>
                      </div>
                      
                      <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium mb-2">📥 Import Data</h4>
                        <p className="text-gray-400 text-sm mb-3">Upload JSON file to restore</p>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <button className="w-full px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700 relative z-0">
                            Select JSON File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Migration Section */}
                {showMigration && (
                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <SimpleMigrationComponent />
                  </div>
                )}
              </div>
            </div>

            {/* Section Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {ADMIN_SECTIONS.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    activeSection === section.key
                      ? 'bg-blue-900 text-blue-300 border border-blue-700'
                      : 'bg-[#1a2535] text-gray-300 hover:bg-[#243447] border border-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">{section.icon}</div>
                  <div className="text-xs font-medium">{section.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#1a2535] rounded-xl shadow-xl border border-gray-700">
                  <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">
                      {currentSection?.label} ({data.length})
                    </h2>
                    <button
                      onClick={handleAdd}
                      className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      Add {currentSection?.label.slice(0, -1)}
                    </button>
                  </div>
                  <div className="p-6">
                    {renderItemList()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;