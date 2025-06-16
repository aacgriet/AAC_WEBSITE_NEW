// src/components/HomeComponents/ExploreSection.jsx - Updated with Modern Premium UI
import React from 'react';
import { motion } from 'framer-motion';

const ExploreCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      <div className="p-8 relative z-10 flex flex-col h-full">
        {/* Icon with gradient background */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <span className="text-2xl">{item.icon}</span>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {item.title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed text-lg flex-1 group-hover:text-gray-300 transition-colors duration-300">
          {item.description}
        </p>
        
        {/* Decorative line */}
        <div className="mt-6 pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1 w-12 rounded-full shadow-lg group-hover:w-16 transition-all duration-300"></div>
        </div>
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Discover</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
            Explore What We
          </span>{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Do
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
        >
          Discover our commitment to academic excellence, innovation, and research that drives the future
        </motion.p>

        {/* Decorative dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse animation-delay-500"></div>
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </div>
      
      {/* Cards Grid */}
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
              delayChildren: 0.3
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {exploreItems.map((item, index) => (
          <ExploreCard key={index} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default ExploreSection;