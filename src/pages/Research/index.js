// src/pages/Research/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SectionParticles from '@/components/SectionParticles';

const QuickLinks = [
  { 
    name: "Projects", 
    path: "/projects",
    icon: "🚀",
    description: "Explore innovative research projects"
  },
  { 
    name: "Publications", 
    path: "/Publications",
    icon: "📄",
    description: "Academic papers and research findings"
  },
  { 
    name: "Patents", 
    path: "/Patents",
    icon: "⚖️",
    description: "Intellectual property and innovations"
  },
  { 
    name: "Startups", 
    path: "/Startups",
    icon: "🏢",
    description: "Entrepreneurial ventures and ideas"
  },
  { 
    name: "Alumni", 
    path: "/Alumni",
    icon: "🎓",
    description: "Our successful graduates"
  },
  { 
    name: "Books & Blogs", 
    path: "/Books",
    icon: "📚",
    description: "Publications and knowledge sharing"
  },
];

const LinkBox = ({ children, path, icon, description }) => {
  return (
    <Link href={path}>
      <motion.div
        className="bg-gradient-to-br from-[#1a2535] to-[#0e1421] rounded-2xl p-6 shadow-xl cursor-pointer border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col items-center text-center group"
        whileHover={{ 
          scale: 1.02,
          y: -5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-white text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {children}
        </h3>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </motion.div>
    </Link>
  );
};

const ResearchPage = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Research | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore our research initiatives, projects, publications, patents, and innovations at the Advanced Academic Center." />
      </Head>

      {/* Hero Section - FIXED: No gap, covers from top, no particles above */}
      <div className="relative bg-gradient-to-b from-blue-900 to-indigo-900 pt-24 pb-20 mb-12">
        {/* <div className="absolute inset-0 overflow-hidden">
          <SectionParticles density="medium" variant="light" />
        </div> */}
        
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[50%] bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] -right-[5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto mt-7 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full mb-4">
              Advanced Academic Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Research <span className="text-blue-300">Hub</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our comprehensive research ecosystem featuring innovative projects, 
              groundbreaking publications, and transformative solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Title Section */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1 w-20 mx-auto lg:mx-0 mb-6 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Quick Links
              </h2>
              <p className="text-gray-400 text-lg">
                Access our research domains and explore the various facets of innovation at AAC.
              </p>
            </motion.div>
          </div>
          
          {/* Links Grid */}
          <div className="lg:w-2/3">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={parentVariants}
              initial="hidden"
              animate="visible"
            >
              {QuickLinks.map((link) => (
                <motion.div key={link.name} variants={childVariants}>
                  <LinkBox 
                    path={link.path} 
                    icon={link.icon}
                    description={link.description}
                  >
                    {link.name}
                  </LinkBox>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { number: "50+", label: "Active Projects" },
            { number: "10+", label: "Publications" },
            { number: "10+", label: "Patents Filed" },
            { number: "100+", label: "Research Hours" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-gradient-to-br from-[#1a2535] to-[#0e1421] rounded-xl p-6 border border-gray-700"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResearchPage;