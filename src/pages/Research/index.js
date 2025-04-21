import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ResearchLinks from '../../components/Research/ResearchLinks';
import { motion } from 'framer-motion';

const ResearchPage = () => {
  return (
    <Layout>
      <Head>
        <title>Research | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore research initiatives, projects, publications, and patents at Advanced Academic Center, GRIET" />
      </Head>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16"
      >
        <ResearchLinks />
      </motion.div>
    </Layout>
  );
};

export default ResearchPage;