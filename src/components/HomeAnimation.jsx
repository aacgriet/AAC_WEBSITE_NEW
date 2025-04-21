import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateCircles = (count) =>
  Array.from({ length: count }).map(() => ({
    width: Math.random() * 200 + 50,
    height: Math.random() * 200 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
  }));

const HomeAnimation = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    setCircles(generateCircles(20)); // only on client
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#172E7C] to-black overflow-hidden">
      {/* Animated circles */}
      <div className="absolute inset-0">
        {circles.map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              width: circle.width,
              height: circle.height,
              left: circle.left,
              top: circle.top,
            }}
            animate={{
              x: [0, circle.x],
              y: [0, circle.y],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Your content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-center text-shadow-lg"
        >
          Advanced Academic Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-center max-w-2xl mx-auto text-shadow-md"
        >
          Innovation • Research • Excellence
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 bg-white text-[#172E7C] px-8 py-3 rounded-full font-medium"
        >
          Explore
        </motion.button>
      </div>
    </div>
  );
};

export default HomeAnimation;
