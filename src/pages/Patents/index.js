// src/pages/Patents/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';

const patentsData = [
  {
    id: "aed",
    title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
    inventors: [
      "Yelma Chethan Reddy",
      "Alence Abhinay",
      "B.S.V.S Anoop",
      "M Srikanth",
      "D.Naga pavan",
      "G Pradeep Reddy"
    ],
    patentOffice: "India",
    date: "21 JAN 2019",
    applicationNumber: "201941002559",
    status: "Published Online",
    image: "/images/patents/aed.jpg", // Replace with actual image path
    shortTitle: "Automated Pill Reminder Device",
    category: "Healthcare",
    color: "purple",
    description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule. The device includes multiple pill compartments that can be customized and provides two-way confirmation to ensure medications are taken properly. It's especially useful for elderly patients or those with complex medication regimens."
  },
  {
    id: "smartglove",
    title: "A SMART GLOVE FOR RECOGNIZING AND COMMUNICATING SIGN LANGUAGE AND ASSOCIATED METHOD THEREOF.",
    inventors: [
      "Jashwanth Kranthi Bopanna",
      "Santosh Sanjeev",
      "Bharath Varma Kantheti",
      "Gowtham Sai Ponnekanti",
      "Suhas Gangireddy",
      "G Pradeep Reddy"
    ],
    patentOffice: "India",
    date: "03 SEP 2020",
    applicationNumber: "202041038106",
    status: "Published Online",
    image: "/images/patents/smartglove.jpg", // Replace with actual image path
    shortTitle: "Smart Glove for Sign Language",
    category: "Assistive Technology",
    color: "blue",
    description: "This patent describes a wearable technology in the form of a glove that can recognize sign language gestures and translate them into text or speech. The smart glove uses sensors to detect hand movements and positions, enabling real-time communication for individuals who use sign language. This innovation aims to bridge communication gaps between sign language users and those who don't understand sign language."
  }
];

// Fallback images if path doesn't exist
const fallbackImages = {
  "aed": "https://res.cloudinary.com/aacgriet/image/upload/v1668795374/AAC-web/publications/health_yrxzq6.jpg",
  "smartglove": "https://res.cloudinary.com/aacgriet/image/upload/v1668795373/AAC-web/publications/morse_yy2n4d.jpg"
};

const PatentCard = ({ patent, onView }) => {
  const gradientColors = {
    "blue": "from-blue-600 to-indigo-700",
    "purple": "from-purple-600 to-pink-600",
  };
  
  const gradientClass = gradientColors[patent.color] || "from-blue-600 to-indigo-700";
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full"
    >
      <div className={`bg-gradient-to-r ${gradientClass} p-8 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
            {patent.category}
          </span>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
            {new Date(patent.date).getFullYear()}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-3">{patent.shortTitle}</h3>
        <p className="text-sm text-white/80 line-clamp-2">
          {patent.description}
        </p>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-gray-700 font-medium mb-4">Key Inventors:</h4>
        <div className="flex flex-wrap gap-2 mb-6">
          {patent.inventors.slice(0, 3).map((inventor, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {inventor.split(',')[0]}
            </span>
          ))}
          {patent.inventors.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              +{patent.inventors.length - 3} more
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Patent Application:</span> {patent.applicationNumber}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Status:</span> {patent.status}
        </div>
        
        <button
          onClick={() => onView(patent.id)}
          className="mt-auto py-2 px-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow hover:from-gray-900 hover:to-black transition-all duration-300 w-full"
        >
          View Patent Details
        </button>
      </div>
    </motion.div>
  );
};

const PatentDetailModal = ({ patent, onClose }) => {
  const gradientColors = {
    "blue": "from-blue-600 to-indigo-700",
    "purple": "from-purple-600 to-pink-600",
  };
  
  const gradientClass = gradientColors[patent.color] || "from-blue-600 to-indigo-700";
  
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
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
            <h3 className="text-xl font-bold mb-4 text-gray-800">Full Patent Title</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {patent.title}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Inventors</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <ul className="list-disc list-inside space-y-2">
                  {patent.inventors.map((inventor, idx) => (
                    <li key={idx} className="text-gray-700">{inventor}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Patent Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-600 font-medium w-36">Patent Office:</span>
                    <span className="text-gray-700">{patent.patentOffice}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 font-medium w-36">Application No:</span>
                    <span className="text-gray-700">{patent.applicationNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 font-medium w-36">Filed Date:</span>
                    <span className="text-gray-700">{patent.date}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 font-medium w-36">Status:</span>
                    <span className="text-gray-700">{patent.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {patent.description}
            </p>
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
            <button
              onClick={onClose}
              className="py-2 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <a
              href={`https://ipindiaservices.gov.in/PublicSearch/PublicationSearch/PatentDetails?ApplicationNumber=${patent.applicationNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-colors"
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
  const [selectedPatent, setSelectedPatent] = useState(null);
  
  const handleViewPatent = (id) => {
    const patent = patentsData.find(p => p.id === id);
    setSelectedPatent(patent);
  };
  
  const handleCloseModal = () => {
    setSelectedPatent(null);
  };
  
  return (
    <Layout>
      <Head>
        <title>Patents | AAC - Advanced Academic Center</title>
        <meta name="description" content="Patents filed by Advanced Academic Center at GRIET" />
      </Head>
      
      <div className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              Innovation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Patents
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the innovative technologies developed and patented by our students and faculty.
            </p>
          </motion.div>
          
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
          
          {/* Innovation process section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Patent Process</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From idea conception to patent filing, we guide our innovators through every step of the process.
              </p>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-1"></div>
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
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {process.step}
                      </div>
                      <div className="bg-gray-50 p-6 pt-12 rounded-lg border border-gray-100 h-full">
                        <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                        <p className="text-gray-600">{process.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl px-6 py-12 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Have an Innovative Idea?</h2>
              <p className="max-w-2xl mx-auto mb-8">
                We're always looking for the next big innovation. If you have an idea with potential, we can help you develop and patent it.
              </p>
              <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Submit Your Idea
              </button>
            </div>
          </motion.div>
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