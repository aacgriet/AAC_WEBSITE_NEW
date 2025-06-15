// src/pages/News/[id].js - Shows image only if it exists
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaTag, FaExternalLinkAlt } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: newsData, loading } = useLocalStorage(STORAGE_KEYS.NEWS);

  // Find the specific news article
  const newsArticle = newsData.find(news => 
    (news._id === id) || 
    (news.id === id) ||
    (news.slug?.current === id) ||
    (news.slug === id)
  );

  // Handle different content formats and render rich text
  const renderContent = (article) => {
    if (!article) return '';
    
    let content = '';
    
    // Try _rawBody first (processed content)
    if (article._rawBody) {
      content = article._rawBody;
    }
    // Try body array (Sanity structured content)
    else if (article.body && Array.isArray(article.body)) {
      content = article.body
        .map(block => {
          if (block._type === 'block' && block.children) {
            let text = block.children.map(child => child.text).join('');
            
            // Apply formatting based on marks
            block.children.forEach(child => {
              if (child.marks && child.marks.includes('strong')) {
                text = text.replace(child.text, `**${child.text}**`);
              }
              if (child.marks && child.marks.includes('underline')) {
                text = text.replace(child.text, `__${child.text}__`);
              }
            });
            
            return text;
          }
          return '';
        })
        .join('\n\n');
    }
    // Fallback to other content fields
    else if (article.content) {
      content = article.content;
    }
    else if (article.slug?.current) {
      content = article.slug.current;
    }
    else {
      content = 'Content not available.';
    }
    
    // Process markdown-like formatting
    content = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/\n/g, '<br>');
    
    return content;
  };

  // Check if article has a valid image
  const hasValidImage = (article) => {
    if (!article) return false;
    if (article.mainImage?.asset?.url) return true;
    if (article.mainImage?.url) return true;  
    if (article.mainImage && typeof article.mainImage === 'string') return true;
    if (article.image) return true;
    return false;
  };

  const getImageUrl = (article) => {
    if (!article) return null;
    if (article.mainImage?.asset?.url) return article.mainImage.asset.url;
    if (article.mainImage?.url) return article.mainImage.url;
    if (article.mainImage && typeof article.mainImage === 'string') return article.mainImage;
    if (article.image) return article.image;
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (!newsArticle) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-6xl mb-4">📰</div>
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The news article you're looking for doesn't exist.</p>
          <Link 
            href="/News"
            className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
          >
            Back to News
          </Link>
        </div>
      </Layout>
    );
  }

  const content = renderContent(newsArticle);
  const imageUrl = getImageUrl(newsArticle);
  const publishDate = formatDate(newsArticle.publishedAt);
  const showImage = hasValidImage(newsArticle);

  return (
    <Layout>
      <Head>
        <title>{newsArticle.title} | AAC News</title>
        <meta name="description" content={newsArticle.slug?.current || content.substring(0, 160)} />
      </Head>

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/News"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back to News</span>
            </Link>
          </div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-gray-400">
                <FaCalendar className="mr-2" />
                <span>{publishDate}</span>
              </div>
              
              {newsArticle.categories && (
                <div className="flex items-center">
                  <FaTag className="mr-2 text-gray-400" />
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full border border-blue-700/50">
                    {newsArticle.categories}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {newsArticle.title}
            </h1>
          </motion.div>

          {/* Featured Image - Only show if image exists */}
          {showImage && imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64 md:h-96">
                <Image
                  src={imageUrl}
                  alt={newsArticle.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide the entire image container if image fails to load
                    e.target.parentElement.parentElement.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: showImage ? 0.3 : 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="bg-[#1a2535] rounded-xl p-8 border border-gray-700">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </motion.div>

          {/* Related Links */}
          {newsArticle.links && newsArticle.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FaExternalLinkAlt className="mr-2" />
                  Related Links
                </h3>
                <div className="space-y-3">
                  {newsArticle.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-[#0e1421] rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 hover:text-blue-300">
                          {link.text}
                        </span>
                        <FaExternalLinkAlt className="text-gray-500 text-sm" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Related Articles Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6">More News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsData
                .filter(news => news._id !== newsArticle._id)
                .slice(0, 4)
                .map((relatedNews) => (
                  <Link key={relatedNews._id} href={`/News/${relatedNews._id}`}>
                    <div className="bg-[#1a2535] rounded-lg p-4 hover:bg-[#243447] transition-colors border border-gray-700">
                      <h4 className="font-semibold text-white mb-2 line-clamp-2">
                        {relatedNews.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {formatDate(relatedNews.publishedAt)}
                      </p>
                      {relatedNews.categories && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                          {relatedNews.categories}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetailPage;