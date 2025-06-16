// // src/pages/News/[id].js - Updated with Modern Premium UI
// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';
// import { FaCalendar, FaArrowLeft, FaExternalLinkAlt, FaTag, FaUser } from 'react-icons/fa';
// import Layout from '@/components/Layout';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';

// const NewsDetailPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { data: newsData } = useLocalStorage(STORAGE_KEYS.NEWS);
  
//   // Find the news item by either id or _id
//   const newsItem = newsData.find(item => 
//     item.id === id || item._id === id
//   );

//   // Get other news for "Related Articles" section (exclude current article)
//   const relatedNews = newsData
//     .filter(item => (item.id !== id && item._id !== id))
//     .slice(0, 3);
  
//   if (router.isFallback) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//           <div className="text-center">
//             <div className="relative mb-8">
//               <div className="w-16 h-16 border-4 border-white/10 border-t-emerald-500 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animation-delay-150"></div>
//             </div>
//             <p className="text-xl text-gray-400">Loading article...</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
  
//   if (!newsItem) {
//     return (
//       <Layout>
//         <Head>
//           <title>News Not Found | AAC</title>
//         </Head>
        
//         {/* Hero Section for Error */}
//         <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//           {/* Animated background blobs */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
//             <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//           </div>

//           {/* Animated grid pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//           </div>
          
//           <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//             {/* Enhanced badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
//               <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium">Error 404</span>
//             </div>
            
//             {/* Title with gradient effect */}
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent">
//                 Article Not
//               </span>{' '}
//               <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
//                 Found
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
//               The news article you're looking for doesn't exist or has been removed
//             </p>

//             {/* Decorative dots */}
//             <div className="flex justify-center items-center gap-3 mt-8">
//               <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//               <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
//               <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="container mx-auto px-4 pb-24">
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">🔍</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">Article Not Found</h3>
//             <p className="text-gray-400 text-lg mb-8">The news article you're looking for doesn't exist or has been removed.</p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 href="/News"
//                 className="group/btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   Back to News
//                   <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//                 </span>
//                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//               </Link>
              
//               <Link
//                 href="/"
//                 className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
//               >
//                 Go Home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
  
//   // Get description from slug or _rawBody
//   const getDescription = (item) => {
//     if (item.slug?.current) return item.slug.current;
//     if (item.slug && typeof item.slug === 'string') return item.slug;
//     if (item._rawBody) return item._rawBody.substring(0, 200) + '...';
//     return 'Read the latest news from Advanced Academic Center';
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date available';
//     try {
//       return new Date(dateString).toLocaleDateString('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid date';
//     }
//   };

//   // Process content with markdown-like formatting
//   const processContent = (content) => {
//     if (!content) return '';
    
//     return content
//       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//       .replace(/\*(.*?)\*/g, '<em>$1</em>')
//       .replace(/\n/g, '<br/>')
//       .replace(/__(.*?)__/g, '<u>$1</u>');
//   };

//   // Get image URL
//   const getImageUrl = (image) => {
//     if (!image) return 'https://via.placeholder.com/800x400/1a2535/ffffff?text=News+Article';
//     if (typeof image === 'string') return image;
//     if (image.asset?.url) return image.asset.url;
//     return 'https://via.placeholder.com/800x400/1a2535/ffffff?text=News+Article';
//   };

//   // Format title for gradient splitting
//   const formattedTitle = newsItem.title || 'News Article';
//   const titleWords = formattedTitle.split(' ');
//   const firstWords = titleWords.slice(0, -1).join(' ');
//   const lastWord = titleWords.slice(-1)[0];
  
//   return (
//     <Layout>
//       <Head>
//         <title>{newsItem.title} | AAC News</title>
//         <meta name="description" content={getDescription(newsItem)} />
//         <meta property="og:title" content={`${newsItem.title} | AAC News`} />
//         <meta property="og:description" content={getDescription(newsItem)} />
//         <meta property="og:image" content={getImageUrl(newsItem.mainImage)} />
//       </Head>
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//         {/* Animated background blobs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//           <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//         </div>

//         {/* Animated grid pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//         </div>
        
//         <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//           {/* Enhanced badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
//             <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium">News Article</span>
//           </div>
          
//           {/* Title with gradient effect */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
//             {titleWords.length > 1 ? (
//               <>
//                 <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
//                   {firstWords}
//                 </span>
//                 {' '}
//                 <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//                   {lastWord}
//                 </span>
//               </>
//             ) : (
//               <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//                 {formattedTitle}
//               </span>
//             )}
//           </h1>
          
//           <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
//             {getDescription(newsItem)}
//           </p>

//           {/* Decorative dots */}
//           <div className="flex justify-center items-center gap-3 mt-8">
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//             <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//           </div>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 pb-24">
//         {/* Back button */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <Link
//             href="/News"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
//           >
//             <FaArrowLeft />
//             <span>Back to News</span>
//           </Link>
//         </motion.div>
        
//         {/* Article metadata */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap justify-center gap-4 mb-6">
//             {newsItem.categories && (
//               <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-emerald-300 rounded-full border border-white/20 shadow-lg">
//                 <FaTag className="text-emerald-400" />
//                 <span>{newsItem.categories}</span>
//               </div>
//             )}
            
//             <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-blue-300 rounded-full border border-white/20 shadow-lg">
//               <FaCalendar className="text-blue-400" />
//               <span>{formatDate(newsItem.publishedAt)}</span>
//             </div>
            
