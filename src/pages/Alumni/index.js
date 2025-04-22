// src/pages/Alumni/index.js
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import Layout from '@/components/Layout';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import alumni data - assuming it's in the path below
// You'll need to adjust the import path to match your actual data file location
import Data from '@/components/Data/Alumniaac';

const AlumniCard = ({ alumni, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden h-full"
      onClick={() => onClick && onClick(alumni.Id)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={alumni.Image || '/images/placeholder-avatar.jpg'}
          alt={alumni.Name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{alumni.Name}</h3>
        {alumni.Designation && (
          <p className="text-sm text-blue-600">{alumni.Designation}</p>
        )}
        {alumni.Company && (
          <p className="text-sm text-gray-600">{alumni.Company}</p>
        )}
      </div>
    </motion.div>
  );
};

const FeaturedAlumniSection = ({ alumni }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  return (
    <div className="relative py-12">
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          ref={navigationPrevRef}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center focus:outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="#172E7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        onInit={(swiper) => {
          // Override navigation
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="alumni-swiper"
      >
        {alumni.map((item) => (
          <SwiperSlide key={item.Id}>
            <div className="p-4 h-full">
              <AlumniCard alumni={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          ref={navigationNextRef}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center focus:outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="#172E7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const AlumniGrid = ({ alumni }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {alumni.map((item) => (
        <motion.div
          key={item.Id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AlumniCard alumni={item} />
        </motion.div>
      ))}
    </div>
  );
};

const Alumni = () => {
  const [displayMode, setDisplayMode] = useState('slider');
  
  return (
    <Layout>
      <Head>
        <title>Alumni | AAC - Advanced Academic Center</title>
        <meta name="description" content="Meet the alumni of Advanced Academic Center at GRIET" />
      </Head>
      
      <div className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              Our Network
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Alumni
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our distinguished alumni who are making an impact in their respective fields.
            </p>
          </motion.div>
          
          {/* Display mode toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setDisplayMode('slider')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  displayMode === 'slider'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Carousel View
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  displayMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
          
          {/* Featured Alumni */}
          <AnimatePresence mode="wait">
            {displayMode === 'slider' ? (
              <motion.div
                key="slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FeaturedAlumniSection alumni={Data} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AlumniGrid alumni={Data} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Alumni Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="py-12 px-6 md:px-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Alumni Impact</h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Our alumni continue to contribute to AAC through mentorship, guest lectures, and collaboration opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "200+", label: "Alumni Network" },
                  { number: "45+", label: "Industry Mentors" },
                  { number: "25+", label: "Countries Worldwide" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Alumni Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Alumni Voices</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Hear what our alumni have to say about their experiences at AAC.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "AAC provided me with the perfect platform to develop my technical skills and leadership abilities. The mentorship I received was invaluable for my career growth.",
                  name: "Priya Sharma",
                  title: "Software Engineer, Google"
                },
                {
                  quote: "My journey at AAC shaped my entrepreneurial mindset. The hands-on projects and industry exposure gave me the confidence to launch my own startup.",
                  name: "Rahul Verma",
                  title: "Founder & CEO, TechSolutions"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <svg width="45" height="36" className="mb-6 text-blue-600 opacity-30" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 36C9.9 36 6.9 34.95 4.5 32.85C1.5 30.15 0 26.4 0 21.6C0 16.8 1.95 12.3 5.85 8.1C9.75 3.9 14.55 0.899998 20.25 0L22.2 5.4C17.7 6.6 14.25 8.55 11.85 11.25C9.45 13.95 8.25 16.5 8.25 18.9C8.25 20.1 8.7 21 9.6 21.6C10.5 22.2 11.4 22.5 12.3 22.5C14.1 22.5 15.6 23.1 16.8 24.3C18 25.5 18.6 27.15 18.6 29.25C18.6 31.35 18 33 16.8 34.2C15.6 35.4 14.1 36 13.5 36ZM40.5 36C36.9 36 33.9 34.95 31.5 32.85C28.5 30.15 27 26.4 27 21.6C27 16.8 28.95 12.3 32.85 8.1C36.75 3.9 41.55 0.899998 47.25 0L49.2 5.4C44.7 6.6 41.25 8.55 38.85 11.25C36.45 13.95 35.25 16.5 35.25 18.9C35.25 20.1 35.7 21 36.6 21.6C37.5 22.2 38.4 22.5 39.3 22.5C41.1 22.5 42.6 23.1 43.8 24.3C45 25.5 45.6 27.15 45.6 29.25C45.6 31.35 45 33 43.8 34.2C42.6 35.4 41.1 36 40.5 36Z" />
                  </svg>
                  
                  <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Alumni;