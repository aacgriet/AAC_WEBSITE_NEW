// // // src/pages/admin/index.js - Modernized with Premium UI Design System
// // import React, { useState, useEffect } from "react";
// // import Head from "next/head";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { STORAGE_KEYS, StorageManager } from "@/lib/storage";
// // import { useLocalStorage } from "@/hooks/useLocalStorage";
// // import AdminAuth from "@/components/AdminAuth";
// // import PublicationsForm from "@/components/Forms/PublicationsForm";
// // import PatentsForm from "@/components/Forms/PatentsForm";
// // import BooksForm from "@/components/Forms/BooksForm";
// // import AlumniForm from "@/components/Forms/AlumniForm";
// // import StartupsForm from "@/components/Forms/StartupsForm";
// // import NewsForm from "@/components/Forms/NewsForm";
// // import EventsForm from "@/components/Forms/EventsForm";
// // import ProjectsForm from "@/components/Forms/ProjectsForm";

// // const ADMIN_SECTIONS = [
// //   { key: "news", label: "News", icon: "📰", storageKey: STORAGE_KEYS.NEWS, color: "from-red-500 to-red-600" },
// //   {
// //     key: "projects",
// //     label: "Projects",
// //     icon: "🚀",
// //     storageKey: STORAGE_KEYS.PROJECTS,
// //     color: "from-blue-500 to-blue-600"
// //   },
// //   {
// //     key: "events",
// //     label: "Events",
// //     icon: "📅",
// //     storageKey: STORAGE_KEYS.EVENTS,
// //     color: "from-green-500 to-green-600"
// //   },
// //   {
// //     key: "publications",
// //     label: "Publications",
// //     icon: "📄",
// //     storageKey: STORAGE_KEYS.PUBLICATIONS,
// //     color: "from-purple-500 to-purple-600"
// //   },
// //   {
// //     key: "patents",
// //     label: "Patents",
// //     icon: "⚖️",
// //     storageKey: STORAGE_KEYS.PATENTS,
// //     color: "from-amber-500 to-amber-600"
// //   },
// //   {
// //     key: "startups",
// //     label: "Startups",
// //     icon: "🏢",
// //     storageKey: STORAGE_KEYS.STARTUPS,
// //     color: "from-emerald-500 to-emerald-600"
// //   },
// //   {
// //     key: "books",
// //     label: "Books & Blogs",
// //     icon: "📚",
// //     storageKey: STORAGE_KEYS.BOOKS,
// //     color: "from-indigo-500 to-indigo-600"
// //   },
// //   {
// //     key: "alumni",
// //     label: "Alumni",
// //     icon: "🎓",
// //     storageKey: STORAGE_KEYS.ALUMNI,
// //     color: "from-pink-500 to-pink-600"
// //   },
// // ];

// // // Modern Migration Component with Premium UI
// // const SimpleMigrationComponent = () => {
// //   const [stats, setStats] = useState(null);
// //   const [migrating, setMigrating] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleMigration = async () => {
// //     setMigrating(true);
// //     setError(null);
    
// //     try {
// //       // Add sample data for testing based on schema
// //       const sampleData = {
// //         [STORAGE_KEYS.NEWS]: [
// //           {
// //             id: "sample-news-1",
// //             title: "AAC Students Win National Hackathon",
// //             slug: "AAC team secures first place at the prestigious coding competition.",
// //             content: "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024...",
// //             publishedAt: new Date().toISOString(),
// //             categories: "ACHIEVEMENT",
// //             status: "published",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //         [STORAGE_KEYS.PATENTS]: [
// //           {
// //             id: "automated-pill-reminder",
// //             title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
// //             shortTitle: "Automated Pill Reminder Device",
// //             inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop"],
// //             patentOffice: "India",
// //             applicationNumber: "201941002559",
// //             date: new Date("2019-01-21").toISOString(),
// //             status: "Published Online",
// //             description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule...",
// //             category: "Healthcare",
// //             color: "purple",
// //             image: "",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //         [STORAGE_KEYS.PUBLICATIONS]: [
// //           {
// //             id: "sample-publication-1",
// //             title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
// //             abstract: "This paper proposes a novel ensemble learning method for accurately predicting wine quality...",
// //             authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
// //             publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
// //             category: "Machine Learning",
// //             year: 2024,
// //             publishedAt: new Date("2024-08-01").toISOString(),
// //             image: "",
// //             downloadUrl: "", 
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //         [STORAGE_KEYS.BOOKS]: [
// //           {
// //             id: "sample-book-1",
// //             title: "FUNDAMENTALS OF PYTHON IN A NUTSHELL",
// //             description: "This book, 'Fundamentals of PYTHON In a Nutshell,' appears to be an introductory guide to the Python programming language.",
// //             authors: ["Harshavardhini Kyatam", "Jatin Menghwani"],
// //             category: "Programming",
// //             year: 2022,
// //             cover: "https://res.cloudinary.com/aacgriet/image/upload/v1730629103/AAC-web/books/chadjmxbuhgfqx3ox91r.png",
// //             color: "blue",
// //             status: "published",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //         [STORAGE_KEYS.ALUMNI]: [
// //           {
// //             id: "sample-alumni-1",
// //             name: "John Doe",
// //             designation: "Software Engineer",
// //             company: "Google",
// //             image: "https://via.placeholder.com/300x300",
// //             graduationYear: 2020,
// //             department: "Computer Science Engineering",
// //             status: "active",
// //             email: "john@example.com",
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //         [STORAGE_KEYS.STARTUPS]: [
// //           {
// //             id: "sample-startup-1",
// //             name: "TechVenture",
// //             description: "Innovative technology solutions for modern problems",
// //             mission: "To revolutionize the tech industry with cutting-edge solutions",
// //             category: "Technology",
// //             color: "blue",
// //             status: "Active",
// //             establishedDate: new Date("2023-01-01").toISOString(),
// //             website: "https://techventure.com",
// //             logo: "https://via.placeholder.com/200x200",
// //             image: "https://via.placeholder.com/400x300",
// //             founders: ["Jane Smith", "Bob Johnson"],
// //             appScreenshots: [],
// //             createdAt: new Date().toISOString(),
// //             updatedAt: new Date().toISOString(),
// //           },
// //         ],
// //       };

// //       // Add sample data to storage
// //       for (const [key, data] of Object.entries(sampleData)) {
// //         try {
// //           const existing = await StorageManager.get(key);
// //           // Only add if no data exists
// //           if (existing.length === 0) {
// //             await StorageManager.set(key, data);
// //           }
// //         } catch (err) {
// //           console.error(`Error adding sample data for ${key}:`, err);
// //         }
// //       }

// //       setStats({ migrated: true, timestamp: new Date().toISOString() });
// //       showNotification("Sample data added successfully!");
// //       window.location.reload();
// //     } catch (error) {
// //       console.error("Migration error:", error);
// //       setError(error.message);
// //       showNotification("Migration failed. Check console for details.", 'error');
// //     } finally {
// //       setMigrating(false);
// //     }
// //   };

