// src/components/PageHero.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle, tag, highlightTitle = false }) => {
  return (
    <div className="relative bg-gradient-to-b from-blue-900 to-indigo-900 py-20 mb-12">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-4">
            {tag || "Advanced Academic Center"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {highlightTitle ? (
              <>
                {title} <span className="text-blue-300">@AAC</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PageHero;