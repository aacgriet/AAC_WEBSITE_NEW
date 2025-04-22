// src/components/HomeComponents/ExploreSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover-effect';

const ExploreSection = () => {
  const exploreItems = [
    {
      title: "Vision & Mission",
      description: "AAC aspires to be a pre-eminent student-focused research unit, preparing young minds in design thinking and innovation for societal problems.",
      icon: "🚀",
      link: "#vision",
    },
    {
      title: "Who We Are",
      description: "An inter-disciplinary research centre committed to excellence in teaching, learning, and research, bringing together experts with diverse backgrounds.",
      icon: "🔍",
      link: "#who-we-are",
    },
    {
      title: "What We Offer",
      description: "Workshops, mentorship from industry experts, sponsored R&D projects, and opportunities to learn scientific and technical skills for real-world applications.",
      icon: "🎓",
      link: "#what-we-offer",
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
          className="text-4xl md:text-5xl text-white font-bold mb-6"
        >
          Explore What We Do
        </motion.h2>
      </div>
      
      {/* New Hover Effect Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <HoverEffect items={exploreItems} />
      </motion.div>
    </div>
  );
};

export default ExploreSection;