// src/components/LoadingSpinner.jsx - Fixed centering issues
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  showText = true,
  className = ''
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 'w-6 h-6 border-2',
      container: 'min-h-[100px]',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-12 h-12 border-4',
      container: 'min-h-[200px]',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-16 h-16 border-4',
      container: 'min-h-[300px]',
      text: 'text-lg'
    },
    xl: {
      spinner: 'w-20 h-20 border-4',
      container: 'min-h-[400px]',
      text: 'text-xl'
    }
  };

  const config = sizeConfig[size];

  // Container classes
  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center z-50"
    : `flex flex-col items-center justify-center ${config.container} ${className}`;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Multi-layered spinner - Properly centered */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <div className={`${config.spinner} border-white/10 border-t-blue-500 rounded-full animate-spin`}></div>
            <div className={`absolute inset-0 ${config.spinner} border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150`}></div>
            <div className={`absolute inset-2 ${config.spinner.replace('w-12 h-12', 'w-8 h-8').replace('w-16 h-16', 'w-12 h-12').replace('w-20 h-20', 'w-16 h-16').replace('w-6 h-6', 'w-4 h-4')} border-transparent border-t-indigo-400 rounded-full animate-spin animation-delay-300`}></div>
          </div>
        </div>
        
        {showText && (
          <motion.p 
            className={`text-white ${config.text} font-medium text-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {text}
          </motion.p>
        )}

        {/* Pulsing dots - Centered */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

// Page Loading Component (for full page loads)
export const PageLoading = ({ text = "Loading page..." }) => (
  <LoadingSpinner 
    size="lg" 
    text={text} 
    fullScreen={true} 
  />
);

// Content Loading Component (for sections)
export const ContentLoading = ({ text = "Loading content...", size = "md" }) => (
  <LoadingSpinner 
    size={size} 
    text={text} 
    fullScreen={false} 
  />
);

// Small Loading Component (for buttons, inline elements)
export const SmallLoading = ({ text = "Loading...", showText = false }) => (
  <LoadingSpinner 
    size="sm" 
    text={text} 
    showText={showText}
    fullScreen={false}
    className="min-h-[60px]"
  />
);

// Data Loading Component (for admin panels, data tables)
export const DataLoading = ({ text = "Loading data..." }) => (
  <div className="bg-[#1a2535] rounded-xl shadow-xl border border-gray-700 overflow-hidden">
    <LoadingSpinner 
      size="md" 
      text={text} 
      fullScreen={false}
      className="bg-[#1a2535] min-h-[300px]"
    />
  </div>
);

export default LoadingSpinner;