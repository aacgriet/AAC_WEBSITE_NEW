import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ProjectCard from '../../components/Research/Projects/ProjectCard';
import { getAllProjects } from '../../lib/sanity';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

export async function getStaticProps() {
  const allProjects = await getAllProjects();
  return {
    props: {
      projects: allProjects,
    },
    revalidate: 60 // Revalidate every minute
  };
}

const ProjectsPage = ({ projects }) => {
  const [search, setSearch] = useState("");
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => {
    if (search === "") return true;
    return project.title.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <Layout>
      <Head>
        <title>Projects | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore innovative projects developed at Advanced Academic Center, GRIET" />
      </Head>
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold font-serif mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PROJECTS
        </motion.h1>
        
        <div className="mb-8 p-5">
          <div className="flex items-center max-w-md mx-auto">
            <div className="mr-3 pt-1">
              <FaSearch size="1.3rem" />
            </div>
            <input
              type="text"
              placeholder="Search Projects"
              className="w-full px-4 py-2 border-2 border-[#172E7C] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              title={project.title}
              date={new Date(project.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            />
          ))}
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl text-gray-600">No projects found matching your search.</h3>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;