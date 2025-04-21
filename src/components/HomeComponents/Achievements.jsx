import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Achievement = ({ src, title }) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image 
        src={src} 
        alt={title} 
        width={350} 
        height={250} 
        className="rounded-xl shadow-2xl object-cover"
      />
      <h3 className="text-black font-semibold text-xl mt-6 text-center">{title}</h3>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <div className="py-16 bg-[#88B0D7]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-16 pl-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-14 justify-center items-center mb-10 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Achievement 
              src="https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg"
              title="Vishwakarma Award 2018"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Achievement 
              src="https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg"
              title="Signing an MOU with NRSC"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Achievement 
              src="https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg"
              title="Several Hackathons Winners"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;