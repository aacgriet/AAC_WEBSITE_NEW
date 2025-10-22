// pages/404.js
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Not Found | AAC - Advanced Academic Center</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#172E7C] hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-full transition duration-300"
            >
              Go to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;