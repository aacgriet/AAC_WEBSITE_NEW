// src/pages/Alumni/index.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';

// Import alumni data - assuming it's in the path below
// You'll need to adjust the import path to match your actual data file location
import Data from '@/components/Data/Alumniaac';

const AlumniCard = ({ alumni }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full border border-gray-700"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={alumni.Image || '/images/placeholder-avatar.jpg'}
          alt={alumni.Name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-white mb-1">{alumni.Name}</h3>
        {alumni.Designation && (
          <p className="text-sm text-blue-400">{alumni.Designation}</p>
        )}
        {alumni.Company && (
          <p className="text-sm text-gray-400">{alumni.Company}</p>
        )}
      </div>
    </motion.div>
  );
};

const AlumniGrid = ({ alumni }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {alumni.map((item) => (
        <motion.div
          key={item.Id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AlumniCard alumni={item} />
        </motion.div>
      ))}
    </div>
  );
};

const Alumni = () => {
  return (
    <Layout>
      <Head>
        <title>Alumni | AAC - Advanced Academic Center</title>
        <meta name="description" content="Meet the alumni of Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="Alumni Network" 
        subtitle="Meet our distinguished alumni who are making an impact in their respective fields"
        tag="Our Network"
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Alumni Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl overflow-hidden border border-blue-700/50"
          >
            <div className="py-12 px-6 md:px-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Alumni Impact</h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Our alumni continue to contribute to AAC through mentorship, guest lectures, and collaboration opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "200+", label: "Alumni Network" },
                  { number: "45+", label: "Industry Mentors" },
                  { number: "25+", label: "Countries Worldwide" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
                  >
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Alumni Grid */}
          <AlumniGrid alumni={Data} />
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-[#1a2535] rounded-2xl px-6 py-12 shadow-xl border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-4">Are You an AAC Alumnus?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Connect with current students, share your experiences, and stay updated with the latest developments at AAC.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full font-medium hover:from-blue-800 hover:to-indigo-800 transition-colors border border-blue-700/50">
                Join Alumni Network
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Alumni;