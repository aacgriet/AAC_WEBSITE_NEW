// src/components/HomeComponents/ExploreSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ExploreCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl p-8 shadow-xl overflow-hidden"
    >
      <div className="relative z-10">
        {/* Card Background Blob */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 blur-2xl opacity-60 z-0" />
        
        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
          <span className="text-white text-2xl">{icon}</span>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ExploreSection = () => {
  const exploreItems = [
    {
      title: "Vision & Mission",
      description: "AAC aspires to be a pre-eminent student-focused research unit, preparing young minds in design thinking and innovation for societal problems.",
      icon: "🚀",
    },
    {
      title: "Who We Are",
      description: "An inter-disciplinary research centre committed to excellence in teaching, learning, and research, bringing together experts with diverse backgrounds.",
      icon: "🔍",
    },
    {
      title: "What We Offer",
      description: "Workshops, mentorship from industry experts, sponsored R&D projects, and opportunities to learn scientific and technical skills for real-world applications.",
      icon: "🎓",
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
          Discover
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Explore What We Do
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {exploreItems.map((item, index) => (
          <ExploreCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            delay={0.2 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;