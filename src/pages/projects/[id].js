// src/pages/projects/[id].js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import Layout from '@/components/Layout';
import { getAllProjects, getProjectById } from '@/lib/sanity';
import { FaArrowLeft, FaCalendar, FaUserAlt, FaFolder, FaShare, FaHeart, FaBookmark } from 'react-icons/fa';

export async function getStaticPaths() {
  const projects = await getAllProjects();
  
  const paths = projects.map((project) => ({
    params: { id: project._id },
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const project = await getProjectById(params.id);
  
  if (!project) {
    return {
      notFound: true,
    };
  }
  
  // Get a selection of random projects for "More Projects" section
  const allProjects = await getAllProjects();
  const moreProjects = allProjects
    .filter(p => p._id !== project._id)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 3); // Take first 3
  
  return {
    props: {
      project,
      moreProjects
    },
    revalidate: 60 // Revalidate every minute
  };
}

const ProjectDetail = ({ project, moreProjects }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const [likes, setLikes] = useState(42); // Sample starting value
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const publishDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';
  
  // Components for portable text content
  const components = {
    block: {
      normal: ({ children }) => <p className="text-base md:text-lg mb-6 text-gray-300">{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{children}</h3>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-300">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-300">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-2">{children}</li>,
      number: ({ children }) => <li className="mb-2">{children}</li>,
    },
  };
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>{project.title} | AAC Projects</title>
        <meta name="description" content={project.slug || 'AAC Project Details'} />
      </Head>
      
      {/* Project Header */}
      <div className="relative h-[60vh] bg-blue-900">
        {/* Background Image or Gradient */}
        {project.mainImage ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={project.mainImage.url}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-900/60 to-blue-900"></div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900"></div>
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-16">
          <div className="container mx-auto max-w-6xl relative z-10">
            <Link href="/projects" className="inline-flex items-center text-white mb-6 hover:underline">
              <FaArrowLeft className="mr-2" /> Back to Projects
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 items-center text-white/80">
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center">
                  <FaUserAlt className="mr-2" />
                  <span>{project.author || 'AAC Team'}</span>
                </div>
                <div className="flex items-center">
                  <FaFolder className="mr-2" />
                  <span>{project.categories || 'Research'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Sticky Navigation Bar */}
      <motion.div 
        className={`sticky top-20 z-30 py-4 transition-all duration-300 ${
          scrolled ? 'bg-[#0e1421] shadow-md border-b border-gray-800' : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 transition-colors ${
                  activeTab === 'overview' 
                    ? 'text-blue-400 border-b-2 border-blue-400 font-medium' 
                    : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                Overview
              </button>
              {project.names && project.names.length > 0 && (
                <button
                  onClick={() => setActiveTab('team')}
                  className={`px-4 py-2 transition-colors ${
                    activeTab === 'team' 
                      ? 'text-blue-400 border-b-2 border-blue-400 font-medium' 
                      : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  Team
                </button>
              )}
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 transition-colors ${
                  activeTab === 'gallery' 
                    ? 'text-blue-400 border-b-2 border-blue-400 font-medium' 
                    : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                Gallery
              </button>
            </div>
            
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikes(isLiked ? likes - 1 : likes + 1);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
                  isLiked 
                    ? 'bg-red-900/50 text-red-400 border border-red-700/50' 
                    : 'bg-[#1a2535] text-gray-300 hover:bg-[#1a2535]/80 border border-gray-700'
                }`}
              >
                <FaHeart className={isLiked ? 'text-red-400' : 'text-gray-500'} />
                <span>{likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${
                  isBookmarked 
                    ? 'bg-blue-900/50 text-blue-400 border border-blue-700/50' 
                    : 'bg-[#1a2535] text-gray-300 hover:bg-[#1a2535]/80 border border-gray-700'
                }`}
              >
                <FaBookmark className={isBookmarked ? 'text-blue-400' : 'text-gray-500'} />
                <span>Save</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#1a2535] text-gray-300 hover:bg-[#1a2535]/80 border border-gray-700"
              >
                <FaShare className="text-gray-500" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="bg-[#1a2535] rounded-2xl shadow-lg p-8 border border-gray-700"
                  >
                    <motion.h2 
                      variants={fadeIn}
                      className="text-2xl font-bold mb-6 pb-4 border-b border-gray-700 text-white"
                    >
                      Project Overview
                    </motion.h2>
                    
                    <motion.div variants={fadeIn} className="prose prose-lg max-w-none prose-invert">
                      {project._rawBody ? (
                        <PortableText
                          value={project._rawBody}
                          components={components}
                        />
                      ) : (
                        <p className="text-gray-400">
                          No detailed information available for this project. Please check back later or contact the team for more information.
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Sidebar */}
                <div>
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="bg-[#1a2535] rounded-2xl shadow-lg p-6 mb-6 border border-gray-700"
                  >
                    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">Project Details</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-medium text-gray-300">Completed</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium text-gray-300">6 months</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="font-medium text-gray-300">{project.categories || 'Research'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="font-medium text-gray-300">{publishDate}</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  {project.names && project.names.length > 0 && (
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                      className="bg-[#1a2535] rounded-2xl shadow-lg p-6 border border-gray-700"
                    >
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">Team Members</h3>
                      <ul className="space-y-2">
                        {project.names.map((name, index) => (
                          <li key={index} className="flex items-center py-1">
                            <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-300 font-medium mr-3">
                              {name.charAt(0)}
                            </div>
                            <span className="text-gray-300">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1a2535] rounded-2xl shadow-lg p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-700 text-white">Project Team</h2>
                  
                  {project.names && project.names.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.names.map((name, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="bg-[#0e1421] rounded-xl p-6 flex flex-col items-center border border-gray-700"
                        >
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-800 to-indigo-900 text-white flex items-center justify-center text-3xl font-bold mb-4 border border-blue-700/50">
                            {name.charAt(0)}
                          </div>
                          <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
                          <p className="text-gray-400 text-center">Team Member</p>
                          <div className="mt-4 flex space-x-2">
                            <button className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full hover:bg-blue-900/50 transition-colors border border-blue-700/50">
                              Contact
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No team information available for this project.</p>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1a2535] rounded-2xl shadow-lg p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-700 text-white">Project Gallery</h2>
                  
                  {project.mainImage ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={project.mainImage.url}
                          alt={project.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                      
                      <p className="flex items-center justify-center text-gray-400 h-full">
                        More project images will be available soon.
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No gallery images available for this project.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* More Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">More Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreProjects.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -10 }}
                  className="bg-[#1a2535] rounded-xl shadow-lg overflow-hidden flex-shrink-0 border border-gray-700"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{item.slug || "Explore this innovative project..."}</p>
                    <Link 
                      href={`/projects/${item._id}`}
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      View details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;