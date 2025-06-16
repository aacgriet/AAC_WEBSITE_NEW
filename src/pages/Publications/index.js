// src/pages/Publications/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const PublicationCard = ({ publication, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(publication.id)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
      
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={publication.image || '/images/default-publication.jpg'}
          alt={publication.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Year badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
          {publication.year}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent h-20"></div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col relative z-10">
        {/* Category badge */}
        <div className="mb-4">
          <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
            {publication.category}
          </span>
        </div>
        
        {/* Title with gradient hover effect */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {publication.title}
        </h3>
        
        {/* Abstract */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors duration-300">
          {publication.abstract}
        </p>
        
        {/* Authors and Read More */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-4">
            {publication.authors && publication.authors.slice(0, 2).map((author, index) => (
              <span key={index} className="text-sm text-gray-400">
                {author.split(',')[0]}{index < Math.min(1, publication.authors.length - 1) ? ',' : ''}
                {publication.authors.length > 2 && index === 1 ? ' et al.' : ''}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <button className="group/btn flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
              Read More 
              <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PublicationDetail = ({ publication, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-60 w-full">
            <Image
              src={publication.image || '/images/default-publication.jpg'}
              alt={publication.title}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-t-2xl"></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 backdrop-blur-sm bg-white/10 text-white rounded-full p-2 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30">
                  {publication.category}
                </span>
                <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
                  {publication.year}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {publication.title}
              </h2>
            </div>
          </div>
          
          <div className="p-8">
            {/* Abstract section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Abstract
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">{publication.abstract}</p>
            </div>
            
            {/* Authors section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Authors
              </h3>
              <div className="space-y-2">
                {publication.authors && publication.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-400 text-lg">{author}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Publication section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Publication
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">{publication.publication}</p>
            </div>
            
            {/* Download button */}
            <div className="flex justify-end">
              <button 
                className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
                onClick={() => {
                  if (publication.downloadUrl) {
                    window.open(publication.downloadUrl, '_blank');
                  } else {
                    alert('PDF download not available');
                  }
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download PDF
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Publications = () => {
  const { data: publicationsData, loading } = useLocalStorage(STORAGE_KEYS.PUBLICATIONS);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublication, setSelectedPublication] = useState(null);
  
  // Extract categories and years for filtering
  const categories = ["All", ...new Set(publicationsData.map(pub => pub.category).filter(Boolean))];
  const years = ["All", ...new Set(publicationsData.map(pub => pub.year).filter(Boolean))];
  
  // Filter publications based on search, category, and year
  const filteredPublications = publicationsData.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (publication.authors && publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = categoryFilter === "All" || publication.category === categoryFilter;
    const matchesYear = yearFilter === "All" || publication.year === parseInt(yearFilter);
    
    return matchesSearch && matchesCategory && matchesYear;
  });
  
  const handleViewPublication = (id) => {
    const publication = publicationsData.find(p => p.id === id);
    setSelectedPublication(publication);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-xl text-gray-400">Loading publications...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Publications | AAC - Advanced Academic Center</title>
        <meta name="description" content="Academic publications from Advanced Academic Center at GRIET" />
      </Head>
      
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
            <span className="text-sm font-medium">Academic Research</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Research
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Publications
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Explore our research papers and academic contributions in various domains
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
        {/* Filter controls */}
        <div className="mb-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                  Search Publications
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title, abstract, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
                />
              </div>
              
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Year filter */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Year
                </label>
                <select
                  id="year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                >
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            Showing <span className="text-white font-medium">{filteredPublications.length}</span> of <span className="text-white font-medium">{publicationsData.length}</span> publications
          </p>
        </div>
        
        {/* Publications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPublications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              onClick={handleViewPublication}
            />
          ))}
          
          {filteredPublications.length === 0 && (
            <div className="col-span-3 py-20 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No publications found</h3>
              <p className="text-gray-400 text-lg">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Publication detail modal */}
      <AnimatePresence>
        {selectedPublication && (
          <PublicationDetail
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Publications;