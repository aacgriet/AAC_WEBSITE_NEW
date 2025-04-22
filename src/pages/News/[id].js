// src/pages/News/[id].js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowLeft, FaShare, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import Layout from '@/components/Layout';
import { getAllNews, getNewsById } from '@/lib/sanity';

export async function getStaticPaths() {
  const news = await getAllNews();
  
  const paths = news.map((item) => ({
    params: { id: item._id },
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const news = await getNewsById(params.id);
  
  if (!news) {
    return {
      notFound: true,
    };
  }
  
  // Get two related news items based on category
  const allNews = await getAllNews();
  let relatedNews = [];
  
  if (news.categories) {
    relatedNews = allNews
      .filter(item => item._id !== news._id && item.categories === news.categories)
      .slice(0, 2);
  }
  
  // If we don't have enough related news by category, add some random ones
  if (relatedNews.length < 2) {
    const randomNews = allNews
      .filter(item => item._id !== news._id && !relatedNews.some(rel => rel._id === item._id))
      .slice(0, 2 - relatedNews.length);
    
    relatedNews = [...relatedNews, ...randomNews];
  }
  
  return {
    props: {
      news,
      relatedNews
    },
    revalidate: 60 // Revalidate every minute
  };
}

// Custom components for portable text content
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-gray-700 mb-6 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-3 text-gray-900">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const NewsDetail = ({ news, relatedNews }) => {
  const publishDate = news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';
    
  // Generate a sharing URL for the current page
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
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
            {news.mainImage && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 rounded-xl overflow-hidden shadow-xl"
              >
                <div className="relative w-full h-96 md:h-[500px]">
                  <Image
                    src={news.mainImage.url}
                    alt={news.title}
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
              className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12"
            >
              {/* Body content */}
              <div className="prose prose-lg max-w-none">
                {news._rawBody ? (
                  <PortableText
                    value={news._rawBody}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-gray-500 italic">No content available for this article.</p>
                )}
              </div>
              
              {/* Social sharing */}
              <div className="mt-12 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-gray-700 font-medium">Share this article</h3>
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
                <h2 className="text-2xl font-bold mb-6">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedNews.map((relatedItem) => (
                    <Link key={relatedItem._id} href={`/News/${relatedItem._id}`}>
                      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-40">
                          {relatedItem.mainImage ? (
                            <Image
                              src={relatedItem.mainImage.url}
                              alt={relatedItem.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700"></div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold mb-2 line-clamp-2">{relatedItem.title}</h3>
                          <p className="text-sm text-gray-500">
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