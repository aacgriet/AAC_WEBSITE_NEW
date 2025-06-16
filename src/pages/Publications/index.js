
// src/pages/Publications/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';
import { FaDownload, FaCalendar, FaUsers, FaBook, FaExternalLinkAlt } from 'react-icons/fa';

const PublicationCard = ({ publication, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format authors for display
  const formatAuthors = (authors) => {
    if (!authors) return 'Unknown authors';
    
    if (Array.isArray(authors)) {
      if (authors.length <= 2) {
        return authors.join(' and ');
      } else {
        return `${authors[0]} et al.`;
      }
    }
    
    return authors.toString();
  };

  // Get publication year
  const getYear = (publication) => {
    if (publication.year) return publication.year;
    if (publication.publishedAt) {
      return new Date(publication.publishedAt).getFullYear();
    }
    return 'Unknown';
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleDownload = (e, url) => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        
        <div className="p-6 relative z-10">
          {/* Publication Image */}
          {publication.image && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src={publication.image}
                  alt={publication.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="mb-4 flex justify-center">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
              {publication.category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
            {publication.title}
          </h3>
          
          {/* Authors */}
          <div className="mb-3 flex items-center gap-2 text-gray-400 text-sm">
            <FaUsers className="text-xs" />
            <span>{formatAuthors(publication.authors)}</span>
          </div>
          
          {/* Year */}
          <div className="mb-4 flex items-center gap-2 text-gray-400 text-sm">
            <FaCalendar className="text-xs" />
            <span>{getYear(publication)}</span>
          </div>
          
          {/* Abstract Preview */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {publication.abstract}
          </p>
          
          {/* Download Button */}
          {publication.downloadUrl && (
            <div className="mb-4">
              <button
                onClick={(e) => handleDownload(e, publication.downloadUrl)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors"
              >
                <FaDownload className="text-xs" />
                Download PDF
              </button>
            </div>
          )}
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to read more
              </span>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 w-8 rounded-full shadow-lg group-hover:w-12 transition-all duration-300"></div>
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{publication.title}</h2>
                  <p className="text-white/90 mb-2">{publication.category} • {getYear(publication)}</p>
                  <p className="text-white/80 text-sm">{formatAuthors(publication.authors)}</p>
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
                {/* Publication Image */}
                {publication.image && (
                  <div className="md:col-span-1">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-white/20">
                      <Image
                        src={publication.image}
                        alt={publication.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Publication Info */}
                <div className={`${publication.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                  <h3 className="text-xl font-bold text-white mb-4">Abstract</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {publication.abstract}
                  </p>
                  
                  {/* Publication Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <FaBook className="text-blue-400" />
                        Publication Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{publication.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Year:</span>
                          <span className="text-white">{getYear(publication)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white">{publication.type || 'Journal Paper'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <FaUsers className="text-purple-400" />
                        Author Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Authors:</span>
                          <span className="text-white">{Array.isArray(publication.authors) ? publication.authors.length : 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download/Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {publication.downloadUrl && (
                      <button
                        onClick={(e) => handleDownload(e, publication.downloadUrl)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-300 rounded-xl font-medium border border-green-500/30 hover:bg-green-500/30 transition-colors"
                      >
                        <FaDownload />
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Full Publication Details */}
              <div className="mt-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                <h3 className="text-xl font-bold text-white mb-4">Publication Information</h3>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                  <p className="text-gray-300 leading-relaxed">
                    {publication.publication}
                  </p>
                </div>
              </div>
              
              {/* Authors Section */}
              {Array.isArray(publication.authors) && publication.authors.length > 0 && (
                <div className="mt-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                  <h3 className="text-xl font-bold text-white mb-4">Authors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publication.authors.map((author, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-gray-300 leading-relaxed">{author}</p>
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

const Publications = () => {
  const { data: publicationsData, loading, error } = useDatabase('publications');
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter publications based on search and filters
  useEffect(() => {
    if (!publicationsData) return;
    
    let filtered = publicationsData.filter(publication => {
      const matchesSearch = 
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(publication.authors) && publication.authors.some(author => 
          author.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        publication.abstract.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || publication.category === selectedCategory;
      
      const publicationYear = publication.year || (publication.publishedAt ? new Date(publication.publishedAt).getFullYear() : null);
      const matchesYear = selectedYear === 'All' || (publicationYear && publicationYear.toString() === selectedYear);
      
      return matchesSearch && matchesCategory && matchesYear;
    });
    
    // Sort publications
    filtered.sort((a, b) => {
      const yearA = a.year || (a.publishedAt ? new Date(a.publishedAt).getFullYear() : 0);
      const yearB = b.year || (b.publishedAt ? new Date(b.publishedAt).getFullYear() : 0);
      
      return sortOrder === 'newest' ? yearB - yearA : yearA - yearB;
    });
    
    setFilteredPublications(filtered);
  }, [publicationsData, searchTerm, selectedCategory, selectedYear, sortOrder]);

  // Get unique categories and years for filters
  const categories = ['All', ...new Set(publicationsData?.map(pub => pub.category).filter(Boolean) || [])];
  const years = ['All', ...new Set(publicationsData?.map(pub => {
    return pub.year || (pub.publishedAt ? new Date(pub.publishedAt).getFullYear() : null);
  }).filter(Boolean).sort((a, b) => b - a) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Publications" 
          subtitle="Explore our research publications and academic contributions"
          tag="Research Publications"
        />
        <ContentLoading text="Loading publications..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Publications" 
          subtitle="Explore our research publications and academic contributions"
          tag="Research Publications"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading publications: {error}</p>
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
        title="Publications" 
        subtitle="Explore our research publications and academic contributions"
        tag="Research Publications"
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
                placeholder="Search publications..."
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
              Showing {filteredPublications.length} of {publicationsData?.length || 0} publications
            </span>
          </div>
        </motion.div>

        {/* Publications Grid */}
        {filteredPublications.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {publicationsData?.length === 0 ? 'No Publications Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {publicationsData?.length === 0 
                  ? 'There are currently no publications to display.'
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
            {filteredPublications.map((publication, index) => (
              <PublicationCard
                key={publication.id || publication._id || index}
                publication={publication}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Publications;