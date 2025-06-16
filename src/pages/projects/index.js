// src/pages/projects/index.js - Updated to use dynamic data
import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/Research/Projects/ProjectCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  const { data: projects, loading, error } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Get unique categories from projects
  const categories = useMemo(() => {
    if (!projects.length) return ['All'];
    const uniqueCategories = [...new Set(projects.map(p => p.categories).filter(Boolean))];
    return ['All', ...uniqueCategories.sort()];
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = !searchTerm || 
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project._rawBody?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.slug?.current?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || project.categories === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt || b._createdAt) - new Date(a.publishedAt || a._createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt || a._createdAt) - new Date(b.publishedAt || b._createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" text="Loading projects..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Projects</h2>
            <p className="text-gray-400">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Student Projects"
        subtitle="Explore innovative projects created by our talented students, showcasing creativity, technical skills, and real-world problem-solving across various domains."
        tag="Innovation Showcase"
      />

      <div className="container mx-auto px-4 pb-24">
        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects by title, team, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="min-w-[150px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
                >
                  <option value="newest" className="bg-slate-800 text-white">Newest First</option>
                  <option value="oldest" className="bg-slate-800 text-white">Oldest First</option>
                  <option value="title" className="bg-slate-800 text-white">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Showing {filteredProjects.length} of {projects.length} projects
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No projects available at the moment.'}
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || project.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Categories Overview */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Project Categories</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.filter(cat => cat !== 'All').map(category => {
                  const count = projects.filter(p => p.categories === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;