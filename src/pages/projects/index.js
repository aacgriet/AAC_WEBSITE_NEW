// // src/pages/projects/index.js - Modernized Projects Page
// import React, { useState, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import Layout from '@/components/Layout';
// import PageHero from '@/components/PageHero';
// import ProjectCard from '@/components/Research/Projects/ProjectCard';
// import LoadingSpinner from '@/components/LoadingSpinner';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';

// const Projects = () => {
//   const { data: projects, loading, error } = useLocalStorage(STORAGE_KEYS.PROJECTS);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All Categories');
//   const [yearFilter, setYearFilter] = useState('All Years');

//   // Get unique categories and years for filters
//   const categories = useMemo(() => {
//     const uniqueCategories = [...new Set(projects.map(project => project.categories).filter(Boolean))];
//     return ['All Categories', ...uniqueCategories.sort()];
//   }, [projects]);

//   const years = useMemo(() => {
//     const uniqueYears = [...new Set(projects.map(project => {
//       if (project.publishedAt) {
//         return new Date(project.publishedAt).getFullYear();
//       }
//       return null;
//     }).filter(Boolean))];
//     return ['All Years', ...uniqueYears.sort((a, b) => b - a)];
//   }, [projects]);

//   // Filter projects based on search term, category, and year
//   const filteredProjects = useMemo(() => {
//     return projects.filter(project => {
//       const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            (project.author && project.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
//                            (project._rawBody && project._rawBody.toLowerCase().includes(searchTerm.toLowerCase()));
      
//       const matchesCategory = categoryFilter === 'All Categories' || project.categories === categoryFilter;
      
//       const matchesYear = yearFilter === 'All Years' || 
//                          (project.publishedAt && new Date(project.publishedAt).getFullYear().toString() === yearFilter.toString());
      
//       return matchesSearch && matchesCategory && matchesYear;
//     });
//   }, [projects, searchTerm, categoryFilter, yearFilter]);

//   if (loading) {
//     return (
//       <Layout>
//         <LoadingSpinner size="lg" text="Loading projects..." fullScreen />
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">❌</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">Error Loading Projects</h3>
//             <p className="text-gray-400 text-lg">Unable to load projects data. Please try again later.</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <PageHero
//         title="Student Projects"
//         subtitle="Discover innovative projects developed by our talented students across various domains"
//         tag="Research & Innovation"
//       />

//       <div className="container mx-auto px-4 pb-24">
//         {/* Filter Controls */}
//         <div className="mb-12">
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Search */}
//               <div>
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
//                   Search Projects
//                 </label>
//                 <input
//                   type="text"
//                   id="search"
//                   placeholder="Search by title, author, or description..."
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

//         {/* Results Counter */}
//         <div className="mb-8">
//           <p className="text-lg text-gray-400">
//             Showing <span className="text-white font-medium">{filteredProjects.length}</span> of <span className="text-white font-medium">{projects.length}</span> projects
//           </p>
//         </div>

//         {/* Projects Grid */}
//         {filteredProjects.length > 0 ? (
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
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {filteredProjects.map((project, index) => (
//               <motion.div
//                 key={project._id || project.id || index}
//                 variants={{
//                   hidden: { y: 30, opacity: 0 },
//                   visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
//                 }}
//               >
//                 <ProjectCard project={project} />
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           // Empty State
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">🔍</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">No Projects Found</h3>
//             <p className="text-gray-400 text-lg mb-6">
//               {searchTerm || categoryFilter !== 'All Categories' || yearFilter !== 'All Years'
//                 ? 'Try adjusting your search criteria or filters'
//                 : 'No projects are currently available'
//               }
//             </p>
//             {(searchTerm || categoryFilter !== 'All Categories' || yearFilter !== 'All Years') && (
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setCategoryFilter('All Categories');
//                   setYearFilter('All Years');
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
//         )}

//         {/* Call to Action Section */}
//         {projects.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="mt-24"
//           >
//             <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
//               {/* Gradient section line */}
//               <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto mb-6 rounded-full shadow-lg"></div>
              
//               <h2 className="text-3xl font-bold text-white mb-4">
//                 Have a Project Idea?
//               </h2>
//               <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
//                 Join our community of innovators and bring your ideas to life. 
//                 Connect with mentors, access resources, and make an impact.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button className="group/btn px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105">
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     Get Started
//                     <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                   </span>
//                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                 </button>
                
//                 <button className="px-8 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Projects;

// src/pages/projects/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/Research/Projects/ProjectCard';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

const Projects = () => {
  const { data: projectsData, loading, error } = useDatabase('projects');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Process and filter projects data
  useEffect(() => {
    if (!projectsData || !Array.isArray(projectsData)) {
      setFilteredProjects([]);
      return;
    }

    let processed = projectsData.filter(project => {
      // Basic filtering - ensure project has required fields
      if (!project.title) return false;
      
      // Search filter
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.author && project.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.categories && project.categories.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project._rawBody && project._rawBody.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.slug?.current && project.slug.current.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || project.categories === selectedCategory;
      
      // Year filter
      const projectYear = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;
      const matchesYear = selectedYear === 'All' || (projectYear && projectYear.toString() === selectedYear);
      
      return matchesSearch && matchesCategory && matchesYear;
    });

    // Sort projects
    processed.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a._createdAt || 0);
      const dateB = new Date(b.publishedAt || b._createdAt || 0);
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    setFilteredProjects(processed);
  }, [projectsData, searchTerm, selectedCategory, selectedYear, sortOrder]);

  // Get unique categories and years for filters
  const categories = ['All'];
  const years = ['All'];
  
  if (projectsData && Array.isArray(projectsData)) {
    const uniqueCategories = [...new Set(projectsData.map(project => project.categories).filter(Boolean))];
    categories.push(...uniqueCategories);
    
    const uniqueYears = [...new Set(projectsData.map(project => {
      if (project.publishedAt) {
        return new Date(project.publishedAt).getFullYear();
      }
      return null;
    }).filter(Boolean))].sort((a, b) => b - a);
    years.push(...uniqueYears);
  }

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Our Projects" 
          subtitle="Discover innovative projects developed by our talented students and faculty"
          tag="Student Projects"
        />
        <ContentLoading text="Loading projects..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Our Projects" 
          subtitle="Discover innovative projects developed by our talented students and faculty"
          tag="Student Projects"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading projects: {error}</p>
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
        title="Our Projects" 
        subtitle="Discover innovative projects developed by our talented students and faculty"
        tag="Student Projects"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search projects..."
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
              Showing {filteredProjects.length} of {projectsData?.length || 0} projects
            </span>
          </div>
        </motion.div>

        {/* Results */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {projectsData?.length === 0 ? 'No Projects Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {projectsData?.length === 0 
                  ? 'There are currently no projects to display.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All' || selectedYear !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedYear('All');
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
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id || project.id || index}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Statistics Section */}
        {projectsData && projectsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Project Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {projectsData.length}
                </div>
                <div className="text-gray-400">Total Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-400">Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {projectsData.filter(p => p.names && p.names.length > 0).reduce((total, p) => total + p.names.length, 0)}
                </div>
                <div className="text-gray-400">Team Members</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {years.length - 1}
                </div>
                <div className="text-gray-400">Active Years</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;