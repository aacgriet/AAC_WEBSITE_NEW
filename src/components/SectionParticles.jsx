// src/components/SectionParticles.jsx
import React from 'react';
import { themeColors } from './CSSHeroAnimation';

const SectionParticles = ({ density = 'medium', variant = 'light' }) => {
  // Determine number of particles based on density
  let particleCount = 30; // default medium
  if (density === 'low') particleCount = 15;
  if (density === 'high') particleCount = 50;
  
  // Determine color scheme based on variant
  const getParticleColor = () => {
    switch(variant) {
      case 'dark':
        return { color: '#333', shadow: 'rgba(0, 0, 0, 0.3)' };
      case 'accent':
        return { color: themeColors.primaryAccent, shadow: themeColors.primaryAccent };
      case 'light':
      default:
        return { color: 'white', shadow: 'rgba(255, 255, 255, 0.4)' };
    }
  };
  
  const particleColor = getParticleColor();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background particles */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            backgroundColor: particleColor.color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            boxShadow: `0 0 10px 2px ${particleColor.shadow}`,
            animation: `floatParticle ${Math.random() * 20 + 20}s linear infinite`,
          }}
        />
      ))}
      
      {/* Small orbs - fewer than hero */}
      {[...Array(Math.floor(particleCount / 10))].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            backgroundColor: i % 2 === 0 ? themeColors.secondaryAccent1 : themeColors.secondaryAccent2,
            opacity: 0.1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 30 + 20}px`,
            height: `${Math.random() * 30 + 20}px`,
            filter: 'blur(8px)',
            animation: `pulse ${Math.random() * 8 + 4}s ease-in-out infinite alternate, 
                       moveSlowly ${Math.random() * 40 + 20}s linear infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default SectionParticles;