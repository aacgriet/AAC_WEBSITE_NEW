// src/pages/admin/index.js - Updated with Delete All and Import/Export functionality
import React, { useState, useEffect, useRef } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import AdminAuth from '@/components/AdminAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaBook, 
  FaNewspaper, 
  FaCalendarAlt, 
  FaProjectDiagram,
  FaFileAlt,
  FaCertificate,
  FaRocket,
  FaGraduationCap,
  FaUsers,
  FaDownload,
  FaUpload,
  FaTrashAlt,
  FaFileImport,
  FaFileExport,
  FaDatabase,
  FaExclamationTriangle
} from 'react-icons/fa';

// Form components
import NewsForm from '@/components/Forms/NewsForm';
import EventsForm from '@/components/Forms/EventsForm';
import ProjectsForm from '@/components/Forms/ProjectsForm';
import PublicationsForm from '@/components/Forms/PublicationsForm';
import PatentsForm from '@/components/Forms/PatentsForm';
import BooksForm from '@/components/Forms/BooksForm';
import StartupsForm from '@/components/Forms/StartupsForm';
import AlumniForm from '@/components/Forms/AlumniForm';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState('add');
  
  // Delete All Modal State
  const [deleteAllModal, setDeleteAllModal] = useState({
    isOpen: false,
    section: '',
    isDeleting: false
  });
  
  // Import/Export Modal State
  const [importExportModal, setImportExportModal] = useState({
    isOpen: false,
    section: '',
    type: '', // 'import' or 'export'
    isProcessing: false
  });
  
  const fileInputRef = useRef(null);

  // Database hooks for all collections
  const newsDB = useDatabase('news');
  const eventsDB = useDatabase('events');
  const projectsDB = useDatabase('projects');
  const publicationsDB = useDatabase('publications');
  const patentsDB = useDatabase('patents');
  const booksDB = useDatabase('books');
  const startupsDB = useDatabase('startups');
  const alumniDB = useDatabase('alumni');

  // Get database hook based on section
  const getDBHook = (section) => {
    const dbMap = {
      news: newsDB,
      events: eventsDB,
      projects: projectsDB,
      publications: publicationsDB,
      patents: patentsDB,
      books: booksDB,
      startups: startupsDB,
      alumni: alumniDB
    };
    return dbMap[section];
  };

  // Statistics data
  const getStats = () => {
    return [
      { 
        title: 'News Articles', 
        count: newsDB.data.length, 
        icon: <FaNewspaper />, 
        color: 'from-blue-500 to-blue-600',
        section: 'news'
      },
      { 
        title: 'Events', 
        count: eventsDB.data.length, 
        icon: <FaCalendarAlt />, 
        color: 'from-purple-500 to-purple-600',
        section: 'events'
      },
      { 
        title: 'Projects', 
        count: projectsDB.data.length, 
        icon: <FaProjectDiagram />, 
        color: 'from-green-500 to-green-600',
        section: 'projects'
      },
      { 
        title: 'Publications', 
        count: publicationsDB.data.length, 
        icon: <FaFileAlt />, 
        color: 'from-indigo-500 to-indigo-600',
        section: 'publications'
      },
      { 
        title: 'Patents', 
        count: patentsDB.data.length, 
        icon: <FaCertificate />, 
        color: 'from-amber-500 to-amber-600',
        section: 'patents'
      },
      { 
        title: 'Books & Blogs', 
        count: booksDB.data.length, 
        icon: <FaBook />, 
        color: 'from-pink-500 to-pink-600',
        section: 'books'
      },
      { 
        title: 'Startups', 
        count: startupsDB.data.length, 
        icon: <FaRocket />, 
        color: 'from-orange-500 to-orange-600',
        section: 'startups'
      },
      { 
        title: 'Alumni', 
        count: alumniDB.data.length, 
        icon: <FaGraduationCap />, 
        color: 'from-teal-500 to-teal-600',
        section: 'alumni'
      }
    ];
  };

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaUsers /> },
    { id: 'news', label: 'News', icon: <FaNewspaper /> },
    { id: 'events', label: 'Events', icon: <FaCalendarAlt /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'publications', label: 'Publications', icon: <FaFileAlt /> },
    { id: 'patents', label: 'Patents', icon: <FaCertificate /> },
    { id: 'books', label: 'Books & Blogs', icon: <FaBook /> },
    { id: 'startups', label: 'Startups', icon: <FaRocket /> },
    { id: 'alumni', label: 'Alumni', icon: <FaGraduationCap /> }
  ];

  // Handle form submission success
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
    setFormType('add');
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
    setFormType('add');
  };

  // Handle add new item
  const handleAddNew = () => {
    setSelectedItem(null);
    setFormType('add');
    setIsFormOpen(true);
  };

  // Handle edit item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setFormType('edit');
    setIsFormOpen(true);
  };

  // Handle delete item
  const handleDeleteItem = async (itemId) => {
    const dbHook = getDBHook(activeSection);
    if (dbHook) {
      await dbHook.deleteItem(itemId);
    }
  };

  // Handle Delete All
  const handleDeleteAll = (section) => {
    setDeleteAllModal({
      isOpen: true,
      section,
      isDeleting: false
    });
  };

  const confirmDeleteAll = async () => {
    setDeleteAllModal(prev => ({ ...prev, isDeleting: true }));
    
    try {
      const dbHook = getDBHook(deleteAllModal.section);
      if (dbHook) {
        // Delete all items one by one
        const promises = dbHook.data.map(item => 
          dbHook.deleteItem(item.id || item._id)
        );
        await Promise.all(promises);
      }
      
      setTimeout(() => {
        setDeleteAllModal({ isOpen: false, section: '', isDeleting: false });
      }, 1500);
    } catch (error) {
      console.error('Error deleting all items:', error);
      setDeleteAllModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  // Handle Export
  const handleExport = (section) => {
    setImportExportModal({
      isOpen: true,
      section,
      type: 'export',
      isProcessing: false
    });
  };

  const confirmExport = () => {
    setImportExportModal(prev => ({ ...prev, isProcessing: true }));
    
    try {
      const dbHook = getDBHook(importExportModal.section);
      if (dbHook) {
        const dataToExport = {
          collection: importExportModal.section,
          exportDate: new Date().toISOString(),
          totalItems: dbHook.data.length,
          data: dbHook.data
        };
        
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `aac-${importExportModal.section}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
      setTimeout(() => {
        setImportExportModal({ isOpen: false, section: '', type: '', isProcessing: false });
      }, 1500);
    } catch (error) {
      console.error('Error exporting data:', error);
      setImportExportModal(prev => ({ ...prev, isProcessing: false }));
    }
  };

  // Handle Import
  const handleImport = (section) => {
    setImportExportModal({
      isOpen: true,
      section,
      type: 'import',
      isProcessing: false
    });
  };

  const confirmImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportExportModal(prev => ({ ...prev, isProcessing: true }));

    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      const dbHook = getDBHook(importExportModal.section);
      if (dbHook && importData.data && Array.isArray(importData.data)) {
        // Import all items
        const promises = importData.data.map(item => dbHook.addItem(item));
        await Promise.all(promises);
      }

      setTimeout(() => {
        setImportExportModal({ isOpen: false, section: '', type: '', isProcessing: false });
      }, 1500);
    } catch (error) {
      console.error('Error importing data:', error);
      setImportExportModal(prev => ({ ...prev, isProcessing: false }));
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get form component based on section
  const getFormComponent = () => {
    const formProps = {
      [activeSection === 'news' ? 'newsId' : 
       activeSection === 'events' ? 'eventId' :
       activeSection === 'projects' ? 'projectId' :
       activeSection === 'publications' ? 'publicationId' :
       activeSection === 'patents' ? 'patentId' :
       activeSection === 'books' ? 'bookId' :
       activeSection === 'startups' ? 'startupId' :
       'alumnusId']: formType === 'edit' ? (selectedItem?.id || selectedItem?._id) : null,
      onSuccess: handleFormSuccess,
      onCancel: handleFormCancel
    };

    switch (activeSection) {
      case 'news': return <NewsForm {...formProps} />;
      case 'events': return <EventsForm {...formProps} />;
      case 'projects': return <ProjectsForm {...formProps} />;
      case 'publications': return <PublicationsForm {...formProps} />;
      case 'patents': return <PatentsForm {...formProps} />;
      case 'books': return <BooksForm {...formProps} />;
      case 'startups': return <StartupsForm {...formProps} />;
      case 'alumni': return <AlumniForm {...formProps} />;
      default: return null;
    }
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="text-gray-400 text-sm">
          Total Collections: {navigationItems.length - 1}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a2535] rounded-xl p-6 shadow-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer"
            onClick={() => setActiveSection(stat.section)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stat.count}</div>
                <div className="text-gray-400 text-sm">Total</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
            <div className={`mt-2 h-1 bg-gradient-to-r ${stat.color} rounded-full`}></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Render data table
  const renderDataTable = () => {
    const dbHook = getDBHook(activeSection);
    if (!dbHook) return null;

    const data = dbHook.data;
    const currentStat = getStats().find(s => s.section === activeSection);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">{activeSection}</h1>
            <p className="text-gray-400">Manage your {activeSection} data</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
            >
              <FaPlus />
              Add New
            </button>
            
            <button
              onClick={() => handleExport(activeSection)}
              className="flex items-center gap-2 px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
            >
              <FaFileExport />
              Export
            </button>
            
            <button
              onClick={() => handleImport(activeSection)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-purple-300 rounded-lg hover:bg-purple-800 transition-colors border border-purple-700"
            >
              <FaFileImport />
              Import
            </button>
            
            <button
              onClick={() => handleDeleteAll(activeSection)}
              className="flex items-center gap-2 px-4 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700"
            >
              <FaTrashAlt />
              Delete All
            </button>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-[#1a2535] rounded-xl p-12 text-center border border-gray-700">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentStat?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center mx-auto mb-4`}>
              {currentStat?.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No {activeSection} found</h3>
            <p className="text-gray-400 mb-6">Get started by adding your first {activeSection.slice(0, -1)}.</p>
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
            >
              Add First {activeSection.slice(0, -1)}
            </button>
          </div>
        ) : (
          <div className="bg-[#1a2535] rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0e1421] border-b border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title/Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Category/Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {data.map((item, index) => (
                    <motion.tr
                      key={item.id || item._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="hover:bg-[#0e1421] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {item.title || item.name || item.shortTitle || 'Untitled'}
                        </div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {item.slug?.current || item.description || item.abstract || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                          {item.categories || item.category || item.status || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() :
                         item.date ? new Date(item.date).toLocaleDateString() :
                         item.establishedDate ? new Date(item.establishedDate).toLocaleDateString() :
                         'No date'}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id || item._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-[#0e1421] min-h-screen border-r border-gray-700 fixed left-0 top-0 pt-24 z-40">
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeSection === item.id
                        ? 'bg-blue-900 text-blue-300 border border-blue-700'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 ml-64 pt-24 p-8">
            <AnimatePresence mode="wait">
              {isFormOpen ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {getFormComponent()}
                </motion.div>
              ) : (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 'dashboard' ? renderDashboard() : renderDataTable()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Delete All Confirmation Modal */}
        <AnimatePresence>
          {deleteAllModal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="backdrop-blur-md bg-[#1a2535] rounded-2xl shadow-2xl border border-red-700/50 overflow-hidden max-w-md w-full"
              >
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FaExclamationTriangle className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Delete All {deleteAllModal.section}</h2>
                      <p className="text-red-100">This action cannot be undone</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    Are you sure you want to delete all {deleteAllModal.section} data? This will permanently remove all items from the database.
                  </p>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setDeleteAllModal({ isOpen: false, section: '', isDeleting: false })}
                      disabled={deleteAllModal.isDeleting}
                      className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeleteAll}
                      disabled={deleteAllModal.isDeleting}
                      className="px-4 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {deleteAllModal.isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-300/30 border-t-red-300 rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FaTrashAlt />
                          Delete All
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Import/Export Modal */}
        <AnimatePresence>
          {importExportModal.isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`backdrop-blur-md bg-[#1a2535] rounded-2xl shadow-2xl border ${
                  importExportModal.type === 'export' ? 'border-green-700/50' : 'border-purple-700/50'
                } overflow-hidden max-w-md w-full`}
              >
                <div className={`bg-gradient-to-r ${
                  importExportModal.type === 'export' ? 'from-green-600 to-green-700' : 'from-purple-600 to-purple-700'
                } p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {importExportModal.type === 'export' ? <FaFileExport className="text-xl" /> : <FaFileImport className="text-xl" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {importExportModal.type === 'export' ? 'Export' : 'Import'} {importExportModal.section}
                      </h2>
                      <p className={importExportModal.type === 'export' ? 'text-green-100' : 'text-purple-100'}>
                        {importExportModal.type === 'export' ? 'Download data as JSON' : 'Upload JSON file'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 mb-6">
                    {importExportModal.type === 'export' 
                      ? `Export all ${importExportModal.section} data to a JSON file for backup or migration.`
                      : `Import ${importExportModal.section} data from a JSON file. This will add new items to the existing data.`
                    }
                  </p>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setImportExportModal({ isOpen: false, section: '', type: '', isProcessing: false })}
                      disabled={importExportModal.isProcessing}
                      className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={importExportModal.type === 'export' ? confirmExport : confirmImport}
                      disabled={importExportModal.isProcessing}
                      className={`px-4 py-2 ${
                        importExportModal.type === 'export' 
                          ? 'bg-green-900 text-green-300 border-green-700 hover:bg-green-800' 
                          : 'bg-purple-900 text-purple-300 border-purple-700 hover:bg-purple-800'
                      } rounded-lg transition-colors border disabled:opacity-50 flex items-center gap-2`}
                    >
                      {importExportModal.isProcessing ? (
                        <>
                          <div className={`w-4 h-4 border-2 ${
                            importExportModal.type === 'export' ? 'border-green-300/30 border-t-green-300' : 'border-purple-300/30 border-t-purple-300'
                          } rounded-full animate-spin`}></div>
                          {importExportModal.type === 'export' ? 'Exporting...' : 'Importing...'}
                        </>
                      ) : (
                        <>
                          {importExportModal.type === 'export' ? <FaDownload /> : <FaUpload />}
                          {importExportModal.type === 'export' ? 'Export' : 'Import'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden file input for import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </AdminAuth>
  );
};

export default AdminDashboard;