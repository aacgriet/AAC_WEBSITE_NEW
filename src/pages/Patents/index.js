// // src/pages/Patents/index.js - Modern Premium UI Version
// import React, { useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import Layout from '@/components/Layout';
// import PageHero from '@/components/PageHero';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';

// // Fallback images if path doesn't exist
// const fallbackImages = {
//   "aed": "https://res.cloudinary.com/aacgriet/image/upload/v1668795374/AAC-web/publications/health_yrxzq6.jpg",
//   "smartglove": "https://res.cloudinary.com/aacgriet/image/upload/v1668795373/AAC-web/publications/morse_yy2n4d.jpg"
// };

// // Function to convert admin data format to your format
// const convertAdminDataToYourFormat = (adminPatent) => {
//   return {
//     id: adminPatent.id,
//     title: adminPatent.title,
//     inventors: adminPatent.inventors || [],
//     patentOffice: adminPatent.patentOffice,
//     // Convert date from ISO string to your format
//     date: adminPatent.date ? new Date(adminPatent.date).toLocaleDateString('en-GB', { 
//       day: '2-digit', 
//       month: 'short', 
//       year: 'numeric' 
//     }).toUpperCase() : '',
//     applicationNumber: adminPatent.applicationNumber,
//     status: adminPatent.status,
//     image: adminPatent.image || fallbackImages[adminPatent.id] || "/images/patents/default.jpg",
//     shortTitle: adminPatent.shortTitle,
//     category: adminPatent.category,
//     color: adminPatent.color || "purple",
//     description: adminPatent.description
//   };
// };

// const PatentCard = ({ patent, onView }) => {
//   const gradientColors = {
//     "blue": "from-blue-900 to-indigo-800",
//     "purple": "from-purple-900 to-indigo-900",
//     "green": "from-green-900 to-emerald-800",
//     "red": "from-red-900 to-pink-800",
//     "orange": "from-orange-900 to-red-800",
//   };
  
//   const gradientClass = gradientColors[patent.color] || "from-blue-900 to-indigo-800";
  
//   return (
//     <motion.div
//       whileHover={{ y: -8, scale: 1.03 }}
//       transition={{ type: "spring", stiffness: 400, damping: 20 }}
//       className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-white/20 transition-all duration-300"
//     >
//       {/* Gradient overlay on hover */}
//       <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
      
//       {/* Header section with gradient background */}
//       <div className={`bg-gradient-to-r ${gradientClass} p-8 text-white relative z-10`}>
//         <div className="flex justify-between items-start mb-6">
//           <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
//             {patent.category}
//           </span>
//           <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
//             {patent.date ? new Date(patent.date).getFullYear() : new Date().getFullYear()}
//           </span>
//         </div>
        
//         {/* Patent icon */}
//         <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm">
//           <span className="text-2xl">📜</span>
//         </div>
        
//         <h3 className="text-2xl font-bold mb-4 leading-tight">{patent.shortTitle}</h3>
//         <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
//           {patent.description}
//         </p>
//       </div>
      
//       {/* Content section */}
//       <div className="p-6 flex-grow flex flex-col relative z-10">
//         <h4 className="text-lg font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//           Key Inventors
//         </h4>
        
//         <div className="flex flex-wrap gap-2 mb-6">
//           {patent.inventors.slice(0, 3).map((inventor, idx) => (
//             <span key={idx} className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
//               {inventor.split(',')[0]}
//             </span>
//           ))}
//           {patent.inventors.length > 3 && (
//             <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30">
//               +{patent.inventors.length - 3} more
//             </span>
//           )}
//         </div>
        
//         <div className="space-y-3 mb-6 text-sm">
//           <div className="flex items-center gap-3">
//             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
//             <span className="text-gray-400 font-medium">Application:</span>
//             <span className="text-gray-300">{patent.applicationNumber}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//             <span className="text-gray-400 font-medium">Status:</span>
//             <span className="text-gray-300">{patent.status}</span>
//           </div>
//         </div>
        
//         <button
//           onClick={() => onView(patent.id)}
//           className="group/btn mt-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
//         >
//           <span className="relative z-10 flex items-center justify-center gap-2">
//             View Patent Details
//             <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//           </span>
//           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const PatentDetailModal = ({ patent, onClose }) => {
//   const gradientColors = {
//     "blue": "from-blue-900 to-indigo-800",
//     "purple": "from-purple-900 to-indigo-900",
//     "green": "from-green-900 to-emerald-800",
//     "red": "from-red-900 to-pink-800",
//     "orange": "from-orange-900 to-red-800",
//   };
  
//   const gradientClass = gradientColors[patent.color] || "from-blue-900 to-indigo-800";
  
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         transition={{ duration: 0.4 }}
//         className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header section */}
//         <div className={`bg-gradient-to-r ${gradientClass} p-8 relative`}>
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 border border-white/20"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
          
//           <div className="text-white">
//             <div className="flex justify-between items-start mb-6 pr-12">
//               <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
//                 {patent.category}
//               </span>
//               <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
//                 Filed: {patent.date}
//               </span>
//             </div>
            
//             {/* Patent icon */}
//             <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center mb-6 shadow-lg backdrop-blur-sm">
//               <span className="text-3xl">📜</span>
//             </div>
            
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{patent.shortTitle}</h2>
//           </div>
//         </div>
        
//         {/* Content section */}
//         <div className="p-8">
//           {/* Full title section */}
//           <div className="mb-8">
//             <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
//             <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Full Patent Title
//             </h3>
//             <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
//               <p className="text-gray-300 text-lg leading-relaxed">{patent.title}</p>
//             </div>
//           </div>
          
//           {/* Two column layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             {/* Inventors section */}
//             <div>
//               <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Inventors
//               </h3>
//               <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
//                 <div className="space-y-3">
//                   {patent.inventors.map((inventor, idx) => (
//                     <div key={idx} className="flex items-center gap-3">
//                       <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                       <span className="text-gray-300 text-lg">{inventor}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             {/* Patent information section */}
//             <div>
//               <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Patent Information
//               </h3>
//               <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
//                     <div className="flex-1">
//                       <span className="text-gray-400 font-medium text-sm block mb-1">Patent Office</span>
//                       <span className="text-gray-300 text-lg">{patent.patentOffice}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
//                     <div className="flex-1">
//                       <span className="text-gray-400 font-medium text-sm block mb-1">Application No</span>
//                       <span className="text-gray-300 text-lg">{patent.applicationNumber}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
//                     <div className="flex-1">
//                       <span className="text-gray-400 font-medium text-sm block mb-1">Filed Date</span>
//                       <span className="text-gray-300 text-lg">{patent.date}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2"></div>
//                     <div className="flex-1">
//                       <span className="text-gray-400 font-medium text-sm block mb-1">Status</span>
//                       <span className="text-gray-300 text-lg">{patent.status}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Description section */}
//           <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Description
//             </h3>
//             <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
//               <p className="text-gray-300 text-lg leading-relaxed">{patent.description}</p>
//             </div>
//           </div>
          
//           {/* Action buttons */}
//           <div className="flex flex-col sm:flex-row justify-end gap-4">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
//             >
//               Close
//             </button>
//             <a
//               href={`https://ipindiaservices.gov.in/PublicSearch/PublicationSearch/PatentDetails?ApplicationNumber=${patent.applicationNumber}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 View Official Patent
//                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//               </span>
//               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//             </a>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const Patents = () => {
//   const { data: adminPatentsData, loading } = useLocalStorage(STORAGE_KEYS.PATENTS);
//   const [selectedPatent, setSelectedPatent] = useState(null);
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [yearFilter, setYearFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Only use admin data - no fallback
//   const patentsData = adminPatentsData.map(convertAdminDataToYourFormat);
  
//   // Extract categories and years for filtering
//   const categories = ["All", ...new Set(patentsData.map(patent => patent.category).filter(Boolean))];
//   const years = ["All", ...new Set(patentsData.map(patent => patent.date ? new Date(patent.date).getFullYear() : new Date().getFullYear()).filter(Boolean))];
  
//   // Filter patents based on search, category, and year
//   const filteredPatents = patentsData.filter(patent => {
//     const matchesSearch = patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           patent.shortTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           patent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           (patent.inventors && patent.inventors.some(inventor => inventor.toLowerCase().includes(searchTerm.toLowerCase())));
    
//     const matchesCategory = categoryFilter === "All" || patent.category === categoryFilter;
//     const patentYear = patent.date ? new Date(patent.date).getFullYear() : new Date().getFullYear();
//     const matchesYear = yearFilter === "All" || patentYear === parseInt(yearFilter);
    
//     return matchesSearch && matchesCategory && matchesYear;
//   });
  
//   const handleViewPatent = (id) => {
//     const patent = filteredPatents.find(p => p.id === id);
//     setSelectedPatent(patent);
//   };
  
//   const handleCloseModal = () => {
//     setSelectedPatent(null);
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//           <div className="text-center">
//             <div className="relative mb-8">
//               <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
//             </div>
//             <p className="text-xl text-gray-400">Loading patents...</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
  
//   return (
//     <Layout>
//       <Head>
//         <title>Patents | AAC - Advanced Academic Center</title>
//         <meta name="description" content="Patents filed by Advanced Academic Center at GRIET" />
//       </Head>
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//         {/* Animated background blobs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//           <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//         </div>

//         {/* Animated grid pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//         </div>
        
//         <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//           {/* Enhanced badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
//             <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium">Innovation</span>
//           </div>
          
//           {/* Title with gradient effect */}
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
//               Our
//             </span>{' '}
//             <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//               Patents
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
//             Discover the innovative technologies developed and patented by our students and faculty
//           </p>

//           {/* Decorative dots */}
//           <div className="flex justify-center items-center gap-3 mt-8">
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//             <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//           </div>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 pb-24">
//         {/* Filter controls */}
//         <div className="mb-12">
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Search */}
//               <div>
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
//                   Search Patents
//                 </label>
//                 <input
//                   type="text"
//                   id="search"
//                   placeholder="Search by title, description, or inventor..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
//                 />
//               </div>
              
//               {/* Category filter */}
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-3">
//                   Filter by Category
//                 </label>
//                 <select
//                   id="category"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {categories.map(category => (
//                     <option key={category} value={category} className="bg-slate-800 text-white">
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* Year filter */}
//               <div>
//                 <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-3">
//                   Filter by Year
//                 </label>
//                 <select
//                   id="year"
//                   value={yearFilter}
//                   onChange={(e) => setYearFilter(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {years.map(year => (
//                     <option key={year} value={year} className="bg-slate-800 text-white">
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Results count */}
//         <div className="mb-8">
//           <p className="text-lg text-gray-400">
//             Showing <span className="text-white font-medium">{filteredPatents.length}</span> of <span className="text-white font-medium">{patentsData.length}</span> patents
//           </p>
//         </div>
        
//         {filteredPatents.length === 0 && patentsData.length > 0 ? (
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">🔍</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">No patents found</h3>
//             <p className="text-gray-400 text-lg">Try adjusting your search filters</p>
//           </div>
//         ) : patentsData.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">📜</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">No Patents Available</h3>
//             <p className="text-gray-400 text-lg">Add patents through the admin panel to see them here.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//             {filteredPatents.map((patent, index) => (
//               <motion.div
//                 key={patent.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <PatentCard
//                   patent={patent}
//                   onView={handleViewPatent}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}
        
//         {/* Innovation process section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="mt-24"
//         >
//           <div className="flex flex-col lg:flex-row items-center gap-16">
//             {/* Title Section */}
//             <div className="lg:w-1/3">
//               <div className="text-center lg:text-left">
//                 {/* Animated gradient line */}
//                 <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                
//                 <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//                   <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                     Patent Process
//                   </span>
//                 </h2>
                
//                 <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
//                   From idea conception to patent filing, we guide our innovators through every step of the process.
//                 </p>
                
//                 {/* Decorative dots */}
//                 <div className="hidden lg:block mt-8">
//                   <div className="flex items-center gap-3">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//                     <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Content Grid */}
//             <div className="lg:w-2/3">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {[
//                   { 
//                     step: "01", 
//                     title: "Idea Generation", 
//                     description: "Our students and faculty brainstorm innovative solutions to real-world problems.",
//                     color: "from-blue-500 to-blue-600"
//                   },
//                   { 
//                     step: "02", 
//                     title: "Prototype Development", 
//                     description: "We build working models and test the viability of our innovative solutions.",
//                     color: "from-purple-500 to-purple-600"
//                   },
//                   { 
//                     step: "03", 
//                     title: "Patent Filing", 
//                     description: "Our legal team helps prepare and submit patent applications to protect intellectual property.",
//                     color: "from-indigo-500 to-indigo-600"
//                   }
//                 ].map((process, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.1 * index, duration: 0.5 }}
//                     className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
//                   >
//                     {/* Gradient overlay on hover */}
//                     <div className={`absolute inset-0 bg-gradient-to-br ${process.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                    
//                     {/* Step number */}
//                     <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${process.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                       <span className="text-white font-bold">{process.step}</span>
//                     </div>
                    
//                     <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//                       {process.title}
//                     </h3>
//                     <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
//                       {process.description}
//                     </p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
      
//       {/* Patent Detail Modal */}
//       <AnimatePresence>
//         {selectedPatent && (
//           <PatentDetailModal
//             patent={selectedPatent}
//             onClose={handleCloseModal}
//           />
//         )}
//       </AnimatePresence>
//     </Layout>
//   );
// };

// export default Patents;

// src/pages/Patents/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';
import { FaCalendar, FaUsers, FaGlobe, FaCheck, FaClock, FaTimes } from 'react-icons/fa';

const PatentCard = ({ patent, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color classes based on patent color
  const getColorClasses = (color) => {
    const colorMap = {
      'purple': 'from-purple-500 to-purple-600',
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'red': 'from-red-500 to-red-600',
      'orange': 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-purple-500 to-purple-600';
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    const statusMap = {
      'Published Online': { icon: <FaGlobe />, color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
      'Pending': { icon: <FaClock />, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
      'Approved': { icon: <FaCheck />, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
      'Granted': { icon: <FaCheck />, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
      'Rejected': { icon: <FaTimes />, color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
      'Withdrawn': { icon: <FaTimes />, color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30' }
    };
    return statusMap[status] || statusMap['Published Online'];
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Format inventors for display
  const formatInventors = (inventors) => {
    if (!inventors) return 'Unknown inventors';
    
    if (Array.isArray(inventors)) {
      if (inventors.length <= 2) {
        return inventors.join(' and ');
      } else {
        return `${inventors[0]} et al.`;
      }
    }
    
    return inventors.toString();
  };

  const colorClasses = getColorClasses(patent.color);
  const statusDisplay = getStatusDisplay(patent.status);

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.03 }}
        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.replace('to-', 'to-').replace('from-', 'from-')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="p-6 relative z-10">
          {/* Patent Image */}
          {patent.image && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src={patent.image}
                  alt={patent.shortTitle || patent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="mb-4 flex justify-center">
            <span className={`inline-flex items-center gap-2 px-3 py-1 ${statusDisplay.bgColor} ${statusDisplay.color} rounded-lg text-xs font-medium border ${statusDisplay.borderColor}`}>
              {statusDisplay.icon}
              {patent.status}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
            {patent.shortTitle || patent.title}
          </h3>
          
          {/* Category */}
          <div className="mb-3 flex justify-center">
            <span className={`px-3 py-1 bg-gradient-to-r ${colorClasses}/20 text-${colorClasses.split('-')[1]}-300 rounded-lg text-xs font-medium border border-${colorClasses.split('-')[1]}-500/30`}>
              {patent.category}
            </span>
          </div>
          
          {/* Inventors */}
          <div className="mb-3 flex items-center gap-2 text-gray-400 text-sm">
            <FaUsers className="text-xs" />
            <span>{formatInventors(patent.inventors)}</span>
          </div>
          
          {/* Date and Office */}
          <div className="mb-4 space-y-2 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-xs" />
              <span>{formatDate(patent.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe className="text-xs" />
              <span>{patent.patentOffice}</span>
            </div>
          </div>
          
          {/* Application Number */}
          <div className="mb-4 text-center">
            <span className="text-gray-400 text-xs">App. No: {patent.applicationNumber}</span>
          </div>
          
          {/* Description Preview */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {patent.description}
          </p>
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to read more
              </span>
              <div className={`bg-gradient-to-r ${colorClasses} h-1 w-8 rounded-full shadow-lg group-hover:w-12 transition-all duration-300`}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${colorClasses} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{patent.shortTitle || patent.title}</h2>
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-sm font-medium`}>
                      {statusDisplay.icon}
                      {patent.status}
                    </span>
                    <span className="text-white/90">{patent.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    {formatInventors(patent.inventors)} • {patent.patentOffice} • {formatDate(patent.date)}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Patent Image */}
                {patent.image && (
                  <div className="md:col-span-1">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-white/20">
                      <Image
                        src={patent.image}
                        alt={patent.shortTitle || patent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Patent Info */}
                <div className={`${patent.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Patent Description</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {patent.description}
                  </p>
                  
                  {/* Patent Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Patent Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Application No:</span>
                          <span className="text-white">{patent.applicationNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Office:</span>
                          <span className="text-white">{patent.patentOffice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{formatDate(patent.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={statusDisplay.color}>{patent.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Classification</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{patent.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Inventors:</span>
                          <span className="text-white">{Array.isArray(patent.inventors) ? patent.inventors.length : 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Full Title Section */}
              {patent.title && patent.title !== patent.shortTitle && (
                <div className="mt-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Full Patent Title</h3>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 leading-relaxed">
                      {patent.title}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Inventors Section */}
              {Array.isArray(patent.inventors) && patent.inventors.length > 0 && (
                <div className="mt-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Inventors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patent.inventors.map((inventor, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                            <FaUsers className="text-white text-sm" />
                          </div>
                          <span className="text-white font-medium">{inventor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Patents = () => {
  const { data: patentsData, loading, error } = useDatabase('patents');
  const [filteredPatents, setFilteredPatents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOffice, setSelectedOffice] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter patents based on search and filters
  useEffect(() => {
    if (!patentsData) return;
    
    let filtered = patentsData.filter(patent => {
      const matchesSearch = 
        (patent.title && patent.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patent.shortTitle && patent.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patent.category && patent.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(patent.inventors) && patent.inventors.some(inventor => 
          inventor.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (patent.description && patent.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || patent.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || patent.status === selectedStatus;
      const matchesOffice = selectedOffice === 'All' || patent.patentOffice === selectedOffice;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesOffice;
    });
    
    // Sort patents
    filtered.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
    
    setFilteredPatents(filtered);
  }, [patentsData, searchTerm, selectedCategory, selectedStatus, selectedOffice, sortOrder]);

  // Get unique values for filters
  const categories = ['All', ...new Set(patentsData?.map(patent => patent.category).filter(Boolean) || [])];
  const statuses = ['All', ...new Set(patentsData?.map(patent => patent.status).filter(Boolean) || [])];
  const offices = ['All', ...new Set(patentsData?.map(patent => patent.patentOffice).filter(Boolean) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Patents" 
          subtitle="Explore our innovative patents and intellectual property"
          tag="Patents & IP"
        />
        <ContentLoading text="Loading patents..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Patents" 
          subtitle="Explore our innovative patents and intellectual property"
          tag="Patents & IP"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading patents: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero 
        title="Patents" 
        subtitle="Explore our innovative patents and intellectual property"
        tag="Patents & IP"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search patents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {offices.map(office => (
                  <option key={office} value={office} className="bg-gray-800">
                    {office}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="newest" className="bg-gray-800">Newest First</option>
                <option value="oldest" className="bg-gray-800">Oldest First</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-center">
            <span className="text-white text-sm">
              Showing {filteredPatents.length} of {patentsData?.length || 0} patents
            </span>
          </div>
        </motion.div>

        {/* Patents Grid */}
        {filteredPatents.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {patentsData?.length === 0 ? 'No Patents Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {patentsData?.length === 0 
                  ? 'There are currently no patents to display.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedOffice !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                    setSelectedOffice('All');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPatents.map((patent, index) => (
              <PatentCard
                key={patent.id || patent._id || index}
                patent={patent}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Patents;