// src/components/LoadingSpinner.jsx - Consistent loading component
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
    ? "fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50"
    : `flex flex-col items-center justify-center ${config.container} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden ${className}`;

  return (
    <div className={containerClasses}>
      {/* Enhanced Global Breathing Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-6 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Multi-layered spinner */}
        <div className="relative mb-6">
          <div className={`${config.spinner} border-white/10 border-t-blue-500 rounded-full animate-spin`}></div>
          <div className={`absolute inset-0 ${config.spinner} border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150`}></div>
          <div className={`absolute inset-2 ${config.spinner.replace('w-12 h-12', 'w-8 h-8').replace('w-16 h-16', 'w-12 h-12').replace('w-20 h-20', 'w-16 h-16').replace('w-6 h-6', 'w-4 h-4')} border-transparent border-t-indigo-400 rounded-full animate-spin animation-delay-300`}></div>
        </div>
        
        {showText && (
          <motion.p 
            className={`text-white ${config.text} font-medium`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {text}
          </motion.p>
        )}

        {/* Pulsing dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
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