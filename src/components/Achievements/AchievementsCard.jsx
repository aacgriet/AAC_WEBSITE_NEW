// src/components/Achievements/AchievementsCard.jsx - With image display
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const AchievementsCard = ({ achievements, index }) => {
  if (!achievements) {
    return null;
  }

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

  // Get description text with better fallback
  const getDescription = (achievements) => {
    if (achievements.description) return achievements.description;
    if (achievements.slug?.current) return achievements.slug.current;
    if (achievements.slug && typeof achievements.slug === 'string') return achievements.slug;
    return "Achievement from Advanced Academic Center";
  };

  // Get the achievements ID - handle both id and _id
  const getAchievementsId = (achievements) => {
    return achievements.id || achievements._id;
  };

  // Get main image with fallback
  const getMainImage = (achievements) => {
    if (achievements.mainImage) return achievements.mainImage;
    if (achievements.images && Array.isArray(achievements.images) && achievements.images.length > 0) {
      return achievements.images[0];
    }
    return '/images/pic.webp'; // Fallback image
  };

  const publishDate = getFormattedDate(achievements.date);
  const description = getDescription(achievements);
  const achievementsId = getAchievementsId(achievements);
  const title = achievements.title || 'Untitled Achievement';
  const category = achievements.category || 'General';
  const mainImage = getMainImage(achievements);
  
  // Function to generate a gradient based on category
  const getCategoryGradient = (category) => {
    const categoryMap = {
      'Awards': 'from-yellow-600 to-amber-600',
      'Jobs': 'from-green-500 to-emerald-600',
      'Internships': 'from-blue-600 to-indigo-600',
      'Hackathons': 'from-purple-500 to-pink-600',
      'Milestone': 'from-blue-600 to-indigo-600',
      'Recognition': 'from-green-500 to-emerald-600',
      'Competition': 'from-purple-500 to-pink-600',
      'Collaboration': 'from-teal-500 to-cyan-600',
      'Award': 'from-yellow-600 to-amber-600',
      'Others': 'from-gray-600 to-slate-600',
    };
    
    return categoryMap[category] || 'from-blue-600 to-indigo-600';
  };
  
  // Function to get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Awards': '🏆',
      'Jobs': '💼',
      'Internships': '🎓',
      'Hackathons': '💻',
      'Milestone': '🎯',
      'Recognition': '🌟',
      'Competition': '🏆',
      'Collaboration': '🤝',
      'Award': '🏅',
      'Others': '🎉',
    };
    
    return iconMap[category] || '🏆';
  };
  
  const gradientClass = getCategoryGradient(category);
  const categoryIcon = getCategoryIcon(category);
  
  return (
    <div className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg bg-[#1a2535] hover:shadow-xl transition-shadow duration-300 border border-gray-700 group">
      {/* Card Header - Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => {
            // If image fails to load, show gradient background
            console.log('Failed to load image:', mainImage);
          }}
        />
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent`}></div>
        
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-16 h-16 border border-white/15 rounded-full"></div>
          <div className="absolute top-12 right-8 w-12 h-12 border border-white/10 rounded-full"></div>
        </div>
        
       
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`bg-gradient-to-r ${gradientClass}/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20`}>
            {category}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 flex items-center z-10">
          <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center border border-white/20">
            <FaCalendar className="mr-1" />
            <span>{publishDate}</span>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col bg-[#1a2535]">
        <Link href={`/Achievements/${achievementsId}`}>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-300 mb-4 flex-grow line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-600">
          <Link 
            href={`/Achievements/${achievementsId}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group-hover:scale-105 transform duration-200"
          >
            Read More
            <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AchievementsCard;