// // src/pages/admin/index.js - ORIGINAL CODE WITH ONLY THE REQUESTED FIXES
// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import { motion, AnimatePresence } from "framer-motion";
// import Layout from "@/components/Layout";
// import { STORAGE_KEYS, StorageManager } from "@/lib/storage";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
// import AdminAuth from "@/components/AdminAuth";
// import PublicationsForm from "@/components/Forms/PublicationsForm";
// import PatentsForm from "@/components/Forms/PatentsForm";
// import BooksForm from "@/components/Forms/BooksForm";
// import AlumniForm from "@/components/Forms/AlumniForm";
// import StartupsForm from "@/components/Forms/StartupsForm";
// import NewsForm from "@/components/Forms/NewsForm";
// import EventsForm from "@/components/Forms/EventsForm";
// import ProjectsForm from "@/components/Forms/ProjectsForm";

// const ADMIN_SECTIONS = [
//   { key: "news", label: "News", icon: "📰", storageKey: STORAGE_KEYS.NEWS, color: "from-red-500 to-red-600" },
//   {
//     key: "projects",
//     label: "Projects",
//     icon: "🚀",
//     storageKey: STORAGE_KEYS.PROJECTS,
//     color: "from-blue-500 to-blue-600"
//   },
//   {
//     key: "events",
//     label: "Events",
//     icon: "📅",
//     storageKey: STORAGE_KEYS.EVENTS,
//     color: "from-green-500 to-green-600"
//   },
//   {
//     key: "publications",
//     label: "Publications",
//     icon: "📄",
//     storageKey: STORAGE_KEYS.PUBLICATIONS,
//     color: "from-purple-500 to-purple-600"
//   },
//   {
//     key: "patents",
//     label: "Patents",
//     icon: "⚖️",
//     storageKey: STORAGE_KEYS.PATENTS,
//     color: "from-amber-500 to-amber-600"
//   },
//   {
//     key: "startups",
//     label: "Startups",
//     icon: "🏢",
//     storageKey: STORAGE_KEYS.STARTUPS,
//     color: "from-emerald-500 to-emerald-600"
//   },
//   {
//     key: "books",
//     label: "Books & Blogs",
//     icon: "📚",
//     storageKey: STORAGE_KEYS.BOOKS,
//     color: "from-indigo-500 to-indigo-600"
//   },
//   {
//     key: "alumni",
//     label: "Alumni",
//     icon: "🎓",
//     storageKey: STORAGE_KEYS.ALUMNI,
//     color: "from-pink-500 to-pink-600"
//   },
// ];

// // Simple Migration Component with modern UI
// const SimpleMigrationComponent = () => {
//   const [stats, setStats] = useState(null);
//   const [migrating, setMigrating] = useState(false);
//   const [error, setError] = useState(null);

//   const handleMigration = async () => {
//     setMigrating(true);
//     setError(null);
    
