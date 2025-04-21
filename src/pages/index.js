import React from 'react';
import Layout from '../components/Layout';
import HomeAnimation from '../components/HomeAnimation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';

// Import components for the home page sections
import Exploreus from '../components/HomeComponents/Exploreus';
import Achievements from '../components/HomeComponents/Achievements';
import Drones from '@/components/HomeComponents/Drone';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>AAC - Advanced Academic Center | GRIET</title>
        <meta name="description" content="Advanced Academic Center (AAC) is an inter-disciplinary research centre at GRIET, Hyderabad focused on innovation and research." />
      </Head>
      
      {/* Hero Section with ThreeJS Animation */}
      <HomeAnimation />
      
      {/* Explore Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Exploreus />
      </motion.section>
      
      {/* Achievements Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Achievements />
      </motion.section>
      
      {/* Drones Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Drones />
      </motion.section>
      
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-gray-900 text-white py-20"
      >
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Join the Innovation Journey</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Be part of AAC and collaborate with brilliant minds to build the future of technology.
          </p>
          <Link href="/Contact" className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-medium transition duration-300">
            Get in Touch
          </Link>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Home;