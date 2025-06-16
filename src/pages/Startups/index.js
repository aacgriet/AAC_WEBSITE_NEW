// src/pages/Startups/index.js - Modern Premium UI Version
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

// Extract all unique categories for filtering
const getAllCategories = (startupsData) => {
  const allCategories = new Set(["All"]);
  
  startupsData.forEach(startup => {
    if (startup.category) {
      allCategories.add(startup.category);
    }
  });
  
  return Array.from(allCategories);
};

const StartupCard = ({ startup, onClick }) => {
  // Get the appropriate gradient colors based on startup color (UNCHANGED)
  const getGradientClass = (color) => {
    const colorMap = {
      "blue": "from-blue-900 to-indigo-900",
      "purple": "from-purple-900 to-indigo-900",
      "orange": "from-orange-900 to-amber-900",
      "green": "from-green-900 to-emerald-900"
    };
    return colorMap[color] || "from-blue-900 to-indigo-900";
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Logo Section with Gradient Background (UNCHANGED GRADIENTS) */}
      <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${getGradientClass(startup.color)}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Image 
              src={startup.logo} 
              alt={startup.name} 
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
            {startup.category}
          </span>
        </div>
      </div>
      
      {/* Startup Information */}
      <div className="p-6 flex-grow flex flex-col relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {startup.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {startup.description}
        </p>
        
        <div className="flex justify-end items-center mt-4">
          <button 
            onClick={() => onClick(startup)}
            className="group/btn flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Learn More
            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StartupModal = ({ startup, onClose }) => {
  if (!startup) return null;

  // Get the appropriate gradient colors based on startup color (UNCHANGED)
  const getGradientClass = (color) => {
    const colorMap = {
      "blue": "from-blue-900 to-indigo-900",
      "purple": "from-purple-900 to-indigo-900",
      "orange": "from-orange-900 to-amber-900",
      "green": "from-green-900 to-emerald-900"
    };
    return colorMap[color] || "from-blue-900 to-indigo-900";
  };

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
        className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with logo (UNCHANGED GRADIENTS) */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-r ${getGradientClass(startup.color)} border-b border-white/20`}>
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 mr-4">
              <Image 
                src={startup.logo} 
                alt={`${startup.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{startup.name}</h2>
              <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm">
                {startup.category}
              </span>
            </div>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Startup Image */}
        <div className="w-full backdrop-blur-sm bg-white/5 p-6">
          <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-2xl border border-white/10">
            <Image 
              src={startup.image} 
              alt={startup.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="p-8">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              About
            </h3>
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-gray-300 text-lg leading-relaxed">{startup.description}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Mission
            </h3>
            <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-gray-300 text-lg leading-relaxed">{startup.mission}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className={`group/btn px-6 py-3 bg-gradient-to-r ${getGradientClass(startup.color)} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Close
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Startups = () => {
  // Use admin data instead of hardcoded data
  const { data: startupsData, loading, error } = useLocalStorage(STORAGE_KEYS.STARTUPS);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all unique categories from startups
  const categories = ["All", ...new Set(startupsData.map(startup => startup.category).filter(Boolean))];
  
  // Filter startups based on search and category
  const filteredStartups = startupsData.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (startup.mission && startup.mission.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'All' || startup.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-xl text-gray-400">Loading startups...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Error Loading Startups</h3>
            <p className="text-red-400 text-lg">{error.message}</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Startups | AAC - Advanced Academic Center</title>
        <meta name="description" content="Startups incubated at Advanced Academic Center, GRIET" />
      </Head>
      
      <PageHero 
        title="Startup Ecosystem" 
        subtitle="Discover innovative startups and student ventures emerging from our incubation program"
        tag="Innovation"
      />
      
      <div className="container mx-auto px-4 pb-24">
        {/* Filter controls - only show if there are startups */}
        {startupsData.length > 0 && (
          <div className="mb-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                    Search Startups
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name, description, or mission..."
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
              </div>
            </div>
          </div>
        )}
        
        {/* Results count */}
        {startupsData.length > 0 && (
          <div className="mb-8">
            <p className="text-lg text-gray-400">
              Showing <span className="text-white font-medium">{filteredStartups.length}</span> of <span className="text-white font-medium">{startupsData.length}</span> startups
            </p>
          </div>
        )}
        
        {/* Startup grid */}
        {filteredStartups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StartupCard 
                  startup={startup} 
                  onClick={setSelectedStartup}
                />
              </motion.div>
            ))}
          </div>
        ) : startupsData.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">🏢</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Startups Added Yet</h3>
            <p className="text-gray-400 text-lg">
              Startup profiles will appear here once they are added through the admin panel.
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Startups Found</h3>
            <p className="text-gray-400 text-lg">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
      
      {/* Startup detail modal */}
      <AnimatePresence>
        {selectedStartup && (
          <StartupModal 
            startup={selectedStartup} 
            onClose={() => setSelectedStartup(null)} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Startups;