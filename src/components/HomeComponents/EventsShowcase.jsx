// src/components/HomeComponents/EventsShowcase.jsx - Updated with Modern Premium UI
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ title, category, image, link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-90' : 'opacity-70'
        }`} />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            transition: { duration: 0.3 }
          }}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 backdrop-blur-sm">
              {category}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {title}
          </h3>
          
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
              transition: { duration: 0.3 }
            }}
          >
            <Link 
              href={link}
              className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mt-3"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Learn More
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EventsShowcase = () => {
  // Featured events data
  const events = [
    {
      id: 1,
      title: "Opulence 2024",
      category: "Annual Symposium",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1750058934/AAC-web/Testing%20image/ChatGPT_Image_Jun_16_2025_12_58_41_PM_inchge.png",
      link: "/Events/Opulence2024"
    },
    {
      id: 2,
      title: "AAC Expo 2023",
      category: "Technology Exhibition",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
      link: "/Events/Expo2023"
    },
    {
      id: 3,
      title: "Cyber Security Seminar",
      category: "Educational Workshop",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1666085799/AAC-web/news_events/Cyber/seminar3_i9q4eu.jpg",
      link: "/Events/CyberSecuritySeminar"
    },
    {
      id: 4,
      title: "AAC Lab Inauguration",
      category: "Milestone Event",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1666085802/AAC-web/news_events/aac%20lab%20inaugural/inauguration3_ndi6na.jpg",
      link: "/Events/Labstart"
    }
  ];
  
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Our Events</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
            Featured
          </span>{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Events
          </span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed mb-8"
        >
          Discover our workshops, seminars, competitions, and exhibitions that inspire innovation and learning.
        </motion.p>

        {/* Decorative dots */}
        <div className="flex justify-center items-center gap-3 mb-12">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { 
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            title={event.title}
            category={event.category}
            image={event.image}
            link={event.link}
            index={index}
          />
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex justify-center"
      >
        <Link 
          href="/Events"
          className="group/btn px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 flex items-center gap-3"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FaCalendar />
            View All Events
            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </motion.div>
    </div>
  );
};

export default EventsShowcase;