//             {newsItem.author && (
//               <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-purple-300 rounded-full border border-white/20 shadow-lg">
//                 <FaUser className="text-purple-400" />
//                 <span>{newsItem.author}</span>
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Main content layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Article content */}
//           <div className="lg:col-span-2">
//             {/* Featured image */}
//             {newsItem.mainImage && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.1 }}
//                 className="relative backdrop-blur-sm bg-white/5 rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 mb-8"
//               >
//                 <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
//                   <Image 
//                     src={getImageUrl(newsItem.mainImage)}
//                     alt={newsItem.title}
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                 </div>
//               </motion.div>
//             )}
            
//             {/* Article text */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
//             >
//               {/* Gradient section line */}
//               <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 h-1.5 w-24 mb-8 rounded-full shadow-lg"></div>
              
//               <div 
//                 className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: processContent(newsItem._rawBody || newsItem.content || 'No content available.') }}
//               />
//             </motion.div>
            
//             {/* Links section */}
//             {newsItem.links && newsItem.links.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 mt-8"
//               >
//                 {/* Gradient section line */}
//                 <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
                
//                 <h3 className="text-xl font-bold text-white mb-6">Related Links</h3>
//                 <div className="space-y-3">
//                   {newsItem.links.map((link, index) => (
//                     <a
//                       key={index}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mr-3 mb-3"
//                     >
//                       <span className="relative z-10 flex items-center justify-center gap-2">
//                         <span>{link.text}</span>
//                         <FaExternalLinkAlt className="text-sm group-hover/btn:translate-x-1 transition-transform duration-200" />
//                       </span>
//                       <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                     </a>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             {/* Article highlights */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 mb-8"
//             >
//               {/* Gradient section line */}
//               <div className="bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
              
//               <h3 className="text-xl font-bold text-white mb-6">Article Highlights</h3>
              
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
//                     <span className="text-sm">📈</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-white mb-1">Latest Updates</h4>
//                     <p className="text-gray-400 text-sm">Stay informed with the most recent developments and announcements.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
//                     <span className="text-sm">🎯</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-white mb-1">Key Insights</h4>
//                     <p className="text-gray-400 text-sm">Important information and insights relevant to our community.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-3">
//                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
//                     <span className="text-sm">🔗</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-white mb-1">Connected Stories</h4>
//                     <p className="text-gray-400 text-sm">Related news and updates from across our organization.</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Related articles */}
//             {relatedNews.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
//               >
//                 {/* Gradient section line */}
//                 <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
                
//                 <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
                
//                 <div className="space-y-4">
//                   {relatedNews.map((article, index) => (
//                     <Link key={article._id || article.id} href={`/News/${article._id || article.id}`}>
//                       <div className="group relative backdrop-blur-sm bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
//                         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
//                         <div className="flex gap-3 p-4 relative z-10">
//                           <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                             <Image
//                               src={getImageUrl(article.mainImage)}
//                               alt={article.title}
//                               width={64}
//                               height={64}
//                               className="object-cover w-full h-full"
//                             />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//                               {article.title}
//                             </h4>
//                             <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
//                               {formatDate(article.publishedAt)}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default NewsDetailPage;

// src/pages/News/[id].js - Updated to use database
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';
import { FaArrowLeft, FaCalendar, FaTag, FaExternalLinkAlt } from 'react-icons/fa';

const NewsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: newsData, loading, error } = useDatabase('news');

  // Find the specific news article
  const newsArticle = newsData?.find(news => 
    news._id === id || news.id === id
  );

  // Get other news articles for "Related News" section
  const relatedNews = newsData
    ?.filter(news => (news._id !== id && news.id !== id))
    ?.slice(0, 3) || [];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
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

  // Process content for display
  const processContent = (content) => {
    if (!content) return '';
    
    // Handle basic markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  if (loading) {
    return (
      <Layout>
        <ContentLoading text="Loading news article..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading news article: {error}</p>
            <Link href="/News" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!newsArticle) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">News Article Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">
              The news article you're looking for doesn't exist or may have been removed.
            </p>
            <Link href="/News" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to News
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/News"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
          >
            <FaArrowLeft />
            <span>Back to News</span>
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            {/* Category Badge */}
            {newsArticle.categories && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                  <FaTag />
                  {newsArticle.categories}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {newsArticle.title}
            </h1>

            {/* Article Meta */}
            <div className="flex justify-center items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <FaCalendar />
                <span>{formatDate(newsArticle.publishedAt)}</span>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {newsArticle.mainImage?.asset?.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={newsArticle.mainImage.asset.url}
                  alt={newsArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10">
              {/* Short Description */}
              {newsArticle.slug?.current && (
                <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-blue-200 text-lg leading-relaxed italic">
                    {newsArticle.slug.current}
                  </p>
                </div>
              )}

              {/* Main Content */}
              <div className="prose prose-invert prose-lg max-w-none">
                <div 
                  className="text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: processContent(newsArticle._rawBody || newsArticle.body || newsArticle.content || 'No content available.') 
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          {newsArticle.links && newsArticle.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Related Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsArticle.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FaExternalLinkAlt className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300">
                          {link.text}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Related News</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((news, index) => (
                    <Link
                      key={news._id || news.id}
                      href={`/News/${news._id || news.id}`}
                      className="group block"
                    >
                      <div className="backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                        {/* Category */}
                        {news.categories && (
                          <div className="mb-3">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                              {news.categories}
                            </span>
                          </div>
                        )}
                        
                        <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                          {news.title}
                        </h4>
                        
                        {news.slug?.current && (
                          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                            {news.slug.current}
                          </p>
                        )}
                        
                        <div className="mt-3 text-xs text-gray-500">
                          {formatDate(news.publishedAt)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              href="/News"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <FaArrowLeft />
              Back to All News
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;