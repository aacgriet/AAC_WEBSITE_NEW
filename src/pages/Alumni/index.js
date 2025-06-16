// ============= ALUMNI PAGE =============
// src/pages/Alumni/index.js - Modern Premium UI Version
import React, { useState } from 'react';
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
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={alumni.Image || alumni.image || '/images/placeholder-avatar.jpg'}
          alt={alumni.Name || alumni.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 text-center relative z-10">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {alumni.Name || alumni.name}
        </h3>
        {(alumni.Designation || alumni.designation) && (
          <p className="text-sm text-blue-400 mb-1">{alumni.Designation || alumni.designation}</p>
        )}
        {(alumni.Company || alumni.company) && (
          <p className="text-sm text-gray-400 mb-2">{alumni.Company || alumni.company}</p>
        )}
        {alumni.graduationYear && (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 mb-2 inline-block">
            Class of {alumni.graduationYear}
          </span>
        )}
        {alumni.department && (
          <p className="text-xs text-gray-500 mt-1">{alumni.department}</p>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Extract departments for filtering
  const departments = ["All", ...new Set(alumniData.map(alumni => alumni.department).filter(Boolean))];

  // Filter alumni based on search and department
  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = (alumni.Name || alumni.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (alumni.Company || alumni.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (alumni.Designation || alumni.designation || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "All" || alumni.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
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
            <p className="text-xl text-gray-400">Loading alumni...</p>
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
            <h3 className="text-3xl font-bold text-white mb-4">Error Loading Alumni</h3>
            <p className="text-red-400 text-lg">{error.message}</p>
          </div>
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
            <span className="text-sm font-medium">Alumni Network</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Our Distinguished
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Alumni
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Celebrating the achievements of AAC graduates who continue to innovate and lead in their respective fields
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
        {/* Filter controls - only show if there are alumni */}
        {alumniData.length > 0 && (
          <div className="mb-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                    Search Alumni
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name, company, or designation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
                  />
                </div>
                
                {/* Department filter */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-3">
                    Filter by Department
                  </label>
                  <select
                    id="department"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                  >
                    {departments.map(department => (
                      <option key={department} value={department} className="bg-slate-800 text-white">
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        {alumniData.length > 0 && (
          <div className="mb-8">
            <p className="text-lg text-gray-400">
              Showing <span className="text-white font-medium">{filteredAlumni.length}</span> of <span className="text-white font-medium">{alumniData.length}</span> alumni
            </p>
          </div>
        )}
        
        {filteredAlumni.length === 0 && alumniData.length > 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No alumni found</h3>
            <p className="text-gray-400 text-lg">Try adjusting your search filters</p>
          </div>
        ) : alumniData.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">🎓</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Alumni Data Available</h3>
            <p className="text-gray-400 text-lg">
              Alumni information will be displayed here once data is available.
            </p>
          </div>
        ) : (
          <>
            {/* Centered Alumni Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-24"
            >
              <AlumniGrid alumni={filteredAlumni} />
            </motion.div>

            {/* Alumni Network Info Section - Below Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Title Section */}
                <div className="lg:w-1/3">
                  <div className="text-center lg:text-left">
                    {/* Animated gradient line */}
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Alumni Network
                      </span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-6">
                      Our graduates have gone on to work at top companies, start successful ventures, 
                      and pursue advanced research. They continue to be ambassadors of excellence and innovation.
                    </p>
                    
                    <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
                      {filteredAlumni.length} Alumni Featured
                    </div>
                    
                    {/* Decorative dots */}
                    <div className="hidden lg:block mt-8">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Industry Leaders",
                        description: "Our alumni hold leadership positions at Fortune 500 companies, driving innovation and technological advancement across various industries.",
                        icon: "🏢",
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        title: "Successful Entrepreneurs", 
                        description: "Many graduates have founded successful startups and companies, creating jobs and contributing to economic growth in the tech ecosystem.",
                        icon: "🚀",
                        color: "from-purple-500 to-purple-600"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                      >
                        {/* Gradient overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                        
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Alumni