//     try {
//       // Add sample data for testing based on schema
//       const sampleData = {
//         [STORAGE_KEYS.NEWS]: [
//           {
//             id: "sample-news-1",
//             title: "AAC Students Win National Hackathon",
//             slug: "AAC team secures first place at the prestigious coding competition.",
//             content: "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024...",
//             publishedAt: new Date().toISOString(),
//             categories: "ACHIEVEMENT",
//             status: "published",
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//         [STORAGE_KEYS.PATENTS]: [
//           {
//             id: "automated-pill-reminder",
//             title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
//             shortTitle: "Automated Pill Reminder Device",
//             inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop"],
//             patentOffice: "India",
//             applicationNumber: "201941002559",
//             date: new Date("2019-01-21").toISOString(),
//             status: "Published Online",
//             description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule...",
//             category: "Healthcare",
//             color: "purple",
//             image: "",
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//         [STORAGE_KEYS.PUBLICATIONS]: [
//           {
//             id: "sample-publication-1",
//             title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
//             abstract: "This paper proposes a novel ensemble learning method for accurately predicting wine quality...",
//             authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
//             publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
//             category: "Machine Learning",
//             year: 2024,
//             publishedAt: new Date("2024-08-01").toISOString(),
//             image: "",
//             downloadUrl: "", 
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//         [STORAGE_KEYS.BOOKS]: [
//           {
//             id: "sample-book-1",
//             title: "FUNDAMENTALS OF PYTHON IN A NUTSHELL",
//             description: "This book, 'Fundamentals of PYTHON In a Nutshell,' appears to be an introductory guide to the Python programming language.",
//             authors: ["Harshavardhini Kyatam", "Jatin Menghwani"],
//             category: "Programming",
//             year: 2022,
//             cover: "https://res.cloudinary.com/aacgriet/image/upload/v1730629103/AAC-web/books/chadjmxbuhgfqx3ox91r.png",
//             color: "blue",
//             status: "published",
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//         [STORAGE_KEYS.ALUMNI]: [
//           {
//             id: "sample-alumni-1",
//             name: "John Doe",
//             designation: "Software Engineer",
//             company: "Google",
//             image: "https://via.placeholder.com/300x300",
//             graduationYear: 2020,
//             department: "Computer Science Engineering",
//             status: "active",
//             email: "john@example.com",
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//         [STORAGE_KEYS.STARTUPS]: [
//           {
//             id: "sample-startup-1",
//             name: "TechVenture",
//             description: "Innovative technology solutions for modern problems",
//             mission: "To revolutionize the tech industry with cutting-edge solutions",
//             category: "Technology",
//             color: "blue",
//             status: "Active",
//             establishedDate: new Date("2023-01-01").toISOString(),
//             website: "https://techventure.com",
//             logo: "https://via.placeholder.com/200x200",
//             image: "https://via.placeholder.com/400x300",
//             founders: ["Jane Smith", "Bob Johnson"],
//             appScreenshots: [],
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//       };

//       // Add sample data to storage
//       for (const [key, data] of Object.entries(sampleData)) {
//         try {
//           const existing = await StorageManager.get(key);
//           // Only add if no data exists
//           if (existing.length === 0) {
//             await StorageManager.set(key, data);
//           }
//         } catch (err) {
//           console.error(`Error adding sample data for ${key}:`, err);
//         }
//       }

//       setStats({ migrated: true, timestamp: new Date().toISOString() });
//       alert("Sample data added successfully!");
//       window.location.reload();
//     } catch (error) {
//       console.error("Migration error:", error);
//       setError(error.message);
//       alert("Migration failed. Check console for details.");
//     } finally {
//       setMigrating(false);
//     }
//   };

//   const handleClearData = async () => {
//     if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
//       try {
//         await StorageManager.clearAll();
//         alert("All data cleared successfully!");
//         window.location.reload();
//       } catch (error) {
//         console.error("Clear data error:", error);
//         setError(error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     const loadStats = async () => {
//       try {
//         const currentStats = {};
//         for (const key of Object.values(STORAGE_KEYS)) {
//           const data = await StorageManager.get(key);
//           currentStats[key] = data.length;
//         }
//         setStats(currentStats);
//       } catch (error) {
//         console.error("Error loading stats:", error);
//         setError(error.message);
//       }
//     };
    
//     loadStats();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
//     >
//       {/* Header with gradient line */}
//       <div className="mb-8">
//         <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
//             <span className="text-white text-xl font-bold">⚡</span>
//           </div>
//           <h3 className="text-2xl font-bold text-white">Data Migration Utility</h3>
//         </div>
//       </div>

//       {error && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm"
//         >
//           <div className="flex items-center gap-3">
//             <span className="text-red-500 text-xl">⚠️</span>
//             <div>
//               <span className="font-medium">Error:</span> {error}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       <div className="flex flex-wrap gap-4 mb-8">
//         <button
//           onClick={handleMigration}
//           disabled={migrating}
//           className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
//         >
//           <span className="relative z-10 flex items-center justify-center gap-2">
//             {migrating ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 Adding Sample Data...
//               </>
//             ) : (
//               <>
//                 Add Sample Data
//                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//               </>
//             )}
//           </span>
//           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//         </button>

//         <button
//           onClick={handleClearData}
//           disabled={migrating}
//           className="group/btn px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/25 hover:scale-105 relative overflow-hidden"
//         >
//           <span className="relative z-10 flex items-center justify-center gap-2">
//             Clear All Data
//             <span className="group-hover/btn:translate-x-1 transition-transform duration-200">🗑️</span>
//           </span>
//           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//         </button>
//       </div>

