// src/pages/projects/index.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { getAllProjects } from '@/lib/sanity';
import { FaSearch, FaFilter } from 'react-icons/fa';

export async function getStaticProps() {
  const allProjects = await getAllProjects();
  return {
    props: {
      projects: allProjects,
    },
    revalidate: 60 // Revalidate every minute
  };
}

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
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <Link href={`/projects/${project._id}`}>
          <h3 className="text-xl font-bold mb-3 text-blue-800 hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {project.categories || "Uncategorized"}
          </span>
          <span className="text-gray-500 text-sm">{publishDate}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.slug || "Explore this innovative project..."}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500 text-sm">By: {project.author || "AAC Team"}</span>
          <Link
            href={`/projects/${project._id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Extract all unique categories
  const allCategories = ["all", ...new Set(projects.map(project => project.categories || "Uncategorized"))];
  
  // Filter projects based on search term and category
  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || project.categories === categoryFilter;
      return matchesSearch && matchesCategory;
    });
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
  
  return (
    <Layout>
      <Head>
        <title>Projects | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore innovative projects developed at Advanced Academic Center, GRIET" />
      </Head>
      
      <div className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Research & Development Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover innovative solutions and research projects developed by students and faculty at AAC.
            </p>
          </motion.div>
          
          {/* Search and filter section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-xl shadow-md">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter dropdown (mobile) */}
              <div className="relative md:hidden w-full">
                <button
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-gray-100 rounded-lg"
                >
                  <span>Filter: {categoryFilter === "all" ? "All Categories" : categoryFilter}</span>
                  <FaFilter />
                </button>
                
                {isFilterMenuOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setCategoryFilter(category);
                          setIsFilterMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          categoryFilter === category ? "bg-blue-50 text-blue-600" : ""
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
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    key={project._id} 
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
                <h3 className="text-2xl text-gray-600 mb-4">No projects found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;