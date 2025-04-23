// src/pages/News/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { FaCalendar, FaSearch, FaFilter } from 'react-icons/fa';
import PageHero from '@/components/PageHero';

// Mock data for development - replace with your actual data when Sanity is connected
const mockNewsData = [
  {
    _id: "news-1",
    title: "AAC Students Win National Hackathon",
    slug: "AAC team secures first place at the prestigious coding competition with their innovative healthcare solution.",
    publishedAt: "2025-03-15T10:00:00Z",
    categories: "ACHIEVEMENT",
    mainImage: {
      url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg"
    }
  },
  {
    _id: "news-2",
    title: "New Research Partnership with Microsoft",
    slug: "AAC announces collaboration with Microsoft on artificial intelligence research projects.",
    publishedAt: "2025-02-20T09:30:00Z",
    categories: "RESEARCH",
    mainImage: {
      url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg"
    }
  },
  {
    _id: "news-3",
    title: "Opulence 2025 Registration Now Open",
    slug: "Register now for AAC's flagship event featuring workshops, competitions, and renowned industry speakers.",
    publishedAt: "2025-04-01T12:00:00Z",
    categories: "EVENT",
    mainImage: {
      url: "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/zdcnmfzelmh4u20wyr1x.jpg"
    }
  },
  {
    _id: "news-4",
    title: "Important Changes to Summer Internship Program",
    slug: "Updates to the application process and new industry partners for this year's internships.",
    publishedAt: "2025-03-10T15:00:00Z",
    categories: "NOTICE",
    mainImage: {
      url: "https://res.cloudinary.com/aacgriet/image/upload/v1730825380/AAC-web/news_events/opulence2023/gor2ysygdbqylqjgqybv.jpg"
    }
  },
  {
    _id: "news-5",
    title: "AAC Website Redesign Launched",
    slug: "Explore the new features and modern design of our updated website.",
    publishedAt: "2025-01-15T11:00:00Z",
    categories: "UPDATE",
    mainImage: null
  },
  {
    _id: "news-6",
    title: "Student Research Published in International Journal",
    slug: "Third-year students' work on machine learning algorithm recognized by top-tier publication.",
    publishedAt: "2025-02-05T14:30:00Z",
    categories: "ACHIEVEMENT",
    mainImage: null
  }
];

// Extract all unique categories
const allCategories = ["All"];
mockNewsData.forEach(news => {
  if (news.categories && !allCategories.includes(news.categories)) {
    allCategories.push(news.categories);
  }
});

const News = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState(mockNewsData);
  const [sortOrder, setSortOrder] = useState("newest");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Filter and sort news based on category, search term, and sort order
  useEffect(() => {
    let filtered = [...mockNewsData];
    
    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(item => item.categories === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) || 
        (item.slug && item.slug.toLowerCase().includes(term))
      );
    }
    
    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredNews(filtered);
  }, [activeCategory, searchTerm, sortOrder]);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Function to generate a gradient based on category
  const getCategoryGradient = (category) => {
    if (!category) return 'from-blue-900 to-indigo-900';
    
    const categoryMap = {
      'NOTICE': 'from-orange-900 to-red-900',
      'ACHIEVEMENT': 'from-green-900 to-emerald-900',
      'EVENT': 'from-purple-900 to-indigo-900',
      'RESEARCH': 'from-blue-900 to-cyan-900',
      'UPDATE': 'from-indigo-900 to-blue-900',
    };
    
    return categoryMap[category.toUpperCase()] || 'from-blue-900 to-indigo-900';
  };
  
  return (
    <Layout>
      <Head>
        <title>News | AAC - Advanced Academic Center</title>
        <meta name="description" content="Latest news and updates from Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="News" 
        subtitle="Stay updated with the latest announcements, achievements, and events from the Advanced Academic Center"
        tag="Announcements & Updates"
        highlightTitle={true}
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Filter and Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a2535] rounded-xl shadow-lg overflow-hidden mb-12 border border-gray-700"
          >
            {/* Main Controls */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Search */}
                <div className="flex-grow">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-[#0e1421] text-white transition-colors"
                    />
                  </div>
                </div>
                
                {/* Sort Order Toggle */}
                <div>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-2 py-3 px-5 bg-[#0e1421] hover:bg-[#15202d] border border-gray-600 rounded-lg transition-colors text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortOrder === 'newest' 
                        ? "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" 
                        : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"} />
                    </svg>
                    <span className="text-gray-300">{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                  </button>
                </div>
                
                {/* Filter Toggle */}
                <div>
                  <button
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                    className="flex items-center gap-2 py-3 px-5 bg-[#0e1421] hover:bg-[#15202d] border border-gray-600 rounded-lg transition-colors text-white"
                  >
                    <FaFilter className="text-gray-400" />
                    <span className="text-gray-300">Filter</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expanded Filter Section */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isFilterExpanded ? 'auto' : 0,
                opacity: isFilterExpanded ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-700"
            >
              <div className="p-6 bg-[#0e1421]">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-900 text-blue-300 border border-blue-700'
                          : 'bg-[#1a2535] text-gray-300 border border-gray-700 hover:bg-[#172E7C]/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* News Grid */}
          {filteredNews.length > 0 ? (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            >
              {filteredNews.map((newsItem, index) => (
                <motion.div 
                  key={newsItem._id}
                  variants={item}
                  transition={{ delay: index * 0.05 }}
                  className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg bg-[#1a2535] hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                >
                  {/* Card Header with Image or Gradient */}
                  <div className="relative h-48">
                    {newsItem.mainImage ? (
                      <Image
                        src={newsItem.mainImage.url}
                        alt={newsItem.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(newsItem.categories)}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Image 
                              src="/images/logo.png" 
                              alt="AAC Logo" 
                              width={32} 
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    {newsItem.categories && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#0e1421]/80 backdrop-blur-sm text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">
                          {newsItem.categories}
                        </span>
                      </div>
                    )}
                    
                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <div className="bg-[#0e1421]/80 backdrop-blur-sm text-blue-300 text-xs font-medium px-3 py-1 rounded-full flex items-center border border-gray-700">
                        <FaCalendar className="mr-1" />
                        <span>
                          {new Date(newsItem.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <Link href={`/News/${newsItem._id}`}>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-400 transition-colors text-white">
                        {newsItem.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-300 mb-4 flex-grow line-clamp-3">
                      {newsItem.slug || "Latest news from Advanced Academic Center"}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <Link 
                        href={`/News/${newsItem._id}`}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-[#1a2535] backdrop-blur-sm rounded-xl p-10 max-w-xl mx-auto border border-gray-700">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-700/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">No News Found</h3>
                <p className="text-gray-300 mb-6">No news articles match your current filters.</p>
                <button 
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchTerm("");
                  }}
                  className="px-6 py-2 bg-blue-900 text-blue-300 rounded-full hover:bg-blue-800 transition-colors border border-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Newsletter Subscription */}
          <div className="mt-24 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl overflow-hidden border border-blue-700/50">
            <div className="px-6 py-12 md:p-12">
              <div className="md:flex justify-between items-center">
                <div className="mb-8 md:mb-0 md:max-w-lg">
                  <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
                  <p className="text-blue-100">
                    Subscribe to our newsletter to receive the latest news and updates from the Advanced Academic Center.
                  </p>
                </div>
                <div>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-3 rounded-l-lg focus:outline-none bg-[#0e1421] text-white border border-blue-700 border-r-0"
                    />
                    <button className="bg-[#0e1421] hover:bg-[#172E7C]/80 text-white px-6 rounded-r-lg transition-colors border border-blue-700 border-l-0">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;