// //   const handleClearData = async () => {
// //     setShowClearDataModal(true);
// //   };

// //   const confirmClearData = async () => {
// //     setShowClearDataModal(false);
// //     try {
// //       await StorageManager.clearAll();
// //       showNotification("All data cleared successfully!");
// //       window.location.reload();
// //     } catch (error) {
// //       console.error("Clear data error:", error);
// //       setError(error.message);
// //       showNotification("Failed to clear data. Please try again.", 'error');
// //     }
// //   };

// //   useEffect(() => {
// //     const loadStats = async () => {
// //       try {
// //         const currentStats = {};
// //         for (const key of Object.values(STORAGE_KEYS)) {
// //           const data = await StorageManager.get(key);
// //           currentStats[key] = data.length;
// //         }
// //         setStats(currentStats);
// //       } catch (error) {
// //         console.error("Error loading stats:", error);
// //         setError(error.message);
// //       }
// //     };
    
// //     loadStats();
// //   }, []);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
// //     >
// //       {/* Header with gradient line */}
// //       <div className="mb-8">
// //         <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
// //         <div className="flex items-center gap-4 mb-6">
// //           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
// //             <span className="text-white text-2xl">⚡</span>
// //           </div>
// //           <h3 className="text-2xl font-bold text-white">Data Migration Utility</h3>
// //         </div>
// //       </div>

// //       {error && (
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm"
// //         >
// //           <div className="flex items-center gap-3">
// //             <span className="text-red-500 text-xl">⚠️</span>
// //             <div>
// //               <span className="font-medium">Error:</span> {error}
// //             </div>
// //           </div>
// //         </motion.div>
// //       )}

// //       <div className="flex flex-wrap gap-4 mb-8">
// //         <button
// //           onClick={handleMigration}
// //           disabled={migrating}
// //           className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
// //         >
// //           <span className="relative z-10 flex items-center justify-center gap-2">
// //             {migrating ? (
// //               <>
// //                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //                 Adding Sample Data...
// //               </>
// //             ) : (
// //               <>
// //                 Add Sample Data
// //                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //               </>
// //             )}
// //           </span>
// //           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //         </button>

// //         <button
// //           onClick={handleClearData}
// //           disabled={migrating}
// //           className="group/btn px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/25 hover:scale-105 relative overflow-hidden"
// //         >
// //           <span className="relative z-10 flex items-center justify-center gap-2">
// //             Clear All Data
// //             <span className="group-hover/btn:translate-x-1 transition-transform duration-200">🗑️</span>
// //           </span>
// //           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //         </button>
// //       </div>

// //       {stats && (
// //         <div className="backdrop-blur-sm bg-black/20 rounded-xl p-6 border border-white/5 shadow-lg">
// //           <h4 className="font-semibold mb-6 text-white flex items-center gap-3 text-lg">
// //             <span className="text-blue-400 text-xl">📊</span>
// //             Current Data Statistics
// //           </h4>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {Object.entries(stats).map(([key, count]) => (
// //               <motion.div
// //                 key={key}
// //                 whileHover={{ scale: 1.02 }}
// //                 className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
// //               >
// //                 <div className="text-gray-300 text-sm font-medium mb-1">
// //                   {key.replace('aac_', '').toUpperCase()}
// //                 </div>
// //                 <div className="text-white text-lg font-semibold">
// //                   {typeof count === "number" ? `${count} items` : count}
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </motion.div>
// //   );
// // };

// // // Modern Confirmation Modal Component
// // const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmColor = "from-red-500 to-red-600", icon = "🗑️" }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         initial={{ scale: 0.9, opacity: 0, y: 20 }}
// //         animate={{ scale: 1, opacity: 1, y: 0 }}
// //         exit={{ scale: 0.9, opacity: 0, y: 20 }}
// //         transition={{ duration: 0.3 }}
// //         className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-md w-full"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="p-6 border-b border-white/10">
// //           <div className="flex items-center gap-4">
// //             <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${confirmColor} flex items-center justify-center shadow-lg`}>
// //               <span className="text-xl">{icon}</span>
// //             </div>
// //             <div>
// //               <h3 className="text-xl font-bold text-white">{title}</h3>
// //               <p className="text-gray-400 text-sm">This action cannot be undone</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="p-6">
// //           <p className="text-gray-300 leading-relaxed">{message}</p>
// //         </div>

// //         {/* Actions */}
// //         <div className="p-6 bg-black/20 flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onConfirm}
// //             className={`flex-1 group/btn px-4 py-3 bg-gradient-to-r ${confirmColor} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105`}
// //           >
// //             <span className="relative z-10 flex items-center justify-center gap-2">
// //               {confirmText}
// //               <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //             </span>
// //             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //           </button>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // };

// // // Modern Notification Component
// // const ClearDataModal = ({ isOpen, onClose, onConfirm }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         initial={{ scale: 0.9, opacity: 0, y: 20 }}
// //         animate={{ scale: 1, opacity: 1, y: 0 }}
// //         exit={{ scale: 0.9, opacity: 0, y: 20 }}
// //         transition={{ duration: 0.3 }}
// //         className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-lg w-full"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="p-6 border-b border-white/10">
// //           <div className="flex items-center gap-4">
// //             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
// //               <span className="text-2xl">⚠️</span>
// //             </div>
// //             <div>
// //               <h3 className="text-2xl font-bold text-white">Clear All Data</h3>
// //               <p className="text-red-300 text-sm font-medium">⚠️ DESTRUCTIVE ACTION</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="p-6">
// //           <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
// //             <p className="text-red-300 text-sm leading-relaxed">
// //               <strong>Warning:</strong> This will permanently delete ALL data including news, projects, events, publications, patents, books, alumni, and startup information.
// //             </p>
// //           </div>
// //           <p className="text-gray-300 leading-relaxed">
// //             Are you absolutely sure you want to clear all data? This action cannot be undone and will remove everything from your database.
// //           </p>
// //         </div>

// //         {/* Actions */}
// //         <div className="p-6 bg-black/20 flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onConfirm}
// //             className="flex-1 group/btn px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
// //           >
// //             <span className="relative z-10 flex items-center justify-center gap-2">
// //               🗑️ Clear All Data
// //               <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //             </span>
// //             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //           </button>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // };
// // const Toast = ({ notification, onClose }) => {
// //   const getToastIcon = (type) => {
// //     switch (type) {
// //       case 'success': return '✅';
// //       case 'error': return '❌';
// //       case 'warning': return '⚠️';
// //       case 'info': return 'ℹ️';
// //       default: return 'ℹ️';
// //     }
// //   };

// //   const getToastColor = (type) => {
// //     switch (type) {
// //       case 'success': return 'from-green-500 to-emerald-600';
// //       case 'error': return 'from-red-500 to-red-600';
// //       case 'warning': return 'from-amber-500 to-orange-600';
// //       case 'info': return 'from-blue-500 to-blue-600';
// //       default: return 'from-blue-500 to-blue-600';
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: -50, x: 50 }}
// //       animate={{ opacity: 1, y: 0, x: 0 }}
// //       exit={{ opacity: 0, y: -50, x: 50 }}
// //       className="fixed top-6 right-6 z-[9999] max-w-md"
// //     >
// //       <div className={`backdrop-blur-md bg-gradient-to-r ${getToastColor(notification.type)} rounded-xl p-4 shadow-xl border border-white/20 text-white`}>
// //         <div className="flex items-start gap-3">
// //           <span className="text-xl flex-shrink-0 mt-0.5">{getToastIcon(notification.type)}</span>
// //           <div className="flex-1 min-w-0">
// //             <p className="font-medium text-sm leading-5">{notification.message}</p>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
// //           >
// //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // Main Admin Dashboard Component with Premium UI
// // const AdminDashboard = () => {
// //   // Persist active section - changed default from "alumni" to localStorage value or "news"
// //   const [activeSection, setActiveSection] = useState(() => {
// //     if (typeof window !== 'undefined') {
// //       return localStorage.getItem('admin_active_section') || "news";
// //     }
// //     return "news";
// //   });
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingId, setEditingId] = useState(null);
// //   const [showImportExport, setShowImportExport] = useState(false);
// //   const [showMigration, setShowMigration] = useState(false);
// //   const [notification, setNotification] = useState(null);
// //   const [deleteConfirmation, setDeleteConfirmation] = useState(null);
// //   const [showClearDataModal, setShowClearDataModal] = useState(false);

// //   // Show modern notification instead of alert
// //   const showNotification = (message, type = 'success') => {
// //     setNotification({ message, type });
// //     setTimeout(() => setNotification(null), 4000);
// //   };

// //   // Save active section to localStorage whenever it changes
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       localStorage.setItem('admin_active_section', activeSection);
// //     }
// //   }, [activeSection]);

// //   const currentSection = ADMIN_SECTIONS.find((s) => s.key === activeSection);
// //   const { data, loading, error, deleteItem, refresh } = useLocalStorage(
// //     currentSection?.storageKey
// //   );

// //   const handleAdd = () => {
// //     console.log("Adding new item for section:", activeSection);
// //     setEditingId(null);
// //     setShowForm(true);
// //   };

// //   const handleEdit = (id) => {
// //     console.log("Editing item:", id);
// //     setEditingId(id);
// //     setShowForm(true);
// //   };

// //   // Fixed delete operation with proper error handling and modern confirmation
// //   const handleDelete = async (id) => {
// //     const item = data.find(item => (item.id || item._id) === id);
// //     const itemTitle = getItemTitle(item);
    
// //     setDeleteConfirmation({
// //       id,
// //       title: itemTitle,
// //       message: `Are you sure you want to delete "${itemTitle}"? This will permanently remove it from your ${currentSection?.label.toLowerCase()}.`
// //     });
// //   };

// //   const confirmDelete = async () => {
// //     if (!deleteConfirmation) return;
    
// //     const { id } = deleteConfirmation;
// //     setDeleteConfirmation(null);
    
// //     console.log("Deleting item:", id);
// //     try {
// //       const success = await deleteItem(id);
// //       if (success) {
// //         console.log("Item deleted successfully");
// //         // Refresh data immediately after successful deletion
// //         await refresh();
// //         showNotification("Item deleted successfully!");
// //       } else {
// //         console.error("Failed to delete item");
// //         showNotification("Failed to delete item. Please try again.", 'error');
// //       }
// //     } catch (error) {
// //       console.error("Delete error:", error);
// //       showNotification("Error deleting item: " + error.message, 'error');
// //     }
// //   };

// //   // Enhanced form success handler with immediate refresh
// //   const handleFormSuccess = async (result) => {
// //     console.log("Form submitted successfully:", result);
// //     setShowForm(false);
// //     setEditingId(null);
// //     // Refresh data immediately after form success
// //     await refresh();
// //     showNotification("Item saved successfully!");
// //   };

// //   const handleFormCancel = () => {
// //     console.log("Form cancelled");
// //     setShowForm(false);
// //     setEditingId(null);
// //   };

// //   const toggleImportExport = () => {
// //     setShowImportExport(!showImportExport);
// //     setShowMigration(false);
// //   };

// //   const toggleMigration = () => {
// //     setShowMigration(!showMigration);
// //     setShowImportExport(false);
// //   };

// //   const handleExport = async () => {
// //     try {
// //       const exportData = await StorageManager.exportData();
// //       const blob = new Blob([JSON.stringify(exportData, null, 2)], {
// //         type: "application/json",
// //       });
// //       const url = URL.createObjectURL(blob);
// //       const a = document.createElement("a");
// //       a.href = url;
// //       a.download = `aac-data-${new Date().toISOString().split("T")[0]}.json`;
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       URL.revokeObjectURL(url);
// //       showNotification("Data exported successfully!");
// //     } catch (error) {
// //       console.error("Export failed:", error);
// //       showNotification("Export failed. Check console for details.", 'error');
// //     }
// //   };

// //   // Enhanced import handler with immediate refresh
// //   const handleImport = async (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = async (e) => {
// //         try {
// //           const importData = JSON.parse(e.target.result);
// //           console.log("Raw import data:", importData);

// //           let processedData = {};

// //           if (Array.isArray(importData)) {
// //             console.log("Detected array format");
// //             if (importData.length > 0 && importData[0].id && importData[0].title && importData[0].authors) {
// //               console.log("Detected books data format");
// //               processedData[STORAGE_KEYS.BOOKS] = importData;
// //             } else {
// //               console.log("Generic array detected, asking user for type");
// //               const dataType = prompt(
// //                 "What type of data is this? Enter one of: news, projects, events, publications, patents, books, alumni, startups"
// //               );
// //               const storageKey = STORAGE_KEYS[dataType?.toUpperCase()];
// //               if (storageKey) {
// //                 processedData[storageKey] = importData;
// //               } else {
// //                 throw new Error("Invalid data type specified");
// //               }
// //             }
// //           } else if (typeof importData === "object") {
// //             processedData = importData;
// //           } else {
// //             throw new Error("Invalid JSON format");
// //           }

// //           console.log("Processed data:", processedData);
// //           const totalImported = await StorageManager.importData(processedData);
          
// //           showNotification(`Successfully imported ${totalImported} items!`);
// //           // Refresh data immediately after import
// //           await refresh();
// //         } catch (error) {
// //           console.error("Import failed:", error);
// //           showNotification("Import failed: " + error.message, 'error');
// //         }
// //       };
// //       reader.readAsText(file);
// //     }
// //   };

// //   const renderForm = () => {
// //     const formProps = {
// //       onSuccess: handleFormSuccess,
// //       onCancel: handleFormCancel,
// //       ...(editingId && { [activeSection.slice(0, -1) + "Id"]: editingId }),
// //     };

