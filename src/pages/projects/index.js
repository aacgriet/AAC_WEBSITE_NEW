

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