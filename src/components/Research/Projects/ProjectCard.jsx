// src/components/Research/Projects/ProjectCard.jsx - Modernized with Premium UI
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUser, FaFolder, FaTimes, FaUsers, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Extract text content from body blocks or use _rawBody
  const getDescriptionText = () => {
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

  // Get short description for card preview
  const getShortDescription = () => {
    const fullText = getDescriptionText();
    return fullText.length > 150 ? fullText.substring(0, 150) + '...' : fullText;
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

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  const gradientClass = getCategoryGradient(project.categories);
  const categoryIcon = getCategoryIcon(project.categories);

  return (
    <>
      {/* Project Card */}
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass.replace('from-', 'from-').replace('to-', 'to-')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="p-6 relative z-10 flex flex-col h-full">
          {/* Icon with gradient background */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <span className="text-2xl">{categoryIcon}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
            {project.title}
          </h3>
          
          {/* Project metadata */}
          <div className="flex flex-wrap gap-3 mb-4">
            {project.publishedAt && (
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <FaCalendar className="text-xs" />
                <span>{formatDate(project.publishedAt)}</span>
              </div>
            )}
            
            {project.categories && (
              <span className={`px-2 py-1 bg-gradient-to-r ${gradientClass}/20 text-${gradientClass.split('-')[1]}-300 rounded-lg text-xs font-medium border border-${gradientClass.split('-')[1]}-500/30`}>
                {project.categories}
              </span>
            )}
          </div>
          
          {project.author && (
            <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
              <FaUser className="text-xs" />
              <span className="font-medium">{project.author}</span>
            </div>
          )}
          
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 group-hover:text-gray-300 transition-colors duration-300">
            {getShortDescription()}
          </p>
          
          {/* Team members count */}
          {project.names && project.names.length > 0 && (
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <FaUsers className="text-xs" />
              <span>{project.names.length} team member{project.names.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to expand
              </span>
              <div className={`bg-gradient-to-r ${gradientClass} h-1 w-8 rounded-full shadow-lg group-hover:w-12 transition-all duration-300`}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ duration: 0.4 }}
              className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white relative`}>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group/close border border-white/20"
                >
                  <FaTimes className="group-hover/close:scale-110 transition-transform duration-200" />
                </button>
                
                <div className="pr-14">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <span className="text-xl">{categoryIcon}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                      {project.categories && (
                        <span className="text-white/80 text-sm">{project.categories}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-white/90">
                    {project.publishedAt && (
                      <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>{formatDate(project.publishedAt)}</span>
                      </div>
                    )}
                    
                    {project.author && (
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span>{project.author}</span>
                      </div>
                    )}
                    
                    {project.names && project.names.length > 0 && (
                      <div className="flex items-center gap-2">
                        <FaUsers />
                        <span>{project.names.length} team members</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Project Image */}
                {project.mainImage?.asset?.url && (
                  <div className="mb-8">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10">
                      <Image
                        src={project.mainImage.asset.url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {project.names && project.names.length > 0 && (
                  <div className="mb-8">
                    <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                    <h3 className="text-xl font-bold text-white mb-4">Team Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.names.map((name, index) => (
                        <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                              <FaUser className="text-white text-sm" />
                            </div>
                            <span className="text-white font-medium">{name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Description */}
                <div className="mb-8">
                  <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Project Description</h3>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {getDescriptionText()}
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                {project.slug?.current && project.slug.current !== getDescriptionText() && (
                  <div className="mb-8">
                    <div className={`bg-gradient-to-r ${gradientClass} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                    <h3 className="text-xl font-bold text-white mb-4">Project Summary</h3>
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 leading-relaxed italic">{project.slug.current}</p>
                    </div>
                  </div>
                )}

                {/* Project Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaFolder className="text-blue-400" />
                      Project Details
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white font-medium">{project.categories || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400 font-medium">{project.status || 'Published'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        {/* <span className="text-white">{formatDate(project._createdAt)}</span> */}
                        <span className="text-white">{formatDate(project.publishedAt)}</span>
                      </div>
                      {project._updatedAt && project._updatedAt !== project._createdAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Updated:</span>
                          <span className="text-white">{formatDate(project._updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaUsers className="text-purple-400" />
                      Team Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Team/Author:</span>
                        <span className="text-white font-medium">{project.author || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Members:</span>
                        <span className="text-white">{project.names?.length || 0} team members</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Project Date:</span>
                        <span className="text-white">{formatDate(project.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="backdrop-blur-sm bg-white/5 border-t border-white/10 px-8 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaCode />
                  <span>Advanced Academic Center Project</span>
                </div>
                
                <button
                  onClick={handleCloseModal}
                  className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Close
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;