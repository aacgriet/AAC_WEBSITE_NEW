
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import Layout from '@/components/Layout';
// import PageHero from '@/components/PageHero';
// import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
// import { useDatabase } from '@/hooks/useDatabase';

// const AlumniCard = ({ alumnus, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1, duration: 0.6 }}
//       whileHover={{ y: -8, scale: 1.03 }}
//       className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
//     >
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
//       <div className="p-6 text-center relative z-10">
//         {/* Profile Image */}
//         <div className="relative w-32 h-32 mx-auto mb-6">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
//           <Image
//             src={alumnus.Image || alumnus.image || '/images/pic.webp'}
//             alt={alumnus.Name || alumnus.name}
//             width={128}
//             height={128}
//             className="relative z-10 rounded-full object-cover shadow-2xl border-2 border-white/20 group-hover:scale-105 transition-transform duration-300"
//           />
//         </div>
        
//         <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//           {alumnus.Name || alumnus.name}
//         </h3>
        
//         {(alumnus.Designation || alumnus.designation) && (
//           <p className="text-blue-300 font-medium mb-2 group-hover:text-blue-200 transition-colors duration-300">
//             {alumnus.Designation || alumnus.designation}
//           </p>
//         )}
        
//         {(alumnus.Company || alumnus.company) && (
//           <p className="text-gray-400 mb-3 group-hover:text-gray-300 transition-colors duration-300">
//             {alumnus.Company || alumnus.company}
//           </p>
//         )}
        
//         <div className="space-y-2 text-sm">
//           {(alumnus.department) && (
//             <div className="flex justify-center">
//               <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
//                 {alumnus.department}
//               </span>
//             </div>
//           )}
          
//           {(alumnus.graduationYear) && (
//             <p className="text-gray-400">
//               Class of {alumnus.graduationYear}
//             </p>
//           )}
          
//           {(alumnus.currentLocation) && (
//             <p className="text-gray-500 text-xs">
//               📍 {alumnus.currentLocation}
//             </p>
//           )}
//         </div>
        
//         {/* Additional Info on Hover */}
//         <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {(alumnus.bio) && (
//             <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
//               {alumnus.bio}
//             </p>
//           )}
          
//           {(alumnus.achievements) && (
//             <div className="mt-3">
//               <p className="text-xs text-gray-400 mb-1">Key Achievements:</p>
//               <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
//                 {alumnus.achievements}
//               </p>
//             </div>
//           )}
          
//           <div className="flex justify-center gap-3 mt-4">
//             {(alumnus.email) && (
//               <a
//                 href={`mailto:${alumnus.email}`}
//                 className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
//               >
//                 <span className="text-blue-300 text-sm">✉️</span>
//               </a>
//             )}
            
//             {(alumnus.linkedin) && (
//               <a
//                 href={alumnus.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors"
//               >
//                 <span className="text-blue-300 text-sm">💼</span>
//               </a>
//             )}
//           </div>
//         </div>
        
//         {/* Decorative line */}
//         <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-12 rounded-full mx-auto shadow-lg group-hover:w-16 transition-all duration-300"></div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Alumni = () => {
//   const { data: alumniData, loading, error } = useDatabase('alumni');
//   const [filteredAlumni, setFilteredAlumni] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All');
//   const [selectedYear, setSelectedYear] = useState('All');

//   // Filter alumni based on search and filters
//   useEffect(() => {
//     if (!alumniData) return;
    
//     let filtered = alumniData.filter(alumnus => {
//       const matchesSearch = 
//         (alumnus.Name || alumnus.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (alumnus.Company || alumnus.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (alumnus.Designation || alumnus.designation || '').toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesDepartment = selectedDepartment === 'All' || 
//         (alumnus.department === selectedDepartment);
      
//       const matchesYear = selectedYear === 'All' || 
//         (alumnus.graduationYear && alumnus.graduationYear.toString() === selectedYear);
      
//       return matchesSearch && matchesDepartment && matchesYear;
//     });
    
//     setFilteredAlumni(filtered);
//   }, [alumniData, searchTerm, selectedDepartment, selectedYear]);

//   // Get unique departments and years for filters
//   const departments = ['All', ...new Set(alumniData?.map(a => a.department).filter(Boolean) || [])];
//   const years = ['All', ...new Set(alumniData?.map(a => a.graduationYear).filter(Boolean).sort((a, b) => b - a) || [])];

//   if (loading) {
//     return (
//       <Layout>
//         <PageHero 
//           title="Our Alumni" 
//           subtitle="Meet our graduates who are making a difference in the world"
//           tag="Alumni Network"
//         />
//         <ContentLoading text="Loading alumni data..." />
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <PageHero 
//           title="Our Alumni" 
//           subtitle="Meet our graduates who are making a difference in the world"
//           tag="Alumni Network"
//         />
//         <div className="container mx-auto px-4 py-12">
//           <div className="text-center">
//             <p className="text-red-400 text-lg">Error loading alumni data: {error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <PageHero 
//         title="Our Alumni" 
//         subtitle="Meet our graduates who are making a difference in the world"
//         tag="Alumni Network"
//       />
      
//       <div className="container mx-auto px-4 py-12">
//         {/* Filter Controls */}
//         <div className="mb-12">
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Search */}
//               <div>
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
//                   Search Alumni
//                 </label>
//                 <input
//                   type="text"
//                   id="search"
//                   placeholder="Search by name, company, or designation..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
//                 />
//               </div>
              
//               {/* Department filter */}
//               <div>
//                 <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-3">
//                   Filter by Department
//                 </label>
//                 <select
//                   id="department"
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {departments.map(dept => (
//                     <option key={dept} value={dept} className="bg-slate-800 text-white">
//                       {dept === 'All' ? 'All Departments' : dept}
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
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {years.map(year => (
//                     <option key={year} value={year} className="bg-slate-800 text-white">
//                       {year === 'All' ? 'All Years' : year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Counter */}
//         <div className="mb-8">
//           <p className="text-lg text-gray-400">
//             Showing <span className="text-white font-medium">{filteredAlumni.length}</span> of <span className="text-white font-medium">{alumniData?.length || 0}</span> alumni
//           </p>
//         </div>

//         {/* Alumni Grid */}
//         {filteredAlumni.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">🎓</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">No Alumni Found</h3>
//             <p className="text-gray-400 text-lg mb-6">
//               {alumniData?.length === 0 
//                 ? 'No alumni data is currently available' 
//                 : searchTerm || selectedDepartment !== 'All' || selectedYear !== 'All'
//                   ? 'Try adjusting your search criteria or filters'
//                   : 'No alumni match your criteria'
//               }
//             </p>
//             {(searchTerm || selectedDepartment !== 'All' || selectedYear !== 'All') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedDepartment('All');
//                   setSelectedYear('All');
//                 }}
//                 className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   Clear Filters
//                   <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                 </span>
//                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//               </button>
//             )}
//           </div>
//         ) : (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { 
//                   staggerChildren: 0.1,
//                   delayChildren: 0.2
//                 }
//               }
//             }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//           >
//             {filteredAlumni.map((alumnus, index) => (
//               <AlumniCard
//                 key={alumnus.Id || alumnus.id || alumnus._id || index}
//                 alumnus={alumnus}
//                 index={index}
//               />
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Alumni;
// src/pages/Alumni/index.js - Updated Alumni Page with simplified cards
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useDatabase } from '@/hooks/useDatabase';
import { ContentLoading } from '@/components/LoadingSpinner';

// Simplified Alumni Card Component (inline for easier modification)
const SimplifiedAlumniCard = ({ alumni, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-slate-800/50 rounded-2xl shadow-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Alumni Photo - Circular */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-600 group-hover:border-slate-500 transition-colors duration-300">
          <Image
            src={alumni.Image || alumni.image || '/images/default-avatar.jpg'}
            alt={alumni.Name || alumni.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      
      {/* Alumni Name */}
      <h3 className="text-white text-lg font-semibold text-center mb-2 group-hover:text-blue-300 transition-colors duration-300">
        {alumni.Name || alumni.name}
      </h3>
      
      {/* Current Role/Designation (if available) */}
      {/* {(alumni.Designation || alumni.designation) && (
        <p className="text-blue-400 text-sm text-center mb-3">
          {alumni.Designation || alumni.designation}
        </p>
      )} */}

      {/* Department Badge */}
      {(alumni.department || alumni.Department) && (
        <div className="flex justify-center mb-3">
          <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium border border-blue-600/30">
            {alumni.department || alumni.Department}
          </span>
        </div>
      )}

      {/* Graduation Year */}
      {(alumni.graduationYear || alumni.year) && (
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
            Class of {alumni.graduationYear || alumni.year}
          </span>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

const AlumniPage = () => {
  const { data: alumniData, loading, error } = useDatabase('alumni');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter alumni based on search and filters
  useEffect(() => {
    let filtered = [...alumniData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(alumni =>
        (alumni.Name || alumni.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumni.Designation || alumni.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment) {
      filtered = filtered.filter(alumni =>
        (alumni.department || alumni.Department) === selectedDepartment
      );
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(alumni =>
        (alumni.graduationYear || alumni.year) === parseInt(selectedYear)
      );
    }

    setFilteredAlumni(filtered);
  }, [alumniData, searchTerm, selectedDepartment, selectedYear]);

  // Get unique departments and years for filters
  const departments = [...new Set(alumniData.map(alumni => alumni.department || alumni.Department).filter(Boolean))];
  const years = [...new Set(alumniData.map(alumni => alumni.graduationYear || alumni.year).filter(Boolean))].sort((a, b) => b - a);

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />
        <ContentLoading text="Loading alumni data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-red-400 text-lg">Error loading alumni data: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Alumni Network | Advanced Academic Center</title>
        <meta 
          name="description" 
          content="Connect with our accomplished alumni network. Discover graduates who are making their mark in various industries worldwide."
        />
      </Head>

      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />

        <div className="container mx-auto px-4 py-16">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-slate-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800">
                      Class of {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredAlumni.length} of {alumniData.length} alumni
            </div>
          </motion.div>

          {/* Alumni Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {filteredAlumni.map((alumni, index) => (
              <SimplifiedAlumniCard
                key={alumni.Id || alumni.id || index}
                alumni={alumni}
                index={index}
              />
            ))}
          </motion.div>

          {/* No results message */}
          {filteredAlumni.length === 0 && alumniData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-lg mb-4">No alumni found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('');
                  setSelectedYear('');
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Empty state */}
          {alumniData.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">No alumni data available</div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AlumniPage;