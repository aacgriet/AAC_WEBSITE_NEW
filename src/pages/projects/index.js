// src/pages/projects/index.js - Fixed Projects Page
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden border border-gray-700 h-full flex flex-col"
    >
      {project.mainImage?.asset?.url && (
        <div className="relative h-48">
          <img
            src={project.mainImage.asset.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.categories && (
            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full border border-blue-700/50">
              {project.categories}
            </span>
          )}
          {project.status && (
            <span className={`px-3 py-1 text-xs rounded-full border ${
              project.status === 'published' 
                ? 'bg-green-900/50 text-green-300 border-green-700/50'
                : 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50'
            }`}>
              {project.status}
            </span>
          )}
          {project.publishedAt && (
            <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
              {new Date(project.publishedAt).getFullYear()}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {project.title}
        </h3>

        {project._rawBody && (
          <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
            {project._rawBody.substring(0, 150)}...
          </p>
        )}

        {project.author && (
          <p className="text-gray-400 text-sm mb-2">
            <strong>Author:</strong> {project.author}
          </p>
        )}

        {project.names && project.names.length > 0 && (
          <p className="text-gray-400 text-sm mb-4">
            <strong>Team:</strong> {project.names.slice(0, 3).join(', ')}
            {project.names.length > 3 && ` +${project.names.length - 3} more`}
          </p>
        )}

        <div className="mt-auto">
          <Link 
            href={`/projects/${project.slug || project.id}`}
            className="inline-block w-full px-4 py-2 bg-blue-900/50 text-blue-300 rounded-lg hover:bg-blue-800/50 transition-colors text-center border border-blue-700/50"
          >
            View Project
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const { data: projects, loading } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(projects.map(p => p.categories).filter(Boolean))];
  
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.categories === selectedCategory;
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project._rawBody?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <Head>
        <title>Research & Development Projects | AAC - Advanced Academic Center</title>
        <meta name="description" content="Discover innovative solutions and research projects developed by students and faculty at AAC." />
      </Head>

      {/* FIXED: Hero Section - No Gap, Covers from Top */}
      <div className="relative bg-gradient-to-b from-blue-900 to-indigo-900 pt-24 pb-20">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto mt-7 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Research & Development Projects
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover innovative solutions and research projects developed by students and faculty at AAC.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-[#0e1421] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="md:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-[#0e1421] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1a2535] rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">{projects.length}</div>
              <div className="text-gray-300">Total Projects</div>
            </div>
            <div className="bg-[#1a2535] rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-green-400 mb-2">{categories.length - 1}</div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div className="bg-[#1a2535] rounded-xl p-6 text-center border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">{filteredProjects.length}</div>
              <div className="text-gray-300">Filtered Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="bg-[#0e1421] py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-white">No projects found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-300 text-center">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;