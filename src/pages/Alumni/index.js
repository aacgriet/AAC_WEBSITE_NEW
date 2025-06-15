// src/pages/Alumni/index.js - Complete version
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const AlumniCard = ({ alumni }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full border border-gray-700"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={alumni.Image || alumni.image || '/images/placeholder-avatar.jpg'}
          alt={alumni.Name || alumni.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-white mb-1">{alumni.Name || alumni.name}</h3>
        {(alumni.Designation || alumni.designation) && (
          <p className="text-sm text-blue-400">{alumni.Designation || alumni.designation}</p>
        )}
        {(alumni.Company || alumni.company) && (
          <p className="text-sm text-gray-400">{alumni.Company || alumni.company}</p>
        )}
        {alumni.graduationYear && (
          <p className="text-xs text-gray-500 mt-1">Class of {alumni.graduationYear}</p>
        )}
        {alumni.department && (
          <p className="text-xs text-gray-500">{alumni.department}</p>
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
          key={item.Id || item.id}
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
  // Use admin data instead of hardcoded data
  const { data: alumniData, loading, error } = useLocalStorage(STORAGE_KEYS.ALUMNI);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading alumni...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">Error loading alumni: {error.message}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Alumni | AAC - Advanced Academic Center</title>
        <meta name="description" content="Meet the alumni of Advanced Academic Center who have gone on to make significant contributions in their respective fields." />
      </Head>
      
      <PageHero 
        title="Our Distinguished Alumni" 
        subtitle="Celebrating the achievements of AAC graduates who continue to innovate and lead in their respective fields"
        tag="Alumni Network"
      />
      
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {alumniData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Alumni Data Available</h3>
              <p className="text-gray-400 mb-8">
                Alumni information will be displayed here once data is available.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Our Alumni Network
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Our graduates have gone on to work at top companies, start successful ventures, 
                  and pursue advanced research. They continue to be ambassadors of excellence and innovation.
                </p>
                <div className="mt-6">
                  <span className="inline-block px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
                    {alumniData.length} Alumni Featured
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AlumniGrid alumni={alumniData} />
              </motion.div>

              {/* Call to Action Section */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 text-center border border-blue-700/30"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Are You an AAC Alumni?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  We'd love to feature your success story! Connect with us to be part of our alumni showcase 
                  and inspire current students with your journey.
                </p>
                <a
                  href="mailto:aacgriet.org@gmail.com"
                  className="inline-block px-8 py-3 bg-blue-900 text-blue-300 rounded-full hover:bg-blue-800 transition-colors border border-blue-700"
                >
                  Get in Touch
                </a>
              </motion.div> */}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Alumni;