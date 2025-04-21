import React from 'react';
import Link from 'next/link';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';

const ProjectCard = ({ id, title, date }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-200 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-5">
        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-5">
          <IoAnalyticsSharp className="text-yellow-500" size={20} />
        </div>
        
        <Link href={`/projects/${id}`}>
          <h3 className="text-lg font-serif font-bold mb-2 hover:underline">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-800 mt-2">{date}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;