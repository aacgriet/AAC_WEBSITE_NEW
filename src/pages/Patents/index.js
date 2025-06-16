

// src/pages/Patents/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';
import { FaCalendar, FaUsers, FaGlobe, FaCheck, FaClock, FaTimes } from 'react-icons/fa';

const PatentCard = ({ patent, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color classes based on patent color
  const getColorClasses = (color) => {
    const colorMap = {
      'purple': 'from-purple-500 to-purple-600',
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'red': 'from-red-500 to-red-600',
      'orange': 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-purple-500 to-purple-600';
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    const statusMap = {
      'Published Online': { icon: <FaGlobe />, color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
      'Pending': { icon: <FaClock />, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
      'Approved': { icon: <FaCheck />, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
      'Granted': { icon: <FaCheck />, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
      'Rejected': { icon: <FaTimes />, color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
      'Withdrawn': { icon: <FaTimes />, color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30' }
    };
    return statusMap[status] || statusMap['Published Online'];
  };

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

  // Format inventors for display
  const formatInventors = (inventors) => {
    if (!inventors) return 'Unknown inventors';
    
    if (Array.isArray(inventors)) {
      if (inventors.length <= 2) {
        return inventors.join(' and ');
      } else {
        return `${inventors[0]} et al.`;
      }
    }
    
    return inventors.toString();
  };

  const colorClasses = getColorClasses(patent.color);
  const statusDisplay = getStatusDisplay(patent.status);

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.03 }}
        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.replace('to-', 'to-').replace('from-', 'from-')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="p-6 relative z-10">
          {/* Patent Image */}
          {patent.image && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src={patent.image}
                  alt={patent.shortTitle || patent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="mb-4 flex justify-center">
            <span className={`inline-flex items-center gap-2 px-3 py-1 ${statusDisplay.bgColor} ${statusDisplay.color} rounded-lg text-xs font-medium border ${statusDisplay.borderColor}`}>
              {statusDisplay.icon}
              {patent.status}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
            {patent.shortTitle || patent.title}
          </h3>
          
          {/* Category */}
          <div className="mb-3 flex justify-center">
            <span className={`px-3 py-1 bg-gradient-to-r ${colorClasses}/20 text-${colorClasses.split('-')[1]}-300 rounded-lg text-xs font-medium border border-${colorClasses.split('-')[1]}-500/30`}>
              {patent.category}
            </span>
          </div>
          
          {/* Inventors */}
          <div className="mb-3 flex items-center gap-2 text-gray-400 text-sm">
            <FaUsers className="text-xs" />
            <span>{formatInventors(patent.inventors)}</span>
          </div>
          
          {/* Date and Office */}
          <div className="mb-4 space-y-2 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <FaCalendar className="text-xs" />
              <span>{formatDate(patent.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe className="text-xs" />
              <span>{patent.patentOffice}</span>
            </div>
          </div>
          
          {/* Application Number */}
          <div className="mb-4 text-center">
            <span className="text-gray-400 text-xs">App. No: {patent.applicationNumber}</span>
          </div>
          
          {/* Description Preview */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {patent.description}
          </p>
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to read more
              </span>
              <div className={`bg-gradient-to-r ${colorClasses} h-1 w-8 rounded-full shadow-lg group-hover:w-12 transition-all duration-300`}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${colorClasses} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{patent.shortTitle || patent.title}</h2>
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-sm font-medium`}>
                      {statusDisplay.icon}
                      {patent.status}
                    </span>
                    <span className="text-white/90">{patent.category}</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    {formatInventors(patent.inventors)} • {patent.patentOffice} • {formatDate(patent.date)}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Patent Image */}
                {patent.image && (
                  <div className="md:col-span-1">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-white/20">
                      <Image
                        src={patent.image}
                        alt={patent.shortTitle || patent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Patent Info */}
                <div className={`${patent.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Patent Description</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {patent.description}
                  </p>
                  
                  {/* Patent Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Patent Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Application No:</span>
                          <span className="text-white">{patent.applicationNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Office:</span>
                          <span className="text-white">{patent.patentOffice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="text-white">{formatDate(patent.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className={statusDisplay.color}>{patent.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Classification</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{patent.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Inventors:</span>
                          <span className="text-white">{Array.isArray(patent.inventors) ? patent.inventors.length : 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Full Title Section */}
              {patent.title && patent.title !== patent.shortTitle && (
                <div className="mt-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Full Patent Title</h3>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 leading-relaxed">
                      {patent.title}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Inventors Section */}
              {Array.isArray(patent.inventors) && patent.inventors.length > 0 && (
                <div className="mt-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Inventors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patent.inventors.map((inventor, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                            <FaUsers className="text-white text-sm" />
                          </div>
                          <span className="text-white font-medium">{inventor}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Patents = () => {
  const { data: patentsData, loading, error } = useDatabase('patents');
  const [filteredPatents, setFilteredPatents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOffice, setSelectedOffice] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter patents based on search and filters
  useEffect(() => {
    if (!patentsData) return;
    
    let filtered = patentsData.filter(patent => {
      const matchesSearch = 
        (patent.title && patent.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patent.shortTitle && patent.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (patent.category && patent.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(patent.inventors) && patent.inventors.some(inventor => 
          inventor.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (patent.description && patent.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || patent.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || patent.status === selectedStatus;
      const matchesOffice = selectedOffice === 'All' || patent.patentOffice === selectedOffice;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesOffice;
    });
    
    // Sort patents
    filtered.sort((a, b) => {
      const dateA = new Date(a.date || 0);
      const dateB = new Date(b.date || 0);
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
    
    setFilteredPatents(filtered);
  }, [patentsData, searchTerm, selectedCategory, selectedStatus, selectedOffice, sortOrder]);

  // Get unique values for filters
  const categories = ['All', ...new Set(patentsData?.map(patent => patent.category).filter(Boolean) || [])];
  const statuses = ['All', ...new Set(patentsData?.map(patent => patent.status).filter(Boolean) || [])];
  const offices = ['All', ...new Set(patentsData?.map(patent => patent.patentOffice).filter(Boolean) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Patents" 
          subtitle="Explore our innovative patents and intellectual property"
          tag="Patents & IP"
        />
        <ContentLoading text="Loading patents..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Patents" 
          subtitle="Explore our innovative patents and intellectual property"
          tag="Patents & IP"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading patents: {error}</p>
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
        title="Patents" 
        subtitle="Explore our innovative patents and intellectual property"
        tag="Patents & IP"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search patents..."
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {offices.map(office => (
                  <option key={office} value={office} className="bg-gray-800">
                    {office}
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
              Showing {filteredPatents.length} of {patentsData?.length || 0} patents
            </span>
          </div>
        </motion.div>

        {/* Patents Grid */}
        {filteredPatents.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {patentsData?.length === 0 ? 'No Patents Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {patentsData?.length === 0 
                  ? 'There are currently no patents to display.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedOffice !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                    setSelectedOffice('All');
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
            {filteredPatents.map((patent, index) => (
              <PatentCard
                key={patent.id || patent._id || index}
                patent={patent}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Patents;