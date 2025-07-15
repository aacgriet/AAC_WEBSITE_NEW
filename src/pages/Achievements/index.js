

// src/pages/Achievements/index.js - Combined Modern Premium UI with Database Functionality
import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaTag, FaArrowRight } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { useDatabase } from '@/hooks/useDatabase';

const AchievementsCard = ({ achievements, index }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/400x200/1a2535/ffffff?text=News';
    if (typeof image === 'string') return image;
    if (image.asset?.url) return image.asset.url;
    return 'https://via.placeholder.com/400x200/1a2535/ffffff?text=News';
  };

  const getExcerpt = (achievements) => {
    if (achievements.slug?.current) return achievements.slug.current.substring(0, 120) + '...';
    if (achievements._rawBody) return achievements._rawBody.substring(0, 120) + '...';
    if (achievements.content) return achievements.content.substring(0, 120) + '...';
    return 'Click to read more about this achievements article.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* News Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={getImageUrl(achievements.mainImage)}
          alt={achievements.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-medium border border-emerald-500/30 backdrop-blur-sm">
            {achievements.categories || 'Achievements'}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-2 py-1 backdrop-blur-sm bg-black/40 text-white rounded-lg text-xs">
            <FaCalendar />
            <span>{formatDate(achievements.publishedAt || achievements._createdAt)}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2">
          {achievements.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
          {getExcerpt(achievements)}
        </p>
        
        {/* Action Button */}
        <Link
          href={`/Achievements/${achievements._id || achievements.id}`}
          className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mt-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Read More
            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </motion.div>
  );
};

const AchievementsPage = () => {
  const { data: achievementsData, loading, error } = useDatabase('achievements');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Normalize the achievements data structure
  const normalizedAchievementsData = useMemo(() => {
    if (!achievementsData || !Array.isArray(achievementsData)) return [];

    return achievementsData.map((achievements, index) => ({
      _id: achievements._id || achievements.id || `achievements-${Date.now()}-${Math.random()}`,
      title: achievements.title || 'Untitled Achievements',
      slug: achievements.slug || { current: achievements.description || '' },
      publishedAt: achievements.publishedAt || achievements.date || achievements.createdAt || achievements._createdAt || new Date().toISOString(),
      categories: achievements.categories || achievements.category || 'achievements',
      mainImage: achievements.mainImage || { asset: { url: achievements.image || null } },
      body: achievements.body || [],
      _rawBody: achievements._rawBody || achievements.content || '',
      links: achievements.links || [],
      status: achievements.status || 'published',
      ...achievements
    }));
  }, [achievementsData]);

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = ['All'];
    normalizedAchievementsData.forEach(achievements => {
      const category = achievements.categories;
      if (category && !allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
    return allCategories;
  }, [normalizedAchievementsData]);

  // Filter and sort achievements
  const filteredAndSortedAchievements = useMemo(() => {
    let filtered = normalizedAchievementsData.filter(achievements => {
      const matchesSearch = achievements.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (achievements.slug?.current && achievements.slug.current.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || achievements.categories === activeCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return filtered;
  }, [normalizedAchievementsData, searchTerm, activeCategory, sortOrder]);

  // Loading state
  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Achievements | AAC - Advanced Academic Center</title>
          <meta name="description" content="Stay updated with the latest achievements, achievements, and announcements from Advanced Academic Center at GRIET." />
        </Head>
        
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-8 mx-auto w-16 h-16">
              <div className="w-16 h-16 border-4 border-white/10 border-t-emerald-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-xl text-gray-400">Loading achievements...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <Head>
          <title>Achievements | AAC - Advanced Academic Center</title>
        </Head>
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
            {/* Enhanced badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Error Loading</span>
            </div>
            
            {/* Title with gradient effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent">
               Achievements
              </span>{' '}
              
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
              Unable to load achievements at this time
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Unable to Load Achievements</h3>
            <p className="text-gray-400 text-lg mb-8">There was an error loading the achievements: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="group/btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Retry
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Achievements | AAC - Advanced Academic Center</title>
        <meta name="description" content="Stay updated with the latest achievements from Advanced Academic Center at GRIET." />
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
            <span className="text-sm font-medium">Achievements Center</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Achievements
            </span>{' '}
            
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Stay informed about our latest achievements
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
        {/* Filter Controls */}
        <div className="mb-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                  Search Achievements
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all duration-200"
                />
              </div>
              
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort filter */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-400 mb-3">
                  Sort by Date
                </label>
                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white transition-all duration-200"
                >
                  <option value="newest" className="bg-slate-800 text-white">Newest First</option>
                  <option value="oldest" className="bg-slate-800 text-white">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            Showing <span className="text-white font-medium">{filteredAndSortedAchievements.length}</span> of <span className="text-white font-medium">{normalizedAchievementsData.length}</span> articles
          </p>
        </div>

        {/* achievements Grid or Empty State */}
        {filteredAndSortedAchievements.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">
                {normalizedAchievementsData.length === 0 ? '📰' : '🔍'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {normalizedAchievementsData.length === 0 ? 'No Achievements Articles Yet' : 'No Results Found'}
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              {normalizedAchievementsData.length === 0 
                ? 'Achievements articles will be displayed here once they are added.' 
                : `Found ${normalizedAchievementsData.length} articles, but none match your current filters.`}
            </p>
            {normalizedAchievementsData.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="group/btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Clear Filters
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
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
                  delayChildren: 0.3
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAndSortedAchievements.map((achievements, index) => (
              <AchievementsCard key={achievements._id} achievements={achievements} index={index} />
            ))}
          </motion.div>
        )}

        {/* Statistics */}
        {normalizedAchievementsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-24"
          >
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Title Section */}
              <div className="lg:w-1/3">
                <div className="text-center lg:text-left">
                  {/* Animated gradient line */}
                  <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Achievements
                    </span>
                  </h2>
                  
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    Stay informed with our latest achievements
                  </p>
                  
                  {/* Decorative dots */}
                  <div className="hidden lg:block mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-500"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="p-6 text-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-2xl">📰</span>
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {normalizedAchievementsData.length}
                      </div>
                      <div className="text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                        Total Achievements
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="p-6 text-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-2xl">🏷️</span>
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {categories.length - 1}
                      </div>
                      <div className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                        Categories
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    <div className="p-6 text-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <span className="text-2xl">🆕</span>
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {normalizedAchievementsData.filter(achievements => {
                          const publishDate = new Date(achievements.publishedAt);
                          const oneMonthAgo = new Date();
                          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                          return publishDate > oneMonthAgo;
                        }).length}
                      </div>
                      <div className="text-purple-300 group-hover:text-purple-200 transition-colors duration-300">
                        Recent Updates
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default AchievementsPage;