// src/components/Achievements/AchievementsCard.jsx - Update the 
// achievementsCard component

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const AchievementsCard = ({ achievements, index }) => {
  // Handle different date formats and fallbacks
  const getFormattedDate = (dateString) => {
    if (!dateString) return 'No date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    } catch (error) {
      return 'Date error';
    }
  };

  // Get description text from various possible sources
  const getDescription = (achievements) => {
    // For slug object structure
    if (achievements.slug?.current) return achievements.slug.current;
    if (achievements.slug && typeof achievements.slug === 'string') return achievements.slug;
    if (achievements.description) return achievements.description;
    if (achievements._rawBody) return achievements._rawBody.substring(0, 150) + '...';
    if (achievements.body && typeof achievements.body === 'string') return achievements.body.substring(0, 150) + '...';
    if (achievements.content) return achievements.content.substring(0, 150) + '...';
    return "Latest Achievements from Advanced Academic Center";
  };

  // Get the achievements ID - handle both id and _id
  const getAchievementsId = (achievements) => {
    return achievements.id || achievements._id;
  };

  const publishDate = getFormattedDate(achievements.publishedAt);
  const description = getDescription(achievements);
  const achievementsId = getAchievementsId(achievements);
  
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
      'Hackathons': 'from-blue-600 to-indigo-600',
      'Jobs': 'from-purple-500 to-pink-600',
      'Internships': 'from-green-500 to-emerald-600',
    };
    
    return categoryMap[category] || 'from-blue-600 to-indigo-600';
  };
  
  // Function to get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Hackathons': '📰',
      'Jobs': '🎉',
      'Internships': '🎤',
    };
    
    return iconMap[category] || '📰';
  };
  
  const gradientClass = getCategoryGradient(achievements.categories);
  const categoryIcon = getCategoryIcon(achievements.categories);
  
  return (
    <motion.div 
      variants={item}
      className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg bg-[#1a2535] hover:shadow-xl transition-shadow duration-300 border border-gray-700"
    >
      {/* Card Header - Always Gradient */}
      <div className="relative h-48">
        {/* Beautiful gradient background */}
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden`}>
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-16 h-16 border border-white/15 rounded-full"></div>
            <div className="absolute top-12 right-8 w-12 h-12 border border-white/10 rounded-full"></div>
          </div>
          
          {/* Center icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg z-10">
            <span className="text-white text-3xl">{categoryIcon}</span>
          </div>
        </div>
        
        {/* Category Badge */}
        {achievements.categories && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
              {achievements.categories}
            </span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 flex items-center z-10">
          <div className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center border border-white/20">
            <FaCalendar className="mr-1" />
            <span>{publishDate}</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col bg-[#1a2535]">
        <Link href={`/Achievements/${achievementsId}`}>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer text-white">
            {achievements.title}
          </h3>
        </Link>
        
        <p className="text-gray-300 mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-600">
          <Link 
            href={`/Achievements/${achievementsId}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Read More
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementsCard;