// src/components/Research/Projects/ProjectCard.jsx - Updated with dynamic expansion
import React, { useState } from 'react';
import { IoAnalyticsSharp, IoClose, IoCalendar, IoPeople, IoFolder } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

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
    return fullText.length > 120 ? fullText.substring(0, 120) + '...' : fullText;
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Project Card */}
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-200 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl"
        onClick={handleCardClick}
      >
        <div className="p-5">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-5">
            <IoAnalyticsSharp className="text-yellow-500" size={20} />
          </div>
          
          <h3 className="text-lg font-serif font-bold mb-3 text-gray-800 hover:text-blue-700 transition-colors line-clamp-2">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
            <IoCalendar size={14} />
            <span>{formatDate(project.publishedAt)}</span>
          </div>
          
          {project.categories && (
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <IoFolder size={14} />
              <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">
                {project.categories}
              </span>
            </div>
          )}
          
          {project.author && (
            <p className="text-sm text-gray-600 mb-3">
              <strong>Team:</strong> {project.author}
            </p>
          )}
          
          <p className="text-gray-700 text-sm leading-relaxed">
            {getShortDescription()}
          </p>
          
          <div className="mt-4 pt-3 border-t border-gray-300">
            <span className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
              Click to read more →
            </span>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                >
                  <IoClose size={24} />
                </button>
                
                <h2 className="text-2xl font-bold mb-2 pr-12">{project.title}</h2>
                
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <IoCalendar size={16} />
                    <span>{formatDate(project.publishedAt)}</span>
                  </div>
                  
                  {project.categories && (
                    <div className="flex items-center gap-2">
                      <IoFolder size={16} />
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                        {project.categories}
                      </span>
                    </div>
                  )}
                  
                  {project.author && (
                    <div className="flex items-center gap-2">
                      <IoPeople size={16} />
                      <span>{project.author}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Team Members */}
                {project.names && project.names.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Team Members</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.names.map((name, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Image */}
                {project.mainImage?.asset?.url && (
                  <div className="mb-6">
                    <img
                      src={project.mainImage.asset.url}
                      alt={project.title}
                      className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* Project Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Project Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {getDescriptionText()}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {project.slug?.current && project.slug.current !== getDescriptionText() && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Summary</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700 italic">{project.slug.current}</p>
                    </div>
                  </div>
                )}

                {/* Project Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Project Details</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div><strong>Category:</strong> {project.categories || 'Not specified'}</div>
                      <div><strong>Status:</strong> {project.status || 'Published'}</div>
                      <div><strong>Created:</strong> {formatDate(project._createdAt)}</div>
                      {project._updatedAt && project._updatedAt !== project._createdAt && (
                        <div><strong>Updated:</strong> {formatDate(project._updatedAt)}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Team Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div><strong>Team/Author:</strong> {project.author || 'Not specified'}</div>
                      <div><strong>Members:</strong> {project.names?.length || 0} team members</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
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