// //     switch (activeSection) {
// //       case "news":
// //         return <NewsForm {...formProps} newsId={editingId} />;
// //       case "projects":
// //         return <ProjectsForm {...formProps} projectId={editingId} />;
// //       case "events":
// //         return <EventsForm {...formProps} eventId={editingId} />;
// //       case "publications":
// //         return <PublicationsForm {...formProps} publicationId={editingId} />;
// //       case "patents":
// //         return <PatentsForm {...formProps} patentId={editingId} />;
// //       case "books":
// //         return <BooksForm {...formProps} bookId={editingId} />;
// //       case "alumni":
// //         return <AlumniForm {...formProps} alumnusId={editingId} />;
// //       case "startups":
// //         return <StartupsForm {...formProps} startupId={editingId} />;
// //       default:
// //         return <div>Form not implemented for {activeSection}</div>;
// //     }
// //   };

// //   const getItemTitle = (item) => {
// //     return item.title || item.name || item.Name || item.event || item.shortTitle || "Untitled";
// //   };

// //   const getItemId = (item) => {
// //     return item.id || item._id || item.Id;
// //   };

// //   const getItemDate = (item) => {
// //     const date = item.publishedAt || item.createdAt || item.date || item.updatedAt;
// //     if (date) {
// //       return new Date(date).toLocaleDateString();
// //     }
// //     return "No date";
// //   };

// //   const staggerContainer = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         delayChildren: 0.2
// //       }
// //     }
// //   };

// //   const childVariants = {
// //     hidden: { y: 30, opacity: 0 },
// //     visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
// //   };

// //   return (
// //     <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
// //       {/* Toast Notifications */}
// //       <AnimatePresence>
// //         {notification && (
// //           <Toast 
// //             notification={notification} 
// //             onClose={() => setNotification(null)} 
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {deleteConfirmation && (
// //           <ConfirmationModal
// //             isOpen={!!deleteConfirmation}
// //             onClose={() => setDeleteConfirmation(null)}
// //             onConfirm={confirmDelete}
// //             title="Delete Item"
// //             message={deleteConfirmation.message}
// //             confirmText="Delete"
// //             confirmColor="from-red-500 to-red-600"
// //             icon="🗑️"
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* Clear Data Confirmation Modal */}
// //       <AnimatePresence>
// //         {showClearDataModal && (
// //           <ClearDataModal
// //             isOpen={showClearDataModal}
// //             onClose={() => setShowClearDataModal(false)}
// //             onConfirm={confirmClearData}
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* Enhanced Global Breathing Effect */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
// //         <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
// //         <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
// //       </div>

// //       {/* Animated grid pattern */}
// //       <div className="fixed inset-0 opacity-5 pointer-events-none">
// //         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
// //         <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6 animate-pulse animation-delay-2000"></div>
// //       </div>

// //       {/* Admin Content without Layout wrapper */}
// //       <div className="relative z-10">
// //         <Head>
// //           <title>Admin Dashboard | AAC</title>
// //           <meta name="description" content="Admin dashboard for managing AAC website content" />
// //           <meta name="robots" content="noindex, nofollow" />
// //         </Head>

// //         {/* Hero Section with mandatory blue theme */}
// //         <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
// //           {/* Animated background blobs */}
// //           <div className="absolute inset-0 overflow-hidden">
// //             <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
// //             <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
// //             <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
// //           </div>

// //           {/* Animated grid pattern */}
// //           <div className="absolute inset-0 opacity-5">
// //             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
// //           </div>
          
// //           <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
// //             {/* Enhanced badge */}
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
// //             >
// //               <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
// //               <span className="text-sm font-medium">Administrative Control Panel</span>
// //             </motion.div>
            
// //             {/* Title with gradient effect */}
// //             <motion.h1
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
// //             >
// //               <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
// //                 Admin
// //               </span>{' '}
// //               <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
// //                 Dashboard
// //               </span>
// //             </motion.h1>
            
// //             <motion.p
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.8, delay: 0.4 }}
// //               className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
// //             >
// //               Manage your website content and data with ease
// //             </motion.p>

// //             {/* Decorative dots */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.8, delay: 0.6 }}
// //               className="flex justify-center items-center gap-3 mt-8"
// //             >
// //               <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
// //               <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
// //               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
// //             </motion.div>
// //           </div>
// //         </div>

// //         <div className="container mx-auto max-w-7xl px-4 relative z-10 pb-32">{/* Added bottom padding to prevent footer overlap */}
// //           {/* Navigation Tabs */}
// //           <motion.div
// //             variants={staggerContainer}
// //             initial="hidden"
// //             animate="visible"
// //             className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12"
// //           >
// //             {ADMIN_SECTIONS.map((section, index) => (
// //               <motion.button
// //                 key={section.key}
// //                 variants={childVariants}
// //                 onClick={() => {
// //                   setActiveSection(section.key);
// //                   setShowForm(false);
// //                   setEditingId(null);
// //                 }}
// //                 whileHover={{ scale: 1.05, y: -5 }}
// //                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //                 className={`group relative backdrop-blur-sm rounded-2xl font-medium transition-all duration-300 shadow-xl border overflow-hidden ${
// //                   activeSection === section.key
// //                     ? `bg-gradient-to-r ${section.color} text-white shadow-lg border-white/20`
// //                     : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/10 hover:border-white/20"
// //                 }`}
// //               >
// //                 {/* Gradient overlay on hover */}
// //                 {activeSection !== section.key && (
// //                   <div className={`absolute inset-0 bg-gradient-to-br ${section.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
// //                 )}
                
// //                 <div className="p-6 relative z-10">
// //                   <div className="flex flex-col items-center gap-3">
// //                     <div className={`w-12 h-12 rounded-xl ${activeSection === section.key ? 'bg-white/20' : `bg-gradient-to-br ${section.color}`} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
// //                       <span className="text-xl">{section.icon}</span>
// //                     </div>
// //                     <span className="text-sm font-medium text-center">{section.label}</span>
// //                   </div>
// //                 </div>
// //               </motion.button>
// //             ))}
// //           </motion.div>

// //           {/* Utility Buttons */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6, delay: 0.3 }}
// //             className="flex flex-wrap gap-4 mb-12"
// //           >
// //             <button
// //               onClick={toggleImportExport}
// //               className="group/btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 relative overflow-hidden"
// //             >
// //               <span className="relative z-10 flex items-center justify-center gap-2">
// //                 <span>📤</span>
// //                 Import/Export Data
// //                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //               </span>
// //               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //             </button>
// //             <button
// //               onClick={toggleMigration}
// //               className="group/btn px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative overflow-hidden"
// //             >
// //               <span className="relative z-10 flex items-center justify-center gap-2">
// //                 <span>🔄</span>
// //                 Data Migration
// //                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //               </span>
// //               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //             </button>
// //           </motion.div>

