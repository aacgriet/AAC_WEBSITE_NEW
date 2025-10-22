// src/pages/Research/index.js - MODERNIZED UI VERSION
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import SectionParticles from '@/components/SectionParticles';

const QuickLinks = [
  { 
    name: "Publications", 
    path: "/Publications",
    icon: "📄",
    description: "Academic papers and research findings",
    gradient: "from-purple-500 to-purple-600"
  },
  { 
    name: "Patents", 
    path: "/Patents",
    icon: "⚖️",
    description: "Intellectual property and innovations",
    gradient: "from-amber-500 to-amber-600"
  },
  { 
    name: "Startups", 
    path: "/Startups",
    icon: "🏢",
    description: "Entrepreneurial ventures and ideas",
    gradient: "from-emerald-500 to-emerald-600"
  },
  { 
    name: "Books & Blogs", 
    path: "/Books",
    icon: "📚",
    description: "Publications and knowledge sharing",
    gradient: "from-indigo-500 to-indigo-600"
  },
  { 
    name: "Hackathon", 
    path: "#",
    icon: "🏆",
    description: "Join exciting hackathon events and challenges",
    gradient: "from-red-500 to-red-600",
    isExternal: true
  },
];

const LinkBox = ({ children, path, icon, description, gradient, isExternal, onClick }) => {
  const handleClick = (e) => {
    if (isExternal && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link href={path}>
      <motion.div
        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col items-center text-center overflow-hidden"
        whileHover={{ 
          scale: 1.03,
          y: -8
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onClick={handleClick}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
        
        {/* Icon with gradient background */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
        
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {children}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
        
        {/* Subtle arrow indicator */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-sm">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const ResearchPage = () => {
  // Handle hackathon link click
  const handleHackathonClick = () => {
    window.open('https://docs.google.com/forms/d/1R9ANe21fM1yI1mhzR29ArysdJmNFARASlrfBE0gdVKQ/preview', '_blank');
  };

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

      {/* Hero Section - Enhanced with modern gradients */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto mt-7 px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Enhanced badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Advanced Academic Center</span>
            </motion.div>
            
            {/* Enhanced title with gradient text */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Research
              </span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Hub
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our comprehensive research ecosystem featuring innovative projects, 
              groundbreaking publications, and transformative solutions.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Quick Links Section - Enhanced */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Enhanced Title Section */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Animated gradient line */}
              <motion.div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Quick Links
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Access our research domains and explore the various facets of innovation at AAC.
              </p>
              
              {/* Added decorative element */}
              <div className="hidden lg:block mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced Links Grid */}
          <div className="lg:w-2/3">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={parentVariants}
              initial="hidden"
              animate="visible"
            >
              {QuickLinks.map((link, index) => (
                <motion.div 
                  key={link.name} 
                  variants={childVariants}
                  custom={index}
                >
                  <LinkBox 
                    path={link.path} 
                    icon={link.icon}
                    description={link.description}
                    gradient={link.gradient}
                    isExternal={link.isExternal}
                    onClick={link.name === "Hackathon" ? handleHackathonClick : undefined}
                  >
                    {link.name}
                  </LinkBox>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { number: "50+", label: "Active Projects", icon: "🚀", gradient: "from-blue-500 to-blue-600" },
            { number: "10+", label: "Publications", icon: "📄", gradient: "from-purple-500 to-purple-600" },
            { number: "10+", label: "Patents Filed", icon: "⚖️", gradient: "from-amber-500 to-amber-600" },
            { number: "100+", label: "Research Hours", icon: "⏱️", gradient: "from-emerald-500 to-emerald-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 text-center overflow-hidden"
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
              
              {/* Number with gradient */}
              <div className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="text-gray-300 font-medium text-lg group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
              
              {/* Subtle glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-300 -z-10`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Added call-to-action section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Explore?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Dive deeper into our research initiatives and discover how we're shaping the future through innovation and academic excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/projects">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </Link>
              <Link href="/Publications">
                <motion.button
                  className="px-8 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Publications
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResearchPage;