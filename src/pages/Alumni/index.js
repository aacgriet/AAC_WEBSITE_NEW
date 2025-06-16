// // // ============= ALUMNI PAGE =============
// // // src/pages/Alumni/index.js - Modern Premium UI Version
// // import React, { useState } from 'react';
// // import Head from 'next/head';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import Layout from '@/components/Layout';
// // import PageHero from '@/components/PageHero';
// // import { useLocalStorage } from '@/hooks/useLocalStorage';
// // import { STORAGE_KEYS } from '@/lib/storage';

// // const AlumniCard = ({ alumni }) => {
// //   return (
// //     <motion.div
// //       whileHover={{ y: -8, scale: 1.03 }}
// //       transition={{ type: "spring", stiffness: 400, damping: 20 }}
// //       className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full border border-white/10 hover:border-white/20 transition-all duration-300"
// //     >
// //       {/* Gradient overlay on hover */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
// //       <div className="relative aspect-square overflow-hidden">
// //         <Image
// //           src={alumni.Image || alumni.image || '/images/placeholder-avatar.jpg'}
// //           alt={alumni.Name || alumni.name}
// //           fill
// //           className="object-cover transition-transform duration-500 group-hover:scale-110"
// //         />
// //         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// //       </div>
      
// //       <div className="p-6 text-center relative z-10">
// //         <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
// //           {alumni.Name || alumni.name}
// //         </h3>
// //         {(alumni.Designation || alumni.designation) && (
// //           <p className="text-sm text-blue-400 mb-1">{alumni.Designation || alumni.designation}</p>
// //         )}
// //         {(alumni.Company || alumni.company) && (
// //           <p className="text-sm text-gray-400 mb-2">{alumni.Company || alumni.company}</p>
// //         )}
// //         {alumni.graduationYear && (
// //           <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 mb-2 inline-block">
// //             Class of {alumni.graduationYear}
// //           </span>
// //         )}
// //         {alumni.department && (
// //           <p className="text-xs text-gray-500 mt-1">{alumni.department}</p>
// //         )}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const AlumniGrid = ({ alumni }) => {
// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //       {alumni.map((item) => (
// //         <motion.div
// //           key={item.Id || item.id}
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <AlumniCard alumni={item} />
// //         </motion.div>
// //       ))}
// //     </div>
// //   );
// // };

// // const Alumni = () => {
// //   // Use admin data instead of hardcoded data
// //   const { data: alumniData, loading, error } = useLocalStorage(STORAGE_KEYS.ALUMNI);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [departmentFilter, setDepartmentFilter] = useState("All");

// //   // Extract departments for filtering
// //   const departments = ["All", ...new Set(alumniData.map(alumni => alumni.department).filter(Boolean))];

// //   // Filter alumni based on search and department
// //   const filteredAlumni = alumniData.filter(alumni => {
// //     const matchesSearch = (alumni.Name || alumni.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           (alumni.Company || alumni.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                           (alumni.Designation || alumni.designation || "").toLowerCase().includes(searchTerm.toLowerCase());
    
// //     const matchesDepartment = departmentFilter === "All" || alumni.department === departmentFilter;
    
// //     return matchesSearch && matchesDepartment;
// //   });

// //   if (loading) {
// //     return (
// //       <Layout>
// //         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
// //           <div className="text-center">
// //             <div className="relative mb-8">
// //               <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
// //               <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
// //             </div>
// //             <p className="text-xl text-gray-400">Loading alumni...</p>
// //           </div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Layout>
// //         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
// //           <div className="text-center">
// //             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
// //               <span className="text-4xl">⚠️</span>
// //             </div>
// //             <h3 className="text-3xl font-bold text-white mb-4">Error Loading Alumni</h3>
// //             <p className="text-red-400 text-lg">{error.message}</p>
// //           </div>
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   return (
// //     <Layout>
// //       <Head>
// //         <title>Alumni | AAC - Advanced Academic Center</title>
// //         <meta name="description" content="Meet the alumni of Advanced Academic Center who have gone on to make significant contributions in their respective fields." />
// //       </Head>
      
// //       {/* Hero Section */}
// //       <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
// //         {/* Animated background blobs */}
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
// //           <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
// //           <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
// //         </div>

// //         {/* Animated grid pattern */}
// //         <div className="absolute inset-0 opacity-5">
// //           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
// //         </div>
        
// //         <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
// //           {/* Enhanced badge */}
// //           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
// //             <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
// //             <span className="text-sm font-medium">Alumni Network</span>
// //           </div>
          
// //           {/* Title with gradient effect */}
// //           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
// //             <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
// //               Our Distinguished
// //             </span>{' '}
// //             <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
// //               Alumni
// //             </span>
// //           </h1>
          
// //           <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
// //             Celebrating the achievements of AAC graduates who continue to innovate and lead in their respective fields
// //           </p>

// //           {/* Decorative dots */}
// //           <div className="flex justify-center items-center gap-3 mt-8">
// //             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
// //             <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
// //             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="container mx-auto px-4 pb-24">
// //         {/* Filter controls - only show if there are alumni */}
// //         {alumniData.length > 0 && (
// //           <div className="mb-12">
// //             <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {/* Search */}
// //                 <div>
// //                   <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
// //                     Search Alumni
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="search"
// //                     placeholder="Search by name, company, or designation..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
// //                   />
// //                 </div>
                
// //                 {/* Department filter */}
// //                 <div>
// //                   <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-3">
// //                     Filter by Department
// //                   </label>
// //                   <select
// //                     id="department"
// //                     value={departmentFilter}
// //                     onChange={(e) => setDepartmentFilter(e.target.value)}
// //                     className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
// //                   >
// //                     {departments.map(department => (
// //                       <option key={department} value={department} className="bg-slate-800 text-white">
// //                         {department}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Results count */}
// //         {alumniData.length > 0 && (
// //           <div className="mb-8">
// //             <p className="text-lg text-gray-400">
// //               Showing <span className="text-white font-medium">{filteredAlumni.length}</span> of <span className="text-white font-medium">{alumniData.length}</span> alumni
// //             </p>
// //           </div>
// //         )}
        
// //         {filteredAlumni.length === 0 && alumniData.length > 0 ? (
// //           <div className="text-center py-20">
// //             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
// //               <span className="text-4xl">🔍</span>
// //             </div>
// //             <h3 className="text-3xl font-bold text-white mb-4">No alumni found</h3>
// //             <p className="text-gray-400 text-lg">Try adjusting your search filters</p>
// //           </div>
// //         ) : alumniData.length === 0 ? (
// //           <div className="text-center py-20">
// //             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
// //               <span className="text-4xl">🎓</span>
// //             </div>
// //             <h3 className="text-3xl font-bold text-white mb-4">No Alumni Data Available</h3>
// //             <p className="text-gray-400 text-lg">
// //               Alumni information will be displayed here once data is available.
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Centered Alumni Grid */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //               className="mb-24"
// //             >
// //               <AlumniGrid alumni={filteredAlumni} />
// //             </motion.div>

// //             {/* Alumni Network Info Section - Below Grid */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="text-center"
// //             >
// //               <div className="flex flex-col lg:flex-row items-center gap-16">
// //                 {/* Title Section */}
// //                 <div className="lg:w-1/3">
// //                   <div className="text-center lg:text-left">
// //                     {/* Animated gradient line */}
// //                     <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                    
// //                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
// //                       <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
// //                         Alumni Network
// //                       </span>
// //                     </h2>
                    
// //                     <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
// //                       Our graduates have gone on to work at top companies, start successful ventures, 
// //                       and pursue advanced research. They continue to be ambassadors of excellence and innovation.
// //                     </p>
                    
// //                     <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
// //                       {filteredAlumni.length} Alumni Featured
// //                     </div>
                    
// //                     {/* Decorative dots */}
// //                     <div className="hidden lg:block mt-8">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
// //                         <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
// //                         <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
                
// //                 {/* Content Section */}
// //                 <div className="lg:w-2/3">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {[
// //                       {
// //                         title: "Industry Leaders",
// //                         description: "Our alumni hold leadership positions at Fortune 500 companies, driving innovation and technological advancement across various industries.",
// //                         icon: "🏢",
// //                         color: "from-blue-500 to-blue-600"
// //                       },
// //                       {
// //                         title: "Successful Entrepreneurs", 
// //                         description: "Many graduates have founded successful startups and companies, creating jobs and contributing to economic growth in the tech ecosystem.",
// //                         icon: "🚀",
// //                         color: "from-purple-500 to-purple-600"
// //                       }
// //                     ].map((item, index) => (
// //                       <motion.div
// //                         key={index}
// //                         initial={{ opacity: 0, y: 20 }}
// //                         whileInView={{ opacity: 1, y: 0 }}
// //                         viewport={{ once: true }}
// //                         transition={{ delay: 0.1 * index, duration: 0.5 }}
// //                         className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
// //                       >
// //                         {/* Gradient overlay on hover */}
// //                         <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                        
// //                         {/* Icon */}
// //                         <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
// //                           <span className="text-xl">{item.icon}</span>
// //                         </div>
                        
// //                         <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
// //                           {item.title}
// //                         </h3>
// //                         <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
// //                           {item.description}
// //                         </p>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default Alumni
// // src/pages/Alumni/index.js - Updated with consistent loading
// import React, { useState, useMemo } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaSearch, FaFilter, FaGraduationCap } from 'react-icons/fa';
// import Layout from '@/components/Layout';
// import PageHero from '@/components/PageHero';
// import { ContentLoading } from '@/components/LoadingSpinner';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';

// const AlumniCard = ({ alumni, index }) => {
//   // Handle both legacy (uppercase) and new (lowercase) field names
//   const name = alumni.Name || alumni.name;
//   const designation = alumni.Designation || alumni.designation;
//   const company = alumni.Company || alumni.company;
//   const image = alumni.Image || alumni.image;
//   const graduationYear = alumni.graduationYear;
//   const department = alumni.department;
//   const currentLocation = alumni.currentLocation;
//   const achievements = alumni.achievements;
//   const linkedin = alumni.linkedin;
//   const email = alumni.email;
//   const bio = alumni.bio;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1, duration: 0.6 }}
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
//     >
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
//       <div className="p-6 relative z-10">
//         {/* Profile Image */}
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
//             <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/30 transition-all duration-300">
//               {image ? (
//                 <Image
//                   src={image}
//                   alt={name}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                   <span className="text-white text-2xl font-bold">
//                     {name?.charAt(0) || '?'}
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="text-center">
//           <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//             {name}
//           </h3>
          
//           {designation && (
//             <p className="text-blue-300 font-medium mb-1 group-hover:text-blue-200 transition-colors duration-300">
//               {designation}
//             </p>
//           )}
          
//           {company && (
//             <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors duration-300">
//               {company}
//             </p>
//           )}

//           {/* Details */}
//           <div className="space-y-2 mb-4">
//             {graduationYear && (
//               <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
//                 <FaGraduationCap className="text-blue-400" />
//                 <span>Class of {graduationYear}</span>
//               </div>
//             )}
            
//             {department && (
//               <p className="text-sm text-gray-400">{department}</p>
//             )}
            
//             {currentLocation && (
//               <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
//                 <FaMapMarkerAlt className="text-green-400" />
//                 <span>{currentLocation}</span>
//               </div>
//             )}
//           </div>

//           {/* Bio */}
//           {bio && (
//             <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
//               {bio}
//             </p>
//           )}

//           {/* Achievements */}
//           {achievements && (
//             <div className="mb-4">
//               <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
//                 {achievements}
//               </p>
//             </div>
//           )}

//           {/* Contact Links */}
//           <div className="flex justify-center gap-3 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
//             {linkedin && (
//               <a
//                 href={linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300 hover:scale-110"
//               >
//                 <FaLinkedin />
//               </a>
//             )}
            
//             {email && (
//               <a
//                 href={`mailto:${email}`}
//                 className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white hover:bg-green-700 transition-colors duration-300 hover:scale-110"
//               >
//                 <FaEnvelope />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const AlumniPage = () => {
//   const { data: alumniData, loading, error } = useLocalStorage(STORAGE_KEYS.ALUMNI);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All');
//   const [selectedYear, setSelectedYear] = useState('All');

//   // Get unique departments and years
//   const departments = useMemo(() => {
//     const deps = ['All', ...new Set(alumniData.map(item => item.department).filter(Boolean))];
//     return deps;
//   }, [alumniData]);

//   const years = useMemo(() => {
//     const yrs = ['All', ...new Set(alumniData.map(item => item.graduationYear).filter(Boolean))];
//     return yrs.sort((a, b) => {
//       if (a === 'All') return -1;
//       if (b === 'All') return 1;
//       return b - a; // Sort in descending order
//     });
//   }, [alumniData]);

//   // Filter alumni
//   const filteredAlumni = useMemo(() => {
//     let filtered = alumniData;

//     // Filter by department
//     if (selectedDepartment !== 'All') {
//       filtered = filtered.filter(alumni => alumni.department === selectedDepartment);
//     }

//     // Filter by year
//     if (selectedYear !== 'All') {
//       filtered = filtered.filter(alumni => alumni.graduationYear === selectedYear);
//     }

//     // Filter by search term
//     if (searchTerm) {
//       const search = searchTerm.toLowerCase();
//       filtered = filtered.filter(alumni => 
//         (alumni.Name || alumni.name)?.toLowerCase().includes(search) ||
//         (alumni.Designation || alumni.designation)?.toLowerCase().includes(search) ||
//         (alumni.Company || alumni.company)?.toLowerCase().includes(search) ||
//         alumni.department?.toLowerCase().includes(search) ||
//         alumni.currentLocation?.toLowerCase().includes(search)
//       );
//     }

//     // Sort by name
//     return filtered.sort((a, b) => {
//       const nameA = (a.Name || a.name || '').toLowerCase();
//       const nameB = (b.Name || b.name || '').toLowerCase();
//       return nameA.localeCompare(nameB);
//     });
//   }, [alumniData, selectedDepartment, selectedYear, searchTerm]);

//   return (
//     <Layout>
//       <Head>
//         <title>Alumni - Advanced Academic Center</title>
//         <meta name="description" content="Meet our successful alumni from Advanced Academic Center" />
//       </Head>

//       <PageHero 
//         title="Our Alumni"
//         subtitle="Meet the brilliant minds who have graduated from Advanced Academic Center and are making their mark in the world"
//         tag="Alumni Network"
//         highlightTitle={true}
//       />

//       <div className="container mx-auto px-4 py-16">
//         {/* Filter Controls */}
//         <div className="mb-12">
//           <div className="bg-[#1a2535] rounded-xl shadow-lg overflow-hidden border border-gray-700">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row md:items-center gap-4">
//                 {/* Search */}
//                 <div className="flex-grow">
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaSearch className="text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search alumni..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-colors"
//                     />
//                   </div>
//                 </div>
                
//                 {/* Department Filter */}
//                 <div>
//                   <select
//                     value={selectedDepartment}
//                     onChange={(e) => setSelectedDepartment(e.target.value)}
//                     className="py-3 px-4 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                   >
//                     {departments.map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Year Filter */}
//                 <div>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                     className="py-3 px-4 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                   >
//                     {years.map(year => (
//                       <option key={year} value={year}>
//                         {year === 'All' ? 'All Years' : `Class of ${year}`}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <ContentLoading text="Loading alumni profiles..." size="lg" />
//         ) : error ? (
//           <div className="text-center py-16">
//             <div className="bg-red-900/50 border border-red-700 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto">
//               <p className="mb-4">Error loading alumni data</p>
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         ) : filteredAlumni.length === 0 ? (
//           <div className="text-center py-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-[#1a2535] rounded-xl p-12 border border-gray-700 max-w-md mx-auto"
//             >
//               <span className="text-6xl mb-4 block">🎓</span>
//               <h3 className="text-xl font-semibold text-white mb-2">No Alumni Found</h3>
//               <p className="text-gray-400">
//                 {searchTerm || selectedDepartment !== 'All' || selectedYear !== 'All'
//                   ? 'Try adjusting your search or filter criteria'
//                   : 'No alumni profiles are available at the moment'
//                 }
//               </p>
//             </motion.div>
//           </div>
//         ) : (
//           <>
//             {/* Results summary */}
//             <div className="mb-8">
//               <p className="text-gray-400 text-center">
//                 Showing {filteredAlumni.length} of {alumniData.length} alumni
//                 {selectedDepartment !== 'All' && ` from ${selectedDepartment}`}
//                 {selectedYear !== 'All' && ` (Class of ${selectedYear})`}
//                 {searchTerm && ` matching "${searchTerm}"`}
//               </p>
//             </div>

//             {/* Alumni Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//               {filteredAlumni.map((alumni, index) => (
//                 <AlumniCard 
//                   key={alumni.id || alumni.Id || index} 
//                   alumni={alumni} 
//                   index={index}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default AlumniPage;

// src/pages/Alumni/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

const AlumniCard = ({ alumnus, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      <div className="p-6 text-center relative z-10">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
          <Image
            src={alumnus.Image || alumnus.image || '/images/pic.webp'}
            alt={alumnus.Name || alumnus.name}
            width={128}
            height={128}
            className="relative z-10 rounded-full object-cover shadow-2xl border-2 border-white/20 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {alumnus.Name || alumnus.name}
        </h3>
        
        {(alumnus.Designation || alumnus.designation) && (
          <p className="text-blue-300 font-medium mb-2 group-hover:text-blue-200 transition-colors duration-300">
            {alumnus.Designation || alumnus.designation}
          </p>
        )}
        
        {(alumnus.Company || alumnus.company) && (
          <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors duration-300">
            {alumnus.Company || alumnus.company}
          </p>
        )}
        
        <div className="space-y-2 text-sm">
          {(alumnus.department) && (
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                {alumnus.department}
              </span>
            </div>
          )}
          
          {(alumnus.graduationYear) && (
            <p className="text-gray-400">
              Class of {alumnus.graduationYear}
            </p>
          )}
          
          {(alumnus.currentLocation) && (
            <p className="text-gray-500 text-xs">
              📍 {alumnus.currentLocation}
            </p>
          )}
        </div>
        
        {/* Additional Info on Hover */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {(alumnus.bio) && (
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {alumnus.bio}
            </p>
          )}
          
          {(alumnus.achievements) && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Key Achievements:</p>
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                {alumnus.achievements}
              </p>
            </div>
          )}
          
          <div className="flex justify-center gap-3 mt-4">
            {(alumnus.email) && (
              <a
                href={`mailto:${alumnus.email}`}
                className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
              >
                <span className="text-blue-300 text-sm">✉️</span>
              </a>
            )}
            
            {(alumnus.linkedin) && (
              <a
                href={alumnus.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
              >
                <span className="text-blue-300 text-sm">💼</span>
              </a>
            )}
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-12 rounded-full mx-auto shadow-lg group-hover:w-16 transition-all duration-300"></div>
        </div>
      </div>
    </motion.div>
  );
};

const Alumni = () => {
  const { data: alumniData, loading, error } = useDatabase('alumni');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Filter alumni based on search and filters
  useEffect(() => {
    if (!alumniData) return;
    
    let filtered = alumniData.filter(alumnus => {
      const matchesSearch = 
        (alumnus.Name || alumnus.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumnus.Company || alumnus.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumnus.Designation || alumnus.designation || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'All' || 
        (alumnus.department === selectedDepartment);
      
      const matchesYear = selectedYear === 'All' || 
        (alumnus.graduationYear && alumnus.graduationYear.toString() === selectedYear);
      
      return matchesSearch && matchesDepartment && matchesYear;
    });
    
    setFilteredAlumni(filtered);
  }, [alumniData, searchTerm, selectedDepartment, selectedYear]);

  // Get unique departments and years for filters
  const departments = ['All', ...new Set(alumniData?.map(a => a.department).filter(Boolean) || [])];
  const years = ['All', ...new Set(alumniData?.map(a => a.graduationYear).filter(Boolean).sort((a, b) => b - a) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Our Alumni" 
          subtitle="Meet our graduates who are making a difference in the world"
          tag="Alumni Network"
        />
        <ContentLoading text="Loading alumni data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Our Alumni" 
          subtitle="Meet our graduates who are making a difference in the world"
          tag="Alumni Network"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading alumni data: {error}</p>
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
        title="Our Alumni" 
        subtitle="Meet our graduates who are making a difference in the world"
        tag="Alumni Network"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept} className="bg-gray-800">
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-800">
                    {year === 'All' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-center">
              <span className="text-white text-sm">
                Showing {filteredAlumni.length} of {alumniData?.length || 0} alumni
              </span>
            </div>
          </div>
        </motion.div>

        {/* Alumni Grid */}
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {alumniData?.length === 0 ? 'No alumni data available.' : 'No alumni match your search criteria.'}
            </p>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAlumni.map((alumnus, index) => (
              <AlumniCard
                key={alumnus.Id || alumnus.id || alumnus._id || index}
                alumnus={alumnus}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Alumni;