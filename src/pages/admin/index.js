// src/pages/admin/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { STORAGE_KEYS, StorageManager } from '@/lib/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import NewsForm from '@/components/Forms/NewsForm';
import ProjectsForm from '@/components/Forms/ProjectsForm';
import EventsForm from '@/components/Forms/EventsForm';
import PublicationsForm from '@/components/Forms/PublicationsForm';
import { MigrationComponent } from '@/lib/dataMigration';

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

// Patents Form Component
const PatentsForm = ({ patentId = null, onSuccess, onCancel }) => {
  const { data: patentsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PATENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    description: '',
    inventors: [''],
    patentOffice: 'India',
    applicationNumber: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Published Online',
    category: '',
    image: ''
  });

  React.useEffect(() => {
    if (patentId) {
      const existingPatent = getItemById(patentId);
      if (existingPatent) {
        setFormData({
          ...existingPatent,
          date: existingPatent.date ? 
            new Date(existingPatent.date).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          inventors: existingPatent.inventors || ['']
        });
      }
    }
  }, [patentId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field) => (values) => {
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const patentItem = {
        ...formData,
        inventors: formData.inventors.filter(inventor => inventor.trim())
      };
      
      let result;
      if (patentId) {
        result = updateItem(patentId, patentItem);
      } else {
        result = addItem(patentItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving patent:', error);
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
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Short Title *</label>
          <input
            type="text"
            name="shortTitle"
            value={formData.shortTitle}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Inventors</label>
          {formData.inventors.map((inventor, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={inventor}
                onChange={(e) => {
                  const newInventors = [...formData.inventors];
                  newInventors[index] = e.target.value;
                  setFormData(prev => ({ ...prev, inventors: newInventors }));
                }}
                placeholder={`Inventor ${index + 1}`}
                className="flex-1 px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="button"
                onClick={() => {
                  const newInventors = formData.inventors.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, inventors: newInventors }));
                }}
                className="px-3 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, inventors: [...prev.inventors, ''] }))}
            className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
          >
            Add Inventor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Application Number</label>
            <input
              type="text"
              name="applicationNumber"
              value={formData.applicationNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
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

// Books Form Component
const BooksForm = ({ bookId = null, onSuccess, onCancel }) => {
  const { data: booksData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.BOOKS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authors: [''],
    category: '',
    year: new Date().getFullYear(),
    cover: '',
    color: 'blue'
  });

  React.useEffect(() => {
    if (bookId) {
      const existingBook = getItemById(bookId);
      if (existingBook) {
        setFormData({
          ...existingBook,
          authors: existingBook.authors || ['']
        });
      }
    }
  }, [bookId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const bookItem = {
        ...formData,
        authors: formData.authors.filter(author => author.trim()),
        year: parseInt(formData.year)
      };
      
      let result;
      if (bookId) {
        result = updateItem(bookId, bookItem);
      } else {
        result = addItem(bookItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{bookId ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Book Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Authors</label>
          {formData.authors.map((author, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) => {
                  const newAuthors = [...formData.authors];
                  newAuthors[index] = e.target.value;
                  setFormData(prev => ({ ...prev, authors: newAuthors }));
                }}
                placeholder={`Author ${index + 1}`}
                className="flex-1 px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="button"
                onClick={() => {
                  const newAuthors = formData.authors.filter((_, i) => i !== index);
                  setFormData(prev => ({ ...prev, authors: newAuthors }));
                }}
                className="px-3 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, authors: [...prev.authors, ''] }))}
            className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
          >
            Add Author
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Select Category</option>
              <option value="Programming">Programming</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Game Development">Game Development</option>
              <option value="IoT">IoT</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              min="2000"
              max={new Date().getFullYear() + 5}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image URL</label>
          <input
            type="url"
            name="cover"
            value={formData.cover}
            onChange={handleInputChange}
            placeholder="https://..."
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
            {isSubmitting ? 'Saving...' : (bookId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Alumni Form Component
const AlumniForm = ({ alumniId = null, onSuccess, onCancel }) => {
  const { data: alumniData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.ALUMNI);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    image: '',
    graduationYear: new Date().getFullYear(),
    department: ''
  });

  React.useEffect(() => {
    if (alumniId) {
      const existingAlumni = getItemById(alumniId);
      if (existingAlumni) {
        setFormData(existingAlumni);
      }
    }
  }, [alumniId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const alumniItem = {
        ...formData,
        graduationYear: parseInt(formData.graduationYear)
      };
      
      let result;
      if (alumniId) {
        result = updateItem(alumniId, alumniItem);
      } else {
        result = addItem(alumniItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving alumni:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{alumniId ? 'Edit Alumni' : 'Add Alumni'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Select Department</option>
              <option value="Computer Science Engineering">Computer Science Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
              <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Graduation Year</label>
          <input
            type="number"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            min="2000"
            max={new Date().getFullYear()}
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://..."
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
            {isSubmitting ? 'Saving...' : (alumniId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Core Committee Form Component
const CoreCommitteeForm = ({ memberId = null, onSuccess, onCancel }) => {
  const { data: committeeData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.CORE_COMMITTEE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    image: '',
    year: new Date().getFullYear(),
    department: ''
  });

  React.useEffect(() => {
    if (memberId) {
      const existingMember = getItemById(memberId);
      if (existingMember) {
        setFormData(existingMember);
      }
    }
  }, [memberId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const memberItem = {
        ...formData,
        year: parseInt(formData.year)
      };
      
      let result;
      if (memberId) {
        result = updateItem(memberId, memberItem);
      } else {
        result = addItem(memberItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving committee member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-8 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white">{memberId ? 'Edit Committee Member' : 'Add Committee Member'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Select Designation</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Technical Coordinator">Technical Coordinator</option>
              <option value="Database Coordinator">Database Coordinator</option>
              <option value="Finance Coordinator">Finance Coordinator</option>
              <option value="PR Coordinator">PR Coordinator</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              min="2020"
              max={new Date().getFullYear() + 5}
              className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://..."
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
            {isSubmitting ? 'Saving...' : (memberId ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('news');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showMigration, setShowMigration] = useState(false);

  const currentSection = ADMIN_SECTIONS.find(s => s.key === activeSection);
  const { data, loading, deleteItem, refresh } = useLocalStorage(currentSection?.storageKey);

  const handleAdd = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const success = deleteItem(id);
      if (success) {
        refresh();
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingId(null);
    refresh();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleExport = () => {
    const data = StorageManager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aac-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          StorageManager.importData(data);
          refresh();
          alert('Data imported successfully!');
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
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
      case 'events':
        return (
          <EventsForm
            eventId={editingId}  
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case 'publications':
        return (
          <PublicationsForm
            publicationId={editingId}
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
      case 'books':
        return (
          <BooksForm
            bookId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case 'alumni':
        return (
          <AlumniForm
            alumniId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case 'committee':
        return (
          <CoreCommitteeForm
            memberId={editingId}
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
                  {item.category && (
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                      {item.category}
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
                  {item.publishedAt && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                  {item.date && !item.publishedAt && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {item.slug && (
                  <p className="text-gray-400 text-sm line-clamp-2">{item.slug}</p>
                )}
                {item.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                )}
                {item.author && (
                  <p className="text-gray-400 text-sm">Author: {item.author}</p>
                )}
                {item.designation && (
                  <p className="text-gray-400 text-sm">Designation: {item.designation}</p>
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
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Content Management</h1>
                <p className="text-gray-400">Manage your AAC website content</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowImportExport(!showImportExport)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Import/Export
                </button>
                <button
                  onClick={() => setShowMigration(!showMigration)}
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Data Migration
                </button>
              </div>
            </div>

            {showImportExport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-[#1a2535] rounded-lg p-4 mb-6 border border-gray-700"
              >
                <div className="flex space-x-4">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
                  >
                    Export All Data
                  </button>
                  <label className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer border border-blue-700">
                    Import Data
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </div>
              </motion.div>
            )}

            {showMigration && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6"
              >
                <MigrationComponent />
              </motion.div>
            )}

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
                <div className="bg-[#0e1421] rounded-xl shadow-xl">
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