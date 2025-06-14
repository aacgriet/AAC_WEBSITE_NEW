// src/pages/projects/index.js - Updated to use localStorage
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { FaSearch, FaFilter } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  const publishDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) 
    : '';
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 
      }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-[#1a2535] rounded-xl shadow-lg overflow-hidden border border-gray-700"
    >
      <div className="p-6">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-3 text-blue-300 hover:text-blue-200 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
            {project.categories || "Uncategorized"}
          </span>
          <span className="text-gray-400 text-sm">{publishDate}</span>
        </div>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.description || project.slug || "Explore this innovative project..."}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-400 text-sm">By: {project.author || "AAC Team"}</span>
          <Link
            href={`/projects/${project.id}`}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const { data: projects, loading } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Extract all unique categories
  const allCategories = ["all"];
  projects.forEach(project => {
    const category = project.categories || "Uncategorized";
    if (!allCategories.includes(category)) {
      allCategories.push(category);
    }
  });
  
  // Filter projects based on search term and category
  useEffect(() => {
    let filtered = projects.filter(project => project.status === 'published');
    
    filtered = filtered.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (project.author && project.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || project.categories === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    setFilteredProjects(filtered);
  }, [searchTerm, categoryFilter, projects]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3 
      }
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Loading projects...</div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Projects | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore innovative projects developed at Advanced Academic Center, GRIET" />
      </Head>
      
      <PageHero 
        title="Research & Development Projects" 
        subtitle="Discover innovative solutions and research projects developed by students and faculty at AAC."
        tag="Our Work"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Search and filter section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-[#1a2535] rounded-xl shadow-md border border-gray-700">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#0e1421] text-white"
                />
              </div>
              
              {/* Filter dropdown (mobile) */}
              <div className="relative md:hidden w-full">
                <button
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#0e1421] rounded-lg border border-gray-600 text-white"
                >
                  <span>Filter: {categoryFilter === "all" ? "All Categories" : categoryFilter}</span>
                  <FaFilter />
                </button>
                
                {isFilterMenuOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-[#1a2535] rounded-lg shadow-xl border border-gray-700">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setCategoryFilter(category);
                          setIsFilterMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-[#0e1421] text-white ${
                          categoryFilter === category ? "bg-blue-900/50 text-blue-300" : ""
                        }`}
                      >
                        {category === "all" ? "All Categories" : category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Category pills (desktop) */}
              <div className="hidden md:flex flex-wrap items-center gap-2">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === category
                        ? "bg-blue-900 text-blue-300 border border-blue-700"
                        : "bg-[#0e1421] text-gray-300 hover:bg-[#172E7C]/30 border border-gray-700"
                    }`}
                  >
                    {category === "all" ? "All" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Projects grid */}
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-12 text-center"
              >
                <div className="bg-[#1a2535] rounded-xl p-12 max-w-lg mx-auto border border-gray-700">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl text-white mb-4">No projects found</h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setCategoryFilter("all");
                    }}
                    className="px-6 py-2 bg-blue-900 text-blue-300 rounded-full hover:bg-blue-800 transition-colors border border-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

// src/pages/projects/[id].js - Updated to use localStorage
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLocalStorageItem, useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';
import { FaArrowLeft, FaCalendar, FaUserAlt, FaFolder, FaShare, FaHeart, FaBookmark, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export const ProjectDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { item: project, loading, error } = useLocalStorageItem(STORAGE_KEYS.PROJECTS, id);
  const { data: allProjects } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [activeTab, setActiveTab] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [moreProjects, setMoreProjects] = useState([]);
  
  useEffect(() => {
    if (project && allProjects.length > 0) {
      const related = allProjects
        .filter(p => p.id !== project.id && p.status === 'published')
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setMoreProjects(related);
    }
  }, [project, allProjects]);
  
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }
  
  if (error || !project) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
            <Link href="/projects" className="text-blue-400 hover:underline">
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
  
  // Render content with basic markdown support
  const renderContent = (content) => {
    if (!content) return '';
    
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 rounded text-blue-300">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^#{1,6}\s+(.*$)/gm, (match, text) => {
        const level = match.indexOf(' ');
        return `<h${level} class="text-${4-level}xl font-bold mb-4 text-white">${text}</h${level}>`;
      })
      .replace(/^- (.*)$/gm, '<li class="ml-4 mb-2">• $1</li>')
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic mb-4 text-gray-300">$1</blockquote>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded overflow-x-auto mb-4"><code class="text-blue-300">$1</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-300">')
      .replace(/\n/g, '<br>');
  };
  
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
        <meta name="description" content={project.description || project.slug || 'AAC Project Details'} />
      </Head>
      
      {/* Project Header */}
      <div className="relative h-[60vh] bg-blue-900">
        {/* Background Image or Gradient */}
        {project.mainImage?.url ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={project.mainImage.url}
                alt={project.mainImage.altText || project.title}
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
              
              <div className="flex flex-wrap gap-4 items-center text-white/80 mb-4">
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
              
              {/* Project Links */}
              <div className="flex space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
                )}
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
              {project.teamMembers && project.teamMembers.length > 0 && (
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
              {project.technologies && project.technologies.length > 0 && (
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`px-4 py-2 transition-colors ${
                    activeTab === 'tech' 
                      ? 'text-blue-400 border-b-2 border-blue-400 font-medium' 
                      : 'text-gray-400 hover:text-blue-400'
                  }`}
                >
                  Technologies
                </button>
              )}
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
                    
                    <motion.div variants={fadeIn}>
                      {project.content ? (
                        <div 
                          className="text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: `<p class="mb-4 text-gray-300">${renderContent(project.content)}</p>` 
                          }}
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
                        <span className="font-medium text-gray-300 capitalize">{project.status || 'Completed'}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-medium text-gray-300">{project.duration || '6 months'}</span>
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
                  
                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                      className="bg-[#1a2535] rounded-2xl shadow-lg p-6 border border-gray-700"
                    >
                      <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700 text-white">Team Members</h3>
                      <ul className="space-y-2">
                        {project.teamMembers.map((name, index) => (
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
                  
                  {project.teamMembers && project.teamMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.teamMembers.map((name, index) => (
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
            
            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1a2535] rounded-2xl shadow-lg p-8 border border-gray-700">
                  <h2 className="text-2xl font-bold mb-8 pb-4 border-b border-gray-700 text-white">Technologies Used</h2>
                  
                  {project.technologies && project.technologies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {project.technologies.map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="bg-[#0e1421] rounded-lg p-4 text-center border border-gray-700"
                        >
                          <div className="text-2xl mb-2">⚡</div>
                          <h3 className="font-medium text-white">{tech}</h3>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No technology information available for this project.</p>
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
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-8 text-white">More Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {moreProjects.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -10 }}
                    className="bg-[#1a2535] rounded-xl shadow-lg overflow-hidden flex-shrink-0 border border-gray-700"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{item.description || item.slug || "Explore this innovative project..."}</p>
                      <Link 
                        href={`/projects/${item.id}`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        View details →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;