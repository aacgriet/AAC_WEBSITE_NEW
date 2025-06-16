// src/pages/projects/[id].js - Modernized Project Detail Page
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { FaArrowLeft, FaCalendar, FaUser, FaUsers, FaFolder, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: projects, loading, error } = useLocalStorage(STORAGE_KEYS.PROJECTS);

  // Find the specific project
  const project = projects.find(p => p._id === id || p.id === id);

  // Get related projects (same category, excluding current)
  const relatedProjects = projects
    .filter(p => p.categories === project?.categories && (p._id !== id && p.id !== id))
    .slice(0, 3);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Extract text content from body blocks or use _rawBody
  const getDescriptionText = () => {
    if (!project) return '';
    
    if (project._rawBody) {
      return project._rawBody;
    }
    
    if (project.body && Array.isArray(project.body)) {
      return project.body
        .map(block => {
          if (block.children) {
            return block.children
              .map(child => child.text || '')
              .join(' ');
          }
          return '';
        })
        .join(' ');
    }
    
    return project.slug?.current || 'No description available';
  };

  // Get category color theme
  const getCategoryGradient = (category) => {
    if (!category) return 'from-blue-500 to-blue-600';
    
    const categoryMap = {
      'Machine Learning': 'from-purple-500 to-purple-600',
      'Deep Learning': 'from-indigo-500 to-indigo-600',
      'Web Development': 'from-green-500 to-green-600',
      'Mobile Development': 'from-orange-500 to-orange-600',
      'IoT': 'from-emerald-500 to-emerald-600',
      'Internet of Things': 'from-emerald-500 to-emerald-600',
      'Robotics': 'from-red-500 to-red-600',
      'Data Science': 'from-cyan-500 to-cyan-600',
      'Cybersecurity': 'from-gray-500 to-gray-600',
      'Blockchain': 'from-amber-500 to-amber-600',
      'AI/ML': 'from-pink-500 to-pink-600',
      'Healthcare': 'from-rose-500 to-rose-600',
      'Computer Vision': 'from-violet-500 to-violet-600',
      'CV': 'from-violet-500 to-violet-600',
      'WEB': 'from-green-500 to-green-600',
      'Drone Technology': 'from-sky-500 to-sky-600',
    };
    
    return categoryMap[category] || 'from-blue-500 to-blue-600';
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Machine Learning': '🤖',
      'Deep Learning': '🧠',
      'Web Development': '🌐',
      'Mobile Development': '📱',
      'IoT': '🌐',
      'Internet of Things': '🌐',
      'Robotics': '🤖',
      'Data Science': '📊',
      'Cybersecurity': '🔒',
      'Blockchain': '⛓️',
      'AI/ML': '🤖',
      'Healthcare': '🏥',
      'Computer Vision': '👁️',
      'CV': '👁️',
      'WEB': '🌐',
      'Drone Technology': '🚁',
      'Project': '💡',
      'project': '💡',
    };
    
    return iconMap[category] || '💡';
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" text="Loading project..." fullScreen />
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">❌</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Project Not Found</h3>
            <p className="text-gray-400 text-lg mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/projects"
              className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaArrowLeft />
                Back to Projects
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const gradientClass = getCategoryGradient(project.categories);
  const categoryIcon = getCategoryIcon(project.categories);
  const formattedTitle = project.title.split(' ').length > 1 
    ? project.title.split(' ').slice(0, -1).join(' ') + ' ' + project.title.split(' ').slice(-1)[0]
    : project.title;

  return (
    <Layout>
      {/* Hero Section */}
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
        
        <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Student Project</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {(() => {
              const words = formattedTitle.split(' ');
              if (words.length >= 2) {
                const firstWords = words.slice(0, -1).join(' ');
                const lastWord = words[words.length - 1];
                return (
                  <>
                    <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                      {firstWords}
                    </span>{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {lastWord}
                    </span>
                  </>
                );
              } else {
                return (
                  <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                    {formattedTitle}
                  </span>
                );
              }
            })()}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            {project.slug?.current || "Innovative student project from Advanced Academic Center"}
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
          >
            <FaArrowLeft />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {project.publishedAt && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-emerald-300 rounded-full border border-white/20 shadow-lg">
                <FaCalendar className="text-emerald-400" />
                <span>{formatDate(project.publishedAt)}</span>
              </div>
            )}
            
            {project.categories && (
              <div className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-purple-300 rounded-full border border-white/20 shadow-lg bg-gradient-to-r ${gradientClass}/20`}>
                <span className="text-xl">{categoryIcon}</span>
                <span>{project.categories}</span>
              </div>
            )}
            
            {project.author && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-blue-300 rounded-full border border-white/20 shadow-lg">
                <FaUser className="text-blue-400" />
                <span>{project.author}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Project Details - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            {project.mainImage?.asset?.url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10"
              >
                <Image
                  src={project.mainImage.asset.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-6 rounded-full shadow-lg`}></div>
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {getDescriptionText()}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
              <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white font-medium">{project.categories || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 font-medium">{project.status || 'Published'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{formatDate(project.publishedAt)}</span>
                </div>
                {project.names && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="text-white">{project.names.length} members</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Team Members Card */}
            {project.names && project.names.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaUsers className="text-purple-400" />
                  Team Members
                </h3>
                <div className="space-y-3">
                  {project.names.map((name, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                        <FaUser className="text-white text-xs" />
                      </div>
                      <span className="text-white text-sm font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaCode className="text-blue-400" />
                About This Project
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                This project was developed as part of the Advanced Academic Center initiatives, 
                showcasing student innovation and technical expertise in {project.categories || 'various domains'}.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <span>Created: {formatDate(project._createdAt)}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-24"
          >
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Title Section */}
              <div className="lg:w-1/3">
                <div className="text-center lg:text-left">
                  <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg`}></div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Related Projects
                    </span>
                  </h2>
                  
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    Explore more projects in the {project.categories} category
                  </p>
                  
                  <div className="hidden lg:block mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Projects Grid */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div
                      key={relatedProject._id || relatedProject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <Link href={`/projects/${relatedProject._id || relatedProject.id}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        
                        <div className="p-4 relative z-10">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(relatedProject.categories)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <span className="text-lg">{getCategoryIcon(relatedProject.categories)}</span>
                          </div>
                          
                          <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                            {relatedProject.title}
                          </h3>
                          
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
                            {relatedProject.slug?.current || 'Student project from AAC'}
                          </p>
                          
                          <div className="mt-3 pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                            <div className="flex items-center justify-between">
                              <span className="text-blue-400 text-xs font-medium group-hover:text-blue-300 transition-colors duration-300">
                                View Project
                              </span>
                              <div className={`bg-gradient-to-r ${getCategoryGradient(relatedProject.categories)} h-0.5 w-6 rounded-full shadow-lg group-hover:w-8 transition-all duration-300`}></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetail;