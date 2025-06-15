// src/pages/Patents/index.js - YOUR EXACT CODE with admin data integration
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

// No fallback data - only use admin data

// Fallback images if path doesn't exist
const fallbackImages = {
  "aed": "https://res.cloudinary.com/aacgriet/image/upload/v1668795374/AAC-web/publications/health_yrxzq6.jpg",
  "smartglove": "https://res.cloudinary.com/aacgriet/image/upload/v1668795373/AAC-web/publications/morse_yy2n4d.jpg"
};

// Function to convert admin data format to your format
const convertAdminDataToYourFormat = (adminPatent) => {
  return {
    id: adminPatent.id,
    title: adminPatent.title,
    inventors: adminPatent.inventors || [],
    patentOffice: adminPatent.patentOffice,
    // Convert date from ISO string to your format
    date: adminPatent.date ? new Date(adminPatent.date).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).toUpperCase() : '',
    applicationNumber: adminPatent.applicationNumber,
    status: adminPatent.status,
    image: adminPatent.image || fallbackImages[adminPatent.id] || "/images/patents/default.jpg",
    shortTitle: adminPatent.shortTitle,
    category: adminPatent.category,
    color: adminPatent.color || "purple",
    description: adminPatent.description
  };
};

const PatentCard = ({ patent, onView }) => {
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-800",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-green-900 to-emerald-800",
    "red": "from-red-900 to-pink-800",
    "orange": "from-orange-900 to-red-800",
  };
  
  const gradientClass = gradientColors[patent.color] || "from-blue-900 to-indigo-800";
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden flex flex-col h-full border border-gray-700"
    >
      <div className={`bg-gradient-to-r ${gradientClass} p-8 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
            {patent.category}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
            {patent.date ? new Date(patent.date).getFullYear() : new Date().getFullYear()}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{patent.shortTitle}</h3>
        <p className="text-sm text-white/80 line-clamp-2">
          {patent.description}
        </p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-gray-300 font-medium mb-4">Key Inventors:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {patent.inventors.slice(0, 3).map((inventor, idx) => (
            <span key={idx} className="bg-[#0e1421] text-gray-300 border border-gray-700 text-xs px-2 py-1 rounded">
              {inventor.split(',')[0]}
            </span>
          ))}
          {patent.inventors.length > 3 && (
            <span className="bg-[#0e1421] text-gray-300 border border-gray-700 text-xs px-2 py-1 rounded">
              +{patent.inventors.length - 3} more
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-400 mb-2">
          <span className="font-semibold">Patent Application:</span> {patent.applicationNumber}
        </div>
        <div className="text-sm text-gray-400 mb-4">
          <span className="font-semibold">Status:</span> {patent.status}
        </div>
        
        <button
          onClick={() => onView(patent.id)}
          className="mt-auto py-2 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 w-full border border-blue-700"
        >
          View Patent Details
        </button>
      </div>
    </motion.div>
  );
};

const PatentDetailModal = ({ patent, onClose }) => {
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-800",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-green-900 to-emerald-800",
    "red": "from-red-900 to-pink-800",
    "orange": "from-orange-900 to-red-800",
  };
  
  const gradientClass = gradientColors[patent.color] || "from-blue-900 to-indigo-800";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
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
        <div className={`bg-gradient-to-r ${gradientClass} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="text-white">
            <div className="flex justify-between items-start mb-6">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                {patent.category}
              </span>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                Filed: {patent.date}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{patent.shortTitle}</h2>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-300">Full Patent Title</h3>
            <p className="text-gray-300 bg-[#0e1421] p-4 rounded-lg border border-gray-700">
              {patent.title}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">Inventors</h3>
              <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-700">
                <ul className="list-disc list-inside space-y-2">
                  {patent.inventors.map((inventor, idx) => (
                    <li key={idx} className="text-gray-300">{inventor}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-300">Patent Information</h3>
              <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-700">
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-400 font-medium w-36">Patent Office:</span>
                    <span className="text-gray-300">{patent.patentOffice}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 font-medium w-36">Application No:</span>
                    <span className="text-gray-300">{patent.applicationNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 font-medium w-36">Filed Date:</span>
                    <span className="text-gray-300">{patent.date}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 font-medium w-36">Status:</span>
                    <span className="text-gray-300">{patent.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-blue-300">Description</h3>
            <p className="text-gray-300 bg-[#0e1421] p-4 rounded-lg border border-gray-700">
              {patent.description}
            </p>
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
            <button
              onClick={onClose}
              className="py-2 px-6 border border-gray-600 text-gray-300 bg-[#0e1421] rounded-lg hover:bg-[#15202d] transition-colors"
            >
              Close
            </button>
            <a
              href={`https://ipindiaservices.gov.in/PublicSearch/PublicationSearch/PatentDetails?ApplicationNumber=${patent.applicationNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg hover:from-blue-800 hover:to-indigo-800 transition-colors border border-blue-700"
            >
              View Official Patent
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Patents = () => {
  const { data: adminPatentsData, loading } = useLocalStorage(STORAGE_KEYS.PATENTS);
  const [selectedPatent, setSelectedPatent] = useState(null);
  
  // Only use admin data - no fallback
  const patentsData = adminPatentsData.map(convertAdminDataToYourFormat);
  
  const handleViewPatent = (id) => {
    const patent = patentsData.find(p => p.id === id);
    setSelectedPatent(patent);
  };
  
  const handleCloseModal = () => {
    setSelectedPatent(null);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading patents...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Patents | AAC - Advanced Academic Center</title>
        <meta name="description" content="Patents filed by Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="Our Patents" 
        subtitle="Discover the innovative technologies developed and patented by our students and faculty"
        tag="Innovation"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {patentsData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-bold text-white mb-4">No Patents Available</h3>
              <p className="text-gray-400">Add patents through the admin panel to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {patentsData.map((patent) => (
                <motion.div
                  key={patent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <PatentCard
                    patent={patent}
                    onView={handleViewPatent}
                  />
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Innovation process section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Patent Process</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                From idea conception to patent filing, we guide our innovators through every step of the process.
              </p>
            </div>
            
            <div className="bg-[#1a2535] rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-1"></div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { 
                      step: "01", 
                      title: "Idea Generation", 
                      description: "Our students and faculty brainstorm innovative solutions to real-world problems."
                    },
                    { 
                      step: "02", 
                      title: "Prototype Development", 
                      description: "We build working models and test the viability of our innovative solutions."
                    },
                    { 
                      step: "03", 
                      title: "Patent Filing", 
                      description: "Our legal team helps prepare and submit patent applications to protect intellectual property."
                    }
                  ].map((process, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold border border-blue-700">
                        {process.step}
                      </div>
                      <div className="bg-[#0e1421] p-6 pt-12 rounded-lg border border-gray-700 h-full">
                        <h3 className="text-xl font-bold mb-2 text-white">{process.title}</h3>
                        <p className="text-gray-300">{process.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl px-6 py-12 shadow-xl border border-blue-700/50">
              <h2 className="text-3xl font-bold mb-4">Have an Innovative Idea?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-blue-100">
                We're always looking for the next big innovation. If you have an idea with potential, we can help you develop and patent it.
              </p>
              <button className="px-8 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#15202d] transition-colors border border-white/10">
                Submit Your Idea
              </button>
            </div>
          </motion.div> */}
        </div>
      </div>
      
      {/* Patent Detail Modal */}
      <AnimatePresence>
        {selectedPatent && (
          <PatentDetailModal
            patent={selectedPatent}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Patents;