//       {stats && (
//         <div className="backdrop-blur-sm bg-black/20 rounded-xl p-6 border border-white/5 shadow-lg">
//           <h4 className="font-semibold mb-6 text-white flex items-center gap-3 text-lg">
//             <span className="text-blue-400 text-xl">📊</span>
//             Current Data Statistics
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Object.entries(stats).map(([key, count]) => (
//               <motion.div
//                 key={key}
//                 whileHover={{ scale: 1.02 }}
//                 className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
//               >
//                 <div className="text-gray-300 text-sm font-medium mb-1">
//                   {key.replace('aac_', '').toUpperCase()}
//                 </div>
//                 <div className="text-white text-lg font-semibold">
//                   {typeof count === "number" ? `${count} items` : count}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// // Main Admin Dashboard Component with modern UI
// const AdminDashboard = () => {
//   // FIX 3: Persist active section - changed default from "alumni" to localStorage value or "news"
//   const [activeSection, setActiveSection] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('admin_active_section') || "news";
//     }
//     return "news";
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showImportExport, setShowImportExport] = useState(false);
//   const [showMigration, setShowMigration] = useState(false);

//   // FIX 3: Save active section to localStorage whenever it changes
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('admin_active_section', activeSection);
//     }
//   }, [activeSection]);

//   const currentSection = ADMIN_SECTIONS.find((s) => s.key === activeSection);
//   const { data, loading, error, deleteItem, refresh } = useLocalStorage(
//     currentSection?.storageKey
//   );

//   const handleAdd = () => {
//     console.log("Adding new item for section:", activeSection);
//     setEditingId(null);
//     setShowForm(true);
//   };

//   const handleEdit = (id) => {
//     console.log("Editing item:", id);
//     setEditingId(id);
//     setShowForm(true);
//   };

//   // FIX 1: Fixed delete operation with proper error handling
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       console.log("Deleting item:", id);
//       try {
//         const success = await deleteItem(id);
//         if (success) {
//           console.log("Item deleted successfully");
//           // FIX 3: Refresh data immediately after successful deletion
//           await refresh();
//           alert("Item deleted successfully!");
//         } else {
//           console.error("Failed to delete item");
//           alert("Failed to delete item. Please try again.");
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//         alert("Error deleting item: " + error.message);
//       }
//     }
//   };

//   // FIX 3: Enhanced form success handler with immediate refresh
//   const handleFormSuccess = async (result) => {
//     console.log("Form submitted successfully:", result);
//     setShowForm(false);
//     setEditingId(null);
//     // FIX 3: Refresh data immediately after form success
//     await refresh();
//     alert("Item saved successfully!");
//   };

//   const handleFormCancel = () => {
//     console.log("Form cancelled");
//     setShowForm(false);
//     setEditingId(null);
//   };

//   const toggleImportExport = () => {
//     setShowImportExport(!showImportExport);
//     setShowMigration(false);
//   };

//   const toggleMigration = () => {
//     setShowMigration(!showMigration);
//     setShowImportExport(false);
//   };

//   const handleExport = async () => {
//     try {
//       const exportData = await StorageManager.exportData();
//       const blob = new Blob([JSON.stringify(exportData, null, 2)], {
//         type: "application/json",
//       });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `aac-data-${new Date().toISOString().split("T")[0]}.json`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       alert("Data exported successfully!");
//     } catch (error) {
//       console.error("Export failed:", error);
//       alert("Export failed. Check console for details.");
//     }
//   };

//   // FIX 3: Enhanced import handler with immediate refresh
//   const handleImport = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         try {
//           const importData = JSON.parse(e.target.result);
//           console.log("Raw import data:", importData);

//           let processedData = {};

//           if (Array.isArray(importData)) {
//             console.log("Detected array format");
//             if (importData.length > 0 && importData[0].id && importData[0].title && importData[0].authors) {
//               console.log("Detected books data format");
//               processedData[STORAGE_KEYS.BOOKS] = importData;
//             } else {
//               console.log("Generic array detected, asking user for type");
//               const dataType = prompt(
//                 "What type of data is this? Enter one of: news, projects, events, publications, patents, books, alumni, startups"
//               );
//               const storageKey = STORAGE_KEYS[dataType?.toUpperCase()];
//               if (storageKey) {
//                 processedData[storageKey] = importData;
//               } else {
//                 throw new Error("Invalid data type specified");
//               }
//             }
//           } else if (typeof importData === "object") {
//             processedData = importData;
//           } else {
//             throw new Error("Invalid JSON format");
//           }

//           console.log("Processed data:", processedData);
//           const totalImported = await StorageManager.importData(processedData);
          
//           alert(`Successfully imported ${totalImported} items!`);
//           // FIX 3: Refresh data immediately after import
//           await refresh();
//         } catch (error) {
//           console.error("Import failed:", error);
//           alert("Import failed: " + error.message);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const renderForm = () => {
//     const formProps = {
//       onSuccess: handleFormSuccess,
//       onCancel: handleFormCancel,
//       ...(editingId && { [activeSection.slice(0, -1) + "Id"]: editingId }),
//     };

//     switch (activeSection) {
//       case "news":
//         return <NewsForm {...formProps} newsId={editingId} />;
//       case "projects":
//         return <ProjectsForm {...formProps} projectId={editingId} />;
//       case "events":
//         return <EventsForm {...formProps} eventId={editingId} />;
//       case "publications":
//         return <PublicationsForm {...formProps} publicationId={editingId} />;
//       case "patents":
//         return <PatentsForm {...formProps} patentId={editingId} />;
//       case "books":
//         return <BooksForm {...formProps} bookId={editingId} />;
//       case "alumni":
//         return <AlumniForm {...formProps} alumnusId={editingId} />;
//       case "startups":
//         return <StartupsForm {...formProps} startupId={editingId} />;
//       default:
//         return <div>Form not implemented for {activeSection}</div>;
//     }
//   };

//   const getItemTitle = (item) => {
//     return item.title || item.name || item.Name || item.event || item.shortTitle || "Untitled";
//   };

//   const getItemId = (item) => {
//     return item.id || item._id || item.Id;
//   };

//   const getItemDate = (item) => {
//     const date = item.publishedAt || item.createdAt || item.date || item.updatedAt;
//     if (date) {
//       return new Date(date).toLocaleDateString();
//     }
//     return "No date";
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const childVariants = {
//     hidden: { y: 30, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
//   };

//   return (
//     <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       {/* Enhanced Global Breathing Effect */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//         <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
//       </div>

//       {/* Animated grid pattern */}
//       <div className="fixed inset-0 opacity-5 pointer-events-none">
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
//         <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6 animate-pulse animation-delay-2000"></div>
//       </div>

//       <Layout>
//         <Head>
//           <title>Admin Dashboard | AAC</title>
//           <meta name="description" content="Admin dashboard for managing AAC website content" />
//           <meta name="robots" content="noindex, nofollow" />
//         </Head>

//         {/* Hero Section with mandatory blue theme */}
//         <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//           {/* Animated background blobs */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//             <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//             <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//           </div>

//           {/* Animated grid pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//           </div>
          
//           <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//             {/* Enhanced badge */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
//             >
//               <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium">Administrative Control Panel</span>
//             </motion.div>
            
//             {/* Title with gradient effect */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
//             >
//               <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
//                 Admin
//               </span>{' '}
//               <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//                 Dashboard
//               </span>
//             </motion.h1>
            
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
//             >
//               Manage your website content and data with ease
//             </motion.p>

//             {/* Decorative dots */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="flex justify-center items-center gap-3 mt-8"
//             >
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//               <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//             </motion.div>
//           </div>
//         </div>

//         <div className="container mx-auto max-w-7xl px-4 relative z-10">
//           {/* Navigation Tabs */}
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12"
//           >
//             {ADMIN_SECTIONS.map((section, index) => (
//               <motion.button
//                 key={section.key}
//                 variants={childVariants}
//                 onClick={() => {
//                   setActiveSection(section.key);
//                   setShowForm(false);
//                   setEditingId(null);
//                 }}
//                 whileHover={{ scale: 1.05, y: -5 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                 className={`group relative p-6 rounded-2xl font-medium transition-all duration-300 shadow-lg ${
//                   activeSection === section.key
//                     ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
//                     : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20"
//                 }`}
//               >
//                 <div className="flex flex-col items-center gap-3">
//                   <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{section.icon}</span>
//                   <span className="text-sm font-medium">{section.label}</span>
//                 </div>
//                 {activeSection === section.key && (
//                   <div className="absolute inset-0 rounded-2xl bg-white/5"></div>
//                 )}
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Utility Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="flex flex-wrap gap-4 mb-12"
//           >
//             <button
//               onClick={toggleImportExport}
//               className="group/btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 relative overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 <span>📤</span>
//                 Import/Export Data
//                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//               </span>
//               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//             </button>
//             <button
//               onClick={toggleMigration}
//               className="group/btn px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative overflow-hidden"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 <span>🔄</span>
//                 Data Migration
//                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//               </span>
//               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//             </button>
//           </motion.div>

//           {/* Import/Export Section */}
//           <AnimatePresence>
//             {showImportExport && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0, y: -20 }}
//                 animate={{ opacity: 1, height: "auto", y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="mb-12"
//               >
//                 <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
//                   <div className="mb-8">
//                     <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
//                         <span className="text-white text-xl font-bold">📤</span>
//                       </div>
//                       <h3 className="text-2xl font-bold text-white">Import/Export Data</h3>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-4">
//                     <button
//                       onClick={handleExport}
//                       className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-2">
//                         <span>⬇️</span>
//                         Export All Data
//                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                       </span>
//                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                     </button>
//                     <label className="group/btn px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-orange-500/25 hover:scale-105 relative overflow-hidden">
//                       <span className="relative z-10 flex items-center justify-center gap-2">
//                         <span>⬆️</span>
//                         Import Data
//                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                       </span>
//                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                       <input
//                         type="file"
//                         accept=".json"
//                         onChange={handleImport}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Migration Section */}
//           <AnimatePresence>
//             {showMigration && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0, y: -20 }}
//                 animate={{ opacity: 1, height: "auto", y: 0 }}
//                 exit={{ opacity: 0, height: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="mb-12"
//               >
//                 <SimpleMigrationComponent />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Main Content Area */}
//           <AnimatePresence mode="wait">
//             {showForm ? (
//               <motion.div
//                 key="form"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {renderForm()}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="list"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3 }}
//                 className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
//               >
//                 {/* Section Header */}
//                 <div className="mb-8">
//                   <div className={`bg-gradient-to-r ${currentSection?.color} h-1.5 w-24 mb-6 rounded-full shadow-lg`}></div>
//                   <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentSection?.color} flex items-center justify-center shadow-lg`}>
//                         <span className="text-white text-xl">{currentSection?.icon}</span>
//                       </div>
//                       <h2 className="text-3xl font-bold text-white">
//                         Manage {currentSection?.label}
//                       </h2>
//                     </div>
//                     <button
//                       onClick={handleAdd}
//                       className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden"
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-2">
//                         <span>➕</span>
//                         Add New {currentSection?.label.slice(0, -1)}
//                         <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                       </span>
//                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Results Counter */}
//                 <div className="mb-8">
//                   <p className="text-lg text-gray-400">
//                     Showing <span className="text-white font-medium">{data.length}</span> total {currentSection?.label.toLowerCase()}
//                   </p>
//                 </div>

//                 {/* FIX 2: Loading State with consistent centered styling and no gray background */}
//                 {loading && (
//                   <div className="flex flex-col items-center justify-center py-20">
//                     <div className="relative mb-8">
//                       <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
//                       <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
//                     </div>
//                     <p className="text-xl text-gray-400">Loading {currentSection?.label.toLowerCase()}...</p>
//                   </div>
//                 )}

//                 {/* Error State */}
//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="bg-red-500/10 border border-red-500/20 text-red-300 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm"
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-red-500 text-xl">⚠️</span>
//                       <div>
//                         <div className="font-medium">Error loading data</div>
//                         <div className="text-sm text-red-400 mt-1">{error.message || error}</div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Data List */}
//                 {!loading && !error && (
//                   <div className="space-y-4">
//                     {data.length === 0 ? (
//                       <div className="text-center py-20">
//                         <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentSection?.color} flex items-center justify-center mx-auto mb-8 shadow-lg`}>
//                           <span className="text-4xl">{currentSection?.icon}</span>
//                         </div>
//                         <h3 className="text-3xl font-bold text-white mb-4">
//                           No {currentSection?.label.toLowerCase()} found
//                         </h3>
//                         <p className="text-gray-400 text-lg">Click "Add New" to create your first entry</p>
//                       </div>
//                     ) : (
//                       <motion.div
//                         variants={staggerContainer}
//                         initial="hidden"
//                         animate="visible"
//                         className="grid gap-4"
//                       >
//                         {data.map((item, index) => (
//                           <motion.div
//                             key={getItemId(item)}
//                             variants={childVariants}
//                             whileHover={{ y: -5, scale: 1.02 }}
//                             transition={{ type: "spring", stiffness: 400, damping: 20 }}
//                             className="group backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 shadow-lg relative overflow-hidden"
//                           >
//                             {/* Gradient overlay on hover */}
//                             <div className={`absolute inset-0 bg-gradient-to-br ${currentSection?.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                            
//                             <div className="flex justify-between items-start gap-4 relative z-10">
//                               <div className="flex-grow min-w-0">
//                                 <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//                                   {getItemTitle(item)}
//                                 </h3>
//                                 <div className="flex flex-wrap gap-4 text-sm">
//                                   <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
//                                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                                     <span>ID: {getItemId(item)}</span>
//                                   </div>
//                                   <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
//                                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                                     <span>Date: {getItemDate(item)}</span>
//                                   </div>
//                                   {item.status && (
//                                     <div className="flex items-center gap-2">
//                                       <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
//                                       <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Status:</span>
//                                       <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-xs font-medium border border-yellow-500/30">
//                                         {item.status}
//                                       </span>
//                                     </div>
//                                   )}
//                                   {(item.categories || item.category) && (
//                                     <div className="flex items-center gap-2">
//                                       <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//                                       <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Category:</span>
//                                       <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
//                                         {item.categories || item.category}
//                                       </span>
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="flex gap-2 flex-shrink-0">
//                                 <button
//                                   onClick={() => handleEdit(getItemId(item))}
//                                   className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm font-medium border border-blue-500/30 hover:border-blue-500/50 hover:scale-105"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDelete(getItemId(item))}
//                                   className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-medium border border-red-500/30 hover:border-red-500/50 hover:scale-105"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// // ONLY CHANGE: Wrap with AdminAuth
// const AdminPage = () => {
//   return (
//     <AdminAuth>
//       <AdminDashboard />
//     </AdminAuth>
//   );
// };

// export default AdminPage;

// src/pages/admin/index.js - Fixed version with better error handling and consistent loading
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaDownload, 
  FaUpload, 
  FaDatabase,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import AdminAuth from '@/components/AdminAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS, StorageManager } from '@/lib/storage';
import { DataLoading, SmallLoading } from '@/components/LoadingSpinner';

// Import form components
import NewsForm from '@/components/Forms/NewsForm';
import EventsForm from '@/components/Forms/EventsForm';
import ProjectsForm from '@/components/Forms/ProjectsForm';
import PublicationsForm from '@/components/Forms/PublicationsForm';
import PatentsForm from '@/components/Forms/PatentsForm';
import BooksForm from '@/components/Forms/BooksForm';
import AlumniForm from '@/components/Forms/AlumniForm';
import StartupsForm from '@/components/Forms/StartupsForm';

const SECTIONS = {
  NEWS: {
    key: STORAGE_KEYS.NEWS,
    title: 'News Articles',
    form: NewsForm,
    icon: '📰',
    color: 'blue'
  },
  EVENTS: {
    key: STORAGE_KEYS.EVENTS,
    title: 'Events',
    form: EventsForm,
    icon: '🎉',
    color: 'purple'
  },
  PROJECTS: {
    key: STORAGE_KEYS.PROJECTS,
    title: 'Projects',
    form: ProjectsForm,
    icon: '🚀',
    color: 'green'
  },
  PUBLICATIONS: {
    key: STORAGE_KEYS.PUBLICATIONS,
    title: 'Publications',
    form: PublicationsForm,
    icon: '📄',
    color: 'indigo'
  },
  PATENTS: {
    key: STORAGE_KEYS.PATENTS,
    title: 'Patents',
    form: PatentsForm,
    icon: '💡',
    color: 'yellow'
  },
  BOOKS: {
    key: STORAGE_KEYS.BOOKS,
    title: 'Books & Blogs',
    form: BooksForm,
    icon: '📚',
    color: 'red'
  },
  ALUMNI: {
    key: STORAGE_KEYS.ALUMNI,
    title: 'Alumni',
    form: AlumniForm,
    icon: '🎓',
    color: 'emerald'
  },
  STARTUPS: {
    key: STORAGE_KEYS.STARTUPS,
    title: 'Startups',
    form: StartupsForm,
    icon: '🏢',
    color: 'pink'
  }
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('NEWS');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);

  // Get data for current section
  const section = SECTIONS[activeSection];
  const { data, loading, error, addItem, updateItem, deleteItem, refresh } = useLocalStorage(section.key);

  // Load storage stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await StorageManager.getStorageStats();
        setStorageStats(stats);
      } catch (error) {
        console.error('Error loading storage stats:', error);
      }
    };

    loadStats();
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle form success with better error handling
  const handleFormSuccess = async (item) => {
    try {
      setIsFormOpen(false);
      setEditingItem(null);
      
      if (editingItem) {
        showNotification(`${section.title.slice(0, -1)} updated successfully!`);
      } else {
        showNotification(`${section.title.slice(0, -1)} added successfully!`);
      }
      
      // Refresh data to ensure consistency
      await refresh();
    } catch (error) {
      console.error('Error in form success handler:', error);
      showNotification('Operation completed but there was an issue refreshing data', 'warning');
    }
  };

  // Handle delete with proper confirmation and error handling
  const handleDelete = async (item) => {
    try {
      const itemId = item.id || item._id;
      const itemTitle = item.title || item.name || item.event || `Item ${itemId}`;
      
      console.log(`Admin: Attempting to delete item:`, { itemId, itemTitle });
      
      // Close confirmation dialog
      setDeleteConfirm(null);
      
      // Show loading notification
      showNotification('Deleting item...', 'info');
      
      // Perform delete operation
      await deleteItem(itemId);
      
      // Show success notification
      showNotification(`${itemTitle} deleted successfully!`);
      
      // Refresh stats
      const stats = await StorageManager.getStorageStats();
      setStorageStats(stats);
      
    } catch (error) {
      console.error('Admin: Error deleting item:', error);
      showNotification(`Failed to delete item: ${error.message}`, 'error');
    }
  };

  // Handle export
  const handleExport = async () => {
    try {
      setIsExporting(true);
      showNotification('Exporting data...', 'info');
      
      const data = await StorageManager.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `aac-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Data exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      showNotification(`Export failed: ${error.message}`, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // Handle import
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      showNotification('Importing data...', 'info');
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      const totalImported = await StorageManager.importData(data);
      
      showNotification(`Successfully imported ${totalImported} items!`);
      
      // Refresh current section and stats
      await refresh();
      const stats = await StorageManager.getStorageStats();
      setStorageStats(stats);
      
    } catch (error) {
      console.error('Import error:', error);
      showNotification(`Import failed: ${error.message}`, 'error');
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  // Get item display title
  const getItemTitle = (item) => {
    return item.title || item.name || item.event || `Item ${item.id || item._id}`;
  };

  // Get item date
  const getItemDate = (item) => {
    const date = item.publishedAt || item.date || item.createdAt || item.updatedAt;
    if (!date) return 'No date';
    
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <AdminAuth onAuthSuccess={() => console.log('Admin authenticated')}>
      <Head>
        <title>Admin Dashboard - Advanced Academic Center</title>
        <meta name="description" content="Admin dashboard for managing AAC content" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 right-4 z-50"
            >
              <div className={`px-6 py-4 rounded-xl shadow-lg border backdrop-blur-sm ${
                notification.type === 'success' 
                  ? 'bg-green-900/50 border-green-700 text-green-300' 
                  : notification.type === 'error'
                  ? 'bg-red-900/50 border-red-700 text-red-300'
                  : notification.type === 'warning'
                  ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300'
                  : 'bg-blue-900/50 border-blue-700 text-blue-300'
              }`}>
                <div className="flex items-center gap-3">
                  {notification.type === 'success' && <FaCheckCircle />}
                  {notification.type === 'error' && <FaExclamationTriangle />}
                  {notification.type === 'warning' && <FaExclamationTriangle />}
                  {notification.type === 'info' && <FaSpinner className="animate-spin" />}
                  <span>{notification.message}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1a2535] rounded-xl p-6 max-w-md w-full border border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaExclamationTriangle className="text-red-400 text-xl" />
                  <h3 className="text-lg font-bold text-white">Confirm Delete</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete "{getItemTitle(deleteConfirm)}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Admin
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your content with ease</p>
          </div>

          {/* Stats Cards */}
          {storageStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Items</p>
                    <p className="text-2xl font-bold text-white">{storageStats.totalItems}</p>
                  </div>
                  <FaDatabase className="text-blue-400 text-2xl" />
                </div>
              </div>
              
              <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Storage Status</p>
                    <p className="text-lg font-semibold text-green-400">
                      {storageStats.available ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${storageStats.available ? 'bg-green-400' : 'bg-red-400'}`} />
                </div>
              </div>

              <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 py-2 text-blue-300 hover:text-blue-200 transition-colors disabled:opacity-50"
                >
                  {isExporting ? <SmallLoading showText={false} /> : <FaDownload />}
                  {isExporting ? 'Exporting...' : 'Export Data'}
                </button>
              </div>

              <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                <label className="w-full flex items-center justify-center gap-2 py-2 text-green-300 hover:text-green-200 transition-colors cursor-pointer">
                  {isImporting ? <SmallLoading showText={false} /> : <FaUpload />}
                  {isImporting ? 'Importing...' : 'Import Data'}
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    disabled={isImporting}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {Object.entries(SECTIONS).map(([key, sectionConfig]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSection(key);
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeSection === key
                    ? 'bg-blue-900 text-blue-300 border border-blue-700'
                    : 'bg-[#1a2535] text-gray-300 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                <span>{sectionConfig.icon}</span>
                {sectionConfig.title}
                {storageStats?.keys && (
                  <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                    {Object.values(storageStats.keys).find(stat => stat.key === sectionConfig.key)?.count || 0}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content List - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a2535] rounded-xl shadow-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="text-3xl">{section.icon}</span>
                      {section.title}
                    </h2>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setIsFormOpen(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      <FaPlus />
                      Add New
                    </button>
                  </div>
                </div>

                {loading ? (
                  <DataLoading text={`Loading ${section.title.toLowerCase()}...`} />
                ) : error ? (
                  <div className="p-6 text-center">
                    <FaExclamationTriangle className="text-red-400 text-4xl mx-auto mb-4" />
                    <p className="text-red-300 mb-4">Error loading {section.title.toLowerCase()}</p>
                    <button
                      onClick={refresh}
                      className="px-4 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : data.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="text-6xl mb-4 block">{section.icon}</span>
                    <p className="text-gray-400 text-lg mb-4">No {section.title.toLowerCase()} found</p>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setIsFormOpen(true);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors mx-auto"
                    >
                      <FaPlus />
                      Add First {section.title.slice(0, -1)}
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-700">
                    {data.map((item) => (
                      <div key={item.id || item._id} className="p-6 hover:bg-gray-800/50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {getItemTitle(item)}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>{getItemDate(item)}</span>
                              {item.status && (
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  item.status === 'published' || item.status === 'active' || item.status === 'completed'
                                    ? 'bg-green-900 text-green-300'
                                    : 'bg-yellow-900 text-yellow-300'
                                }`}>
                                  {item.status}
                                </span>
                              )}
                              {item.categories && (
                                <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">
                                  {item.categories}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => {
                                setEditingItem(item);
                                setIsFormOpen(true);
                              }}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(item)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Panel - 1/3 width */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {isFormOpen ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <section.form
                      {...(editingItem ? { [section.key.includes('news') ? 'newsId' : 
                                             section.key.includes('events') ? 'eventId' :
                                             section.key.includes('projects') ? 'projectId' :
                                             section.key.includes('publications') ? 'publicationId' :
                                             section.key.includes('patents') ? 'patentId' :
                                             section.key.includes('books') ? 'bookId' :
                                             section.key.includes('alumni') ? 'alumnusId' :
                                             section.key.includes('startups') ? 'startupId' : 'itemId']: editingItem.id || editingItem._id } : {})}
                      onSuccess={handleFormSuccess}
                      onCancel={() => {
                        setIsFormOpen(false);
                        setEditingItem(null);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1a2535] rounded-xl p-8 text-center border border-gray-700"
                  >
                    <span className="text-6xl mb-4 block">{section.icon}</span>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {section.title} Management
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Select an item to edit or create a new one
                    </p>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setIsFormOpen(true);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors mx-auto"
                    >
                      <FaPlus />
                      Add New {section.title.slice(0, -1)}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </AdminAuth>
  );
};

export default AdminDashboard;