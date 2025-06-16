import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { FaArrowLeft, FaCalendar, FaUserAlt, FaFolder, FaShare, FaHeart, FaBookmark, FaClock, FaTags } from 'react-icons/fa';

const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: projects, loading } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  
  const [project, setProject] = useState(null);
  const [moreProjects, setMoreProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Find the project by ID
  useEffect(() => {
    if (id && projects.length > 0) {
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject);
      
      // Get random projects for "More Projects" section
      const otherProjects = projects
        .filter(p => p.id !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setMoreProjects(otherProjects);
    }
  }, [id, projects]);

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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-xl text-gray-400">Loading project...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-gray-400 text-lg mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Back to Projects
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const publishDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';

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
        <meta name="description" content={project.description || project._rawBody || 'AAC Project Details'} />
      </Head>
      
      {/* Project Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Background Image Overlay */}
        {project.mainImage?.asset?.url && (
          <>
            <div className="absolute inset-0">
              <Image
                src={project.mainImage.asset.url}
                alt={project.title}
                fill
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/80 to-indigo-900/80"></div>
            </div>
          </>
        )}
        
        <div className="container mx-auto mt-7 px-4 relative z-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors duration-200">
            <FaArrowLeft /> Back to Projects
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center text-blue-100/80 mb-6">
              {publishDate && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <FaCalendar />
                  <span>{publishDate}</span>
                </div>
              )}
              {project.author && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <FaUserAlt />
                  <span>{project.author}</span>
                </div>
              )}
              {project.categories && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <FaFolder />
                  <span>{project.categories}</span>
                </div>
              )}
              {project.status && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <FaClock />
                  <span className="capitalize">{project.status}</span>
                </div>
              )}
            </div>
            
            {project.description && (
              <p className="text-xl text-blue-100/90 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Sticky Navigation Bar */}
      <motion.div 
        className={`sticky top-20 z-30 py-4 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-white/5 shadow-xl border-b border-white/20' : 'bg-transparent'
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
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Overview
              </button>
              {project.names && project.names.length > 0 && (
                <button
                  onClick={() => setActiveTab('team')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === 'team' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Team
                </button>
              )}
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'gallery' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Gallery
              </button>
            </div>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikes(isLiked ? likes - 1 : likes + 1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                }`}
              >
                <FaHeart />
                <span>{likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                }`}
              >
                <FaBookmark />
                <span>Save</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200"
              >
                <FaShare />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 pb-24">
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
                  className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10"
                >
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-8 rounded-full shadow-lg"></div>
                  
                  <motion.h2 
                    variants={fadeIn}
                    className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  >
                    Project Overview
                  </motion.h2>
                  
                  <motion.div variants={fadeIn}>
                    {project._rawBody || project.body ? (
                      <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {project._rawBody || project.body}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-lg">
                        No detailed information available for this project. Please check back later or contact the team for more information.
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Project Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Status", value: project.status || 'Completed' },
                      { label: "Duration", value: "6 months" },
                      { label: "Category", value: project.categories || 'Research' },
                      { label: "Date", value: publishDate }
                    ].map((detail, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                        <div className="flex-1">
                          <span className="text-gray-400 text-sm block mb-1">{detail.label}</span>
                          <span className="text-gray-300 font-medium">{detail.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                {project.names && project.names.length > 0 && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-6 border border-white/10"
                  >
                    <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Team Members</h3>
                    <div className="space-y-3">
                      {project.names.map((name, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {name.charAt(0)}
                          </div>
                          <span className="text-gray-300 font-medium">{name}</span>
                        </div>
                      ))}
                    </div>
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
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-8 rounded-full shadow-lg"></div>
                
                <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Team Members</h2>
                
                {project.names && project.names.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.names.map((name, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group backdrop-blur-sm bg-white/5 rounded-2xl p-6 flex flex-col items-center border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white text-center">{name}</h3>
                        <p className="text-gray-400 text-center mb-4">Team Member</p>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                          Contact
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-lg">No team information available for this project.</p>
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
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-8 border border-white/10">
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-8 rounded-full shadow-lg"></div>
                
                <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Project Gallery</h2>
                
                {project.mainImage?.asset?.url ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                    >
                      <Image
                        src={project.mainImage.asset.url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                    
                    <div className="flex items-center justify-center text-gray-400 h-full backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-center">More project images will be available soon.</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-lg">No gallery images available for this project.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* More Projects */}
        {moreProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Title Section */}
              <div className="lg:w-1/3">
                <div className="text-center lg:text-left">
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      More Projects
                    </span>
                  </h2>
                  
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                    Explore other innovative projects from our research and development initiatives.
                  </p>
                  
                  <div className="hidden lg:block mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Projects Grid */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {moreProjects.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                          {item.description || item._rawBody || "Explore this innovative project..."}
                        </p>
                        <Link 
                          href={`/projects/${item.id}`}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                          View details
                          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
export default ProjectDetail;