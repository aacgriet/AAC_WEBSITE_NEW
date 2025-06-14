// src/pages/News/[id].js - Updated to use localStorage
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowLeft, FaShare, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { useLocalStorageItem } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NewsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { item: news, loading, error } = useLocalStorageItem(STORAGE_KEYS.NEWS, id);
  const [relatedNews, setRelatedNews] = useState([]);
  
  useEffect(() => {
    if (news && typeof window !== 'undefined') {
      // Get related news based on category
      const allNews = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS) || '[]');
      let related = [];
      
      if (news.categories) {
        related = allNews
          .filter(item => 
            item.id !== news.id && 
            item.categories === news.categories &&
            item.status === 'published'
          )
          .slice(0, 2);
      }
      
      // If we don't have enough related news by category, add some random ones
      if (related.length < 2) {
        const randomNews = allNews
          .filter(item => 
            item.id !== news.id && 
            item.status === 'published' &&
            !related.some(rel => rel.id === item.id)
          )
          .slice(0, 2 - related.length);
        
        related = [...related, ...randomNews];
      }
      
      setRelatedNews(related);
    }
  }, [news]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (error || !news) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">News Not Found</h1>
            <Link href="/News" className="text-blue-400 hover:underline">
              Back to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const publishDate = news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';
    
  // Generate a sharing URL for the current page
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  // Render content with basic markdown support
  const renderContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 rounded text-blue-300">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^#{1,6}\s+(.*$)/gm, (match, text) => {
        const level = match.indexOf(' ');
        return `<h${level} class="text-${4-level}xl font-bold mb-4 text-white">${text}</h${level}>`;
      })
      .replace(/^- (.*)$/gm, '<li class="ml-4 mb-2">• $1</li>')
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-300">$1</blockquote>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded overflow-x-auto mb-4"><code class="text-blue-300">$1</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-300">')
      .replace(/\n/g, '<br>');
  };
  
  return (
    <Layout>
      <Head>
        <title>{news.title} | AAC News</title>
        <meta name="description" content={news.slug || 'AAC News Article'} />
      </Head>
      
      <article className="pb-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-blue-900 to-indigo-900 py-16 md:py-24 mb-12">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center">
              {/* Back button */}
              <div className="self-start mb-8">
                <Link
                  href="/News"
                  className="inline-flex items-center text-blue-200 hover:text-white transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  <span>Back to News</span>
                </Link>
              </div>
              
              {/* Publication date and category */}
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                  <FaCalendar className="mr-2" />
                  <span>{publishDate}</span>
                </div>
                
                {news.categories && (
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">
                    {news.categories}
                  </div>
                )}
              </div>
              
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center max-w-4xl mb-6"
              >
                {news.title}
              </motion.h1>
              
              {news.slug && (
                <p className="text-xl text-blue-100 text-center max-w-3xl mb-8">
                  {news.slug}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {news.mainImage?.url && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={news.mainImage.url}
                    alt={news.mainImage.altText || news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            )}
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a2535] rounded-xl shadow-lg p-6 md:p-10 mb-12 border border-gray-700"
            >
              {/* Body content */}
              <div className="prose prose-lg max-w-none">
                {news.content ? (
                  <div 
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: `<p class="mb-4 text-gray-300">${renderContent(news.content)}</p>` 
                    }}
                  />
                ) : (
                  <p className="text-gray-500 italic">No content available for this article.</p>
                )}
              </div>
              
              {/* Social sharing */}
              <div className="mt-12 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-gray-300 font-medium">Share this article</h3>
                  <div className="flex space-x-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(news.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#4267B2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-[#0077B5] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Related News */}
            {relatedNews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedNews.map((relatedItem) => (
                    <Link key={relatedItem.id} href={`/News/${relatedItem.id}`}>
                      <div className="bg-[#1a2535] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                        <div className="relative h-40">
                          {relatedItem.mainImage?.url ? (
                            <Image
                              src={relatedItem.mainImage.url}
                              alt={relatedItem.mainImage.altText || relatedItem.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold mb-2 line-clamp-2 text-white">{relatedItem.title}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(relatedItem.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default NewsDetail;