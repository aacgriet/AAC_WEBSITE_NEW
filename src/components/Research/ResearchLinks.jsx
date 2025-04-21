import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const QuickLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Publications", path: "/Publications" },
  { name: "Patents", path: "/Patents" },
  { name: "Startups", path: "/Startups" },
  { name: "Alumni", path: "/Alumni" },
  { name: "Books & Blogs", path: "/Books" },
];

const LinkBox = ({ children, path }) => {
  return (
    <Link href={path}>
      <motion.div
        className="bg-black w-40 h-40 flex items-center justify-center shadow-2xl cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p className="text-white text-center px-4 py-4">{children}</p>
      </motion.div>
    </Link>
  );
};

const ResearchLinks = () => {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="container mx-auto my-28">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="flex-3 w-full flex justify-center items-center">
          <div className="w-full md:w-80 h-20 md:h-80 border-b-6 md:border-b-0 md:border-l-6 border-black my-7 flex items-center justify-center">
            <h2 className="text-black text-4xl md:text-6xl font-serif py-2 md:py-20 text-center">
              Quick Links
            </h2>
          </div>
        </div>
        
        <div className="flex-2 w-full flex justify-center items-center">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-items-center"
            variants={parentVariants}
            initial="hidden"
            animate="visible"
          >
            {QuickLinks.map((link) => (
              <motion.div key={link.name} variants={childVariants}>
                <LinkBox path={link.path}>{link.name}</LinkBox>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResearchLinks;