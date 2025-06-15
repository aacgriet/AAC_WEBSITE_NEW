// src/pages/News/index.js - Clean version without debug info
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

  // Normalize the news data structure
  const normalizedNewsData = useMemo(() => {
    if (!Array.isArray(newsData)) {
      return [];
    }

    return newsData.map(news => {
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

      return normalizedNews;
    });
  }, [newsData]);

  // Get unique categories
  const categories = useMemo(() => {
    const allCategories = ['All'];
    normalizedNewsData.forEach(news => {
      const category = news.categories;
      if (category && !allCategories.includes(category)) {
        allCategories.push(category);
      }
    });
    return allCategories;
  }, [normalizedNewsData]);

  // Filter and sort news
  const filteredAndSortedNews = useMemo(() => {
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
                    <h3 className="text-2xl font-semibold text-white mb-4">No News Available</h3>
                    <p className="text-gray-400 mb-8">
                      News articles will appear here once they are published. Check back soon for updates!
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">No Results Found</h3>
                    <p className="text-gray-400 mb-8">
                      Try adjusting your search terms or filters to find what you're looking for.
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