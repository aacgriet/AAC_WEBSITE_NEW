// src/pages/index.js
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
// Import the CSS animation
import CSSHeroAnimation from '@/components/CSSHeroAnimation';
import ExploreSection from '@/components/HomeComponents/ExploreSection';
import ProjectsShowcase from '@/components/HomeComponents/ProjectsShowcase';
import ContactSection from '@/components/HomeComponents/ContactSection';

const Home = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>AAC - Advanced Academic Center | GRIET</title>
        <meta name="description" content="Advanced Academic Center (AAC) is an inter-disciplinary research centre at GRIET, Hyderabad focused on innovation and research." />
        
        {/* Add a style to prevent scrollbars on the landing page */}
        <style>{`
          html, body {
            scrollbar-width: none; /* Firefox */
          }
          
          html::-webkit-scrollbar, 
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
          
          html {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </Head>
      
      {/* Hero Section with CSS Animation */}
      <CSSHeroAnimation />
      
      {/* About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4"
            >
              About Us
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl text-white md:text-5xl font-bold mb-6"
            >
              Pushing Boundaries of Innovation
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white max-w-3xl mx-auto"
            >
              The Advanced Academic Center (AAC) is an interdisciplinary hub where creativity, 
              research, and innovation converge to solve complex challenges and shape the future.
            </motion.p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Research Projects", color: "bg-gradient-to-br from-blue-500 to-purple-600" },
              { number: "100+", label: "Students Involved", color: "bg-gradient-to-br from-pink-500 to-orange-400" },
              { number: "10+", label: "Published Papers", color: "bg-gradient-to-br from-green-400 to-cyan-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`${stat.color} text-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm p-8 flex flex-col items-center`}
              >
                <span className="text-5xl font-bold mb-2">{stat.number}</span>
                <span className="text-lg">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Explore Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-24 px-4 bg-[#0e1421"
      >
        <ExploreSection />
      </motion.section>
      
      {/* Projects Showcase */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-24 px-4"
      >
        <ProjectsShowcase />
      </motion.section>
      
      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-24 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white"
      >
        <ContactSection />
      </motion.section>
    </Layout>
  );
};

export default Home;