// src/components/HomeComponents/Drone.jsx
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Drone = () => {
  const animationContainer = useRef(null);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Import Lottie only on client-side
      import('lottie-web').then((Lottie) => {
        // We'll use a placeholder animation
        const animationPath = 'https://assets1.lottiefiles.com/packages/lf20_mjlh3hcy.json';

        
        const anim = Lottie.default.loadAnimation({
          container: animationContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationPath,
        });
        
        anim.setSpeed(1.5);
        
        // Clean up
        return () => anim.destroy();
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DRONES CLUB
          </h2>
          <p className="text-2xl md:text-3xl text-blue-300 mb-6">
            Fly above and beyond!
          </p>
          <ul className="text-gray-400 space-y-2 mb-8">
            <li>- Provide insight into blooming drones field</li>
            <li>- Train students in the field of drones</li>
            <li>- Provide guidance on how to integrate various domain experience to provide viable solutions</li>
          </ul>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link href="/ComingSoon" className="bg-blue-600 text-white py-3 px-6 rounded-full text-center hover:bg-blue-700 transition duration-300">
              Check In
            </Link>
            <button className="bg-transparent border border-white text-white py-3 px-6 rounded-full text-center">
              Started at: 22-04-2022
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div ref={animationContainer} className="w-full h-full" />
      </motion.div>
    </div>
  );
};

export default Drone;