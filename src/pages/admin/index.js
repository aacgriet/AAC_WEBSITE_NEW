
// src/pages/admin/index.js - Updated with Premium UI Design System
import React, { useState, useEffect, useRef } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import AdminAuth from '@/components/AdminAuth';
import { motion, AnimatePresence } from 'framer-motion';

// Custom CSS for breathing animations
const customStyles = `
  @keyframes breathe {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  
  @keyframes breathe-slow {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }
  
  @keyframes grid-move {
    0% { transform: translateX(-100%) skewY(-12deg); }
    100% { transform: translateX(100%) skewY(-12deg); }
  }
  
  .animate-breathe {
    animation: breathe 3s ease-in-out infinite;
  }
  
  .animate-breathe-slow {
    animation: breathe-slow 4s ease-in-out infinite;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-grid {
    animation: grid-move 8s linear infinite;
  }
  
  .animation-delay-1000 {
    animation-delay: 1s;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-500 {
    animation-delay: 0.5s;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}
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
  FaExclamationTriangle,
  FaTachometerAlt
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
        color: 'from-emerald-500 to-emerald-600',
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
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
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

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Render dashboard overview
  const renderDashboard = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-12 pb-16 mb-12 overflow-hidden rounded-3xl">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-breathe"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/25 to-pink-600/25 rounded-full blur-3xl animate-breathe-slow animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-breathe animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-grid"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-breathe"></div>
            <span className="text-sm font-medium">Content Management System</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Admin
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
            Manage all your content with powerful tools and intuitive interface
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-breathe animate-float"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-breathe animation-delay-500"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-breathe animation-delay-1000"></div>
          </div>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {getStats().map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={childVariants}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer p-6"
            onClick={() => setActiveSection(stat.section)}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg animate-float`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{stat.count}</div>
                  <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Total</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{stat.title}</h3>
              <div className={`mt-3 h-1 bg-gradient-to-r ${stat.color} rounded-full shadow-lg animate-breathe-slow`}></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  // Render data table
  const renderDataTable = () => {
    const dbHook = getDBHook(activeSection);
    if (!dbHook) return null;

    const data = dbHook.data;
    const currentStat = getStats().find(s => s.section === activeSection);

    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className={`bg-gradient-to-r ${currentStat?.color || 'from-blue-500 to-purple-500'} h-1.5 w-24 mb-4 rounded-full shadow-lg animate-breathe-slow`}></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent capitalize">
                {activeSection}
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your {activeSection} data with powerful tools</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddNew}
              className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaPlus />
                Add New
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => handleExport(activeSection)}
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105 flex items-center gap-2"
            >
              <FaFileExport />
              Export
            </button>
            
            <button
              onClick={() => handleImport(activeSection)}
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105 flex items-center gap-2"
            >
              <FaFileImport />
              Import
            </button>
            
            <button
              onClick={() => handleDeleteAll(activeSection)}
              className="px-6 py-3 bg-white/5 text-red-300 rounded-xl font-medium hover:bg-red-500/10 transition-all duration-200 border border-red-500/30 hover:border-red-500/50 hover:scale-105 flex items-center gap-2"
            >
              <FaTrashAlt />
              Delete All
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            Showing <span className="text-white font-medium">{data.length}</span> total {activeSection}
          </p>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-20">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentStat?.color || 'from-blue-500 to-purple-600'} flex items-center justify-center mx-auto mb-8 shadow-lg animate-float`}>
              <span className="text-4xl animate-breathe">{currentStat?.icon}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No {activeSection} found</h3>
            <p className="text-gray-400 text-lg mb-6">Get started by adding your first {activeSection.slice(0, -1)}.</p>
            <button
              onClick={handleAddNew}
              className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaPlus />
                Add First {activeSection.slice(0, -1)}
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        ) : (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
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
                <tbody className="divide-y divide-white/10">
                  {data.map((item, index) => (
                    <motion.tr
                      key={item.id || item._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="hover:bg-white/5 transition-all duration-300"
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
                        <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
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
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors hover:scale-110 duration-200"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id || item._id)}
                            className="text-red-400 hover:text-red-300 transition-colors hover:scale-110 duration-200"
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
      </div>
    );
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 backdrop-blur-sm bg-white/5 min-h-screen border-r border-white/10 fixed left-0 top-0 pt-24 z-40">
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">Admin Panel</h2>
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1 w-16 rounded-full shadow-lg animate-breathe-slow"></div>
              </div>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105'
                    }`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
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
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ duration: 0.4 }}
                className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-md w-full"
              >
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
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
                      className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDeleteAll}
                      disabled={deleteAllModal.isDeleting}
                      className="group/btn px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden disabled:opacity-50 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {deleteAllModal.isDeleting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrashAlt />
                            Delete All
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
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
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ duration: 0.4 }}
                className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-md w-full"
              >
                <div className={`bg-gradient-to-r ${
                  importExportModal.type === 'export' ? 'from-emerald-500 to-emerald-600' : 'from-purple-500 to-purple-600'
                } p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {importExportModal.type === 'export' ? <FaFileExport className="text-xl" /> : <FaFileImport className="text-xl" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {importExportModal.type === 'export' ? 'Export' : 'Import'} {importExportModal.section}
                      </h2>
                      <p className={importExportModal.type === 'export' ? 'text-emerald-100' : 'text-purple-100'}>
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
                      className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={importExportModal.type === 'export' ? confirmExport : confirmImport}
                      disabled={importExportModal.isProcessing}
                      className={`group/btn px-6 py-3 bg-gradient-to-r ${
                        importExportModal.type === 'export' 
                          ? 'from-emerald-500 to-emerald-600' 
                          : 'from-purple-500 to-purple-600'
                      } text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden disabled:opacity-50 hover:scale-105`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {importExportModal.isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {importExportModal.type === 'export' ? 'Exporting...' : 'Importing...'}
                          </>
                        ) : (
                          <>
                            {importExportModal.type === 'export' ? <FaDownload /> : <FaUpload />}
                            {importExportModal.type === 'export' ? 'Export' : 'Import'}
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
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