// //           {/* Import/Export Section */}
// //           <AnimatePresence>
// //             {showImportExport && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0, y: -20 }}
// //                 animate={{ opacity: 1, height: "auto", y: 0 }}
// //                 exit={{ opacity: 0, height: 0, y: -20 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="mb-12"
// //               >
// //                 <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
// //                   <div className="mb-8">
// //                     <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
// //                     <div className="flex items-center gap-4">
// //                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
// //                         <span className="text-white text-2xl">📤</span>
// //                       </div>
// //                       <h3 className="text-2xl font-bold text-white">Import/Export Data</h3>
// //                     </div>
// //                   </div>
// //                   <div className="flex flex-wrap gap-4">
// //                     <button
// //                       onClick={handleExport}
// //                       className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
// //                     >
// //                       <span className="relative z-10 flex items-center justify-center gap-2">
// //                         <span>⬇️</span>
// //                         Export All Data
// //                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //                       </span>
// //                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //                     </button>
// //                     <label className="group/btn px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-500/25 hover:scale-105 relative overflow-hidden">
// //                       <span className="relative z-10 flex items-center justify-center gap-2">
// //                         <span>⬆️</span>
// //                         Import Data
// //                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //                       </span>
// //                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //                       <input
// //                         type="file"
// //                         accept=".json"
// //                         onChange={handleImport}
// //                         className="hidden"
// //                       />
// //                     </label>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Migration Section */}
// //           <AnimatePresence>
// //             {showMigration && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0, y: -20 }}
// //                 animate={{ opacity: 1, height: "auto", y: 0 }}
// //                 exit={{ opacity: 0, height: 0, y: -20 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="mb-12"
// //               >
// //                 <SimpleMigrationComponent />
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Main Content Area */}
// //           <AnimatePresence mode="wait">
// //             {showForm ? (
// //               <motion.div
// //                 key="form"
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: -20 }}
// //                 transition={{ duration: 0.3 }}
// //               >
// //                 {renderForm()}
// //               </motion.div>
// //             ) : (
// //               <motion.div
// //                 key="list"
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 exit={{ opacity: 0, x: 20 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
// //               >
// //                 {/* Section Header */}
// //                 <div className="mb-8">
// //                   <div className={`bg-gradient-to-r ${currentSection?.color} h-1.5 w-24 mb-6 rounded-full shadow-lg`}></div>
// //                   <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
// //                     <div className="flex items-center gap-4">
// //                       <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentSection?.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
// //                         <span className="text-white text-2xl">{currentSection?.icon}</span>
// //                       </div>
// //                       <h2 className="text-3xl font-bold text-white">
// //                         Manage {currentSection?.label}
// //                       </h2>
// //                     </div>
// //                     <button
// //                       onClick={handleAdd}
// //                       className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
// //                     >
// //                       <span className="relative z-10 flex items-center justify-center gap-2">
// //                         <span>➕</span>
// //                         Add New {currentSection?.label.slice(0, -1)}
// //                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
// //                       </span>
// //                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Results Counter */}
// //                 <div className="mb-8">
// //                   <p className="text-lg text-gray-400">
// //                     Showing <span className="text-white font-medium">{data.length}</span> total {currentSection?.label.toLowerCase()}
// //                   </p>
// //                 </div>

// //                 {/* Loading State with consistent centered styling */}
// //                 {loading && (
// //                   <div className="flex flex-col items-center justify-center py-20">
// //                     <div className="relative mb-8">
// //                       <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
// //                       <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
// //                     </div>
// //                     <p className="text-xl text-gray-400">Loading {currentSection?.label.toLowerCase()}...</p>
// //                   </div>
// //                 )}

// //                 {/* Error State */}
// //                 {error && (
// //                   <motion.div
// //                     initial={{ opacity: 0, scale: 0.95 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm"
// //                   >
// //                     <div className="flex items-center gap-3">
// //                       <span className="text-red-500 text-xl">⚠️</span>
// //                       <div>
// //                         <div className="font-medium">Error loading data</div>
// //                         <div className="text-sm text-red-400 mt-1">{error.message || error}</div>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 )}

// //                 {/* Data List */}
// //                 {!loading && !error && (
// //                   <div className="space-y-4">
// //                     {data.length === 0 ? (
// //                       <div className="text-center py-20">
// //                         <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentSection?.color} flex items-center justify-center mx-auto mb-8 shadow-lg`}>
// //                           <span className="text-4xl">{currentSection?.icon}</span>
// //                         </div>
// //                         <h3 className="text-3xl font-bold text-white mb-4">
// //                           No {currentSection?.label.toLowerCase()} found
// //                         </h3>
// //                         <p className="text-gray-400 text-lg">Click "Add New" to create your first entry</p>
// //                       </div>
// //                     ) : (
// //                       <motion.div
// //                         variants={staggerContainer}
// //                         initial="hidden"
// //                         animate="visible"
// //                         className="grid gap-4"
// //                       >
// //                         {data.map((item, index) => (
// //                           <motion.div
// //                             key={getItemId(item)}
// //                             variants={childVariants}
// //                             whileHover={{ y: -5, scale: 1.02 }}
// //                             transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //                             className="group backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg relative overflow-hidden"
// //                           >
// //                             {/* Gradient overlay on hover */}
// //                             <div className={`absolute inset-0 bg-gradient-to-br ${currentSection?.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                            
// //                             <div className="flex justify-between items-start gap-4 relative z-10">
// //                               <div className="flex-grow min-w-0">
// //                                 <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
// //                                   {getItemTitle(item)}
// //                                 </h3>
// //                                 <div className="flex flex-wrap gap-4 text-sm">
// //                                   <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
// //                                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
// //                                     <span>ID: {getItemId(item)}</span>
// //                                   </div>
// //                                   <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
// //                                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
// //                                     <span>Date: {getItemDate(item)}</span>
// //                                   </div>
// //                                   {item.status && (
// //                                     <div className="flex items-center gap-2">
// //                                       <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
// //                                       <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Status:</span>
// //                                       <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-medium border border-yellow-500/30">
// //                                         {item.status}
// //                                       </span>
// //                                     </div>
// //                                   )}
// //                                   {(item.categories || item.category) && (
// //                                     <div className="flex items-center gap-2">
// //                                       <div className="w-2 h-2 rounded-full bg-purple-500"></div>
// //                                       <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Category:</span>
// //                                       <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
// //                                         {item.categories || item.category}
// //                                       </span>
// //                                     </div>
// //                                   )}
// //                                 </div>
// //                               </div>
// //                               <div className="flex gap-2 flex-shrink-0">
// //                                 <button
// //                                   onClick={() => handleEdit(getItemId(item))}
// //                                   className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm font-medium border border-blue-500/30 hover:border-blue-500/50 hover:scale-105"
// //                                 >
// //                                   Edit
// //                                 </button>
// //                                 <button
// //                                   onClick={() => handleDelete(getItemId(item))}
// //                                   className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-medium border border-red-500/30 hover:border-red-500/50 hover:scale-105"
// //                                 >
// //                                   Delete
// //                                 </button>
// //                               </div>
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                       </motion.div>
// //                     )}
// //                   </div>
// //                 )}
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Wrap with AdminAuth
// // const AdminPage = () => {
// //   return (
// //     <AdminAuth>
// //       <AdminDashboard />
// //     </AdminAuth>
// //   );
// // };

// // export default AdminPage;

// // src/pages/admin/index.js - Updated admin page with database integration
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import AdminAuth from '@/components/AdminAuth';
// import CSSHeroAnimation from '@/components/CSSHeroAnimation';
// import LoadingSpinner from '@/components/LoadingSpinner';

// // Import forms
// import NewsForm from '@/components/Forms/NewsForm';
// import EventsForm from '@/components/Forms/EventsForm';
// import ProjectsForm from '@/components/Forms/ProjectsForm';
// import PublicationsForm from '@/components/Forms/PublicationsForm';
// import PatentsForm from '@/components/Forms/PatentsForm';
// import BooksForm from '@/components/Forms/BooksForm';
// import AlumniForm from '@/components/Forms/AlumniForm';
// import StartupsForm from '@/components/Forms/StartupsForm';

// // Import database hook
// import { useDatabase } from '@/hooks/useDatabase';

// const AdminDashboard = () => {
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // Database hooks for each section
//   const newsDb = useDatabase('news');
//   const eventsDb = useDatabase('events');
//   const projectsDb = useDatabase('projects');
//   const publicationsDb = useDatabase('publications');
//   const patentsDb = useDatabase('patents');
//   const booksDb = useDatabase('books');
//   const alumniDb = useDatabase('alumni');
//   const startupsDb = useDatabase('startups');

//   // Check if any data is loading
//   const isLoading = newsDb.loading || eventsDb.loading || projectsDb.loading || 
//                    publicationsDb.loading || patentsDb.loading || booksDb.loading || 
//                    alumniDb.loading || startupsDb.loading;

//   // Get database hook based on active section
//   const getCurrentDb = () => {
//     const dbMap = {
//       news: newsDb,
//       events: eventsDb,
//       projects: projectsDb,
//       publications: publicationsDb,
//       patents: patentsDb,
//       books: booksDb,
//       alumni: alumniDb,
//       startups: startupsDb,
//     };
//     return dbMap[activeSection];
//   };

//   const sections = [
//     { id: 'dashboard', name: 'Dashboard', icon: '📊' },
//     { id: 'news', name: 'News', icon: '📰' },
//     { id: 'events', name: 'Events', icon: '🎉' },
//     { id: 'projects', name: 'Projects', icon: '💼' },
//     { id: 'publications', name: 'Publications', icon: '📚' },
//     { id: 'patents', name: 'Patents', icon: '⚖️' },
//     { id: 'books', name: 'Books', icon: '📖' },
//     { id: 'alumni', name: 'Alumni', icon: '🎓' },
//     { id: 'startups', name: 'Startups', icon: '🚀' },
//   ];

//   const handleAdd = () => {
//     setEditingId(null);
//     setIsFormOpen(true);
//   };

//   const handleEdit = (id) => {
//     setEditingId(id);
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this item?')) {
//       try {
//         const db = getCurrentDb();
//         await db.deleteItem(id);
//         alert('Item deleted successfully!');
//       } catch (error) {
//         alert('Error deleting item: ' + error.message);
//       }
//     }
//   };

//   const handleFormSuccess = (result) => {
//     setIsFormOpen(false);
//     setEditingId(null);
//     alert(`Item ${editingId ? 'updated' : 'created'} successfully!`);
    
//     // Refresh the current section's data
//     const db = getCurrentDb();
//     if (db && db.refresh) {
//       db.refresh();
//     }
//   };

//   const handleFormCancel = () => {
//     setIsFormOpen(false);
//     setEditingId(null);
//   };

//   const renderForm = () => {
//     const formProps = {
//       onSuccess: handleFormSuccess,
//       onCancel: handleFormCancel,
//     };

//     switch (activeSection) {
//       case 'news':
//         return <NewsForm newsId={editingId} {...formProps} />;
//       case 'events':
//         return <EventsForm eventId={editingId} {...formProps} />;
//       case 'projects':
//         return <ProjectsForm projectId={editingId} {...formProps} />;
//       case 'publications':
//         return <PublicationsForm publicationId={editingId} {...formProps} />;
//       case 'patents':
//         return <PatentsForm patentId={editingId} {...formProps} />;
//       case 'books':
//         return <BooksForm bookId={editingId} {...formProps} />;
//       case 'alumni':
//         return <AlumniForm alumnusId={editingId} {...formProps} />;
//       case 'startups':
//         return <StartupsForm startupId={editingId} {...formProps} />;
//       default:
//         return null;
//     }
//   };

//   const renderDashboard = () => {
//     const stats = [
//       { name: 'News', count: newsDb.data?.length || 0, icon: '📰', color: 'from-blue-500 to-blue-600' },
//       { name: 'Events', count: eventsDb.data?.length || 0, icon: '🎉', color: 'from-purple-500 to-purple-600' },
//       { name: 'Projects', count: projectsDb.data?.length || 0, icon: '💼', color: 'from-green-500 to-green-600' },
//       { name: 'Publications', count: publicationsDb.data?.length || 0, icon: '📚', color: 'from-orange-500 to-orange-600' },
//       { name: 'Patents', count: patentsDb.data?.length || 0, icon: '⚖️', color: 'from-red-500 to-red-600' },
//       { name: 'Books', count: booksDb.data?.length || 0, icon: '📖', color: 'from-indigo-500 to-indigo-600' },
//       { name: 'Alumni', count: alumniDb.data?.length || 0, icon: '🎓', color: 'from-pink-500 to-pink-600' },
//       { name: 'Startups', count: startupsDb.data?.length || 0, icon: '🚀', color: 'from-teal-500 to-teal-600' },
//     ];

//     return (
//       <div className="space-y-8">
//         <div>
//           <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
//           <p className="text-gray-400">Welcome to the AAC Admin Panel</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-400">{stat.name}</p>
//                   <p className="text-3xl font-bold text-white">{stat.count}</p>
//                 </div>
//                 <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
//                   <span className="text-xl">{stat.icon}</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Database Status */}
//         <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-xl border border-white/10">
//           <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Database Connection</span>
//               <span className="flex items-center gap-2 text-green-400">
//                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                 Connected
//               </span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Environment</span>
//               <span className="text-blue-400">{process.env.NODE_ENV || 'development'}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Database Mode</span>
//               <span className="text-green-400">
//                 {process.env.NEXT_PUBLIC_USE_DATABASE === 'true' ? 'Database' : 'localStorage'}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDataSection = () => {
//     const db = getCurrentDb();
//     const data = db?.data || [];

//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-3xl font-bold text-white mb-2">
//               {sections.find(s => s.id === activeSection)?.name}
//             </h2>
//             <p className="text-gray-400">{data.length} items total</p>
//           </div>
//           <button
//             onClick={handleAdd}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
//           >
//             Add New
//           </button>
//         </div>

//         {db?.error && (
//           <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
//             Error: {db.error}
//           </div>
//         )}

//         {data.length === 0 ? (
//           <div className="backdrop-blur-sm bg-white/5 rounded-xl p-12 text-center border border-white/10">
//             <p className="text-gray-400 text-lg">No {activeSection} found</p>
//             <button
//               onClick={handleAdd}
//               className="mt-4 px-6 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
//             >
//               Add First Item
//             </button>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {data.map((item) => {
//               const itemId = item.id || item._id || item.Id;
//               const itemTitle = item.title || item.name || item.Name || item.event || 'Untitled';
//               const itemDate = item.publishedAt || item.createdAt || item.date;
              
//               return (
//                 <div key={itemId} className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-white mb-2">{itemTitle}</h3>
//                       {itemDate && (
//                         <p className="text-gray-400 text-sm">
//                           {new Date(itemDate).toLocaleDateString()}
//                         </p>
//                       )}
//                       {item.categories && (
//                         <span className="inline-block mt-2 px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-xs">
//                           {item.categories}
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(itemId)}
//                         className="px-3 py-1 bg-blue-900 text-blue-300 rounded hover:bg-blue-800 transition-colors text-sm border border-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(itemId)}
//                         className="px-3 py-1 bg-red-900 text-red-300 rounded hover:bg-red-800 transition-colors text-sm border border-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <AdminAuth>
//       {/* Hero section still shows but with overlay */}
//       <CSSHeroAnimation />
      
//       {/* Admin Panel */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
//         <div className="container mx-auto px-4 py-8">
//           {isLoading ? (
//             <LoadingSpinner size="lg" text="Loading admin data..." />
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//               {/* Sidebar */}
//               <div className="lg:col-span-1">
//                 <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-xl border border-white/10 sticky top-8">
//                   <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
//                   <nav className="space-y-2">
//                     {sections.map((section) => (
//                       <button
//                         key={section.id}
//                         onClick={() => {
//                           setActiveSection(section.id);
//                           setIsFormOpen(false);
//                         }}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                           activeSection === section.id
//                             ? 'bg-blue-900 text-blue-300 border border-blue-700'
//                             : 'text-gray-300 hover:bg-white/5 hover:text-white'
//                         }`}
//                       >
//                         <span className="text-lg">{section.icon}</span>
//                         {section.name}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               </div>

//               {/* Main Content */}
//               <div className="lg:col-span-3">
//                 {isFormOpen ? (
//                   <div className="space-y-6">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-2xl font-bold text-white">
//                         {editingId ? 'Edit' : 'Add New'} {sections.find(s => s.id === activeSection)?.name}
//                       </h2>
//                       <button
//                         onClick={handleFormCancel}
//                         className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                     {renderForm()}
//                   </div>
//                 ) : (
//                   <>
//                     {activeSection === 'dashboard' ? renderDashboard() : renderDataSection()}
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminAuth>
//   );
// };

// export default AdminDashboard;
// src/pages/admin/index.js - Updated admin page with premium UI design system
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminAuth from '@/components/AdminAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

// Import forms
import NewsForm from '@/components/Forms/NewsForm';
import EventsForm from '@/components/Forms/EventsForm';
import ProjectsForm from '@/components/Forms/ProjectsForm';
import PublicationsForm from '@/components/Forms/PublicationsForm';
import PatentsForm from '@/components/Forms/PatentsForm';
import BooksForm from '@/components/Forms/BooksForm';
import AlumniForm from '@/components/Forms/AlumniForm';
import StartupsForm from '@/components/Forms/StartupsForm';

// Import database hook
import { useDatabase } from '@/hooks/useDatabase';

// Premium section configuration with colors and icons
const ADMIN_SECTIONS = [
  { id: 'news', name: 'News', icon: '📰', color: 'from-red-500 to-red-600' },
  { id: 'projects', name: 'Projects', icon: '🚀', color: 'from-blue-500 to-blue-600' },
  { id: 'events', name: 'Events', icon: '📅', color: 'from-green-500 to-green-600' },
  { id: 'publications', name: 'Publications', icon: '📄', color: 'from-purple-500 to-purple-600' },
  { id: 'patents', name: 'Patents', icon: '⚖️', color: 'from-amber-500 to-amber-600' },
  { id: 'startups', name: 'Startups', icon: '🏢', color: 'from-emerald-500 to-emerald-600' },
  { id: 'books', name: 'Books', icon: '📚', color: 'from-indigo-500 to-indigo-600' },
  { id: 'alumni', name: 'Alumni', icon: '🎓', color: 'from-pink-500 to-pink-600' },
];

// Modern Toast Notification Component
const Toast = ({ notification, onClose }) => {
  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'from-green-500 to-emerald-600';
      case 'error': return 'from-red-500 to-red-600';
      case 'warning': return 'from-amber-500 to-orange-600';
      case 'info': return 'from-blue-500 to-blue-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -50, x: 50 }}
      className="fixed top-6 right-6 z-[9999] max-w-md"
    >
      <div className={`backdrop-blur-md bg-gradient-to-r ${getToastColor(notification.type)} rounded-xl p-4 shadow-xl border border-white/20 text-white`}>
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0 mt-0.5">{getToastIcon(notification.type)}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm leading-5">{notification.message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Modern Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmColor = "from-red-500 to-red-600", icon = "🗑️" }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${confirmColor} flex items-center justify-center shadow-lg`}>
              <span className="text-xl">{icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-gray-400 text-sm">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="p-6 bg-black/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 group/btn px-4 py-3 bg-gradient-to-r ${confirmColor} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {confirmText}
              <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  // Persist active section with localStorage
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_active_section') || 'news';
    }
    return 'news';
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Show modern notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Save active section to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_active_section', activeSection);
    }
  }, [activeSection]);

  // Database hooks for each section
  const newsDb = useDatabase('news');
  const eventsDb = useDatabase('events');
  const projectsDb = useDatabase('projects');
  const publicationsDb = useDatabase('publications');
  const patentsDb = useDatabase('patents');
  const booksDb = useDatabase('books');
  const alumniDb = useDatabase('alumni');
  const startupsDb = useDatabase('startups');

  // Get database hook based on active section
  const getCurrentDb = () => {
    const dbMap = {
      news: newsDb,
      events: eventsDb,
      projects: projectsDb,
      publications: publicationsDb,
      patents: patentsDb,
      books: booksDb,
      alumni: alumniDb,
      startups: startupsDb,
    };
    return dbMap[activeSection];
  };

  const currentSection = ADMIN_SECTIONS.find((s) => s.id === activeSection);
  const db = getCurrentDb();
  const data = db?.data || [];

  // Check if any data is loading
  const isLoading = newsDb.loading || eventsDb.loading || projectsDb.loading || 
                   publicationsDb.loading || patentsDb.loading || booksDb.loading || 
                   alumniDb.loading || startupsDb.loading;

  const handleAdd = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    const item = data.find(item => (item.id || item._id) === id);
    const itemTitle = getItemTitle(item);
    
    setDeleteConfirmation({
      id,
      title: itemTitle,
      message: `Are you sure you want to delete "${itemTitle}"? This will permanently remove it from your ${currentSection?.name.toLowerCase()}.`
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    
    const { id } = deleteConfirmation;
    setDeleteConfirmation(null);
    
    try {
      await db.deleteItem(id);
      showNotification('Item deleted successfully!');
      if (db.refresh) db.refresh();
    } catch (error) {
      showNotification('Error deleting item: ' + error.message, 'error');
    }
  };

  const handleFormSuccess = async (result) => {
    setIsFormOpen(false);
    setEditingId(null);
    showNotification('Item saved successfully!');
    
    // Refresh the current section's data
    if (db && db.refresh) {
      db.refresh();
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const renderForm = () => {
    const formProps = {
      onSuccess: handleFormSuccess,
      onCancel: handleFormCancel,
    };

    switch (activeSection) {
      case 'news':
        return <NewsForm newsId={editingId} {...formProps} />;
      case 'events':
        return <EventsForm eventId={editingId} {...formProps} />;
      case 'projects':
        return <ProjectsForm projectId={editingId} {...formProps} />;
      case 'publications':
        return <PublicationsForm publicationId={editingId} {...formProps} />;
      case 'patents':
        return <PatentsForm patentId={editingId} {...formProps} />;
      case 'books':
        return <BooksForm bookId={editingId} {...formProps} />;
      case 'alumni':
        return <AlumniForm alumnusId={editingId} {...formProps} />;
      case 'startups':
        return <StartupsForm startupId={editingId} {...formProps} />;
      default:
        return <div>Form not implemented for {activeSection}</div>;
    }
  };

  const getItemTitle = (item) => {
    return item?.title || item?.name || item?.Name || item?.event || item?.shortTitle || "Untitled";
  };

  const getItemId = (item) => {
    return item?.id || item?._id || item?.Id;
  };

  const getItemDate = (item) => {
    const date = item?.publishedAt || item?.createdAt || item?.date || item?.updatedAt;
    if (date) {
      return new Date(date).toLocaleDateString();
    }
    return "No date";
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <AdminAuth>
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        {/* Toast Notifications */}
        <AnimatePresence>
          {notification && (
            <Toast 
              notification={notification} 
              onClose={() => setNotification(null)} 
            />
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmation && (
            <ConfirmationModal
              isOpen={!!deleteConfirmation}
              onClose={() => setDeleteConfirmation(null)}
              onConfirm={confirmDelete}
              title="Delete Item"
              message={deleteConfirmation.message}
              confirmText="Delete"
              confirmColor="from-red-500 to-red-600"
              icon="🗑️"
            />
          )}
        </AnimatePresence>

        {/* Enhanced Global Breathing Effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Hero Section with mandatory blue theme */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            {/* Enhanced badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Administrative Control Panel</span>
            </motion.div>
            
            {/* Title with gradient effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Admin
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
            >
              Manage your website content and data with ease
            </motion.p>

            {/* Decorative dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center items-center gap-3 mt-8"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 pb-32">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-8">
                <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-xl text-gray-400">Loading admin data...</p>
            </div>
          ) : (
            <>
              {/* Navigation Tabs */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12"
              >
                {ADMIN_SECTIONS.map((section, index) => (
                  <motion.button
                    key={section.id}
                    variants={childVariants}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsFormOpen(false);
                      setEditingId(null);
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`group relative backdrop-blur-sm rounded-2xl font-medium transition-all duration-300 shadow-xl border overflow-hidden ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg border-white/20`
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Gradient overlay on hover */}
                    {activeSection !== section.id && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    )}
                    
                    <div className="p-6 relative z-10">
                      <div className="flex flex-col items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${activeSection === section.id ? 'bg-white/20' : `bg-gradient-to-br ${section.color}`} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-xl">{section.icon}</span>
                        </div>
                        <span className="text-sm font-medium text-center">{section.name}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* Main Content Area */}
              <AnimatePresence mode="wait">
                {isFormOpen ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderForm()}
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {/* Section Header */}
                    <div className="mb-8">
                      <div className={`bg-gradient-to-r ${currentSection?.color} h-1.5 w-24 mb-6 rounded-full shadow-lg`}></div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentSection?.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-white text-2xl">{currentSection?.icon}</span>
                          </div>
                          <h2 className="text-3xl font-bold text-white">
                            Manage {currentSection?.name}
                          </h2>
                        </div>
                        <button
                          onClick={handleAdd}
                          className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <span>➕</span>
                            Add New {currentSection?.name.slice(0, -1)}
                            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                          </span>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>

                    {/* Results Counter */}
                    <div className="mb-8">
                      <p className="text-lg text-gray-400">
                        Showing <span className="text-white font-medium">{data.length}</span> total {currentSection?.name.toLowerCase()}
                      </p>
                    </div>

                    {/* Error State */}
                    {db?.error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-red-500 text-xl">⚠️</span>
                          <div>
                            <div className="font-medium">Error loading data</div>
                            <div className="text-sm text-red-400 mt-1">{db.error}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Data List */}
                    <div className="space-y-4">
                      {data.length === 0 ? (
                        <div className="text-center py-20">
                          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentSection?.color} flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                            <span className="text-4xl">{currentSection?.icon}</span>
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-4">
                            No {currentSection?.name.toLowerCase()} found
                          </h3>
                          <p className="text-gray-400 text-lg">Click "Add New" to create your first entry</p>
                        </div>
                      ) : (
                        <motion.div
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="grid gap-4"
                        >
                          {data.map((item, index) => (
                            <motion.div
                              key={getItemId(item)}
                              variants={childVariants}
                              whileHover={{ y: -5, scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              className="group backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg relative overflow-hidden"
                            >
                              {/* Gradient overlay on hover */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${currentSection?.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                              
                              <div className="flex justify-between items-start gap-4 relative z-10">
                                <div className="flex-grow min-w-0">
                                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                    {getItemTitle(item)}
                                  </h3>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      <span>ID: {getItemId(item)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>Date: {getItemDate(item)}</span>
                                    </div>
                                    {item.status && (
                                      <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Status:</span>
                                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-medium border border-yellow-500/30">
                                          {item.status}
                                        </span>
                                      </div>
                                    )}
                                    {(item.categories || item.category) && (
                                      <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Category:</span>
                                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
                                          {item.categories || item.category}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                  <button
                                    onClick={() => handleEdit(getItemId(item))}
                                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm font-medium border border-blue-500/30 hover:border-blue-500/50 hover:scale-105"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(getItemId(item))}
                                    className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-medium border border-red-500/30 hover:border-red-500/50 hover:scale-105"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </AdminAuth>
  );
};

export default AdminDashboard;