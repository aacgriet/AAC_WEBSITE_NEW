// src/pages/Startups/index.js - Fixed to use admin data
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
  // Get the appropriate gradient colors based on startup color
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
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full flex flex-col border border-gray-700"
    >
      {/* Logo Section with Gradient Background */}
      <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${getGradientClass(startup.color)}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20">
            <Image 
              src={startup.logo} 
              alt={startup.name} 
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <span 
            className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#0e1421]/50 text-white border border-gray-700"
          >
            {startup.category}
          </span>
        </div>
      </div>
      
      {/* Startup Information */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-white">{startup.name}</h3>
        <p className="text-gray-300 mb-4 flex-grow line-clamp-3">{startup.description}</p>
        
        <div className="flex justify-end items-center mt-4">
          <button 
            onClick={() => onClick(startup)}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Learn More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StartupModal = ({ startup, onClose }) => {
  if (!startup) return null;

  // Get the appropriate gradient colors based on startup color
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1a2535] rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with logo */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r ${getGradientClass(startup.color)} border-b border-gray-700`}>
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
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#0e1421]/50 text-white border border-white/10">
                {startup.category}
              </span>
            </div>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="bg-[#0e1421]/70 hover:bg-[#0e1421] text-white p-2 rounded-full transition-colors border border-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Startup Image */}
        <div className={`w-full bg-[#0e1421] p-4`}>
          <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-lg">
            <Image 
              src={startup.image} 
              alt={startup.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-gray-700 pb-2">About</h3>
            <p className="text-gray-300 leading-relaxed">{startup.description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-gray-700 pb-2">Mission</h3>
            <div className="bg-[#0e1421] p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 leading-relaxed">{startup.mission}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className={`px-6 py-2 bg-gradient-to-r ${getGradientClass(startup.color)} text-white rounded-lg transition-colors border border-gray-700/50`}
            >
              Close
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
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Get all unique categories from startups
  const allCategories = getAllCategories(startupsData || []);
  
  // Filter startups based on selected category
  const filteredStartups = filterCategory === 'All' 
    ? startupsData 
    : startupsData.filter(startup => startup.category === filterCategory);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading startups...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">Error loading startups: {error.message}</div>
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
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Category filters - only show if there are startups */}
          {startupsData.length > 0 && (
            <div className="flex flex-wrap justify-center mb-12 gap-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                    filterCategory === category
                      ? 'bg-blue-900 text-blue-300 border border-blue-700'
                      : 'bg-[#1a2535] text-gray-300 hover:bg-blue-900/30 border border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          
          {/* Startup grid */}
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredStartups.map((startup) => (
                <StartupCard 
                  key={startup.id} 
                  startup={startup} 
                  onClick={setSelectedStartup}
                />
              ))}
            </div>
          ) : startupsData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Startups Added Yet
              </h3>
              <p className="text-gray-400 mb-6">
                Startup profiles will appear here once they are added through the admin panel.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Startups Found
              </h3>
              <p className="text-gray-400 mb-6">
                No startups match the selected category. Try selecting a different category.
              </p>
            </div>
          )}
          
          {/* Incubation CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl p-8 border border-blue-700/50"
          >
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Have a Startup Idea?</h2>
                <p className="text-blue-100 max-w-2xl">
                  Join our incubation program and get access to mentorship, funding, and resources to grow your startup. We support student entrepreneurs turn their innovative ideas into successful businesses.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="px-6 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#172E7C]/80 transition-colors border border-blue-700/30">
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div> */}
        </div>
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