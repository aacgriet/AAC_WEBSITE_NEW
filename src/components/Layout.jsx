// src/components/Layout.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  // Effect for smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Set background color
    document.body.style.backgroundColor = '#0e1421';
    document.documentElement.style.backgroundColor = '#0e1421';
    
    // Prevent multiple scrollbars
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99],
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen" 
      style={{ 
        backgroundColor: '#0e1421',
        overflow: 'hidden'  // Prevent double scrollbars
      }}
    >
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow w-full"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          style={{ backgroundColor: '#0e1421' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Layout;