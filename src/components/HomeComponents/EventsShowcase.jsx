// src/components/HomeComponents/EventsShowcase.jsx - Replaces ProjectsShowcase
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const EventCard = ({ title, category, image, link, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className="h-80 relative rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-80' : 'opacity-60'
        }`} />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
            transition: { duration: 0.3 }
          }}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-3">
            {category}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
              transition: { duration: 0.3 }
            }}
          >
            <Link 
              href={link} 
              className="inline-block mt-2 text-blue-300 hover:text-blue-200 transition-colors"
            >
              Learn more →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EventsShowcase = () => {
  // Featured events data - using the same UI as projects but with events
  const events = [
    {
      id: 1,
      title: "Opulence 2024",
      category: "Annual Symposium",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/zdcnmfzelmh4u20wyr1x.jpg",
      link: "/Events/Opulence2024"
    },
    {
      id: 2,
      title: "AAC Expo 2023",
      category: "Technology Exhibition",
      image: "https://res.cloudinary.com/aacgriet/image/upload/v1730825380/AAC-web/news_events/opulence2023/gor2ysygdbqylqjgqybv.jpg",
      link: "/Events/Expo2023"
    },
    {
      id: 3,
      title: "Cyber Security Seminar",
      category: "Educational Workshop",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg",
      link: "/Events/CyberSecuritySeminar"
    },
    {
      id: 4,
      title: "AAC Lab Inauguration",
      category: "Milestone Event",
      image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
      link: "/Events/Labstart"
    }
  ];
  
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4"
        >
          Our Events
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl text-white font-bold mb-6"
        >
          Featured Events
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xl text-white max-w-3xl mx-auto mb-10"
        >
          Discover our workshops, seminars, competitions, and exhibitions that inspire innovation and learning.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex justify-center mt-12"
      >
        <Link 
          href="/Events" 
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-shadow"
        >
          View All Events
        </Link>
      </motion.div>
    </div>
  );
};

export default EventsShowcase;