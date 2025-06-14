// src/pages/projects/index.js - Fixed version
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden border border-gray-700 h-full flex flex-col"
    >
      {project.mainImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.mainImage.url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-blue-900/80 text-blue-300 text-xs rounded-full border border-blue-700/50">
              {project.categories}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2">{project.title}</h3>
          {project.status && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              project.status === 'published' 
                ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50'
            }`}>
              {project.status}
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 text-sm line-clamp-3 mb-3">
            {project.description || project.slug}
          </p>
          
          {project.author && (
            <p className="text-blue-400 text-sm font-medium">By: {project.author}</p>
          )}
          
          {project.names && project.names.length > 0 && (
            <p className="text-gray-400 text-sm">
              Team: {project.names.slice(0, 2).join(', ')}
              {project.names.length > 2 && ` +${project.names.length - 2} more`}
            </p>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {project.categories && (
                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-700/30">
                  {project.categories}
                </span>
              )}
              {project.publishedAt && (
                <span className="text-gray-400 text-xs">
                  {new Date(project.publishedAt).getFullYear()}
                </span>
              )}
            </div>
            <Link 
              href={`/projects/${project.id}`}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsFilter = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  searchTerm, 
  setSearchTerm, 
  sortOrder, 
  setSortOrder 
}) => {
  return (
    <div className="bg-[#1a2535] rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="flex-grow">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#0e1421] transition-colors text-white"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="min-w-[200px]">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full py-3 px-4 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sort Order */}
        <div className="min-w-[150px]">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full py-3 px-4 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { data: projects, loading, error } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Get unique categories
  const categories = ['All', ...new Set(projects.map(project => project.categories).filter(Boolean))];

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (project.author && project.author.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || project.categories === activeCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.publishedAt || a.createdAt) - new Date(b.publishedAt || b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt);
      }
    });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading projects</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
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
      <Head>
        <title>Projects | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore innovative projects developed by students and faculty at Advanced Academic Center, GRIET" />
      </Head>
      
      <PageHero 
        title="Student Projects" 
        subtitle="Discover innovative solutions and cutting-edge research projects developed by our talented students and faculty"
        tag="Innovation Showcase"
      />
      
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <ProjectsFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
              <p className="text-gray-400 mb-8">
                {searchTerm || activeCategory !== 'All' 
                  ? "Try adjusting your search criteria or filters."
                  : "No projects have been published yet. Check back soon!"}
              </p>
              {(searchTerm || activeCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl px-6 py-12 shadow-xl border border-blue-700/50">
              <h2 className="text-3xl font-bold mb-4">Have a Project to Showcase?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-blue-100">
                Share your innovative work with the AAC community. We're always looking for outstanding student projects to feature.
              </p>
              <button className="px-8 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#15202d] transition-colors border border-blue-700/30">
                Submit Your Project
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;