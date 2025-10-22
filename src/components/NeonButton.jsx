// src/components/NeonButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// A reusable neon button component with the requested styling
const NeonButton = ({ 
  children, 
  href, 
  onClick,
  className = "",
  color = "#57e1ff",
  glowIntensity = "md"
}) => {
  // Determine glow intensity class
  const getGlowClass = () => {
    switch(glowIntensity) {
      case 'sm': return 'shadow-[0_0_5px]';
      case 'lg': return 'shadow-[0_0_25px]';
      case 'xl': return 'shadow-[0_0_35px]';
      default: return 'shadow-[0_0_15px]';  // 'md' is default
    }
  };

  const buttonClasses = `
    px-6 py-3 
    rounded-full 
    border-2 
    bg-opacity-20 
    backdrop-blur-md 
    font-medium 
    transition-all 
    hover:bg-opacity-30 
    ${getGlowClass()}
  `;

  const buttonStyle = {
    borderColor: color,
    boxShadow: `0 0 15px ${color}`,
    color: 'white',
  };

  const hoverAnimation = {
    scale: 1.05,
    boxShadow: `0 0 25px ${color}`,
    textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
  };

  const tapAnimation = {
    scale: 0.95,
  };

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href}>
        <motion.a
          className={`${buttonClasses} ${className}`}
          style={buttonStyle}
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      className={`${buttonClasses} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;