// src/components/Events/EventDetail.jsx - Fixed span tag issue in pagination
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { FaArrowLeft, FaArrowRight, FaCalendar, FaMapMarkerAlt, FaUser, FaTag } from 'react-icons/fa';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const EventDetail = ({ title, description, images = [], date, location, organizer, category, cta }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { data: eventsData } = useLocalStorage(STORAGE_KEYS.EVENTS);
  
  // Split description into paragraphs (handle both HTML and plain text)
  const paragraphs = description ? description.split('<br /><br />').filter(p => p.trim()) : [];
  
  // Format the header text by capitalizing first character of each word
  const formattedTitle = title ? title.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ') : 'Event';

  // Get other events for "Explore More Events" section (exclude current event)
  const otherEvents = eventsData
    .filter(event => event.event !== title)
    .slice(0, 3);

  // If no images provided, show a placeholder
  const displayImages = images.length > 0 ? images : [
    'https://via.placeholder.com/800x450/1a2535/ffffff?text=No+Images+Available'
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Event Details</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              {formattedTitle.split(' ').slice(0, -1).join(' ')}
            </span>
            {formattedTitle.split(' ').length > 1 && (
              <>
                {' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {formattedTitle.split(' ').slice(-1)[0]}
                </span>
              </>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Discover workshops, seminars, competitions, and exhibitions organized by AAC
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>
    
      <div className="container mx-auto px-4 pb-24">
        {/* Go back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/Events"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
          >
            <FaArrowLeft />
            <span>Back to Events</span>
          </Link>
        </motion.div>
        
        {/* Event metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {date && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-blue-300 rounded-full border border-white/20 shadow-lg">
                <FaCalendar className="text-blue-400" />
                <span>{date}</span>
              </div>
            )}
            
            {location && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-emerald-300 rounded-full border border-white/20 shadow-lg">
                <FaMapMarkerAlt className="text-emerald-400" />
                <span>{location}</span>
              </div>
            )}
            
            {organizer && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-purple-300 rounded-full border border-white/20 shadow-lg">
                <FaUser className="text-purple-400" />
                <span>{organizer}</span>
              </div>
            )}
            
            {category && (
              <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-white/5 text-amber-300 rounded-full border border-white/20 shadow-lg">
                <FaTag className="text-amber-400" />
                <span>{category}</span>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Image Carousel and Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative backdrop-blur-sm bg-white/5 rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="aspect-[16/9] w-full relative">
              {displayImages.length > 1 ? (
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  effect={'fade'}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    type: 'fraction',
                  }}
                  navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                  }}
                  modules={[EffectFade, Navigation, Pagination, Autoplay]}
                  onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                  onInit={(swiper) => {
                    // Override navigation
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="h-full w-full rounded-2xl"
                >
                  {displayImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${title} image ${index + 1}`}
                          fill
                          className="object-cover rounded-2xl"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  
                  {/* Custom navigation buttons */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                      ref={navigationPrevRef}
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-md border border-white/20 hover:scale-110"
                    >
                      <FaArrowLeft />
                    </button>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                      ref={navigationNextRef}
                      className="w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-md border border-white/20 hover:scale-110"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </Swiper>
              ) : (
                // Single image display
                <div className="relative w-full h-full">
                  <Image
                    src={displayImages[0]}
                    alt={title || 'Event image'}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              )}
            </div>
            
            {/* Thumbnail Preview - only show if multiple images */}
            {displayImages.length > 1 && (
              <div className="p-4">
                <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (swiperRef.current) {
                          swiperRef.current.slideTo(index);
                        }
                      }}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all border ${
                        activeImageIndex === index 
                          ? 'ring-2 ring-blue-500 opacity-100 scale-105 border-blue-500/50' 
                          : 'opacity-60 hover:opacity-90 border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
            
          {/* Event Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 mb-6 flex-grow border border-white/10 hover:border-white/20 transition-all duration-300">
              {/* Gradient section line */}
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
              
              <h2 className="text-2xl font-bold mb-6 text-white">About This Event</h2>
              
              <div className="space-y-4 text-gray-300">
                {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                )) : (
                  <p className="text-gray-400 italic">No description available for this event.</p>
                )}
              </div>
            </div>
            
            {/* CTA Button if provided */}
            {cta && cta.text && cta.link && (
              <div className="text-center">
                <Link 
                  href={cta.link}
                  className="group/btn inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {cta.text}
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Highlight Tiles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Title Section */}
            <div className="lg:w-1/3">
              <div className="text-center lg:text-left">
                {/* Animated gradient line */}
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Event Highlights
                  </span>
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  Discover the key features that make this event special
                </p>
                
                {/* Decorative dots */}
                <div className="hidden lg:block mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cards Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl">💡</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      Innovation
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Pushing boundaries and exploring new ideas through creative thinking and cutting-edge solutions.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl">🤝</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      Collaboration
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Working together to achieve common goals through shared knowledge and diverse perspectives.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  <div className="p-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-2xl">⭐</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      Excellence
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Striving for the highest standards in everything we do, aiming to inspire and lead by example.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Related Events Section */}
        {otherEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-24"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto mb-6 rounded-full shadow-lg"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Explore More Events
                </h2>
                <p className="text-gray-400 text-lg">
                  Discover other exciting events organized by AAC
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <Link href={`/Events/${event.id}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      
                      <div className="h-40 relative overflow-hidden rounded-t-2xl">
                        <Image
                          src={event.img || event.images?.[0] || 'https://via.placeholder.com/400x160/1a2535/ffffff?text=Event'}
                          alt={event.event}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      
                      <div className="p-4 relative z-10">
                        <h3 className="font-bold text-white line-clamp-2 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {event.event}
                        </h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {event.date}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default EventDetail;