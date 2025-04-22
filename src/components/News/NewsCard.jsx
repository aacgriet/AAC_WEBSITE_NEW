// src/components/News/NewsCard.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const NewsCard = ({ news, index }) => {
  // Format the date
  const publishDate = news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      }) 
    : '';
  
  // Animation variants for each card
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.05
      }
    }
  };
  
  // Function to generate a gradient based on category
  const getCategoryGradient = (category) => {
    if (!category) return 'from-blue-600 to-indigo-600';
    
    const categoryMap = {
      'NOTICE': 'from-orange-500 to-red-600',
      'ACHIEVEMENT': 'from-green-500 to-emerald-600',
      'EVENT': 'from-purple-500 to-pink-600',
      'RESEARCH': 'from-blue-500 to-cyan-600',
      'UPDATE': 'from-indigo-500 to-blue-600',
    };
    
    return categoryMap[category.toUpperCase()] || 'from-blue-600 to-indigo-600';
  };
  
  const gradientClass = getCategoryGradient(news.categories);
  
  return (
    <motion.div 
      variants={item}
      className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
    >
      {/* Card Header with Image or Gradient */}
      <div className="relative h-48">
        {news.mainImage ? (
          <Image
            src={news.mainImage.url}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass}`}>
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
        {news.categories && (
          <div className="absolute top-4 right-4">
            <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
              {news.categories}
            </span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
            <FaCalendar className="mr-1" />
            <span>{publishDate}</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col">
        <Link href={`/News/${news._id}`}>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
            {news.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {news.slug || "Latest news from Advanced Academic Center"}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link 
            href={`/News/${news._id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;