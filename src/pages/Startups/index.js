
// src/pages/Startups/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';
import { FaCalendar, FaUsers, FaGlobe, FaExternalLinkAlt, FaRocket, FaPause, FaTimes, FaEye } from 'react-icons/fa';

const StartupCard = ({ startup, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get color classes based on startup color
  const getColorClasses = (color) => {
    const colorMap = {
      'blue': 'from-blue-500 to-blue-600',
      'purple': 'from-purple-500 to-purple-600',
      'orange': 'from-orange-500 to-orange-600',
      'green': 'from-green-500 to-green-600',
      'indigo': 'from-indigo-500 to-indigo-600',
      'red': 'from-red-500 to-red-600'
    };
    return colorMap[color] || 'from-blue-500 to-blue-600';
  };

  // Get status icon and color
  const getStatusDisplay = (status) => {
    const statusMap = {
      'Active': { icon: <FaRocket />, color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
      'Acquired': { icon: <FaRocket />, color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
      'Closed': { icon: <FaTimes />, color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
      'Paused': { icon: <FaPause />, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
      'Stealth Mode': { icon: <FaEye />, color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30' }
    };
    return statusMap[status] || statusMap['Active'];
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

  // Format founders for display
  const formatFounders = (founders) => {
    if (!founders) return 'Unknown founders';
    
    if (Array.isArray(founders)) {
      if (founders.length <= 2) {
        return founders.join(' and ');
      } else {
        return `${founders[0]} et al.`;
      }
    }
    
    return founders.toString();
  };

  const colorClasses = getColorClasses(startup.color);
  const statusDisplay = getStatusDisplay(startup.status);

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleWebsiteClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
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
          {/* Startup Logo */}
          {startup.logo && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border border-white/20 bg-white/5">
                <Image
                  src={startup.logo}
                  alt={startup.name}
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
              {startup.status}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 text-center">
            {startup.name}
          </h3>
          
          {/* Category */}
          <div className="mb-4 flex justify-center">
            <span className={`px-3 py-1 bg-gradient-to-r ${colorClasses}/20 text-${colorClasses.split('-')[1]}-300 rounded-lg text-xs font-medium border border-${colorClasses.split('-')[1]}-500/30`}>
              {startup.category}
            </span>
          </div>
          
          {/* Founders */}
          <div className="mb-3 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <FaUsers className="text-xs" />
            <span>{formatFounders(startup.founders)}</span>
          </div>
          
          {/* Established Date */}
          {/* <div className="mb-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
            <FaCalendar className="text-xs" />
            <span>Est. {formatDate(startup.establishedDate)}</span>
          </div> */}
          
          {/* Description Preview */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3 text-center">
            {startup.description}
          </p>
          
          {/* Website Button */}
          {startup.website && (
            <div className="mb-4 flex justify-center">
              <button
                onClick={(e) => handleWebsiteClick(e, startup.website)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
              >
                <FaGlobe className="text-xs" />
                Visit Website
              </button>
            </div>
          )}
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to learn more
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
                <div className="flex items-center gap-4 flex-1">
                  {startup.logo && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                      <Image
                        src={startup.logo}
                        alt={startup.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{startup.name}</h2>
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-sm font-medium`}>
                        {statusDisplay.icon}
                        {startup.status}
                      </span>
                      <span className="text-white/90">{startup.category}</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Founded by {formatFounders(startup.founders)} • Est. {formatDate(startup.establishedDate)}
                    </p>
                  </div>
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
              {/* Main Product Image */}
              {startup.image && (
                <div className="mb-8">
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-white/10">
                    <Image
                      src={startup.image}
                      alt={startup.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                <h3 className="text-xl font-bold text-white mb-4">About {startup.name}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {startup.description}
                </p>
              </div>

              {/* Mission/Vision */}
              <div className="mb-8">
                <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                <h3 className="text-xl font-bold text-white mb-4">Mission & Vision</h3>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed">
                    {startup.mission}
                  </p>
                </div>
              </div>

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Company Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{startup.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={statusDisplay.color}>{startup.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Established:</span>
                      <span className="text-white">{formatDate(startup.establishedDate)}</span>
                    </div>
                    {startup.website && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Website:</span>
                        <a 
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          Visit <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-2">Team Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Founders:</span>
                      <span className="text-white">{Array.isArray(startup.founders) ? startup.founders.length : 1}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Founders Section */}
              {Array.isArray(startup.founders) && startup.founders.length > 0 && (
                <div className="mb-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Founders</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {startup.founders.map((founder, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                            <FaUsers className="text-white text-sm" />
                          </div>
                          <span className="text-white font-medium">{founder}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* App Screenshots */}
              {Array.isArray(startup.appScreenshots) && startup.appScreenshots.length > 0 && (
                <div className="mb-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Product Screenshots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {startup.appScreenshots.filter(screenshot => screenshot.trim()).map((screenshot, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-white/10">
                        <Image
                          src={screenshot}
                          alt={`${startup.name} screenshot ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-300 rounded-xl font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                  >
                    <FaGlobe />
                    Visit Website
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Startups = () => {
  const { data: startupsData, loading, error } = useDatabase('startups');
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter startups based on search and filters
  useEffect(() => {
    if (!startupsData) return;
    
    let filtered = startupsData.filter(startup => {
      const matchesSearch = 
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(startup.founders) && startup.founders.some(founder => 
          founder.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.mission.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || startup.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    // Sort startups
    filtered.sort((a, b) => {
      const dateA = new Date(a.establishedDate || 0);
      const dateB = new Date(b.establishedDate || 0);
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
    
    setFilteredStartups(filtered);
  }, [startupsData, searchTerm, selectedCategory, selectedStatus, sortOrder]);

  // Get unique values for filters
  const categories = ['All', ...new Set(startupsData?.map(startup => startup.category).filter(Boolean) || [])];
  const statuses = ['All', ...new Set(startupsData?.map(startup => startup.status).filter(Boolean) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Startups" 
          subtitle="Explore innovative startups founded by our community"
          tag="Student Startups"
        />
        <ContentLoading text="Loading startups..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Startups" 
          subtitle="Explore innovative startups founded by our community"
          tag="Student Startups"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading startups: {error}</p>
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
        title="Startups" 
        subtitle="Explore innovative startups founded by our community"
        tag="Student Startups"
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
                placeholder="Search startups..."
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
              Showing {filteredStartups.length} of {startupsData?.length || 0} startups
            </span>
          </div>
        </motion.div>

        {/* Startups Grid */}
        {filteredStartups.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {startupsData?.length === 0 ? 'No Startups Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {startupsData?.length === 0 
                  ? 'There are currently no startups to display.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
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
            {filteredStartups.map((startup, index) => (
              <StartupCard
                key={startup.id || startup._id || index}
                startup={startup}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Statistics Section */}
        {startupsData && startupsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Startup Ecosystem</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {startupsData.length}
                </div>
                <div className="text-gray-400">Total Startups</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {startupsData.filter(s => s.status === 'Active').length}
                </div>
                <div className="text-gray-400">Active</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-400">Categories</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {startupsData.filter(s => s.founders && s.founders.length > 0).reduce((total, s) => total + s.founders.length, 0)}
                </div>
                <div className="text-gray-400">Founders</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Startups;