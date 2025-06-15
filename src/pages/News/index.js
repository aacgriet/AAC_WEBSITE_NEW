// src/pages/News/index.js - DEBUG VERSION to see what's happening
import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import NewsCard from '@/components/News/NewsCard';
import NewsFilter from '@/components/News/NewsFilter';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NewsPage = () => {
  const { data: newsData, loading, error } = useLocalStorage(STORAGE_KEYS.NEWS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // DEBUG: Log everything
  // console.log('=== NEWS DEBUG INFO ===');
  // console.log('Storage key being used:', STORAGE_KEYS.NEWS);
  // console.log('Raw newsData:', newsData);
  // console.log('newsData type:', typeof newsData);
  // console.log('newsData length:', newsData?.length);
  // console.log('Loading state:', loading);
  // console.log('Error state:', error);
  
  // Check localStorage directly
  if (typeof window !== 'undefined') {
    const directData = localStorage.getItem(STORAGE_KEYS.NEWS);
    console.log('Direct localStorage data:', directData);
    if (directData) {
      try {
        const parsed = JSON.parse(directData);
        console.log('Parsed localStorage data:', parsed);
        console.log('Parsed data length:', parsed?.length);
      } catch (e) {
        console.log('Error parsing localStorage data:', e);
      }
    }
  }

  // Normalize the news data structure
  const normalizedNewsData = useMemo(() => {
    console.log('Normalizing data...');
    
    if (!newsData) {
      console.log('No newsData available');
      return [];
    }
    
    if (!Array.isArray(newsData)) {
      console.log('newsData is not an array:', typeof newsData);
      return [];
    }

    const normalized = newsData.map((news, index) => {
      console.log(`Processing news item ${index}:`, news);
      
      // Handle different data structures
      const normalizedNews = {
        _id: news._id || news.id || `news-${Date.now()}-${Math.random()}`,
        title: news.title || 'Untitled News',
        slug: news.slug || { current: news.description || '' },
        publishedAt: news.publishedAt || news.date || news.createdAt || new Date().toISOString(),
        categories: news.categories || news.category || 'news',
        mainImage: news.mainImage || { asset: { url: news.image || null } },
        body: news.body || [],
        _rawBody: news._rawBody || news.content || '',
        links: news.links || [],
        status: news.status || 'published',
        // Keep original data for fallback
        ...news
      };

      console.log(`Normalized news item ${index}:`, normalizedNews);
      return normalizedNews;
    });
    
    console.log('Final normalized data:', normalized);
    return normalized;
  }, [newsData]);

  // Get unique categories
  const categories = useMemo(() => {
    console.log('Computing categories...');
    const allCategories = ['All'];
    normalizedNewsData.forEach(news => {
      const category = news.categories;
      if (category && !allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
    console.log('Available categories:', allCategories);
    return allCategories;
  }, [normalizedNewsData]);

  // Filter and sort news
  const filteredAndSortedNews = useMemo(() => {
    console.log('Filtering and sorting...');
    let filtered = normalizedNewsData.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (news.slug?.current && news.slug.current.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || news.categories === activeCategory;
      
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

    console.log('Filtered and sorted news:', filtered);
    return filtered;
  }, [normalizedNewsData, searchTerm, activeCategory, sortOrder]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading news...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">Error loading news: {error.message}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>News & Updates | AAC - Advanced Academic Center</title>
        <meta name="description" content="Stay updated with the latest news, achievements, and announcements from Advanced Academic Center at GRIET." />
      </Head>
      
      <PageHero 
        title="Latest News & Updates" 
        subtitle="Stay informed about our latest achievements, events, and announcements"
        tag="News Center"
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* DEBUG INFO - Only show in development */}
          {/* <div className="mb-8 p-4 bg-gray-800 rounded-lg text-white text-sm">
            <h4 className="font-bold mb-2">🐛 DEBUG INFO:</h4>
            <p><strong>Storage Key:</strong> {STORAGE_KEYS.NEWS}</p>
            <p><strong>Raw Data Length:</strong> {newsData?.length || 0}</p>
            <p><strong>Normalized Data Length:</strong> {normalizedNewsData.length}</p>
            <p><strong>Filtered Data Length:</strong> {filteredAndSortedNews.length}</p>
            <p><strong>Categories Found:</strong> {categories.join(', ')}</p>
            <p><strong>Active Category:</strong> {activeCategory}</p>
            <p><strong>Search Term:</strong> "{searchTerm}"</p>
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
            
            {newsData && newsData.length > 0 && (
              <details className="mt-4">
                <summary className="cursor-pointer font-bold">📋 Raw Data Sample (First Item)</summary>
                <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(newsData[0], null, 2)}
                </pre>
              </details>
            )}
          </div> */}

          {/* Search and Filter Controls */}
          <NewsFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* News Grid */}
          <div className="mt-12">
            {filteredAndSortedNews.length === 0 ? (
              <div className="text-center py-16">
                {normalizedNewsData.length === 0 ? (
                  <>
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">No News Data Found</h3>
                    {/* <p className="text-gray-400 mb-8">
                      Check the debug info above to see what's happening with the data loading.
                    </p> */}
                    {/* <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 p-4 rounded-lg max-w-md mx-auto">
                      <p className="font-bold">Troubleshooting Steps:</p>
                      <ol className="text-left mt-2 text-sm">
                        <li>1. Check if data was imported correctly</li>
                        <li>2. Verify the storage key: {STORAGE_KEYS.NEWS}</li>
                        <li>3. Check browser localStorage in DevTools</li>
                        <li>4. Try refreshing the page</li>
                      </ol>
                    </div> */}
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">No Results Found</h3>
                    <p className="text-gray-400 mb-8">
                      Found {normalizedNewsData.length} articles, but none match your current filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('All');
                      }}
                      className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      Clear Filters
                    </button>
                  </>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredAndSortedNews.map((news, index) => (
                  <NewsCard key={news._id} news={news} index={index} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Statistics */}
          {normalizedNewsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 text-center border border-blue-700/30"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white">{normalizedNewsData.length}</div>
                  <div className="text-blue-300">Total Articles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{categories.length - 1}</div>
                  <div className="text-blue-300">Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {normalizedNewsData.filter(news => {
                      const publishDate = new Date(news.publishedAt);
                      const oneMonthAgo = new Date();
                      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                      return publishDate > oneMonthAgo;
                    }).length}
                  </div>
                  <div className="text-blue-300">Recent Updates</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;