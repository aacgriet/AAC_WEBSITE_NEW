// src/components/CSSHeroAnimation.jsx - Fixed to fit exactly full screen with seamless button animation
import React from 'react';
import { motion } from 'framer-motion';

// Export the colors so they can be used consistently across the site
export const themeColors = {
  darkBg: '#0e1421',
  lightBg: '#1a2535',
  primaryAccent: '#57e1ff',
  secondaryAccent1: '#3b82f6', // blue-500
  secondaryAccent2: '#4f46e5', // indigo-600
};

const CSSHeroAnimation = () => {
  // Function to handle smooth scroll to the next section
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="relative w-full overflow-hidden hero-section" 
      style={{ 
        backgroundColor: themeColors.darkBg,
        height: '100vh', // Exactly full viewport height
        minHeight: '100vh', // Ensure minimum full height
        maxHeight: '100vh', // Prevent exceeding viewport
      }}
    >
      {/* Particles Background - Pure CSS */}
      <div className="absolute inset-0">
        {/* Generate 120 particle elements with random positions */}
        {[...Array(120)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.4)',
              animation: `floatParticle ${Math.random() * 20 + 10}s linear infinite`,
            }}
          />
        ))}
        
        {/* Gradients that move */}
        <div
          className="absolute rounded-full opacity-10"
          style={{
            backgroundColor: themeColors.secondaryAccent1,
            top: '30%',
            left: '20%',
            width: '40vw', 
            height: '40vw',
            filter: 'blur(80px)',
            animation: 'moveGradient 25s ease-in-out infinite alternate'
          }}
        />
        
        <div
          className="absolute rounded-full opacity-10"
          style={{
            backgroundColor: themeColors.secondaryAccent2,
            bottom: '10%',
            right: '15%',
            width: '35vw', 
            height: '35vw',
            filter: 'blur(100px)',
            animation: 'moveGradient 30s ease-in-out infinite alternate-reverse'
          }}
        />
      </div>
      
      {/* Content Overlay - Centered vertically */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-7xl font-normal mb-6 text-gradient"
          style={{ 
            fontFamily: '"Work Sans Variable", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: 400
          }}
        >
          Advanced Academic Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-12 text-gray-100"
          style={{ 
            fontFamily: '"Work Sans Variable", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: 400
          }}
        >
          Innovation • Research • Excellence
        </motion.p>

        {/* Seamless Button Animation */}
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier easing
            scale: {
              type: "spring",
              stiffness: 200,
              damping: 20
            }
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
          className="px-8 py-3 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-white font-normal transition-all hover:bg-opacity-30"
          style={{ 
            fontFamily: '"Work Sans Variable", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontWeight: 400,
            borderWidth: '2px',
            borderColor: themeColors.primaryAccent,
            boxShadow: `0 0 15px ${themeColors.primaryAccent}`
          }}
        >
          Explore
        </motion.button>
      </div>
      
      {/* Down indicator - Positioned absolutely at bottom */}
      <div 
        className="absolute bottom-8 left-0 right-0 flex justify-center z-10 animate-bounce cursor-pointer"
        onClick={scrollToNextSection}
      >
        <svg 
          className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-opacity" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
      
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(100px, 50px);
          }
          50% {
            transform: translate(50px, 100px);
          }
          75% {
            transform: translate(-50px, 50px);
          }
        }
        
        @keyframes moveGradient {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20vw, 20vh);
          }
        }

        /* Ensure the hero section takes exactly full viewport */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        /* Gradient text effect */
        .text-gradient {
          background: linear-gradient(135deg, #ffffff 0%, #57e1ff 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default CSSHeroAnimation;