
// src/components/Events/EventCard.jsx - Premium UI with database integration
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const EventCard = ({ event, date, path, img, index = 0, status, location, category, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate the correct path if not provided
  const eventPath = path || `/Events/${event?.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  // Use provided image or fallback
  const eventImage = img || '/images/pic.webp';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={eventImage}
          alt={event || 'Event'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 backdrop-blur-sm">
            {date || 'TBD'}
          </span>
        </div>

        {/* Status Badge */}
        {status && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${
              status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
              status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
              status === 'ongoing' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
              'bg-gray-500/20 text-gray-300 border-gray-500/30'
            }`}>
              {status}
            </span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 bg-black/40 text-white rounded text-xs font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {event || 'Event'}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
          {description || 'No description available for this event.'}
        </p>

        {/* Location */}
        {location && (
          <p className="text-gray-500 text-xs mb-4 flex items-center gap-1">
            <span>📍</span>
            {location}
          </p>
        )}
        
        {/* Action Button */}
        <Link
          href={eventPath}
          className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mt-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Event
            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>

      {/* Hover Effect - Animated border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default EventCard;