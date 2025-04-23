// src/components/Events/EventDetail.jsx
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { FaArrowLeft, FaArrowRight, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import PageHero from '@/components/PageHero';

const EventDetail = ({ title, description, images, date, location, organizer, cta }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  // Split description into paragraphs
  const paragraphs = description.split('<br /><br />');
  
  // Format the header text by capitalizing first character of each word
  const formattedTitle = title.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  return (
    <>
      <PageHero 
        title={formattedTitle}
        subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
        tag="Event Details"
      />
    
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Go back button */}
          <div className="mb-8">
            <Link
              href="/Events"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back to Events</span>
            </Link>
          </div>
          
          {/* Event metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {date && (
                <div className="flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
                  <FaCalendar className="mr-2" />
                  <span>{date}</span>
                </div>
              )}
              
              {location && (
                <div className="flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{location}</span>
                </div>
              )}
              
              {organizer && (
                <div className="flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
                  <span className="font-medium">Organized by:</span>
                  <span className="ml-2">{organizer}</span>
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
              className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-700"
            >
              <div className="aspect-[16/9] w-full relative">
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
                    formatFractionCurrent: number => `<span class="text-blue-400">${number}</span>`,
                    formatFractionTotal: number => `<span>${number}</span>`,
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
                  {images.map((image, index) => (
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
                      className="w-10 h-10 rounded-full bg-[#0e1421]/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0e1421] transition-all shadow-md border border-gray-700"
                    >
                      <FaArrowLeft />
                    </button>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                      ref={navigationNextRef}
                      className="w-10 h-10 rounded-full bg-[#0e1421]/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0e1421] transition-all shadow-md border border-gray-700"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </Swiper>
              </div>
              
              {/* Thumbnail Preview */}
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2 px-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideTo(index);
                      }
                    }}
                    className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all border ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-blue-500 opacity-100 scale-105 border-blue-700' 
                        : 'opacity-60 hover:opacity-90 border-gray-700'
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
            </motion.div>
            
            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="bg-[#1a2535] rounded-2xl shadow-lg p-6 mb-6 flex-grow border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-700 text-white">About This Event</h2>
                
                <div className="space-y-4 text-gray-300">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* CTA Button if provided */}
              {cta && (
                <div className="text-center">
                  <Link 
                    href={cta.link}
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full font-medium hover:shadow-lg transition-shadow transform hover:-translate-y-1 border border-blue-700/50"
                  >
                    {cta.text}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg border border-blue-700/50">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-blue-100">
                Pushing boundaries and exploring new ideas through creative thinking and cutting-edge solutions.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-2xl p-6 shadow-lg border border-blue-700/50">
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-blue-100">
                Working together to achieve common goals through shared knowledge and diverse perspectives.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg border border-blue-700/50">
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-blue-100">
                Striving for the highest standards in everything we do, aiming to inspire and lead by example.
              </p>
            </div>
          </motion.div>
          
          {/* Related Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl bg-[#1a2535] p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-white">Explore More Events</h2>
            
            <div className="flex space-x-4 overflow-x-auto pb-4">
              <Link href="/Events/opulence2023" className="flex-shrink-0">
                <div className="w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-[#0e1421] border border-gray-700">
                  <div className="h-40 relative">
                    <Image
                      src="https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/s1gv2z0j7nzctxmyyrxh.jpg"
                      alt="Opulence 2023"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white">Opulence</h3>
                    <p className="text-sm text-gray-400">June 2024</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/Events/Expo2023" className="flex-shrink-0">
                <div className="w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-[#0e1421] border border-gray-700">
                  <div className="h-40 relative">
                    <Image
                      src="https://res.cloudinary.com/aacgriet/image/upload/v1730826047/AAC-web/news_events/expo2023/mskbwi5ieigki5qactl0.jpg"
                      alt="AAC Expo 2023"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white">AAC Expo 2023</h3>
                    <p className="text-sm text-gray-400">December 2023</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/Events/Expo2022" className="flex-shrink-0">
                <div className="w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-[#0e1421] border border-gray-700">
                  <div className="h-40 relative">
                    <Image
                      src="https://res.cloudinary.com/aacgriet/image/upload/v1730826433/AAC-web/news_events/expo2022/wgrd6p6gnst2pqropeht.jpg"
                      alt="AAC Expo 2022"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white">AAC Expo 2022</h3>
                    <p className="text-sm text-gray-400">October 2022</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;