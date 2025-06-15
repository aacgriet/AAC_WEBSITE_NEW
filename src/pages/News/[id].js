// src/pages/News/[id].js - Update the getItemById function call

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: newsData } = useLocalStorage(STORAGE_KEYS.NEWS);
  
  // Find the news item by either id or _id
  const newsItem = newsData.find(item => 
    item.id === id || item._id === id
  );
  
  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (!newsItem) {
    return (
      <Layout>
        <Head>
          <title>News Not Found | AAC</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">News Not Found</h1>
            <p className="text-gray-400 mb-8">The news article you're looking for doesn't exist.</p>
            <Link href="/News" className="text-blue-400 hover:text-blue-300">
              ← Back to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Get description from slug or _rawBody
  const getDescription = (item) => {
    if (item.slug?.current) return item.slug.current;
    if (item.slug && typeof item.slug === 'string') return item.slug;
    if (item._rawBody) return item._rawBody.substring(0, 200) + '...';
    return 'Read the latest news from Advanced Academic Center';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Process content with markdown-like formatting
  const processContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>')
      .replace(/__(.*?)__/g, '<u>$1</u>');
  };
  
  return (
    <Layout>
      <Head>
        <title>{newsItem.title} | AAC News</title>
        <meta name="description" content={getDescription(newsItem)} />
      </Head>
      
      <PageHero 
        title={newsItem.title}
        subtitle={getDescription(newsItem)}
        tag={newsItem.categories || 'News'}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/News" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to News
            </Link>
          </div>
          
          {/* Article metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a2535] rounded-xl p-6 mb-8 border border-gray-700"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {newsItem.categories && (
                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full border border-blue-700/50">
                  {newsItem.categories}
                </span>
              )}
              <div className="flex items-center text-gray-400 text-sm">
                <FaCalendar className="mr-2" />
                {formatDate(newsItem.publishedAt)}
              </div>
            </div>
            
            {newsItem.mainImage && (
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
                <img 
                  src={newsItem.mainImage.asset?.url || newsItem.mainImage}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
          
          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1a2535] rounded-xl p-8 mb-8 prose prose-invert max-w-none border border-gray-700"
          >
            <div 
              className="text-gray-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: processContent(newsItem._rawBody || newsItem.content || '') }}
            />
          </motion.div>
          
          {/* Links section */}
          {newsItem.links && newsItem.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#1a2535] rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">Related Links</h3>
              <div className="space-y-3">
                {newsItem.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-lg hover:bg-blue-800/50 transition-colors border border-blue-700/50"
                  >
                    <span>{link.text}</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetailPage;